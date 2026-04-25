module.exports = {
  apps: [
    {
      name: "miss-semi-fashion",
      script: "/home/z/my-project/pm2-wrapper.sh",
      interpreter: "bash",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
  ],
};
