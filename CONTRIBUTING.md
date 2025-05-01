# 贡献指南

感谢您对本项目的贡献！请遵循以下规范，确保代码质量和一致性。

## 代码风格

本项目使用 ESLint 和 Prettier 来确保代码风格一致。

- 在提交代码前，请确保您的代码通过了 ESLint 检查和 Prettier 格式化
- 可以使用以下命令来检查和修复代码：

  ```bash
  # 检查代码风格
  pnpm run lint

  # 自动修复 ESLint 问题
  pnpm run lint:fix

  # 使用 Prettier 格式化代码
  pnpm run format

  # 检查代码格式是否正确
  pnpm run format:check

  # 运行所有验证
  pnpm run validate
  ```

## Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范进行代码提交。每个提交消息都应该遵循以下格式：

```
<类型>[可选作用域]: <描述>

[可选正文]

[可选页脚]
```

### 提交类型

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码风格更改（不影响代码运行）
- `refactor`: 重构（既不是新功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖更改
- `ci`: CI 配置文件和脚本修改
- `chore`: 其他不修改源代码或测试文件的更改
- `revert`: 撤销之前的提交

### 提交示例

```
feat(api): 添加用户登录API接口

- 实现登录表单
- 添加表单验证
- 连接后端API

Closes #123
```

## 开发流程

1. Fork 项目并克隆到本地
2. 安装依赖：`pnpm install`
3. 创建新分支：`git checkout -b feature/your-feature-name`
4. 修改代码
5. 提交代码：`git commit -m "feat: 你的修改描述"`
6. 推送到远程：`git push origin feature/your-feature-name`
7. 创建 Pull Request

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

感谢您的贡献！
