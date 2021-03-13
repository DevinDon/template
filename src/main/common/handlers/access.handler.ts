import { BaseHandler } from '@rester/core';
import { AccessEntity } from '../../access';
import { parseIPsFromRequest } from '../utils';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();

    const ips = parseIPsFromRequest(this.request);

    AccessEntity
      .insert({
        method: this.request.method?.toUpperCase(),
        url: this.mapping?.path ?? this.request.url,
        params: JSON.stringify(this.mapping?.queryObject),
        timestamp: new Date(),
        ips,
        headers: this.request.headers,
        version: this.request.httpVersion,
        response: {
          statusCode: this.response.statusCode,
          statusMessage: this.response.statusMessage,
          length: result ? result.length : 0,
        },
      })
      .catch(error => this.rester.logger.warn(`Record log failed: ${error}`));

    return result;
  }

}
