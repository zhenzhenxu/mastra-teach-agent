/**
 * 快速入门示例
 *
 * 这个文件演示了最基础的使用方式，让你快速体验技术学习导师系统
 */

const { TechMentorSystem } = require('./src/index');

async function quickstart() {
  console.log('\n🎓 欢迎使用技术学习导师系统！\n');

  // 1. 初始化系统
  console.log('⏳ 正在初始化系统...');
  const mentor = new TechMentorSystem();
  await mentor.initialize();

  const userId = 'demo-user';

  // 2. 演示：生成学习路径
  console.log('\n' + '='.repeat(80));
  console.log('📚 演示 1: 为你生成一个 React 学习路径');
  console.log('='.repeat(80));

  const learningPath = await mentor.createLearningPath(userId, {
    technology: 'React',
    currentLevel: 'beginner',
    goal: '能够独立开发 React 应用',
    timeCommitment: '每天 1-2 小时'
  });

  console.log('\n✅ 学习路径已生成！');
  console.log('\n' + learningPath.learningPath.substring(0, 500) + '...\n');

  // 3. 演示：技术问答
  console.log('\n' + '='.repeat(80));
  console.log('💬 演示 2: 技术问答');
  console.log('='.repeat(80));

  const answer = await mentor.askQuestion(userId, {
    question: 'React 的虚拟 DOM 是什么？为什么要用它？',
    userLevel: 'beginner'
  });

  console.log('\n✅ 问题已回答！');
  console.log('\n' + answer.answer.substring(0, 500) + '...\n');

  // 4. 演示：代码解释
  console.log('\n' + '='.repeat(80));
  console.log('💡 演示 3: 代码解释');
  console.log('='.repeat(80));

  const explanation = await mentor.explainCode(userId, {
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
    `,
    language: 'javascript'
  });

  console.log('\n✅ 代码已解释！');
  console.log('\n' + explanation.explanation.substring(0, 500) + '...\n');

  // 5. 查看统计
  console.log('\n' + '='.repeat(80));
  console.log('📊 你的学习统计');
  console.log('='.repeat(80));

  const stats = await mentor.getStatistics(userId);
  console.log(JSON.stringify(stats, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('🎉 快速体验完成！');
  console.log('='.repeat(80));
  console.log('\n📖 查看 README.md 了解更多功能');
  console.log('📂 查看 examples/ 目录查看详细示例');
  console.log('💡 提示：所有对话都已保存在 src/data/ 目录\n');
}

// 运行快速入门
quickstart().catch(error => {
  console.error('\n❌ 出错了:', error.message);
  console.log('\n💡 请检查：');
  console.log('1. 是否已经配置 .env 文件？');
  console.log('2. OPENAI_API_KEY 是否正确？');
  console.log('3. 网络连接是否正常？\n');
});
