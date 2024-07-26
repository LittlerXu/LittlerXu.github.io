

# nvm-desktop

## nvm-desktop 是什么？

nvm-desktop 是一个以可视化界面操作方式管理多个 Node 版本的桌面应用，使用 Electron 构建（支持 Macos 和 Windows 系统）。通过该应用，可以快速安装和使用不同版本的 Node。它完美支持为不同的项目单独设置和切换 Node 版本，不依赖操作系统的任何特定功能和 shell。

nvm-desktop 的功能包括：

- 支持为系统全局和项目单独设置Node引擎版本
- 管理Node的命令行工具
- 支持英文和简体中文
- 支持自定义下载镜像地址 (默认是 https://nodejs.org/dist)
- Windows 平台支持自动检查更新
- 完整的自动化测试

## nvm-desktop 怎么用？

### 下载

首先，在[nvm-desktop的Release页面](https://github.com/1111mp/nvm-desktop/releases))下载系统对应的版本：

<img :src="`node版本管理工具.assets/640-17001926944704.png`" alt="图片" style="zoom:50%;" />

下载完成之后，进行安装。

### **环境配置**

安装完成之后，如果使用的是 Mac 电脑，需要在`~/.bashrc`、 `~/.profile` 或 `~/.zshrc` 文件添加以下内容，以便在登录时自动获取它：

```
export NVMD_DIR="$HOME/.nvmd"
export PATH="$NVMD_DIR/bin:$PATH"
```

> 如果电脑系统默认的是 zsh, 可以复制这个命令添加到 `~/.zshrc` 文件中即可。如果电脑使用的是 bash，则复制粘贴到 `~/.bashrc` 文件中去即可。如果有其他安装问题，可以查看官方文档：https://github.com/1111mp/nvm-desktop/blob/main/README-zh_CN.md

### 基本使用

Windows 下则不需要额外的操作，安装好运行之后直接搜索指定的 Node.js 版本点击下载安装即可。

<img :src="`node版本管理工具.assets/640-17001926944705.png`" alt="图片" style="zoom:50%;" />

下载的过程中会实时显示下载进度。

安装了新的 Node.js 版本之后，可以在已安装中查看：

<img :src="`node版本管理工具.assets/640-17001926944706.png`" alt="图片" style="zoom:50%;" />

可以应用或者卸载已经下载好的版本。

可以在终端中查看是否切换成功：

<img :src="`node版本管理工具.assets/640-17001926944707.png`" alt="图片" style="zoom:50%;" />

nvm-desktop 还支持为每个项目设置不同的 Node.js 版本，只需从本地添加项目，并设置需要的版本即可：

<img :src="`node版本管理工具.assets/640-17001926944708.png`" alt="图片" style="zoom:50%;" />

这样设置之后，全局的 Node.js 版本和项目的 Node.js 版本互不干扰。

除此之外，点击版本名称可以查看该版本的更新日志，点击右上角的“远程刷新”按钮可以获取最新的 Node.js 版本：

<img :src="`node版本管理工具.assets/640-17001926944719.png`" alt="图片" style="zoom:50%;" />

支持搜索 Node.js 版本、 V8 版本、NPM 版本，支持按发布时间排序，对不同版本进行筛选：

<img :src="`node版本管理工具.assets/640-170019269447110.png`" alt="图片" style="zoom:50%;" />

### 便捷访问

在 Mac 上，支持在顶部菜单栏便捷修改 Node.js 版本：

<img :src="`node版本管理工具.assets/640-170019269447111.png`" alt="图片" style="zoom:50%;" />

在 Windows 上，支持在右下角菜单便捷修改 Node.js 版本：

<img :src="`node版本管理工具.assets/640-170019269447112.png`" alt="图片" style="zoom:50%;" />

## 注意事项

### 配置环境变量

nvm-desktop的安装路径为:`C:\Users\86173\.nvmd`

安装时会自动将`C:\Users\86173\.nvmd\bin`路径添加至Path环境变量中, 如果没有自动添加,则需要手动添加.

### 完全卸载

卸载nvm-desktop(例如使用geek)时卸载不完全, nvm-desktop的文件夹`C:\Users\86173\.nvmd`和Path环境变量中的`C:\Users\86173\.nvmd\bin`仍然存在, 想要彻底卸载则需要手动将这其删除.

# nvm

## nvm的原理

创建一个Symlink文件夹, 此文件夹为所要使用的node版本所在文件夹的引用, 然后将此文件夹加入环境变量Path中,则使用node命令时使用的是指定版本的node.

## 使用nvm的注意点

安装的时候这个配置项是设置Symlink文件夹的名称和位置, 会在使用`use <version>`命令之后自动创建这个Symlink文件夹, 所以在安装nvm之前确保这个文件夹不存在, 不然会使`use <version>`命令无效.

<img :src="`node版本管理工具.assets/image-20231004143021268.png`" alt="image-20231004143021268" style="zoom:67%;" />

安装node所在文件夹默认位置为nvm文件夹, 可使用`nvm root <path>`修改,但不能是Symlink文件夹.

使用nvm后最好不要使用nrm, 换源时会发生错误, 直接使用`npm config get registry <path>`和`npm config get registry`来修改和查看npm镜像源, 并且这个命令修改的是npm用户配置文件(C:\Users\<username>\.npmrc).

## 报错:

在安装node时报错:"The system cannot find the path specified.", 可能是因为终端没有以管理员身份运行,尤其是在vscode的终端中运行时.

>vscode设置默认使用管理员身份运行的方法:[vscode设置以管理员身份运行 – 源码巴士 (code84.com)](https://code84.com/770863.html)



