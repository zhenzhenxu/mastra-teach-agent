require('dotenv').config();
const { openai } = require('@ai-sdk/openai');
const { LearningPathAgent } = require('./agents/learning-path-agent');
const { TechQAAgent } = require('./agents/tech-qa-agent');
const { LearningMemory } = require('./memory/learning-memory');

/**
 * 技术学习导师系统
 * 整合学习路径规划和技术问答功能
 */
class TechMentorSystem {
  constructor() {
    // 初始化 LLM
    this.llm = openai('gpt-4o-mini', {
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 初始化 Agents
    this.learningPathAgent = new LearningPathAgent(this.llm);
    this.techQAAgent = new TechQAAgent(this.llm);

    // 初始化 Memory
    this.memory = new LearningMemory(process.env.DATA_PATH || './src/data');
  }

  /**
   * 初始化系统
   */
  async initialize() {
    await this.memory.initialize();
    console.log('🚀 Tech Mentor System initialized successfully!');
  }

  /**
   * 创建学习路径
   */
  async createLearningPath(userId, params) {
    try {
      console.log(`\n📚 Generating learning path for ${params.technology}...`);

      const result = await this.learningPathAgent.generateLearningPath(params);

      // 保存到 Memory
      await this.memory.saveLearningPath(userId, result);
      await this.memory.saveConversation(userId, {
        type: 'learning_path_generation',
        input: params,
        output: result
      });

      console.log('✅ Learning path generated successfully!');
      return result;
    } catch (error) {
      console.error('❌ Failed to generate learning path:', error);
      throw error;
    }
  }

  /**
   * 更新学习路径
   */
  async updateLearningPath(userId, params) {
    try {
      console.log('\n🔄 Updating learning path...');

      const result = await this.learningPathAgent.updateLearningPath(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'learning_path_update',
        input: params,
        output: result
      });

      console.log('✅ Learning path updated successfully!');
      return result;
    } catch (error) {
      console.error('❌ Failed to update learning path:', error);
      throw error;
    }
  }

  /**
   * 获取下一步学习建议
   */
  async getNextStep(userId, params) {
    try {
      console.log('\n👉 Suggesting next step...');

      const result = await this.learningPathAgent.suggestNextStep(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'next_step_suggestion',
        input: params,
        output: result
      });

      console.log('✅ Next step suggested!');
      return result;
    } catch (error) {
      console.error('❌ Failed to suggest next step:', error);
      throw error;
    }
  }

  /**
   * 技术问答
   */
  async askQuestion(userId, params) {
    try {
      console.log(`\n❓ Answering question: "${params.question}"`);

      const result = await this.techQAAgent.answerQuestion(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'question_answer',
        input: params,
        output: result
      });

      console.log('✅ Question answered!');
      return result;
    } catch (error) {
      console.error('❌ Failed to answer question:', error);
      throw error;
    }
  }

  /**
   * 解释代码
   */
  async explainCode(userId, params) {
    try {
      console.log('\n💡 Explaining code...');

      const result = await this.techQAAgent.explainCode(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'code_explanation',
        input: params,
        output: result
      });

      console.log('✅ Code explained!');
      return result;
    } catch (error) {
      console.error('❌ Failed to explain code:', error);
      throw error;
    }
  }

  /**
   * 代码审查
   */
  async reviewCode(userId, params) {
    try {
      console.log('\n🔍 Reviewing code...');

      const result = await this.techQAAgent.reviewCode(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'code_review',
        input: params,
        output: result
      });

      console.log('✅ Code reviewed!');
      return result;
    } catch (error) {
      console.error('❌ Failed to review code:', error);
      throw error;
    }
  }

  /**
   * 调试帮助
   */
  async helpDebug(userId, params) {
    try {
      console.log('\n🐛 Helping debug...');

      const result = await this.techQAAgent.helpDebug(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'debug_help',
        input: params,
        output: result
      });

      console.log('✅ Debug help provided!');
      return result;
    } catch (error) {
      console.error('❌ Failed to help debug:', error);
      throw error;
    }
  }

  /**
   * 概念对比
   */
  async compareConcepts(userId, params) {
    try {
      console.log(`\n⚖️  Comparing: ${params.concept1} vs ${params.concept2}...`);

      const result = await this.techQAAgent.compareConcepts(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'concept_comparison',
        input: params,
        output: result
      });

      console.log('✅ Concepts compared!');
      return result;
    } catch (error) {
      console.error('❌ Failed to compare concepts:', error);
      throw error;
    }
  }

  /**
   * 推荐学习资源
   */
  async recommendResources(userId, params) {
    try {
      console.log(`\n📖 Recommending resources for: ${params.topic}...`);

      const result = await this.techQAAgent.recommendResources(params);

      // 保存到 Memory
      await this.memory.saveConversation(userId, {
        type: 'resource_recommendation',
        input: params,
        output: result
      });

      console.log('✅ Resources recommended!');
      return result;
    } catch (error) {
      console.error('❌ Failed to recommend resources:', error);
      throw error;
    }
  }

  /**
   * 获取学习统计
   */
  async getStatistics(userId) {
    try {
      return await this.memory.getStatistics(userId);
    } catch (error) {
      console.error('❌ Failed to get statistics:', error);
      throw error;
    }
  }

  /**
   * 获取学习历史
   */
  async getLearningHistory(userId) {
    try {
      const paths = await this.memory.getLearningPaths(userId);
      const conversations = await this.memory.getConversations(userId, 20);

      return {
        learningPaths: paths,
        recentConversations: conversations
      };
    } catch (error) {
      console.error('❌ Failed to get learning history:', error);
      throw error;
    }
  }
}

module.exports = { TechMentorSystem };
