import { CORSHandler, Rester } from '@rester/core';
import { AphorismEntity, AphorismView } from './aphorism';
import { LoggerHandler } from './common/handlers';

(async () => {
  const rester = new Rester()
    .configViews
    .add(AphorismView)
    .end()
    .configHandlers
    .add(CORSHandler)
    .end();

  if (process.env.MODE === 'PROD') {
    rester.configDatabases.setEntities([AphorismEntity]).end();
  } else {
    rester.configHandlers.add(LoggerHandler).end();
  }

  await rester.listen();
})();
