import { BaseView, DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, requiredParams, View } from '@rester/core';
import { AphorismController } from './aphorism.controller';
import { AphorismID, AphorismInsertParams, AphorismUpdateParams } from './aphorism.model';

// create, remove, modify, take, search
// one, more

@View('aphorism')
export class AphorismView extends BaseView {

  @Inject()
  private controller!: AphorismController;

  @POST()
  async create(
    @RequestBody() { author, content, timestamp = new Date() }: AphorismInsertParams,
  ) {
    requiredParams(author, content, timestamp);
    return this.controller.insertOne({ author, content, timestamp });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: AphorismID) {
    return this.controller.deleteOneByID(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: AphorismID,
    @RequestBody() { author, content, timestamp }: AphorismUpdateParams,
  ) {
    return this.controller.updateOne(id, { author, content, timestamp });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: AphorismID,
  ) {
    return this.controller.selectOneByID(id);
  }

}
