# 诊所医生管理系统

基于Nuxt 3的诊所医生管理系统，包含用户管理、患者管理和预约服务功能。

## 技术栈

- **前端框架**: [Nuxt 3](https://nuxt.com/)
- **UI框架**: [Element Plus](https://element-plus.org/) & [Shadcn UI](https://ui.shadcn.com/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **CSS工具**: [Tailwind CSS](https://tailwindcss.com/)
- **代码规范**: ESLint + Prettier
- **版本控制**: Git + Husky + Commitlint

## 开发环境设置

确保安装依赖：

```bash
# pnpm (推荐)
pnpm install
```

## 开发服务器

启动开发服务器：

```bash
# 开发模式
pnpm dev
```

## 代码规范

本项目使用 ESLint 和 Prettier 进行代码规范化，使用 Husky 和 Commitlint 强制实施 Git 提交规则。

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

## Git 提交规范

本项目使用[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范，使用 Commitlint 进行检查。

提交示例：

```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复导航菜单不显示问题"
git commit -m "docs: 更新README文档"
```

## 项目结构

```
├── api/                # API 服务层
│   ├── models/         # 数据模型定义
│   └── services/       # API 服务实现
├── assets/             # 静态资源文件
├── components/         # Vue 组件
├── layouts/            # 页面布局
├── middleware/         # Nuxt 中间件
├── pages/              # 页面文件
├── plugins/            # 插件
├── public/             # 公共文件
├── stores/             # Pinia 状态管理
├── utils/              # 工具函数
```

## 功能模块

- **用户管理**: 医生、护士账户管理
- **患者管理**: 患者信息管理
- **预约管理**: 预约创建、修改和取消

## 更多信息

查看[贡献指南](./CONTRIBUTING.md)获取更多信息。
