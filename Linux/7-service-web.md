# Service Web

## DHCP
Obtenir une nouvelle adresse ip locale
```bash
    sudo dhclient -r  # Release Lease
    sudo dhclient     # get new lease
    sudo dhclient -r eth0 # interface spécifique
    sudo dhclient eth0
    # ifdown eth0
    # ifup eth0
    ### RHEL/CentOS/Fedora specific command ###
    # /etc/init.d/network restart
    # Force
    ip a
    ip a s eth0
    dhclient -v -r eth0
```



## SELINUX

```bash
sestatus # SeLinux status
nano /etc/selinux/config # Pour modifier
# Désactiver avec SELINUX=disabled
```

## Firewall

```bash
systemctl status firewalld  # get status
firewall-cmd --get-active-zones
firewall-cmd --zone=public --list-all # get services under public zone ( traffic entrant autorisé)( public/block/trusted)
```
changer la zone de l'interface:
```bash
firewall-cmd --zone=trusted --change-interface=ens160 --permanent
firewall-cmd --reload
```

Tester: 
    ``` 
    firewall-cmd --get-active-zones 
    ```

## Service Web

Vérifier si Apache est installé:
```bash
rpm –qa | grep httpd
```

Installer httpd en utilisant une des commandes :
    ```bash
    yum install httpd
    dnf install httpd
    ```
Lancer ou Arrêter le serveur:
    ```bash
    systemctl restart httpd
    systemctl stop httpd
    ```
Tester le serveur Apache:
    ```bash
    firefox http://localhost
    ```
Troubleshooting:
    Vérifier les ports ouverts:

    ```bash
    netstat -ntlp
    ```

## CONFIGURATION DE BASE DU SERVEUR http

Racine de publication du serveur web: /var/www/html
index.html par default: /etc/httpd/
Service Web sous Fedora


### 3 Différentes configurations
### a)  Site web par default de publication web :
            Racine de publication :  /var/www/html/
            Pour tester : creer un fichier : index.html

### b)  Site de publication a partir des home dir de chaque compte : non autorise par defaut
Comment autoriser cette operation ?   
Dans le fichier ```/etc/httpd/conf.d/userdir.conf```

Remplacez la directive :
```UserDir disabled```

Par : 
```UserDir enabled [user]```

et enlevez le # devant la directive :
```#UserDir public_html```

ensuite:

```bash
chmod 755 /home/samir
su - samir
cd ~
mkdir public_html
chmod 755 public_html
# puis créer une page index.html dans ce dossier
```

Pour y accéder:

```
https://localhost/~user
```



### c) Publication à partir d'un dossier virtuel

    En tant que root, créez le dossier web dans /srv :
    mkdir /srv/web
    # Donnez les authorisations:
    chmod 755 /srv/web

1) Autoriser la publication à partir de ce dossier dans le fichier de configuration du serveur Web (/etc/httld/conf/httpd.conf) :
    ```
    geany /etc/httpd/conf/httpd.conf
    ```

2) Ajoutez la section suivante :
    ```bash
    <Directory "/srv/web">
    AllowOverride None
    # Allow open access:
    Require all granted
    </Directory>
    ```
3) Créez un alias d’accès à ce dossier virtuel : /srv/web dans le fichier `/etc/httpd.conf/httpd.conf` dans la section` <IfModule alias_module>`:
3) Ajoutez la ligne suivante :
   
    `Alias /web /sev/web`
    
4) Créez une page html index.html dans ce dossier.
5) Puis y accéder avec : firefox http://localhost/web

### d) Plusieurs serveurs sur UNE adresse IP

```
Identifier chaque hôte http par un nom:
    - 1er site: www.adrian.tld     \
    - 2eme site: data.adrian.tld    > Utilisent le même IP
    - 3eme site: info.adrian.tld   /

1er: /var/www/www
2eme: /var/www/data
3eme: /var/www/info
```

#### Étapes:
1. Pour chaque hôte HTTP => créer un dossier
```bash
mkdir /var/www/www /var/www/data /var/www/info
```

2. Créer index.html dans chaque dossier

3. Configurer les hôtes virtuels dans un fichier de config
    nom => www.adrian.tld => /var/www/www
```bash
geany /etc/httpd/conf.d/http_virtuels.conf
```
```bash
<VirtualHost *:80>
    ServerAdmin webmaster@adrian.tld
    DocumentRoot "/var/www/www"
    ServerName www.adrian.tld
    ServerAlias www.milea.tld
</VirtualHost>
<VirtualHost *:80>
    ServerAdmin webmaster@adrian.tld
    DocumentRoot "/var/www/data"
    ServerName data.adrian.tld
</VirtualHost>
<VirtualHost *:80>
    ServerAdmin webmaster@adrian.tld
    DocumentRoot "/var/www/info"
    ServerName info.adrian.tld
</VirtualHost>
```
Redémarrer le service:
```bash
systemctl restart httpd
```
4. Associer les 3 noms d'hôtes à des adresses IPs
```bash
nano /etc/hosts
```
Ajouter :
```
10.30.43.134 www.adrian.tld data.adrian.tld info.adria.tld www.mliea.tld
```
Tester avec ping :
```bash
ping -c 3 www.adrian.tld
ping -c 3 data.adrian.tld
ping -c 3 info.adrian.tld
ping -c 3 www.milea.tld
# test ultime
lynx http://www.milea.tld # sur chaque
```

### e) Authentication

1) créer un dossier avec lees autorisations 755
```bash
mkdir /srv/auth
chmod 755 /srv/auth
```

2) Authoriser la publication web a partir du fichier `/etc/httpd/conf/httpd.conf`
```bash
<Directory "/srv/auth">
    AllowOverride AuthConfig
    # Allow open access:
    Require all granted
</Directory>
```

3) Créer les comptes et mots de passe puis vérifier
```bash
htpasswd -c /var/www/utilisateurs
cat /var/www/utilisateurs
```

4) Créer le fichier .htaccess dans /srv/auth
```bash
AuthName "Restricted Content - Bonjour"
AuthType Basic
AuthUserFile "/var/www/utilisateurs"
Require valid-user

```

5) Ajouter le site au fichier `/etc/hosts`
```
192.168.20.128 www.adrian.tld www.milea.tld info.adrian.tld data.adrian.tld auth.adrian.tld
```

6) Déclarer le site dans `/etc/httpd/conf.d/http_virtuels.conf`
```bash
<VirtualHost *:80>
    ServerAdmin webmaster@adrian.tld
    DocumentRoot "/srv/auth"
    ServerName auth.adrian.tld
</VirtualHost>
```

7) Créer un fichier index.html dans `/srv/auth`

8) Redémarrer le service httpd: `systemctl restart httpd`

9) Tester: `lynx http://auth.adrian.tld`
Entrez le nom de l'utilisateur et son password



***************************************************

## ANNEXE

### Le systeme de fichier Apache

```
[root@fedora ~]# tree /etc/httpd/
/etc/httpd/                                            : dossier httpd
├── conf             : dossier 
│   ├── httpd.conf  : fichier de config principal
│   └── magic  :des formats de fichiers (video, paf, audio, etc ...)
├── conf.d    :fichiers de config suppl.
│   ├── autoindex.conf     : par defaut
│   ├── README
│   ├── userdir.conf      : publier a partir des home directory des comptes
│   └── welcome.conf       :page par defaut
├── conf.modules.d       :fichiers de chargement des modules en cas de besoin
│   ├── 00-base.conf
│   ├── 00-dav.conf  
│   ├── 00-lua.conf
│   ├── 00-mpm.conf
│   ├── 00-optional.conf
│   ├── 00-proxy.conf
│   ├── 00-systemd.conf
│   ├── 01-cgi.conf
│   ├── 10-h2.conf
│   ├── 10-proxy_h2.conf
│   └── README
├── logs -> ../../var/log/httpd  :fichier journal du serveur : activites sur le serveur
├── modules -> ../../usr/lib64/httpd/modules : emplacement des modules
├── run -> /run/httpd                         : parametres du processus httpd : noyau de linux identifie les proc par PID
└── state -> ../../var/lib/httpd            : 
```