+++
title = '在这里填标题'
description = ''
{{- /* 注意：本文件是模板，不是可以直接复制使用的成品。
      下面的 date 使用了模板函数，只有在用 hugo new 命令创建文件时才会被替换成真实日期。
      如果你是手动复制本文件，必须把 date 改成字面值，例如 2026-08-30T15:32:00+08:00。
      否则 Hugo 会报 "the date front matter field is not a parsable date"，导致整站构建失败。 */}}
date = '{{ dateFormat "2006-01-02T15:04:05+08:00" .Date }}'
draft = false
tags = [ ]
categories = [ ]
# slug = 'my-article'              # 想要干净的英文 URL 时，取消注释并填写
# aliases = ['/posts/文件名']       # 用了 slug 就必须填！否则按文件名拼的链接会 404
#   ↑ 这两个是配套关系：一旦写了 slug，文章地址就从「文件名路径」变成 /posts/<slug>/，
#     文件名路径随即失效。填上 aliases 后，旧链接会自动跳转到新地址。
# 想让文章出现在「数字化项目」区，categories 里加 "AI项目" 或 "数字化项目"
# 正文用 ## 分小节，2 节以上会自动生成左侧目录

[build]
  publishResources = false   # 原图不上传：图片会被自动压缩成 webp 后再发布
+++
