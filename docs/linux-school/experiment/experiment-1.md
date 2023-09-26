# 实验一: Linux系统基础
[test]
1. 实验目的

熟悉 Linux 系统的安装，各种基本操作命令，各种常用管理（用户管理、软件管理、设
备/磁盘管理、网络管理）方法

2. 实验内容

安装虚拟机、安装 Linux 系统，练习 Linux 下常用命令和管理工具（用户管理、软件管
理、设备/磁盘管理、网络管理）

3. 实验步骤

## 安装 Linux 操作系统

安装 VMware workstation 虚拟机（包括 VMWare Tools）；
在虚拟机上安装两个 Linux 系统（CentOS 7 以上，Fedora，Ubantu 任选），包括开发
环境、网络环境、在虚拟机中设置共享文件夹；


## Linux 基本操作

###  基础命令: (/usr/bin)

#### 帮助命令
man, info, help
```bash
man bash #查看 bash 手册
```
#### 文件命令
vim vimdiff diff mkdir touch rm mv cp ln cd ls more less head tail cat grep egrep sed nc awk wc
```bash
touch test.txt ## 创建文件
echo hello > test.txt ##向文件 test.txt 输入 hello
cat test.txt ## 显示 test.txt 文件内容
grep root /etc/passwd #查看 root 用的 ID 等信息
more /proc/cpuinfo ## 查看计算机系统的 cpu 信息
more /proc/meminfo ##查看计算机系统的内存信息
```

#### 软件安装命令
tar unzip gzip rpm yum sh
```bash
yum install nginx # 安装nginx,需要超级用户权限，也可能需要配置 yum 源
```
配置 yum 源，将如下内容保存到/etc/yum.repos.d/nginx.repo 文件中
```bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```
执行`yum repolist`可见 nginx

#### 用户命令
userdel useradd groupadd chown chomd groupadd groupdel id chattr lsattr su sudo passwd
```bash
useradd user1 ## 创建用户 user1
passwd user1 ## 设置用户 user1 的密码
su user1 ## 切换到用户 user1
cd; pwd ##切换到 user1 的 home 目录，并打印工作目录
```
#### 查看系统命令
w who whoami ss lsof uname find init date echo
```bash
uname -a ## 查看操作系统版本信息
```
#### 网络命令
tracter route dig nslookup wget ssh ping telent setup ifconfig ifup ifdown
```bash
ifconfig #查看网卡 IP 等信息
```
#### 开关机命令
shutdown reboot halt login logout systemctl suspend(挂起)

#### 管理命令：
exec expect which clear pwd cal bc man LANG sync exit time dmesg last scp ftp rz sz vmstat swapon swapoff systemctl service
```bash
dd if=/dev/zero of=/home/swap bs=1024 count=2048000 #生成 2G 大小的空文件
mkswap /home/swap #创建交换文件
swapon /home/swap #启用交换空间
df -m ##查看交换空间
swapoff /home/swap #关闭交换空间
df -m ##查看交换空间
```
#### 进程服务命令
kill killall pkill chkconfig top tree service history uptime netstat ps
```bash
ps ##记住 bash 的进程 ID
kill BASH_PID #结束 bash 进程
```
### 内存磁盘命令
dd fdisk parted(2T 以上分区) mount umount mkfs free du df mdadm
```bash
# mount -l |grep ext ## 查看挂载的 ext 文件系统
/dev/idrive0 on / type ext4 (rw,relatime)
/dev/sda on /opt type ext4 (rw,relatime)
```

#### 其它
alias uniq

## 个性化环境
```bash
修改$HOME 目录下的.bash_profile 文件
# .bash_profile
# get the aliases and functions
if [ -f ~/.bashrc ]
then . ~/.bashrc
fi
PATH=$HOME/bin:$PATH
export PATH
LOGNAME=$LOGNAME
export LOGNAME
HOST=$HOSTNAME
export HOST
umask 022
set -o ignoreeof
EDITOR=/usr/bin/vi
MAIL=/var/spool/mail/$LOGNAME
export MAIL
case $LOGNAME in
root) PS1="[\u@\h \W]\\ #";; *) PS1="[\u@\h \W]\\$";;
esac
PS2='you need to finish inputing…' alias cls='clear' alias dir='ls' alias copy='cp' alias rename='mv' alias md='mkdir' alias rd='rmdir' alias delete='rm –rf
```

## 编辑工具 vim/emacs
```bash
vim /etc/passwd
:wq /tmp/passwd
vim /
:wq /tmp/root
vim
:vsplit /tmp/passwd # 垂直分割窗口
:split /tmp/root # 水平分割窗口
ctrl + w # 切换窗口到 /tmp/passwd
:set nu # 显示行号
gg # 跳到文首
5yy # 复制光标下的 5 行
ctrl + w # 切换窗口到 /tmp/root
p # 小写粘贴到当前行上面。大写粘下面
ctrl + w # 切换窗口到 /tmp/passwd
:set nu # 显示行号
gg # 跳到文首
5yy # 复制光标下的 5 行
ctrl + w # 切换窗口到 /tmp/root
p # 小写粘贴到当
```