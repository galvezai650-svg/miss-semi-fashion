module.exports = {
  apps: [
    {
      name: 'miss-semi-fashion',
      script: '.next/standalone/server.js',
      cwd: '/home/z/my-project',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/z/my-project/logs/error.log',
      out_file: '/home/z/my-project/logs/out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
