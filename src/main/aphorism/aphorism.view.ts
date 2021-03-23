import { BaseResponse, BaseView, cleanify, DELETE, GET, Inject, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
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
    @RequestBody() { author, content }: AphorismInsertParams,
  ) {
    requiredParams(content);
    return new BaseResponse({
      statusCode: 201,
      data: await this.controller.insertOne({ author, content }),
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: AphorismID) {
    return this.controller.deleteOneByID(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: AphorismID,
    @RequestBody() { author, content }: AphorismUpdateParams,
  ) {
    requiredAtLeastOneParam(author, content);
    return this.controller.updateOne(id, cleanify({ author, content }));
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: AphorismID,
  ) {
    return this.controller.selectOneByID(id);
  }

}
