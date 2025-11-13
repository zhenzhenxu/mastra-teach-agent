/**
 * PM2 配置文件
 * 用于生产环境部署
 */

module.exports = {
  apps: [{
    name: 'tech-mentor-agent',
    script: './web/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    // 优雅重启
    kill_timeout: 5000,
    listen_timeout: 10000,
    // 定时重启（可选）
    // cron_restart: '0 0 * * *'
  }]
};
