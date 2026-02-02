# Psychology Doctor

一个基于 AI 的心理健康智能体应用，使用 GLM 4.7（智谱 AI）提供专业的心理咨询服务。

## 技术栈

- **前端**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **后端**: Python + FastAPI
- **AI 服务**: GLM 4.7 (智谱 AI)

## 快速开始

### 前端设置

```bash
cd frontend
npm install
npm run dev
```

前端将运行在 `http://localhost:5173`

### 后端设置

```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 GLM API 密钥

# 启动后端服务
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

后端将运行在 `http://localhost:8000`

API 文档可访问: `http://localhost:8000/docs`

## 获取 GLM API 密钥

1. 访问 [智谱 AI 开放平台](https://open.bigmodel.cn/)
2. 注册并登录
3. 在控制台获取 API 密钥
4. 将密钥填入 `backend/.env` 文件的 `GLM_API_KEY` 字段

## 项目结构

```
psychology-doctor/
├── frontend/           # Vue 前端应用
│   ├── src/
│   │   ├── api/       # API 调用
│   │   ├── components/# 组件
│   │   ├── stores/    # 状态管理
│   │   └── views/     # 页面
│   └── ...
├── backend/           # FastAPI 后端
│   ├── app/
│   │   ├── api/       # API 路由
│   │   ├── core/      # 核心配置
│   │   └── services/  # 业务逻辑
│   └── requirements.txt
└── CLAUDE.md          # Claude Code 项目指南
```

## 功能特性

- 🤖 基于 GLM 4.7 的智能对话
- 💬 实时聊天界面
- 📝 对话历史记录
- 🔒 隐私保护

## 开发指南

详细的开发指南请参阅 [CLAUDE.md](./CLAUDE.md)

## 许可证

MIT
