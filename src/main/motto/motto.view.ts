import { DELETE, GET, Inject, PathQuery, PathVariable, POST, PUT, RequestBody, requiredParamsInFields, View } from '@rester/core';
import { MottoController } from './motto.controller';
import { Motto, MottoID, MottoParamInsert } from './motto.model';

// create, remove, modify, take, search
// one, more

@View('mottos')
export class MottoView {

  @Inject()
  private controller!: MottoController;

  @POST()
  async create(
    @RequestBody() motto: MottoParamInsert
  ) {
    requiredParamsInFields(motto, ['author', 'content', 'date']);
    return this.controller.insertOne({
      author: motto.author,
      content: motto.content,
      date: new Date()
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: MottoID) {
    return this.controller.deleteOneByID(+id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: MottoID,
    @RequestBody() motto: Motto
  ) {
    const update: Pick<Motto, 'author' | 'content'> = {
      author: motto.author,
      content: motto.content
    };
    return this.controller.updateOne(+id, update);
  }

  @GET()
  async takeMany(
    @PathQuery('random') random: boolean = false,
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0
  ) {
    if (random) {
      return this.controller.selectManyByRandom(+take);
    }
    return this.controller.selectMany({ skip: +skip, take: +take });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: MottoID
  ) {
    return this.controller.selectOneByID(+id);
  }

}
