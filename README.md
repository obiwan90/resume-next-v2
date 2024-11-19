# Modern Resume Website

一个使用 Next.js 14 构建的现代化个人简历网站，集成了丰富的动画效果和响应式设计。

## 🌟 项目特点

### 🎨 现代化设计
- 支持亮色/暗色主题切换
- 流畅的页面过渡动画
- 精心设计的响应式布局
- 优雅的交互反馈
- 基于 Framer Motion 的动画系统

### 💼 内容展示
- 个人信息展示
- 专业技能矩阵
- 项目经验时间线
- 技术博客分享
- 在线留言互动
- 旅行地图可视化

### 🛠 技术特性
- 基于 App Router 的页面路由
- 服务端组件与流式渲染
- 响应式图片优化
- SEO 友好的元数据管理
- 评论系统与实时交互
- 地图可视化展示

## 🚀 技术栈

### 核心框架
- **Next.js 14**: 应用框架
- **React 18**: UI 库
- **TypeScript**: 类型系统
- **Tailwind CSS**: 样式解决方案

### UI 组件
- **shadcn/ui**: 核心组件库
- **Lucide Icons**: 图标系统
- **Framer Motion**: 动画效果
- **react-simple-maps**: 地图可视化

### 状态管理
- **React Hooks**: 组件状态
- **Context API**: 全局状态
- **Zustand**: 复杂状态

### 数据持久化
- **Sanity.io**: 内容管理
- **PostgreSQL**: 主数据库
- **Prisma**: ORM
- **Redis**: 缓存层

### 身份认证
- **Clerk**: 用户认证
- **Supabase**: 后端服务

## 📦 项目结构

~~~
resume-next-v1/
├── app/                 # 页面路由
│   ├── experience/     # 经验页面
│   ├── projects/       # 项目页面
│   ├── speaking/      # 留言页面
│   └── hobbies/       # 兴趣爱好页面
├── components/         # UI组件
│   ├── ui/            # 基础UI组件
│   └── layout/        # 布局组件
├── lib/               # 工具函数
├── prisma/            # 数据库模型
├── public/            # 静态资源
└── styles/            # 样式文件
~~~

## 🚀 快速开始

1. 克隆项目
~~~bash
git clone https://github.com/your-username/resume-next-v1.git
cd resume-next-v1
~~~

2. 安装依赖
~~~bash
pnpm install
~~~

3. 环境变量配置
~~~bash
cp .env.example .env.local
~~~

需要配置的环境变量:
~~~env
# 数据库
DATABASE_URL=
DIRECT_URL=

# Clerk 认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
~~~

4. 启动开发服务器
~~~bash
pnpm dev
~~~

## 🔧 主要功能

### 个人信息展示
- 响应式个人信息卡片
- 技能矩阵展示
- 社交媒体链接

### 项目展示
- 项目卡片展示
- 项目详情页
- 技术栈标签
- 实时更新标记

### 工作经验
- 时间线展示
- 详细工作描述
- 项目经历
- 技术栈展示

### 社交互动
- 评论系统
- 表情回应
- 代码块展示
- 实时通知

### 兴趣爱好
- 世界地图展示
- 已访问地点标记
- 计划访问地点
- 交互式地图

## 📱 响应式设计

- 移动端优先设计
- 适配平板设备
- 桌面端优化
- 流畅的过渡动画

## 🔒 安全性

- 用户认证
- CSRF 保护
- XSS 防护
- 数据加密

## 🌐 部署

本项目使用 Vercel 进行部署:

1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献指南

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📞 联系方式

- Email: your.email@example.com
- GitHub: [your-github-profile](https://github.com/your-username)

## 🙏 致谢

感谢以下开源项目:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Simple Maps](https://www.react-simple-maps.io/)
