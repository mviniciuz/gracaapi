import https from 'https';
import fs from 'fs';
import app from './app';

https
  .createServer(
    {
      key: fs.readFileSync('./src/ssl/server.key'),
      cert: fs.readFileSync('./src/ssl/certifcado.crt'),
      passphrase: '@graca2014',
    },
    app
  )
  .listen(3333);
