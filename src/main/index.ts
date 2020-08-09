import { CORSHandler, Rester } from '@rester/core';
import { MottoEntity } from './motto/motto.entity';
import { MottoView } from './motto/motto.view';

const rester = new Rester()
  .configViews
  .add(MottoView)
  .end()
  .configHandlers
  .add(CORSHandler)
  .end();

if (process.env.MODE === 'PROD') {
  rester.configDatabase.setEntities([MottoEntity]).end();
}

rester.listen();
