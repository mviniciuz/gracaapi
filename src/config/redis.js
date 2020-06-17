export default {
  host: process.env.REDIS_URL || 'LOCALHOST',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASS,
};
