# 🎓 Tech Mentor Agent - 技术学习导师

基于 Mastra 框架开发的智能技术学习导师系统，提供个性化学习路径规划和全天候技术问答服务。

## ✨ 核心功能

### 1. 智能学习路径规划 📚

- ✅ 根据技能水平定制学习计划（初级/中级/高级）
- ✅ 支持多种技术栈（React, Node.js, Python 等）
- ✅ 自动生成阶段性学习目标
- ✅ 智能推荐学习资源
- ✅ 提供实战项目建议
- ✅ 跟踪学习进度

### 2. 互动式技术问答 💬

- ✅ 24/7 技术问题解答
- ✅ 深度解释"为什么"而不只是"怎么做"
- ✅ 提供实际代码示例
- ✅ 代码解释和审查
- ✅ 调试帮助
- ✅ 概念对比分析
- ✅ 学习资源推荐

### 3. 学习记录系统 📊

- ✅ 自动保存学习历史
- ✅ 跟踪对话记录
- ✅ 统计学习数据
- ✅ 持久化学习路径

### 4. Web 图形界面 🌐 **NEW!**

- ✅ 现代化的 Web 界面
- ✅ 响应式设计，支持移动端
- ✅ 实时交互体验
- ✅ 美观的渐变设计
- ✅ 支持所有核心功能

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入你的 API Key：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
OPENAI_API_KEY=your_openai_api_key_here
DATA_PATH=./src/data
```

### 3. 启动应用

#### 🌐 方式 1: Web 界面（推荐）

```bash
npm run web
```

然后在浏览器中打开 `http://localhost:3000`

#### 💻 方式 2: 命令行 CLI

```bash
npm start
```

#### 🚀 方式 3: 快速体验

```bash
npm run quickstart
```

#### 📋 方式 4: 运行示例

```bash
# 学习路径规划示例
npm run example:learning-path

# 技术问答示例
npm run example:qa

# 调试帮助示例
npm run example:debug
```

## 📖 使用指南

### 基础使用

```javascript
const { TechMentorSystem } = require('./src/index');

// 初始化系统
const mentor = new TechMentorSystem();
await mentor.initialize();

const userId = 'your-user-id';
```

### 生成学习路径

```javascript
const learningPath = await mentor.createLearningPath(userId, {
  technology: 'React',
  currentLevel: 'beginner',
  goal: '能够独立开发完整的 React 应用',
  timeCommitment: '每天 2 小时，计划 3 个月'
});

console.log(learningPath.learningPath);
```

### 技术问答

```javascript
const answer = await mentor.askQuestion(userId, {
  question: 'React 中 useEffect 和 useLayoutEffect 有什么区别？',
  userLevel: 'intermediate',
  context: '我在开发一个需要测量 DOM 元素的组件'
});

console.log(answer.answer);
```

### 代码解释

```javascript
const explanation = await mentor.explainCode(userId, {
  code: `
const [count, setCount] = useState(0);
useEffect(() => {
  // ... your code
}, []);
  `,
  language: 'javascript',
  specificQuestion: '为什么 useEffect 的依赖数组是空的？'
});

console.log(explanation.explanation);
```

### 代码审查

```javascript
const review = await mentor.reviewCode(userId, {
  code: '// your code here',
  language: 'javascript',
  context: '这是一个用户登录组件'
});

console.log(review.review);
```

### 调试帮助

```javascript
const debugHelp = await mentor.helpDebug(userId, {
  code: '// problematic code',
  error: 'Error message',
  expectedBehavior: '期望的行为',
  actualBehavior: '实际的行为'
});

console.log(debugHelp.solution);
```

### 概念对比

```javascript
const comparison = await mentor.compareConcepts(userId, {
  concept1: 'useState',
  concept2: 'useReducer',
  context: 'React Hooks 状态管理'
});

console.log(comparison.comparison);
```

### 获取下一步学习建议

```javascript
const nextStep = await mentor.getNextStep(userId, {
  completedTopics: '已完成的主题列表',
  learningPath: '当前的学习路径'
});

console.log(nextStep.nextStep);
```

### 资源推荐

```javascript
const resources = await mentor.recommendResources(userId, {
  topic: 'React Hooks 最佳实践',
  userLevel: 'intermediate',
  resourceType: 'all'
});

console.log(resources.resources);
```

### 查看学习统计

```javascript
const stats = await mentor.getStatistics(userId);
console.log(stats);
// {
//   totalConversations: 15,
//   totalLearningPaths: 2,
//   currentProgress: {...},
//   joinedAt: "2024-01-01T00:00:00.000Z",
//   lastActive: "2024-01-10T12:00:00.000Z"
// }
```

### 查看学习历史

```javascript
const history = await mentor.getLearningHistory(userId);
console.log(history.learningPaths);
console.log(history.recentConversations);
```

## 🏗️ 项目结构

```
tech-mentor-agent/
├── src/
│   ├── agents/
│   │   ├── learning-path-agent.js    # 学习路径规划 Agent
│   │   └── tech-qa-agent.js          # 技术问答 Agent
│   ├── memory/
│   │   └── learning-memory.js        # 学习记录系统
│   ├── data/                         # 数据存储目录
│   │   ├── user-data.json
│   │   ├── conversations.json
│   │   └── learning-paths.json
│   └── index.js                      # 主入口
├── examples/
│   ├── example-learning-path.js      # 学习路径示例
│   ├── example-qa.js                 # 技术问答示例
│   └── example-debug.js              # 调试帮助示例
├── .env.example                      # 环境变量模板
├── .gitignore
├── package.json
└── README.md
```

## 🎯 使用场景

### 场景 1: 新手学习编程

作为编程新手，想系统学习 React：

1. 使用学习路径规划功能生成个性化学习计划
2. 跟随计划学习，遇到问题随时提问
3. 完成每个阶段后获取下一步建议
4. 通过实战项目巩固知识

### 场景 2: 进阶开发者

已有一定基础，想深入某个技术点：

1. 直接提问具体技术问题
2. 对比不同技术方案
3. 获取最佳实践建议
4. 代码审查和优化建议

### 场景 3: 调试问题

遇到技术问题需要帮助：

1. 描述问题和期望行为
2. 提供相关代码
3. 获取详细的调试建议
4. 学习避免类似问题的方法

## 🔧 技术栈

- **Mastra**: Agent 框架
- **OpenAI GPT-4**: 大语言模型
- **Node.js**: 运行环境
- **JSON**: 数据存储

## 📝 API 文档

### TechMentorSystem 类

#### 初始化

```javascript
const mentor = new TechMentorSystem();
await mentor.initialize();
```

#### 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `createLearningPath` | userId, params | Promise&lt;Object&gt; | 创建学习路径 |
| `updateLearningPath` | userId, params | Promise&lt;Object&gt; | 更新学习路径 |
| `getNextStep` | userId, params | Promise&lt;Object&gt; | 获取下一步建议 |
| `askQuestion` | userId, params | Promise&lt;Object&gt; | 技术问答 |
| `explainCode` | userId, params | Promise&lt;Object&gt; | 解释代码 |
| `reviewCode` | userId, params | Promise&lt;Object&gt; | 代码审查 |
| `helpDebug` | userId, params | Promise&lt;Object&gt; | 调试帮助 |
| `compareConcepts` | userId, params | Promise&lt;Object&gt; | 概念对比 |
| `recommendResources` | userId, params | Promise&lt;Object&gt; | 推荐资源 |
| `getStatistics` | userId | Promise&lt;Object&gt; | 获取统计 |
| `getLearningHistory` | userId | Promise&lt;Object&gt; | 获取历史 |

## 🎨 扩展功能

你可以轻松扩展这个系统：

1. **添加新的 Agent**: 在 `src/agents/` 目录创建新的 Agent
2. **自定义提示词**: 修改 Agent 的 `instructions`
3. **集成其他 LLM**: 修改 LLM 配置
4. **添加新的数据源**: 扩展 Memory 系统
5. **构建 Web 界面**: 基于现有 API 构建前端

## 💡 最佳实践

1. **设置清晰的学习目标**: 在生成学习路径时，提供明确的目标和时间安排
2. **循序渐进**: 按照建议的学习路径一步步来，不要跳跃
3. **多提问**: 遇到不理解的地方及时提问
4. **动手实践**: 跟着代码示例实际操作
5. **定期回顾**: 查看学习统计，了解自己的进度
6. **记录笔记**: 系统会保存对话历史，可以随时回顾

## 🚀 部署到生产环境

### 快速部署选项

#### 🌐 Cloudflare Pages（推荐，免费）

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 部署
npx wrangler pages deploy web/public --project-name=tech-mentor-agent
```

**优势**：
- ✅ 免费额度充足
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 零配置部署

#### ⚡ Vercel（简单快速）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 部署
vercel
```

#### 🐳 Docker（自托管）

```bash
# 构建并运行
docker-compose up -d
```

### 📖 详细部署指南

查看 **[DEPLOY.md](./DEPLOY.md)** 获取完整的部署文档，包括：

- Cloudflare Pages + Workers 部署
- Vercel 部署
- 传统服务器部署（PM2, Docker, Nginx）
- 环境变量配置
- 自定义域名设置
- 安全最佳实践
- 常见问题解答

### ⚙️ 环境变量配置

部署时需要设置以下环境变量：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | ✅ 是 |
| `DATA_PATH` | 数据存储路径 | ❌ 否（默认：./src/data） |
| `PORT` | 服务器端口 | ❌ 否（默认：3000） |

### 🔒 部署前检查清单

- [ ] 已设置 `OPENAI_API_KEY` 环境变量
- [ ] 已测试所有 API 功能
- [ ] 已准备好域名（可选）
- [ ] 已阅读 [DEPLOY.md](./DEPLOY.md) 部署指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC

## 🙏 致谢

- [Mastra](https://mastra.ai/) - 强大的 Agent 框架
- [OpenAI](https://openai.com/) - GPT 模型支持

---

**开始你的学习之旅吧！** 🚀

如果你有任何问题或建议，欢迎提 Issue 或联系我们。
