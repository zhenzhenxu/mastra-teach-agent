/**
 * Web 服务器 - 技术学习导师
 * 提供简单的 Web 界面访问学习导师功能
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { TechMentorSystem } = require('../src/index');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 初始化学习导师系统
let mentor;
const initMentor = async () => {
  mentor = new TechMentorSystem();
  await mentor.initialize();
  console.log('✅ Tech Mentor System initialized');
};

// API 路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tech Mentor API is running' });
});

// 提问
app.post('/api/ask', async (req, res) => {
  try {
    const { question, userId = 'web-user', userLevel = 'intermediate', context = '' } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const result = await mentor.askQuestion(userId, {
      question,
      userLevel,
      context
    });

    res.json(result);
  } catch (error) {
    console.error('Error in /api/ask:', error);
    res.status(500).json({ error: error.message });
  }
});

// 生成学习路径
app.post('/api/learning-path', async (req, res) => {
  try {
    const {
      technology,
      currentLevel = 'beginner',
      goal = '',
      timeCommitment = '每天 1-2 小时',
      userId = 'web-user'
    } = req.body;

    if (!technology) {
      return res.status(400).json({ error: 'Technology is required' });
    }

    const result = await mentor.createLearningPath(userId, {
      technology,
      currentLevel,
      goal: goal || `学习 ${technology}`,
      timeCommitment
    });

    res.json(result);
  } catch (error) {
    console.error('Error in /api/learning-path:', error);
    res.status(500).json({ error: error.message });
  }
});

// 代码解释
app.post('/api/explain-code', async (req, res) => {
  try {
    const { code, language = 'javascript', specificQuestion = '', userId = 'web-user' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = await mentor.explainCode(userId, {
      code,
      language,
      specificQuestion
    });

    res.json(result);
  } catch (error) {
    console.error('Error in /api/explain-code:', error);
    res.status(500).json({ error: error.message });
  }
});

// 代码审查
app.post('/api/review-code', async (req, res) => {
  try {
    const { code, language = 'javascript', context = '', userId = 'web-user' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = await mentor.reviewCode(userId, {
      code,
      language,
      context
    });

    res.json(result);
  } catch (error) {
    console.error('Error in /api/review-code:', error);
    res.status(500).json({ error: error.message });
  }
});

// 概念对比
app.post('/api/compare', async (req, res) => {
  try {
    const { concept1, concept2, context = '', userId = 'web-user' } = req.body;

    if (!concept1 || !concept2) {
      return res.status(400).json({ error: 'Both concepts are required' });
    }

    const result = await mentor.compareConcepts(userId, {
      concept1,
      concept2,
      context
    });

    res.json(result);
  } catch (error) {
    console.error('Error in /api/compare:', error);
    res.status(500).json({ error: error.message });
  }
});

// 获取统计
app.get('/api/stats', async (req, res) => {
  try {
    const userId = req.query.userId || 'web-user';
    const stats = await mentor.getStatistics(userId);
    res.json(stats);
  } catch (error) {
    console.error('Error in /api/stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// 获取历史
app.get('/api/history', async (req, res) => {
  try {
    const userId = req.query.userId || 'web-user';
    const history = await mentor.getLearningHistory(userId);
    res.json(history);
  } catch (error) {
    console.error('Error in /api/history:', error);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
initMentor().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Tech Mentor Web Server is running!`);
    console.log(`📍 访问: http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`\n💡 按 Ctrl+C 停止服务器\n`);
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
