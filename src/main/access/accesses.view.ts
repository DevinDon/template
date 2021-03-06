import { GET, PathQuery, View } from '@rester/core';
import { getRepository } from '@rester/core/dist/declares/typeorm';
import { AccessEntity } from './access.entity';

@View('accesses')
export class AccessView {

  @GET()
  async all(
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0,
  ) {
    return getRepository(AccessEntity, 'local')
      .find({
        order: { id: 'DESC' },
        take: +take,
        skip: +skip,
      });
  }

}
