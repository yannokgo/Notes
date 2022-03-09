# Gestion des disques

## Partitions
Un disque ne peut contenir que 4 partitions primaires. Mais on peut remplacer
une partition primaire par une partition étendue. Cette dernière peut contenir
maximum 12 partitions logiques. Notre disque pourra donc, au maximum, contenir 15
partitions utilisables soit 3 primaires plus les 12 partitions logiques (ou lecteurs
logiques( créées dans la partition étendue. )

### **Pour voir la liste des disques et leurs partitions**
```
fdisk -l
fdisk /dev/sdd # Pour modifier le disque
```

- Pour afficher les options
    ```
    Command (m for help): m 
    ```
- Pour afficher les partitions
    ```bash
    Command (m for help): p
    ```

### A) **Créer de nouvelles partitions**
```
Command (m for help): n
/n
e extended
p primary partition (1-4)
/n
Partition number (1-4): (choisir 1 pour la 1ere partition primaire) 
```
Pour (Last cylindrer), spécifier la taille de la partition : ici 2 Go (notez +2G) 
```
Last cylinder or +size or +sizeM or +sizeK (5660-14946, default 14946): +2G
```

*Pour vérifier*
`Command (m for help): p`

 ###  B) Modifier une partition linux en format FAT32

 **Afficher les types de partitions reconnues par fdisk de Linux : option l**
 ``` Command (m for help): l ```

 Donc on va modifier la partition /dev/sdd2 de Linux vers FAT32 : option t
    ```
    Command (m for help): t
    Partition number (1-2): 2
    Hex code (type L to list codes): b
    Changed system type of partition 2 to b (W95 FAT32) 
    ```

### C)

Il faut quitter fdisk en sauvegardant (option w) : ``` Command (m for help): w ```

### D) Formatter les partitions

En tant que root:
- Pour la partition /dev/sdd1 formatage en ext4: 
    ```
    [root@fed3 ~]# mkfs.ext4 /dev/sdd1 
    ```

### E) Monter les partitions sur les dossier

- Créer les dossiers: ` mkdir /mnt/LINUX `

- Montage des partitions sur les dossiers crées: 
    ```
    [root@fed3 ~]# mount -t ext4 /dev/sdd1 /mnt/LINUX/
    [root@fed3 ~]# mount -t vfat /dev/sdd2 /mnt/FAT32/ 
    ```
    
- Rendre permanent:

    ```bash
    nano /etc/fstab
    # Dans le fichier, ajouter (ex: ext4, vfat, ntfs):
    /dev/[nompartition] /mnt/[dossier] [type] defaults 0 0
    # example:
    /dev/sdb mnt/sdb ntfs defaults 0 0
    # Verify with `fintmnt --verify`
    
    ```

    

- Tester en créant dans les dossiers

### e) Démonter
```bash
umount /mnt/sdd
```
_________________________________________________

## Gestion de l'espace disque

**Display file**
```bash
df -h [fichier.ext]
```
Affiche les partitions montées ainsi que l'espace occupée par les fichiers/dossiers ainsi que l'espace disponible:

**Disk Usage**
```bash
du -lh
du -h --max-depth=1 [fichier.ext]
```
