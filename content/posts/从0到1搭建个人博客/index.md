+++
title = "从0到1搭建个人博客"
description = "这个博客的缘起"
date = "2026-05-12T13:27:49+08:00"
preview = ""
draft = false
tags = [ ]
categories = [ "数字生活" ]
+++

## 为什么搭博客

一是重拾表达习惯，二是想全过程使用AI指导，亲自看下ai目前的能力。  
ps我是文科生，没有编程基础，在以前的印象里，建站是一个需要编程基础的活。  

## 建博客全过程  
本文记录折腾记录，而不是教程。  
###  V0了解博客主流路径
先用deepseek，了解一下建站的过程。大概分为1构建静态网站2托管平台3部署 这么一个链条。
搭建完成以后的流程是，本地写文章，推送到github，托管平台自动部署，网站自动更新。
- 为什么选hugo？  
  随便选的，ds推荐了几个路线，hugo是需要动手的，为了练手，选择了hugo 。  

- 主题选择  
  一开始用的papermod，后来觉得支持的功能太少，不够美观，又换成了Fixlt。  

##

## 静态网站托管
静态网站托管，就是存储构建的网页文件的地方。  
1.腾讯云cloudbase  
优点：全程可视化，界面简单。  

缺点：免费开发环境只能部署，不能增加域名。个人版19.9/月。  

部署过程中也是遇到了hugo版本问题，给codebuddy好一阵折腾。自家人何苦为难自家人嘞哈哈哈。  
最终：放弃  1是因为收费2还要与Git平台CI/CD集成以后，才能自动部署（https://docs.cloudbase.net/hosting/cli-devops）

2.github pages  
2.1 确认仓库状态
我的仓库是 W173371/myblog，已经是 Public，代码也推上去了。
2.2启用 GitHub Pages
    打开 https://github.com/W173371/myblog
    点顶部 Settings
![仓库界面](image-1.png)
左侧菜单点 Pages
Source 选 GitHub Actions
![pages 选项](image-3.png)
2.3创建部署文件  
在 VS Code 里，在你的博客项目 myblog 下新建这个文件： github/workflows/hugo.yaml  
粘贴以下内容：
```bash
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.161.1'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
2.4推送到 GitHub    
注意：是在项目的目录下执行命令  

```bash
git add -A
git commit -m "添加 GitHub Pages 自动部署"
git push
```
2.5 查看网址
等 2-3 分钟，去 Settings → Pages 页面，顶部会出现你的网址：
https://w173371.github.io/myblog/

2.6 部署

只有项目文件不够，还要部署成网页文件。
仓库界面，选Actions，拉到最下面

## 买域名、绑定域名
**购买域名**
我在腾讯云买的个人域名。在腾讯和阿里买就行了。  
购买域名之前，需要先进行一个实名。实名会有审核时间，
购买域名以后，注册局也会审核一下域名。    

**在 GitHub 仓库设置**
1.进入你的 GitHub Pages 仓库（例如 username.github.io）

2.点击 Settings → 左侧菜单 Pages

3.在 Custom domain 处填写你的域名（例如 example.com 或 www.example.com）

4.点击 Save
（可选）勾选 Enforce HTTPS —— 等 DNS 生效后可以启用

保存后，GitHub 会自动在仓库根目录生成一个 CNAME 文件（里面就是你的域名）。
5.然后在本地执行 git pull 同步 CNAME。 之后所有修改都在本地进行，push 前确保 CNAME 文件存在
如果不小心覆盖了怎么办？  
别担心，重新在 GitHub 网页端填写域名保存即可，GitHub 会再次生成 CNAME 文件。  


**在域名服务商处添加 DNS 记录**

## 日常运维语句
启动：hugo server
启动后直接打开本地预览： http://localhost:1313/myblog/

推送github
cd /d E:\hugo\blog\myblog
git -c http.lowSpeedLimit=0 push origin main

小版本更新：
cd /d E:\hugo\blog\myblog
git add -A
git commit -m "feat: 将 QQ运维机器人 归入 AI项目 分类，填充数字化项目区"
git -c http.lowSpeedLimit=0 push origin main

push 后等 CI，再开浏览器；

## 优化记录
在初步配置成功后，对自带的主题进行优化调整，同时也看到一些优秀的自建博客，参考学习。
### 主题中加图片图标

### 中文显示
系统自带的某些字段为英文，显示为中文  
打开 hugo.toml，在 [params] 里加一行:  
    dateFormat = "2006-01-02"

    **我就正常写**

V3 重构PPT版（彻底推翻主题、改成无头模式 + 自建 deck）
8月下旬，原本是在更新文章样式（左侧文章分组，右侧文章列表，像传统博客样式），突然想到能不能做一个PPT风格的博客，和自己的咨询工作相呼应。说干就干。
通过workbuddy，重构博客，就是当前版本。
感想：不要问Ai某件事how to do，而是思考do what，以及为什么干！把自己想要什么想清楚，向AI讲清楚。

写作流程：写文章、本地预览、提交+推送、