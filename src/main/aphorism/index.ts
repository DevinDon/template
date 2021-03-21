import { ResterModule } from '@rester/core';
import { AphorismController } from './aphorism.controller';
import { AphorismEntity } from './aphorism.entity';
import { AphorismView } from './aphorism.view';
import { AphorismsView } from './aphorisms.view';

export const AphorismModule: ResterModule = {
  entities: [AphorismEntity],
  controllers: [AphorismController],
  views: [AphorismView, AphorismsView],
};
