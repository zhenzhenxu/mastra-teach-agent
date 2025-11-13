const fs = require('fs').promises;
const path = require('path');

/**
 * 学习记录存储系统
 * 用于跟踪用户的学习历史、进度和对话记录
 */
class LearningMemory {
  constructor(dataPath = './src/data') {
    this.dataPath = dataPath;
    this.userDataFile = path.join(dataPath, 'user-data.json');
    this.conversationsFile = path.join(dataPath, 'conversations.json');
    this.learningPathsFile = path.join(dataPath, 'learning-paths.json');
  }

  /**
   * 初始化存储系统
   */
  async initialize() {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });

      // 初始化数据文件
      await this.ensureFileExists(this.userDataFile, {
        users: {},
        createdAt: new Date().toISOString()
      });

      await this.ensureFileExists(this.conversationsFile, {
        conversations: [],
        createdAt: new Date().toISOString()
      });

      await this.ensureFileExists(this.learningPathsFile, {
        paths: [],
        createdAt: new Date().toISOString()
      });

      console.log('✅ Memory system initialized');
    } catch (error) {
      console.error('Failed to initialize memory system:', error);
      throw error;
    }
  }

  /**
   * 确保文件存在，如果不存在则创建
   */
  async ensureFileExists(filePath, defaultContent) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2));
    }
  }

  /**
   * 读取 JSON 文件
   */
  async readJSON(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Failed to read ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 写入 JSON 文件
   */
  async writeJSON(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Failed to write ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * 保存用户信息
   */
  async saveUser(userId, userData) {
    const data = await this.readJSON(this.userDataFile);
    if (!data.users[userId]) {
      data.users[userId] = {
        id: userId,
        createdAt: new Date().toISOString(),
        ...userData
      };
    } else {
      data.users[userId] = {
        ...data.users[userId],
        ...userData,
        updatedAt: new Date().toISOString()
      };
    }
    await this.writeJSON(this.userDataFile, data);
    return data.users[userId];
  }

  /**
   * 获取用户信息
   */
  async getUser(userId) {
    const data = await this.readJSON(this.userDataFile);
    return data.users[userId] || null;
  }

  /**
   * 保存对话记录
   */
  async saveConversation(userId, conversation) {
    const data = await this.readJSON(this.conversationsFile);
    const conversationRecord = {
      id: Date.now().toString(),
      userId,
      timestamp: new Date().toISOString(),
      ...conversation
    };
    data.conversations.push(conversationRecord);
    await this.writeJSON(this.conversationsFile, data);
    return conversationRecord;
  }

  /**
   * 获取用户的对话历史
   */
  async getConversations(userId, limit = 10) {
    const data = await this.readJSON(this.conversationsFile);
    const userConversations = data.conversations
      .filter(conv => conv.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
    return userConversations;
  }

  /**
   * 保存学习路径
   */
  async saveLearningPath(userId, learningPath) {
    const data = await this.readJSON(this.learningPathsFile);
    const pathRecord = {
      id: Date.now().toString(),
      userId,
      createdAt: new Date().toISOString(),
      ...learningPath
    };
    data.paths.push(pathRecord);
    await this.writeJSON(this.learningPathsFile, data);
    return pathRecord;
  }

  /**
   * 获取用户的学习路径
   */
  async getLearningPaths(userId) {
    const data = await this.readJSON(this.learningPathsFile);
    const userPaths = data.paths
      .filter(path => path.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return userPaths;
  }

  /**
   * 更新学习进度
   */
  async updateProgress(userId, progressData) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.saveUser(userId, {
      progress: {
        ...(user.progress || {}),
        ...progressData,
        lastUpdated: new Date().toISOString()
      }
    });

    return updatedUser.progress;
  }

  /**
   * 获取学习统计
   */
  async getStatistics(userId) {
    const user = await this.getUser(userId);
    const conversations = await this.getConversations(userId, 1000);
    const learningPaths = await this.getLearningPaths(userId);

    return {
      totalConversations: conversations.length,
      totalLearningPaths: learningPaths.length,
      currentProgress: user?.progress || {},
      joinedAt: user?.createdAt,
      lastActive: conversations[0]?.timestamp || user?.createdAt
    };
  }

  /**
   * 清除用户数据
   */
  async clearUserData(userId) {
    // 清除用户信息
    const userData = await this.readJSON(this.userDataFile);
    delete userData.users[userId];
    await this.writeJSON(this.userDataFile, userData);

    // 清除对话记录
    const convData = await this.readJSON(this.conversationsFile);
    convData.conversations = convData.conversations.filter(
      conv => conv.userId !== userId
    );
    await this.writeJSON(this.conversationsFile, convData);

    // 清除学习路径
    const pathData = await this.readJSON(this.learningPathsFile);
    pathData.paths = pathData.paths.filter(
      path => path.userId !== userId
    );
    await this.writeJSON(this.learningPathsFile, pathData);

    console.log(`✅ Cleared all data for user: ${userId}`);
  }
}

module.exports = { LearningMemory };
