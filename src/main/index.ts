import { CORSHandler, Rester } from '@rester/core';
import { AphorismEntity } from './aphorism/aphorism.entity';
import { AphorismView } from './aphorism/aphorism.view';
import { LoggerHandler } from './handlers/logger.handler';

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
