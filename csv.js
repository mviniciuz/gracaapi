import 'dotenv/config';

import './src/database';

import Contacts from './src/app/schemas/Contact';

const csvtojson = require('csvtojson');

csvtojson()
  .fromFile('./contatos.csv')
  .then((csvData) => {
    csvData.forEach((item) => {
      console.log(item);
      Contacts.create(item);
    });
  });
