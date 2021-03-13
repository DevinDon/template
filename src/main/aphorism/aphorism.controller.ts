import { BaseController, Controller } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AphorismEntity } from './aphorism.entity';
import { AphorismID, AphorismParamInsert, AphorismParamUpdate } from './aphorism.model';

// insert, delete, update, select
// one, more

@Controller()
export class AphorismController extends BaseController {

  private document!: MongoRepository<AphorismEntity>;

  async init() {
    this.document = getMongoRepository(AphorismEntity);
  }

  async insertOne(aphorism: AphorismParamInsert) {
    const key = await this.document
      .insert({ id: Date.now(), ...aphorism })
      .then(result => result.identifiers[0]);
    return this.document.findOne(key);
  }

  async deleteOneByID(id: AphorismID) {
    await this.document.delete({ id });
    return [id];
  }

  async updateOne(id: AphorismID, aphorism: AphorismParamUpdate) {
    await this.document.update(id, aphorism);
    return this.document.findOne({ id });
  }

  async selectOneByID(id: AphorismID) {
    return this.document.findOne({ id });
  }

  async selectManyByRandom(length: number) {
    return this.document
      .aggregateEntity([{ $sample: { size: length } }])
      .toArray();
  }

}
