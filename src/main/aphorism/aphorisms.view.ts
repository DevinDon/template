import { DELETE, GET, Inject, PathQuery, PathVariable, POST, PUT, RequestBody, requiredParamsInFields, View } from '@rester/core';
import { AphorismController } from './aphorism.controller';
import { Aphorism, AphorismID, AphorismParamInsert } from './aphorism.model';

// create, remove, modify, take, search
// one, more

@View('aphorisms')
export class AphorismsView {

  @Inject()
  private controller!: AphorismController;

  @GET()
  async take(
    @PathQuery('random') random: boolean = false,
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0,
  ) {
    if (random) {
      return this.controller.selectManyByRandom(+take);
    }
    return this.controller.selectMany({ skip: +skip, take: +take });
  }

}
