import { DELETE, GET, Inject, PathQuery, PathVariable, POST, PUT, RequestBody, requiredParamsInFields, View } from '@rester/core';
import { AphorismController } from './aphorism.controller';
import { Aphorism, AphorismID, AphorismParamInsert } from './aphorism.model';

// create, remove, modify, take, search
// one, more

@View('aphorisms')
export class AphorismView {

  @Inject()
  private controller!: AphorismController;

  @POST()
  async create(
    @RequestBody() aphorism: AphorismParamInsert,
  ) {
    requiredParamsInFields(aphorism, ['author', 'content']);
    return this.controller.insertOne({
      author: aphorism.author,
      content: aphorism.content,
      date: new Date(),
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: AphorismID) {
    return this.controller.deleteOneByID(+id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: AphorismID,
    @RequestBody() aphorism: Aphorism,
  ) {
    const update: Pick<Aphorism, 'author' | 'content'> = {
      author: aphorism.author,
      content: aphorism.content,
    };
    return this.controller.updateOne(+id, update);
  }

  @GET()
  async takeMany(
    @PathQuery('random') random: boolean = false,
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0,
  ) {
    if (random) {
      return this.controller.selectManyByRandom(+take);
    }
    return this.controller.selectMany({ skip: +skip, take: +take });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: AphorismID,
  ) {
    return this.controller.selectOneByID(+id);
  }

}
