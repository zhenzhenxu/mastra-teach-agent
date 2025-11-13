const { Agent } = require('@mastra/core');

/**
 * 技术问答 Agent
 * 24/7 回答技术问题，提供详细解释和代码示例
 */
class TechQAAgent {
  constructor(llm) {
    this.agent = new Agent({
      name: 'tech-qa-assistant',
      instructions: `你是一位经验丰富的技术导师，擅长解答各种编程和技术问题。

你的回答风格：
1. 不只给出答案，更要解释"为什么"
2. 提供清晰的代码示例
3. 指出常见陷阱和最佳实践
4. 推荐深入学习的资源
5. 用通俗易懂的语言解释复杂概念

回答问题时，请遵循以下结构：
1. 简短回答（一句话总结）
2. 详细解释（为什么是这样）
3. 代码示例（如果适用）
4. 使用场景（什么时候用）
5. 常见陷阱（需要注意什么）
6. 最佳实践（推荐做法）
7. 延伸阅读（深入学习资源）

注意事项：
- 根据提问者的水平调整回答深度
- 如果问题不清晰，先澄清需求
- 提供多个解决方案时，说明各自的优缺点
- 代码示例要有注释，便于理解
- 鼓励提问者动手实践`,
      model: llm,
    });
  }

  /**
   * 回答技术问题
   * @param {Object} params
   * @param {string} params.question - 用户的问题
   * @param {string} params.context - 上下文信息（可选）
   * @param {string} params.userLevel - 用户水平（可选）
   * @returns {Promise<Object>} 回答
   */
  async answerQuestion({ question, context = '', userLevel = 'intermediate' }) {
    let prompt = `用户提问: ${question}\n\n`;

    if (context) {
      prompt += `上下文信息: ${context}\n\n`;
    }

    prompt += `用户水平: ${userLevel}\n\n`;
    prompt += `请提供详细的回答，包括解释、代码示例和最佳实践。`;

    const response = await this.agent.generate(prompt);

    return {
      question,
      answer: response.text,
      answeredAt: new Date().toISOString()
    };
  }

  /**
   * 解释代码
   * @param {Object} params
   * @param {string} params.code - 需要解释的代码
   * @param {string} params.language - 编程语言
   * @param {string} params.specificQuestion - 具体问题（可选）
   * @returns {Promise<Object>} 代码解释
   */
  async explainCode({ code, language, specificQuestion = '' }) {
    const prompt = `请解释以下 ${language} 代码：

\`\`\`${language}
${code}
\`\`\`

${specificQuestion ? `具体问题: ${specificQuestion}\n` : ''}

请提供：
1. 代码整体功能说明
2. 逐行/逐块详细解释
3. 关键概念说明
4. 潜在的问题或改进建议
5. 相关知识点`;

    const response = await this.agent.generate(prompt);

    return {
      code,
      language,
      explanation: response.text,
      explainedAt: new Date().toISOString()
    };
  }

  /**
   * 代码审查和改进建议
   * @param {Object} params
   * @param {string} params.code - 需要审查的代码
   * @param {string} params.language - 编程语言
   * @param {string} params.context - 代码上下文
   * @returns {Promise<Object>} 审查结果
   */
  async reviewCode({ code, language, context = '' }) {
    const prompt = `请审查以下 ${language} 代码并提供改进建议：

${context ? `代码用途: ${context}\n` : ''}

\`\`\`${language}
${code}
\`\`\`

请从以下角度进行审查：
1. 代码质量（可读性、可维护性）
2. 性能问题
3. 安全隐患
4. 最佳实践
5. 错误处理
6. 代码风格

如果有改进建议，请提供优化后的代码示例。`;

    const response = await this.agent.generate(prompt);

    return {
      originalCode: code,
      review: response.text,
      reviewedAt: new Date().toISOString()
    };
  }

  /**
   * 调试帮助
   * @param {Object} params
   * @param {string} params.code - 出问题的代码
   * @param {string} params.error - 错误信息
   * @param {string} params.expectedBehavior - 期望的行为
   * @param {string} params.actualBehavior - 实际的行为
   * @returns {Promise<Object>} 调试建议
   */
  async helpDebug({ code, error, expectedBehavior, actualBehavior }) {
    const prompt = `帮助调试以下问题：

代码:
\`\`\`
${code}
\`\`\`

错误信息:
${error}

期望行为: ${expectedBehavior}
实际行为: ${actualBehavior}

请提供：
1. 问题原因分析
2. 解决方案
3. 修复后的代码
4. 如何避免类似问题
5. 相关调试技巧`;

    const response = await this.agent.generate(prompt);

    return {
      problem: { code, error, expectedBehavior, actualBehavior },
      solution: response.text,
      solvedAt: new Date().toISOString()
    };
  }

  /**
   * 概念对比
   * @param {Object} params
   * @param {string} params.concept1 - 概念1
   * @param {string} params.concept2 - 概念2
   * @param {string} params.context - 上下文（可选）
   * @returns {Promise<Object>} 对比结果
   */
  async compareConcepts({ concept1, concept2, context = '' }) {
    const prompt = `请详细对比以下两个概念的区别：

概念1: ${concept1}
概念2: ${concept2}
${context ? `\n上下文: ${context}` : ''}

请从以下方面对比：
1. 定义和核心区别
2. 使用场景
3. 优缺点
4. 代码示例
5. 性能差异（如果适用）
6. 何时选择哪一个
7. 实际项目中的应用`;

    const response = await this.agent.generate(prompt);

    return {
      concepts: [concept1, concept2],
      comparison: response.text,
      comparedAt: new Date().toISOString()
    };
  }

  /**
   * 推荐学习资源
   * @param {Object} params
   * @param {string} params.topic - 主题
   * @param {string} params.userLevel - 用户水平
   * @param {string} params.resourceType - 资源类型偏好（可选）
   * @returns {Promise<Object>} 资源推荐
   */
  async recommendResources({ topic, userLevel, resourceType = 'all' }) {
    const prompt = `请为 "${topic}" 推荐优质的学习资源：

用户水平: ${userLevel}
资源类型偏好: ${resourceType}

请推荐：
1. 官方文档
2. 优质教程（文章/视频）
3. 经典书籍
4. 开源项目
5. 实战项目
6. 社区和论坛

每个资源请说明：
- 资源名称和链接（如果有）
- 适合的学习阶段
- 主要内容
- 推荐理由`;

    const response = await this.agent.generate(prompt);

    return {
      topic,
      userLevel,
      resources: response.text,
      recommendedAt: new Date().toISOString()
    };
  }
}

module.exports = { TechQAAgent };
