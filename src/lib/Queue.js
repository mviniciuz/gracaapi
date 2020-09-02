import Bee from 'bee-queue';

import CancellationMail from '../app/jobs/bee/CancellationMail';
import WorkMail from '../app/jobs/bee/WorkMail';
import ContactMail from '../app/jobs/bee/ContactMail';
import LoteMail from '../app/jobs/bee/LoteMail';
import SendMail from '../app/jobs/bee/SendMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail, WorkMail, ContactMail, LoteMail, SendMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
          storeJobs: true,
          activateDelayedJobs: true,
          delayedDebounce: 30000,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  async handleFailure(job, err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
  }
}

export default new Queue();
