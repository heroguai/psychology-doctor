# 开发日志

记录 Psychology Doctor 项目的开发历程、重要决策和技术变更。

## [2025-02-02] 项目初始化

### 目标
创建基于 GLM 4.7 的心理健康智能体应用

### 技术栈确定
- **前端**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **后端**: Python + FastAPI
- **AI**: GLM 4.7 (智谱 AI)
- **理由**: GLM 对中文理解更好，Vue 中文生态完善

### 完成内容
- [x] 前端项目脚手架（326 个 npm 依赖）
- [x] 后端 FastAPI 框架
- [x] GLM API 集成服务
- [x] 聊天 API 端点 (`/api/chat`)
- [x] Git 仓库初始化
- [x] 项目文档（README.md, CLAUDE.md）

### 技术决策
- 使用 `pydantic-settings` 管理配置
- CORS 配置允许本地开发（localhost:5173, localhost:3000）
- 系统角色定义为"专业心理咨询师"
- 温度参数 0.7，top_p 0.9，max_tokens 2000

### API 配置
- GLM API 密钥: `37973963f4104ba9b2efc79c89950cf0.NoObajrblmaoXkoJ`
- 模型: `glm-4-plus`
- API 端点: `https://open.bigmodel.cn/api/paas/v4/chat/completions`

### 文件结构
```
psychology-doctor/
├── frontend/          # Vue 3 前端
├── backend/           # FastAPI 后端
│   └── app/
│       ├── api/       # API 路由
│       ├── core/      # 配置管理
│       ├── services/  # GLM 服务
│       └── main.py    # 应用入口
├── CLAUDE.md          # Claude Code 指南
├── README.md          # 项目说明
├── DEVELOPMENT.md     # 本文件
└── TODO.md            # 待办事项
```

### Git 提交
```
commit ebe5d15
初始提交: 创建 Psychology Doctor 项目
- Vue 3 + TypeScript 前端
- FastAPI + Python 后端
- GLM 4.7 AI 集成
- 完整项目文档
```

---

## [2025-03-02] 后端依赖问题解决 & GitHub 上传

### 问题：后端依赖安装失败

**错误现象**：
```
Building wheel for pydantic-core (pyproject.toml): finished with status 'error'
error: linking with `link.exe` failed: exit code: 1
```

**根本原因**：
- Python 版本：3.14.2
- pydantic 2.9.2 的 pydantic-core 2.23.4 需要从源码编译
- 系统缺少 Visual Studio C++ 构建工具
- pydantic-core 2.23.4 没有 Python 3.14 的预编译 wheel

**解决方案**：
1. 升级 pydantic 到最新版本（2.12.5），该版本包含 Python 3.14 的预编译 wheel
2. 修改 `requirements.txt`，将 pydantic 版本改为 `>=2.9.2`
3. 安装成功：`pydantic-core==2.41.5-cp314-cp314-win_amd64.whl`

**配置修复**：
- 修复 `.env` 文件中的 `ALLOWED_ORIGINS` 格式
- 从逗号分隔字符串改为 JSON 数组格式：`["http://localhost:5173","http://localhost:3000"]`

### 完成：项目上传到 GitHub

**GitHub 仓库**：https://github.com/heroguai/psychology-doctor

**操作步骤**：
1. 添加 `.gitignore` 文件保护敏感信息
2. 初始化 Git 仓库并重命名分支为 `main`
3. 推送到 GitHub 远程仓库

**Git 提交记录**：
```
commit a80021b: 添加 .gitignore 文件保护敏感信息
commit 8890e03: 文档更新: 添加开发日志和待办事项
commit ebe5d15: 初始提交: 创建 Psychology Doctor 项目
```

---

## [2025-03-02] 前端聊天界面开发完成

### 开发内容

#### 1. API 服务层 (`frontend/src/api/chat.ts`)

**功能**：
- 封装后端 `/api/chat` 接口
- TypeScript 类型定义（ChatMessage, ChatRequest, ChatResponse）
- 完整的错误处理和异常捕获
- 健康检查接口（checkHealth）

**技术实现**：
- 使用原生 Fetch API
- 异步/等待模式
- JSON 数据交换
- HTTP 状态码验证

#### 2. Pinia 状态管理 (`frontend/src/stores/chat.ts`)

**状态管理**：
- `messages`: 对话历史数组
- `isLoading`: 加载状态
- `error`: 错误信息
- `hasMessages`: 是否有消息（计算属性）
- `lastMessage`: 最后一条消息（计算属性）

**核心方法**：
- `sendMessageToApi()`: 发送消息到后端
- `clearHistory()`: 清空对话历史
- `retryLastMessage()`: 重试最后一条消息

**特点**：
- 响应式状态管理
- 自动消息追加
- 错误友好提示
- 初始化欢迎消息

#### 3. 聊天界面组件 (`frontend/src/views/ChatView.vue`)

**UI 组件**：
- **头部栏**：标题 + 清空对话按钮（图标）
- **消息列表**：可滚动消息容器
- **消息气泡**：用户（蓝色右侧）、AI（白色左侧）
- **输入区域**：文本框 + 发送按钮

**交互功能**：
- ✅ Enter 键发送消息
- ✅ Shift+Enter 换行
- ✅ 自动滚动到最新消息
- ✅ 自动调整文本框高度
- ✅ 加载动画（3个跳动的点）
- ✅ 错误提示 + 重试按钮
- ✅ 禁用状态（加载时）

**样式特性**：
- 全屏响应式布局
- 流畅动画（滑入效果）
- 移动端适配
- 现代化设计（圆角、阴影）

#### 4. 路由和全局配置

**路由配置** (`src/router/index.ts`)：
- 将聊天页面设为首页（`/`）
- 移除默认的 HomeView

**全局样式** (`src/App.vue`, `src/assets/main.css`)：
- 简化为全屏应用布局
- 移除默认的 Vue 模板样式
- 全局样式重置

### 技术栈使用

- **Vue 3 Composition API**: `<script setup>` 语法
- **TypeScript**: 完整类型定义
- **Pinia**: 状态管理
- **Vue Router**: 路由管理
- **CSS Scoped**: 组件样式隔离
- **CSS Animations**: 加载和过渡动画

### 文件结构

```
frontend/src/
├── api/
│   └── chat.ts              # API 服务层
├── stores/
│   └── chat.ts              # Pinia store
├── views/
│   ├── ChatView.vue         # 聊天页面（新）
│   ├── HomeView.vue         # 原首页（保留）
│   └── AboutView.vue        # 关于页面
├── router/
│   └── index.ts             # 路由配置（已更新）
├── App.vue                  # 根组件（已简化）
└── assets/
    └── main.css             # 全局样式（已更新）
```

### Git 提交

```
commit aeadc47: feat: 实现前端聊天界面
- 创建聊天 API 服务
- 创建 Pinia 状态管理
- 创建聊天界面组件
- 更新路由和全局样式
```

### 当前运行状态

**前端**：http://localhost:5173/
**后端**：http://localhost:8000/
**API 文档**：http://localhost:8000/docs

所有服务正常运行，前后端已成功连接！

---

## [待开发] 对话历史持久化
- **预计**: 2025-03-XX
- **目标**: 实现对话持久化存储和检索
- **技术选型**: SQLite / PostgreSQL

---

## [待开发] 流式响应优化
- **预计**: 2025-03-XX
- **目标**: 使用 Server-Sent Events 实现实时响应
- **优势**: 用户体验更流畅，无需等待完整响应

---

*最后更新: 2025-03-02*
