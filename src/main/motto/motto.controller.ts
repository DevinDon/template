import { Controller } from '@rester/core';
import { getMongoRepository as repo } from 'typeorm';
import { MottoEntity as Entity } from './motto.entity';
import { Motto } from './motto.model';

// insert, delete, update, select
// one, more

@Controller()
export class MottoController {

  async insertOne(motto: Pick<Motto, 'author' | 'content' | 'date'>) {
    const id = await repo(Entity)
      .insert(motto)
      .then(result => result.identifiers[0]);
    return repo(Entity).findOne(id);
  }

  async deleteOneByID(id: Motto['id']) {
    await repo(Entity).delete(id);
    return [id];
  }

  async updateOne(id: Motto['id'], motto: Pick<Motto, 'author' | 'content'>) {
    await repo(Entity).update(id, motto);
    return repo(Entity).findOne(id);
  }

  async updateOneWithLikeByID(id: Motto['id']) {
    await repo(Entity).updateOne(
      { id },
      { $inc: { like: 1 } }
    );
    return repo(Entity).findOne({ id }, { select: ['like'] });
  }

  async selectOneByRandom() {
    return repo(Entity).findOne({
      where: {
        $sample: { size: 1 }
      }
    });
  }

  async selectOneByID(id: Motto['id']) {
    return repo(Entity).findOne(id);
  }

  async selectMoreByRandom(length: number) {
    return repo(Entity).find({
      where: {
        $sample: { size: length }
      }
    });
  }

}
