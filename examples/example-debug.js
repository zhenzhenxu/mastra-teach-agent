/**
 * 示例 3: 调试帮助
 *
 * 这个示例展示如何获取调试帮助
 */

const { TechMentorSystem } = require('../src/index');

async function exampleDebug() {
  // 初始化系统
  const mentor = new TechMentorSystem();
  await mentor.initialize();

  const userId = 'user-003';

  console.log('\n=== 调试帮助示例 ===\n');

  // 获取调试帮助
  const debugHelp = await mentor.helpDebug(userId, {
    code: `
const [data, setData] = useState([]);

useEffect(() => {
  fetchData();
}, []);

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const result = await response.json();
  setData(result);
}
    `,
    error: 'Warning: useEffect has a missing dependency: fetchData',
    expectedBehavior: '组件加载时获取数据，不应该有警告',
    actualBehavior: 'ESLint 提示缺少依赖，但加上后会无限循环'
  });

  console.log('\n🐛 调试建议:');
  console.log('─'.repeat(80));
  console.log(debugHelp.solution);
  console.log('─'.repeat(80));
}

// 运行示例
exampleDebug().catch(console.error);
