/**
 * CLI 功能演示
 * 展示技术学习导师系统的完整使用流程
 */

const { TechMentorSystem } = require('./src/index');

async function demo() {
  console.log('\n🎬 演示agent功能 \n');
  console.log('='.repeat(80));

  // 初始化系统
  const mentor = new TechMentorSystem();
  await mentor.initialize();

  const userId = 'demo-user';

  // 演示 1: 问答模式
  console.log('\n\n📍 场景 1: 问答模式 - 提问技术问题\n');
  console.log('💬 用户> useState 和 useRef 有什么区别？\n');
  console.log('⏳ AI 思考中...\n');

  const answer1 = await mentor.askQuestion(userId, {
    question: 'useState 和 useRef 有什么区别？',
    userLevel: 'intermediate'
  });

  console.log('🤖 AI 导师>');
  console.log('─'.repeat(80));
  console.log(answer1.answer.substring(0, 600) + '...\n');
  console.log('─'.repeat(80));

  // 演示 2: 代码解释
  console.log('\n\n📍 场景 2: 代码解释\n');
  console.log('💬 用户> 请解释这段代码：\n');
  console.log('```javascript');
  console.log('const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);');
  console.log('```\n');
  console.log('⏳ AI 思考中...\n');

  const explanation = await mentor.explainCode(userId, {
    code: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
    language: 'javascript'
  });

  console.log('🤖 AI 导师>');
  console.log('─'.repeat(80));
  console.log(explanation.explanation.substring(0, 600) + '...\n');
  console.log('─'.repeat(80));

  // 演示 3: 概念对比
  console.log('\n\n📍 场景 3: 概念对比\n');
  console.log('💬 用户> 对比 Promise 和 async/await\n');
  console.log('⏳ AI 思考中...\n');

  const comparison = await mentor.compareConcepts(userId, {
    concept1: 'Promise',
    concept2: 'async/await',
    context: 'JavaScript 异步编程'
  });

  console.log('🤖 AI 导师>');
  console.log('─'.repeat(80));
  console.log(comparison.comparison.substring(0, 600) + '...\n');
  console.log('─'.repeat(80));

  // 演示 4: 切换到学习路径模式
  console.log('\n\n📍 场景 4: 学习路径模式\n');
  console.log('💬 用户> /mode path');
  console.log('✅ 已切换到学习路径模式\n');
  console.log('💬 用户> TypeScript\n');
  console.log('⏳ AI 正在生成学习路径...\n');

  const learningPath = await mentor.createLearningPath(userId, {
    technology: 'TypeScript',
    currentLevel: 'intermediate',
    goal: '掌握 TypeScript 高级特性',
    timeCommitment: '每天 1 小时'
  });

  console.log('🤖 AI 导师>');
  console.log('─'.repeat(80));
  console.log(learningPath.learningPath.substring(0, 600) + '...\n');
  console.log('─'.repeat(80));

  // 演示 5: 查看统计
  console.log('\n\n📍 场景 5: 查看学习统计\n');
  console.log('💬 用户> /stats\n');

  const stats = await mentor.getStatistics(userId);

  console.log('🤖 AI 导师>');
  console.log('─'.repeat(80));
  console.log('📊 学习统计：');
  console.log(`  - 总对话数: ${stats.totalConversations}`);
  console.log(`  - 学习路径数: ${stats.totalLearningPaths}`);
  console.log(`  - 最后活跃: ${new Date(stats.lastActive).toLocaleString('zh-CN')}`);
  console.log('─'.repeat(80));

  // 总结
  console.log('\n\n' + '='.repeat(80));
  console.log('🎉 演示完成！');
  console.log('='.repeat(80));
  console.log('\n💡 提示：');
  console.log('  - 在你的终端中运行 `npm start` 可以进入真实的交互模式');
  console.log('  - 所有对话都已保存，可以随时查看历史记录');
  console.log('  - 支持多轮对话，AI 会记住上下文\n');
}

// 运行演示
demo().catch(error => {
  console.error('\n❌ 演示出错:', error.message);
});
