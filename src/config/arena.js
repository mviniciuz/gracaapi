import Arena from 'bull-arena';
import redisConfig from './redis';

export default Arena(
  {
    queues: [
      {
        name: 'WorkMail',
        hostId: 'filas',
        redis: redisConfig,
        type: 'bull',
        prefix: 'bull',
      },
      {
        name: 'ContactMail',
        hostId: 'filas',
        redis: redisConfig,
        type: 'bull',
        prefix: 'bull',
      },
      {
        name: 'LoteMail',
        hostId: 'filas',
        redis: redisConfig,
        type: 'bull',
        prefix: 'bull',
      },
      {
        name: 'sendMail',
        hostId: 'filas',
        redis: redisConfig,
        type: 'bull',
        prefix: 'bull',
      },
    ],
  },
  {
    basePath: '/arena',
  }
);
