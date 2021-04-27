/* eslint-disable no-console */
import { hello, asyncHello } from './index';

console.log(hello('TypeScript'));

asyncHello('Promise')
  .then(console.log);
