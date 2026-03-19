# BG Remover

一键去除图片背景，返回透明 PNG。

## 快速开始

### 1. 部署 Workers API

```bash
# 安装 wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
cd workers
wrangler deploy
```

### 2. 配置 API Key

在 Cloudflare Workers 环境变量中设置：
- `REMOVE_BG_API_KEY`: remove.bg API Key

### 3. 访问

部署后访问你的 Workers 域名即可使用。

## 技术栈

- 前端：原生 HTML/CSS/JS
- 后端：Cloudflare Workers
- API：remove.bg

## 费用

- Cloudflare Workers：免费 100,000 次/天
- remove.bg：免费 100 张/月
