const { Agent } = require('@mastra/core');
const { z } = require('zod');

/**
 * 学习路径规划 Agent
 * 根据用户的技能水平和学习目标，生成个性化的学习路线图
 */
class LearningPathAgent {
  constructor(llm) {
    this.agent = new Agent({
      name: 'learning-path-planner',
      instructions: `你是一位专业的技术学习导师，擅长为学习者规划个性化的学习路径。

你的职责：
1. 评估学习者的当前技能水平
2. 了解他们的学习目标和时间安排
3. 制定循序渐进的学习计划
4. 将大目标拆解成可执行的小任务
5. 推荐优质的学习资源

生成学习路径时，请遵循以下原则：
- 从基础到进阶，循序渐进
- 理论与实践相结合
- 每个阶段都有明确的目标和检验标准
- 推荐具体的学习资源（文档、教程、项目）
- 估算每个阶段所需时间
- 提供实战项目建议

请用结构化的方式输出学习路径，包含：
- 学习阶段（初级/中级/高级）
- 每个阶段的知识点
- 推荐资源
- 实战项目
- 预计学习时间
- 检验标准`,
      model: llm,
    });
  }

  /**
   * 生成学习路径
   * @param {Object} params
   * @param {string} params.technology - 要学习的技术栈
   * @param {string} params.currentLevel - 当前水平 (beginner/intermediate/advanced)
   * @param {string} params.goal - 学习目标
   * @param {string} params.timeCommitment - 可投入时间
   * @returns {Promise<Object>} 学习路径
   */
  async generateLearningPath({ technology, currentLevel, goal, timeCommitment }) {
    const prompt = `请为以下学习需求生成详细的学习路径：

技术栈: ${technology}
当前水平: ${currentLevel}
学习目标: ${goal}
可投入时间: ${timeCommitment}

请生成一个完整的、结构化的学习路径，包含：
1. 学习路线图概览
2. 分阶段的详细学习计划
3. 每个阶段的知识点清单
4. 推荐的学习资源（文档、教程、视频）
5. 实战项目建议
6. 每个阶段的检验标准

请确保计划切实可行，符合学习者的时间安排。`;

    const response = await this.agent.generate(prompt);

    return {
      technology,
      currentLevel,
      goal,
      learningPath: response.text,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 更新学习路径
   * @param {Object} params
   * @param {string} params.currentPath - 当前学习路径
   * @param {string} params.feedback - 用户反馈
   * @param {string} params.progress - 学习进度
   * @returns {Promise<Object>} 更新后的学习路径
   */
  async updateLearningPath({ currentPath, feedback, progress }) {
    const prompt = `基于以下信息，请调整和优化学习路径：

当前学习路径:
${currentPath}

学习进度: ${progress}
用户反馈: ${feedback}

请根据实际学习情况，调整学习计划，使其更符合学习者的实际需求。`;

    const response = await this.agent.generate(prompt);

    return {
      updatedPath: response.text,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * 推荐下一步学习内容
   * @param {Object} params
   * @param {string} params.completedTopics - 已完成的主题
   * @param {string} params.learningPath - 学习路径
   * @returns {Promise<Object>} 下一步建议
   */
  async suggestNextStep({ completedTopics, learningPath }) {
    const prompt = `基于学习者的进度，推荐下一步应该学习什么：

学习路径:
${learningPath}

已完成主题:
${completedTopics}

请推荐：
1. 下一个应该学习的主题
2. 为什么要学这个
3. 具体的学习资源
4. 预计学习时间
5. 实践建议`;

    const response = await this.agent.generate(prompt);

    return {
      nextStep: response.text,
      suggestedAt: new Date().toISOString()
    };
  }
}

module.exports = { LearningPathAgent };
