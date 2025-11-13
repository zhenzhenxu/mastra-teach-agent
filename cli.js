#!/usr/bin/env node

/**
 * 交互式 CLI - 技术学习导师
 *
 * 提供命令行界面与学习导师交互
 */

const readline = require('readline');
const { TechMentorSystem } = require('./src/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\n💬 你> '
});

let mentor;
let userId = 'cli-user';
let currentMode = 'qa'; // qa, learning-path

async function initialize() {
  console.log('\n🎓 欢迎使用技术学习导师系统！');
  console.log('⏳ 正在初始化...\n');

  mentor = new TechMentorSystem();
  await mentor.initialize();

  console.log('\n✅ 系统已就绪！');
  showHelp();
  rl.prompt();
}

function showHelp() {
  console.log('\n' + '='.repeat(80));
  console.log('📖 可用命令：');
  console.log('='.repeat(80));
  console.log('  /help             - 显示帮助信息');
  console.log('  /mode qa          - 切换到问答模式（默认）');
  console.log('  /mode path        - 切换到学习路径模式');
  console.log('  /stats            - 查看学习统计');
  console.log('  /history          - 查看学习历史');
  console.log('  /clear            - 清除屏幕');
  console.log('  /exit 或 /quit    - 退出系统');
  console.log('='.repeat(80));
  console.log('\n💡 提示：');
  console.log('  - 在问答模式下，直接输入你的技术问题');
  console.log('  - 在学习路径模式下，按提示输入学习需求');
  console.log('  - 所有对话都会自动保存');
  console.log('='.repeat(80));
}

async function handleQAMode(input) {
  console.log('\n⏳ 正在思考...\n');

  try {
    const answer = await mentor.askQuestion(userId, {
      question: input,
      userLevel: 'intermediate'
    });

    console.log('\n💡 回答：');
    console.log('─'.repeat(80));
    console.log(answer.answer);
    console.log('─'.repeat(80));
  } catch (error) {
    console.error('\n❌ 出错了:', error.message);
  }
}

async function handleLearningPathMode(input) {
  console.log('\n📚 学习路径规划模式\n');

  try {
    // 简化版：直接根据输入生成学习路径
    console.log('⏳ 正在生成学习路径...\n');

    const result = await mentor.createLearningPath(userId, {
      technology: input,
      currentLevel: 'beginner',
      goal: `掌握 ${input} 开发`,
      timeCommitment: '每天 1-2 小时'
    });

    console.log('\n📋 学习路径：');
    console.log('─'.repeat(80));
    console.log(result.learningPath);
    console.log('─'.repeat(80));

    console.log('\n💡 提示：输入 /mode qa 切换回问答模式');
  } catch (error) {
    console.error('\n❌ 出错了:', error.message);
  }
}

async function handleCommand(input) {
  const trimmed = input.trim();

  // 命令处理
  if (trimmed.startsWith('/')) {
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case '/help':
        showHelp();
        break;

      case '/mode':
        if (parts[1] === 'qa') {
          currentMode = 'qa';
          console.log('\n✅ 已切换到问答模式');
        } else if (parts[1] === 'path') {
          currentMode = 'learning-path';
          console.log('\n✅ 已切换到学习路径模式');
          console.log('💡 请输入你想学习的技术栈（如：React, Python, Node.js）');
        } else {
          console.log('\n❌ 无效的模式。使用 /mode qa 或 /mode path');
        }
        break;

      case '/stats':
        console.log('\n⏳ 正在获取统计...\n');
        try {
          const stats = await mentor.getStatistics(userId);
          console.log('📊 学习统计：');
          console.log('─'.repeat(80));
          console.log(JSON.stringify(stats, null, 2));
          console.log('─'.repeat(80));
        } catch (error) {
          console.error('\n❌ 出错了:', error.message);
        }
        break;

      case '/history':
        console.log('\n⏳ 正在获取历史...\n');
        try {
          const history = await mentor.getLearningHistory(userId);
          console.log('📜 学习历史：');
          console.log('─'.repeat(80));
          console.log('学习路径数量:', history.learningPaths.length);
          console.log('最近对话数量:', history.recentConversations.length);
          console.log('─'.repeat(80));
        } catch (error) {
          console.error('\n❌ 出错了:', error.message);
        }
        break;

      case '/clear':
        console.clear();
        console.log('🎓 技术学习导师系统');
        break;

      case '/exit':
      case '/quit':
        console.log('\n👋 再见！祝学习愉快！\n');
        process.exit(0);
        break;

      default:
        console.log('\n❌ 未知命令。输入 /help 查看帮助。');
    }

    rl.prompt();
    return;
  }

  // 正常输入处理
  if (!trimmed) {
    rl.prompt();
    return;
  }

  if (currentMode === 'qa') {
    await handleQAMode(trimmed);
  } else if (currentMode === 'learning-path') {
    await handleLearningPathMode(trimmed);
  }

  rl.prompt();
}

// 启动
initialize().then(() => {
  rl.on('line', async (input) => {
    await handleCommand(input);
  });

  rl.on('close', () => {
    console.log('\n👋 再见！祝学习愉快！\n');
    process.exit(0);
  });
}).catch(error => {
  console.error('\n❌ 初始化失败:', error.message);
  console.log('\n💡 请检查：');
  console.log('1. 是否已经配置 .env 文件？');
  console.log('2. OPENAI_API_KEY 是否正确？');
  console.log('3. 网络连接是否正常？\n');
  process.exit(1);
});
