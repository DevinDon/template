import { BaseView, GET, getPagination, Handler, Inject, Pagination, PathQuery, View } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AccessHandler } from '../common/handlers';
import { AphorismController } from './aphorism.controller';
import { AphorismEntity } from './aphorism.entity';

// create, remove, modify, take, search
// one, more

@View('aphorisms')
@Handler(AccessHandler)
export class AphorismsView extends BaseView {

  @Inject()
  private controller!: AphorismController;

  private repo!: MongoRepository<AphorismEntity>;

  async init() {
    this.repo = getMongoRepository(AphorismEntity);
  }

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? { list: await this.controller.selectManyByRandom(take) }
      : getPagination(this.repo, { from, take });
  }

}
