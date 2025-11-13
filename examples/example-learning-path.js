/**
 * 示例 1: 生成学习路径
 *
 * 这个示例展示如何为想学习 React 的初学者生成个性化学习路径
 */

const { TechMentorSystem } = require('../src/index');

async function exampleLearningPath() {
  // 初始化系统
  const mentor = new TechMentorSystem();
  await mentor.initialize();

  const userId = 'user-001';

  console.log('\n=== 示例 1: 生成 React 学习路径 ===\n');

  // 生成学习路径
  const learningPath = await mentor.createLearningPath(userId, {
    technology: 'React',
    currentLevel: 'beginner',
    goal: '能够独立开发完整的 React 应用',
    timeCommitment: '每天 2 小时，计划 3 个月'
  });

  console.log('\n📋 学习路径预览:');
  console.log('─'.repeat(80));
  console.log(learningPath.learningPath);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 2: 获取下一步学习建议 ===\n');

  // 假设用户已经完成了一些主题
  const nextStep = await mentor.getNextStep(userId, {
    completedTopics: `
    - JSX 基础语法
    - React 组件
    - Props 传递
    - State 管理基础
    `,
    learningPath: learningPath.learningPath
  });

  console.log('\n👉 下一步学习建议:');
  console.log('─'.repeat(80));
  console.log(nextStep.nextStep);
  console.log('─'.repeat(80));

  console.log('\n\n=== 示例 3: 查看学习统计 ===\n');

  const stats = await mentor.getStatistics(userId);
  console.log('📊 学习统计:');
  console.log(JSON.stringify(stats, null, 2));
}

// 运行示例
exampleLearningPath().catch(console.error);
