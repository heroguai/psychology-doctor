# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**Psychology Doctor** 是一个基于 AI 的心理健康智能体应用，使用 GLM 4.7（智谱 AI）提供心理咨询服务。

### 技术栈

- **前端**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **后端**: Python + FastAPI
- **AI 服务**: GLM 4.7 (智谱 AI)
- **通信**: REST API

---

## 开发命令

### 前端开发

```bash
cd frontend
npm install          # 安装依赖
npm run dev          # 启动开发服务器（http://localhost:5173）
npm run build        # 构建生产版本
npm run preview      # 预览生产构建
npm run format       # 使用 Prettier 格式化代码
npm run lint         # 使用 ESLint 检查代码
```

### 后端开发

```bash
cd backend
python -m venv venv           # 创建虚拟环境（首次运行）
source venv/bin/activate      # 激活虚拟环境（Linux/Mac）
# 或
venv\Scripts\activate         # 激活虚拟环境（Windows）

pip install -r requirements.txt  # 安装依赖
cp .env.example .env              # 创建环境配置文件（需填入真实的 API 密钥）

# 启动开发服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 项目架构

### 前端结构（Vue 3）

```
frontend/
├── src/
│   ├── api/           # API 调用封装
│   ├── assets/        # 静态资源
│   ├── components/    # 可复用组件
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── views/         # 页面视图
│   ├── App.vue        # 根组件
│   └── main.ts        # 应用入口
├── public/            # 公共静态资源
└── vite.config.ts     # Vite 配置
```

### 后端结构（FastAPI）

```
backend/
├── app/
│   ├── api/           # API 路由
│   ├── core/          # 核心配置（安全、设置）
│   ├── models/        # 数据模型
│   ├── services/      # 业务逻辑（GLM API 调用等）
│   ├── utils/         # 工具函数
│   └── main.py        # FastAPI 应用入口
├── requirements.txt   # Python 依赖
└── .env.example       # 环境变量示例
```

---

## 关键集成说明

### GLM API 集成

后端通过 `app/services/glm_service.py` 调用智谱 AI 的 GLM 4.7 模型。需要配置：
- `GLM_API_KEY`: 智谱 AI 的 API 密钥
- `GLM_API_URL`: API 端点
- `GLM_MODEL`: 使用的模型名称

API 文档：https://open.bigmodel.cn/dev/api

### 前后端通信

- 前端通过 `src/api/` 目录中的模块调用后端 API
- 后端 API 路由定义在 `app/api/` 目录
- CORS 已配置允许开发环境的前端地址

---

## 重要提示

- **环境变量**: 运行后端前必须复制 `.env.example` 为 `.env` 并填入真实的 GLM API 密钥
- **语言偏好**: 所有对话和交互使用中文
- **代码风格**: 前端使用 Prettier + ESLint，后端遵循 PEP 8
