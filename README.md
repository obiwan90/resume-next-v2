# Modern Portfolio Website

一个使用现代技术栈构建的个人作品集网站，具有响应式设计和流畅的动画效果。

## 🚀 特性

- 🎨 现代化的 UI 设计
- 📱 完全响应式布局
- 🌓 明暗主题切换
- ⚡ 流畅的页面过渡动画
- 🗺️ 交互式旅行地图
- 📊 技能展示
- 💼 项目展示
- 📝 经验时间线

## 🛠️ 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **UI 组件**: shadcn/ui
- **动画**: Framer Motion
- **地图**: React Simple Maps
- **图标**: Lucide Icons
- **类型检查**: TypeScript
- **代码格式化**: Prettier
- **状态管理**: React Hooks

## 📦 项目结构
resume-next-v1/
├── app/ # Next.js 应用路由
├── components/ # React 组件
│ ├── layout/ # 布局组件
│ ├── ui/ # UI 组件
│ └── ... # 其他组件
├── lib/ # 工具函数
├── public/ # 静态资源
├── styles/ # 全局样式
└── types/ # TypeScript 类型定义

## 🚀 快速开始

1. 克隆项目
bash
git clone [your-repo-url]
cd resume-next-v1


2. 安装依赖
bash
npm install


3. 启动开发服务器
bash
npm run dev


4. 打开浏览器访问 `http://localhost:3000`

## 📝 主要功能

### 导航栏
- 响应式设计
- 移动端抽屉菜单
- 主题切换
- 平滑过渡动画

### 首页
- 个人简介
- 技能展示
- 最近项目
- 社交链接

### 经验页面
- 工作经历时间线
- 项目详情
- 技术栈标签
- 成就展示

### 项目页面
- 项目展示卡片
- 项目详情弹窗
- 技术栈标签
- 源码和演示链接

### 爱好页面
- 交互式世界地图
- 已访问/计划访问地点标记
- 游戏体验展示
- 动态切换效果

## 🎨 自定义主题

项目使用 Tailwind CSS 进行样式设置，主题颜色可在 `globals.css` 中配置：
css
:root {
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--primary: 0 0% 9%;
/ ... 其他颜色变量 /
}


## 📱 响应式设计

- 移动端优先设计
- 断点：
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Simple Maps](https://www.react-simple-maps.io/)