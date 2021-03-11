import { GET, PathQuery, View } from '@rester/core';
import { AccessEntity } from './access.entity';

@View('accesses')
export class AccessView {

  @GET()
  async all(
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0,
  ) {
    return AccessEntity
      .find({
        order: { timestamp: 'DESC' },
        take: +take,
        skip: +skip,
      });
  }

}
