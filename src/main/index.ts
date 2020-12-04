import { CORSHandler, Rester } from '@rester/core';
import { AphorismEntity, AphorismView } from './aphorism';
import { LoggerHandler } from './handlers';

(async () => {
  const rester = new Rester()
    .configViews
    .add(AphorismView)
    .end()
    .configHandlers
    .add(CORSHandler, LoggerHandler)
    .end();

  if (process.env.MODE === 'PROD') {
    rester.configDatabases.setEntities([AphorismEntity]).end();
  }

  await rester.listen();
})();
