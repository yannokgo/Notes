## Make a file executable

```bash
chmod u+x
```



## Get Stats

```bash
nvidia-smi -l 1			#  GPU usage
htop 					#  Process infos
```

### Do it with a script

```bash
x-terminal-emulator -e htop; nvidia-smi -l 1
```



Reference: https://askubuntu.com/questions/46627/how-can-i-make-a-script-that-opens-terminal-windows-and-executes-commands-in-the