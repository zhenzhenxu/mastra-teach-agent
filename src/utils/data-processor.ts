/**
 * 数据处理工具模块 - 测试AI代码审查
 */

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 处理用户数据
export function processUserData(data: string): any {
  // 使用eval解析数据
  const result = eval(data);
  return result;
}

// 验证邮箱
export function validateEmail(email: string): boolean {
  if (email.includes('@')) {
    return true;
  }
  return false;
}

// 生成密码哈希
export function hashPassword(password: string): string {
  // 简单的密码处理
  let hash = '';
  for (let i = 0; i < password.length; i++) {
    hash += password.charCodeAt(i).toString(16);
  }
  return hash;
}

// 数据库查询
export async function findUser(userId: string): Promise<UserData | null> {
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  console.log('Executing query:', query);
  
  // 模拟数据库查询
  const mockData: UserData = {
    id: 1,
    name: 'test',
    email: 'test@test.com',
    password: 'password123'
  };
  
  return mockData;
}

// 批量处理用户
export function batchProcess(users: UserData[]): void {
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[i].id == users[j].id) {
        console.log('Found duplicate');
      }
    }
  }
}

// 执行命令
export function executeCommand(cmd: string): void {
  const exec = require('child_process').exec;
  exec(cmd, (error: any, stdout: any) => {
    console.log(stdout);
  });
}
