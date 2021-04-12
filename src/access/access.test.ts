import { AddressConfig } from '@rester/core';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import YAML from 'yaml';

describe('Access view', () => {

  const { protocol, host, port }: AddressConfig = YAML.parse(readFileSync('rester.local.yaml').toString()).addresses[0];
  const urlAccesses = `${protocol}://${host}:${port}/accesses`;

  it('should return 401 without token', async () => {
    const response = await fetch(urlAccesses);
    expect(response.status).toEqual(401);
  });

  it('should return 403 with invalid token', async () => {
    const response = await fetch(urlAccesses, { headers: { authorization: 'invalidtoken' } });
    expect(response.status).toEqual(401);
  });

  it('should return 200 with valid token', async () => {
    const response = await fetch(urlAccesses, { headers: { authorization: 'Bearer admin' } });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['list']).toBeDefined();
    expect(result['list'] instanceof Array).toBeTruthy();
  });

});
