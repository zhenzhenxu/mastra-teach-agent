/**
 * 示例 2: 技术问答
 *
 * 这个示例展示如何使用技术问答功能
 */

const { TechMentorSystem } = require('../src/index');

async function exampleQA() {
  // 初始化系统
  const mentor = new TechMentorSystem();
  await mentor.initialize();

  const userId = 'user-002';

  console.log('\n=== 示例 1: 技术问题解答 ===\n');

  // 提问
  const answer = await mentor.askQuestion(userId, {
    question: 'React 中 useEffect 和 useLayoutEffect 有什么区别？',
    userLevel: 'intermediate',
    context: '我在开发一个需要测量 DOM 元素的组件'
  });

  console.log('\n💡 回答:');
  console.log('─'.repeat(80));
  console.log(answer.answer);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 2: 代码解释 ===\n');

  // 解释代码
  const explanation = await mentor.explainCode(userId, {
    code: `
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);
    `,
    language: 'javascript',
    specificQuestion: '为什么 setCount 要用函数形式？'
  });

  console.log('\n📖 代码解释:');
  console.log('─'.repeat(80));
  console.log(explanation.explanation);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 3: 概念对比 ===\n');

  // 对比概念
  const comparison = await mentor.compareConcepts(userId, {
    concept1: 'useState',
    concept2: 'useReducer',
    context: 'React Hooks 状态管理'
  });

  console.log('\n⚖️  概念对比:');
  console.log('─'.repeat(80));
  console.log(comparison.comparison);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 4: 代码审查 ===\n');

  // 代码审查
  const review = await mentor.reviewCode(userId, {
    code: `
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div>{user.name}</div>
      ))}
    </div>
  );
}
    `,
    language: 'javascript',
    context: '获取用户列表并显示'
  });

  console.log('\n🔍 代码审查:');
  console.log('─'.repeat(80));
  console.log(review.review);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 5: 资源推荐 ===\n');

  // 推荐资源
  const resources = await mentor.recommendResources(userId, {
    topic: 'React Hooks 最佳实践',
    userLevel: 'intermediate',
    resourceType: 'all'
  });

  console.log('\n📚 学习资源推荐:');
  console.log('─'.repeat(80));
  console.log(resources.resources);
  console.log('─'.repeat(80));
}

// 运行示例
exampleQA().catch(console.error);
