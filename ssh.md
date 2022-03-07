# SSH



## Set up a ssh server

1.```sshd``` to start the server. ```pkill sshd``` to stop it.

2.Temporarily set a password: ```passwd``` 

3.Create a keys if needed (ON THE CLIENT) with ```ssh-keygen -t rsa```

4.Send the .pub key to the server ```ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 8022 user@serverip```

5.Modify ```PasswordAuthentication no``` in ~/../usr/etc/ssh/sshd_config 

6.Connect with ```ssh -p 8022 user@serverip```

## Transfer files over ssh

```bash
scp /path/to/file username@a:/path/to/destination
```

???

ssh-keygen -f "/home/yannbilodeau/.ssh/known_hosts" -R "[10.0.0.233]:8022"

???