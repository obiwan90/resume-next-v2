<div align="center">

# 🌟 Modern Resume Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

一个使用 Next.js 14 构建的现代化个人简历网站，集成了丰富的动画效果和响应式设计。

[演示](https://your-demo-link.com) · [文档](https://your-docs-link.com) · [报告问题](https://github.com/your-username/resume-next-v1/issues) · [请求功能](https://github.com/your-username/resume-next-v1/issues)

![项目预览](public/preview.png)

</div>

---

## ✨ 特点亮点

<table>
  <tr>
    <td>
      <h3>🎨 现代化设计</h3>
      <ul>
        <li>亮色/暗色主题切换</li>
        <li>流畅的页面过渡动画</li>
        <li>精心设计的响应式布局</li>
        <li>优雅的交互反馈</li>
      </ul>
    </td>
    <td>
      <h3>💼 内容展示</h3>
      <ul>
        <li>个人信息展示</li>
        <li>专业技能矩阵</li>
        <li>项目经验时间线</li>
        <li>技术博客分享</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🛠 技术特性</h3>
      <ul>
        <li>App Router 路由系统</li>
        <li>服务端组件与流式渲染</li>
        <li>响应式图片优化</li>
        <li>SEO 友好设计</li>
      </ul>
    </td>
    <td>
      <h3>🌍 全球化</h3>
      <ul>
        <li>多语言支持</li>
        <li>自适应时区</li>
        <li>国际化日期格式</li>
        <li>RTL 布局支持</li>
      </ul>
    </td>
  </tr>
</table>

## 🚀 技术栈

<details>
<summary>点击展开查看详细技术栈</summary>

### 核心框架
- **Next.js 14** - React 应用框架
- **React 18** - 用户界面库
- **TypeScript** - 类型系统
- **Tailwind CSS** - 样式解决方案

### UI 组件
- **shadcn/ui** - 核心组件库
- **Lucide Icons** - 图标系统
- **Framer Motion** - 动画效果
- **react-simple-maps** - 地图可视化

### 状态管理
- **React Hooks** - 组件状态
- **Context API** - 全局状态
- **Zustand** - 复杂状态

### 数据持久化
- **Sanity.io** - 内容管理
- **PostgreSQL** - 主数据库
- **Prisma** - ORM
- **Redis** - 缓存层

### 身份认证
- **Clerk** - 用户认证
- **Supabase** - 后端服务

</details>

## 📦 项目结构

<details>
<summary>点击展开查看项目结构</summary>

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

</details>

## 🚀 快速开始

1. 克隆项目

    git clone https://github.com/your-username/resume-next-v1.git
    cd resume-next-v1

2. 安装依赖

    pnpm install

3. 环境变量配置

    cp .env.example .env.local

需要配置的环境变量:

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

4. 启动开发服务器

    pnpm dev

## 🔧 主要功能

### 个人信息展示
- 响应式个人信息卡片
- 技能矩阵展示
- 社交媒体链接
- 个性化主题定制

### 项目展示
- 项目卡片展示
- 项目详情页
- 技术栈标签
- 实时更新标记
- GitHub 仓库链接
- 在线演示链接

### 工作经验
- 交互式时间线展示
- 详细工作描述
- 核心项目经历
- 技术栈展示
- 成就与影响力展示
- 工作职责描述

### 社交互动
- 实时评论系统
- 表情回应功能
- 代码块展示
- 实时通知
- 用户身份验证
- 评论管理功能

### 兴趣爱好
- 交互式世界地图
- 已访问地点标记
- 计划访问地点
- 旅行故事分享
- 照片墙展示
- 动态路线展示

## 📱 响应式设计

### 移动端 (< 768px)
- 优化的导航菜单
- 适配的卡片布局
- 触摸友好的交互
- 性能优化加载

### 平板端 (768px - 1024px)
- 双列内容布局
- 优化的地图交互
- 手势导航支持
- 自适应字体大小

### 桌面端 (> 1024px)
- 多列展示布局
- 悬浮效果增强
- 快捷键支持
- 高分辨率适配

## 🔒 安全特性

### 用户认证
- Clerk 身份验证
- 社交媒体登录
- 双因素认证
- 会话管理

### 数据保护
- CSRF 防护
- XSS 防护
- 数据加密
- 请求限流
- SQL 注入防护
- 敏感信息过滤

## 🌐 部署指南

### Vercel 部署 (推荐)
1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 选择部署区域
5. 启用自动部署

### 自托管部署
1. 准备服务器环境
    - Node.js 18+
    - PostgreSQL
    - Redis (可选)
2. 克隆代码
3. 安装依赖
4. 配置环境变量
5. 构建项目
6. 启动服务

## 💻 开发指南

### 代码规范
- ESLint 配置
- Prettier 格式化
- TypeScript 严格模式
- Git Commit 规范

### 分支管理
- main: 主分支
- develop: 开发分支
- feature/*: 功能分支
- hotfix/*: 紧急修复

### 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档更新
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🤝 贡献指南

### 提交 PR
1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 问题反馈
- 使用 GitHub Issues
- 提供复现步骤
- 附上错误日志
- 说明运行环境

## 📞 联系方式

### 开发者
- 作者：[Your Name]
- Email: your.email@example.com
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin-profile](https://linkedin.com/in/your-profile)

### 社区
- Discord: [加入讨论](https://discord.gg/your-server)
- Twitter: [@your-twitter](https://twitter.com/your-username)

## 🙏 致谢

### 开源项目
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Simple Maps](https://www.react-simple-maps.io/)

### 贡献者
感谢所有为这个项目做出贡献的开发者们！

<a href="https://github.com/your-username/resume-next-v1/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/resume-next-v1" />
</a>

## 📈 项目状态

![GitHub stars](https://img.shields.io/github/stars/your-username/resume-next-v1)
![GitHub forks](https://img.shields.io/github/forks/your-username/resume-next-v1)
![GitHub issues](https://img.shields.io/github/issues/your-username/resume-next-v1)
![GitHub license](https://img.shields.io/github/license/your-username/resume-next-v1)
