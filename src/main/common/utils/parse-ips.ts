import { IncomingMessage } from 'http';

export const parseIPs = (input: string[] | string | undefined): string[] => {

  if (typeof input === 'undefined') {
    return [];
  }

  if (Array.isArray(input)) {
    return input;
  }

  return input.split(',')
    .map(ip => ip.replace(' ', ''));

};

export const parseIPsFromRequest = (request: IncomingMessage) => {
  return parseIPs(
    request.headers['x-real-ip'] as string
    || request.headers['x-forwarded-for'] as string
    || request.socket.remoteAddress,
  );
};
