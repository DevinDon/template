import { CORSHandler, ExceptionHandler, LoggerHandler, ParameterHandler, Rester, RouterHandler, SchemaHandler } from '@rester/core';
import { AccessEntity } from './access';
import { AphorismEntity } from './aphorism';
import { AccessHandler } from './common/handlers';

const rester = new Rester();

rester.addEntities(AccessEntity, AphorismEntity);
rester.addHandlers(
  AccessHandler,
  ExceptionHandler,
  SchemaHandler,
  RouterHandler,
  ParameterHandler,
  LoggerHandler,
  CORSHandler,
);

rester.bootstrap();
