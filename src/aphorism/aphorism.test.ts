import { loadResterConfig } from '@rester/core';
import fetch from 'node-fetch';
import { AphorismInsertParams } from './aphorism.model';

describe('Aphorisms View Test', () => {

  const { addresses: [{ protocol, host, port }] } = loadResterConfig();
  const url = `${protocol}://${host}:${port}/aphorism`;
  const variables = {
    existID: '',
    notExistID: '000000000000000000000001',
  };

  it('should return 404 with not exist aphorism id', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`);
    expect(response.status).toEqual(404);
  });

  it('should return 201 when aphorism created', async () => {
    const aphorism: AphorismInsertParams = { content: 'Hello, world!' };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(aphorism),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(201);
    const result = await response.json();
    expect(result['_id']).toBeDefined();
    variables.existID = result['_id'];
  });

  it('should return 200 with exist id', async () => {
    const response = await fetch(`${url}/${variables.existID}`);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['_id']).toBeDefined();
    expect(result['_id']).toEqual(variables.existID);
  });

});
