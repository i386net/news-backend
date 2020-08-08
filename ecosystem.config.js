module.exports = {
  apps: [{
    name: 'NewsAPI',
    script: '-r dotenv/config app.js',
    env: {
      NODE_ENV: 'production',
      JWT_SECRET: 'Ejfkgj*jflsa3wjbbb',
    },
  }],
};
