+++
title = 'QQ问答机器人'
description = ""
date = '2026-05-15T11:21:54+08:00'
draft = true
tags = [ ]
categories = [ "数字生活" ]
+++
  
  
# 为什么会有这个想法

年前接手了一个小的项目，客户使用QQ群进行沟通内部事宜。被拉进群后，经常会被问到一些重复性问题，于是想用机器人代替回答问题。
因为qq官方机器人的必须是企业认证才可以，于是看看有没有别的办法。

因为不懂编程，只有需求，所以使用了腾讯的codebody进行全程操作指导。
下面将重点过程进行记录。

# 所需内容：
1.napcat软件  
负责处理 QQ 消息，不需要安装QQ软件；  
如果有Q软件会方便一些，可以在napcat网页的快捷登录）     

2.机器人程序  
机器人程序让codebody生成；  
运行机器人需要Node.js ，需要下载并安装依赖；


# 实现步骤
## 1.下载 NapCat  
下载地址： https://github.com/NapNeko/NapCatQQ/releases  

下载 NapCat.shell  解压到任意目录  

## 2.运行 NapCat  
进入解压后的目录，双击 Launcher，启动napcat  
启动后，命令行中会显示二维码，可以手Q扫码登录或者在napcat的web界面扫码登录。  
在二维码上方的命令行可以看到如下内容    
[NapCat] [WebUi] WebUi Token:xxxxxxxx这是登录web配置的密码    
[WebUi] WebUi User Panel Url: http://127.0.0.1:6099/   这是登录napcat网页端的地址   

## 3.配置 NapCat
本机登录：http://127.0.0.1:6099  
登录token在启动日志中 WebUi Token
在左侧功能栏-网络配置中，配置两个选项
-  服务器：这个是机器人发消息的。默认的有个端口，如被占用，可以修改。记住token
-  web服务器配置：这个是机器人Q接受消息的。默认的有个端口，如被占用，可以修改。同样，记住这个token

  
## 4.用codebody生成机器人程序
输入提示词，codebody会自动生成。
“创建一个 QQ 群聊机器人，基于知识库回答问题”

## 5.修改配置文件  
修改机器人文件夹中的.env文件，使用记事本即可打开。  
>#QQ机器人配置文件
>
>#机器人QQ号（请修改）
>BOT_QQ=你的机器人QQ号
>
>#管理员QQ号（可以控制机器人的QQ）
>ADMIN_QQ=你的管理员QQ号
>
>#机器人回复触发前缀
>BOT_TRIGGER_PREFIX=@机器人
>
>#NapCat HTTP API 地址
>NAPCAT_API=http://127.0.0.1:xxxx
>
>#NapCat HTTP API Token（必须与NapCat配置一致）
>NAPCAT_TOKEN=你的token
>
>#NapCat WebSocket 服务器地址
>NAPCAT_WS=ws://127.0.0.1:xxxx
>
>#NapCat WebSocket API Token（必须与NapCat配置一致）
>NAPCAT_TOKEN=你的token

需要确保：HTTP服务端口：和 WebSocket 服务器地址 与napcat设置的一样。  
如果你是先配置了napcat，那就把机器人程序和napcat保持一致；  
如果你是先生成了机器人，那就napcat和机器人保持一致；  
也可以任意修改，两者一致即可。  



## 6.启动机器人程序  
在机器人文件夹里，cmd 运行机器人程序    
~~~
npm start
~~~

JS文件，依赖node.js ，可能需要安装一下。  
登录：https://nodejs.org/，下载适合你的。然后一直安装即可。
安装后，在命令行中进行安装依赖。
~~~
npm install
~~~
安装完毕后，继续启动机器人
~~~
npm start
~~~

## 7.给机器人Q发消息
运行需要1.napcat程序启动2.qq机器人启动

然后就可以给机器人q发消息了，私聊和群聊都可以。    
![](/images/cs.png)
但是这时，他只会响应机器人文件夹里的 Knowlege.json里的预置问题（根据关键词）。
可以在文件里进行补充。








# 目前这个方案的弊端
1.命令行一关，程序就停了，或者本机关机、断电断网，机器人就回答不了问题了。甚至出现过，命令行没关，但是断网了，等连上网时，机器人咔咔回答断网期间的问题。  

2.回答比较机械，只能按照关键词响应。
 
 # 后续的升级方向
 1.把这套东西放云服务器上，只要服务器不关机，命令行不关就可以24小时运行。
 2.使用向量搜索或者接入AI大模型；


 
首先，在机器人选择上踩坑了，code首先推荐的是go-cqhttp，这个始终登录不了QQ，发现是因为协议的原因。后面又换了napcat，成功的。
# 其他事项
## 创建机器人的提示词
这是我事后，问了codebody，如果是第一次问，如何得出具有以上功能的机器人，他给的回复：  

>“创建一个 QQ 群聊机器人，基于知识库回答问题
>技术栈：
>NapCat（QQ 协议适配器）
>Node.js + Express
>OneBot v11 协议
>WebSocket 通信
>核心功能：
>监听群聊/私聊消息
>基于 knowledge.json 关键词匹配回答
>支持管理员命令（状态、重新加载）
>不接入 AI，严格从知识库回答
>连接方式：
>机器人通过 WebSocket 连接到 NapCat
>通过 HTTP API 发送消息
>配置项：
>机器人 QQ 号
>管理员 QQ 号
>NapCat HTTP API 地址 + Token
>NapCat WebSocket 服务器地址  ”



## token的作用是什么？
Token = 身份验证密钥就像门禁卡一样，用于验证"你是不是合法用户"。

HTTP Token：调用 NapCat API（如发送消息）时需要
WebSocket Token：连接 NapCat WebSocket 时需要
你的 NapCat 配置了 Token，所以：

机器人连接 WebSocket 时需要带 token
机器人发送消息时也需要带 token
如果不想这么麻烦，可以在 NapCat WebUI 中把 Token 全部清空（HTTP Server 和 WebSocket Server 都清空），这样两边都不需要验证，更简单。

