import Arena from 'bull-arena';
import redisConfig from './redis';

export default Arena({
  queues: [
    {
      name: "WorkMail",
      hostId: "filas",
      redis: redisConfig,
      type: "bee",
      prefix: "bq",
    },
    {
      name: "ContactMail",
      hostId: "filas",
      redis: redisConfig,
      type: "bee",
      prefix: "bq",
    }
  ]
},
  {
    basePath: "/arena",

  });
