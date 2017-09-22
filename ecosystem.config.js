module.exports = {
  apps: [{
    name: 'POE-API',
    script: 'app/index.js',
    watch: 'app',
    error_file: 'logs/app-err.log',
    env_development: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};

