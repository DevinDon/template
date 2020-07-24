import { Stream } from 'stream';
import { BingPictureCrawler } from '../main';

describe('Hello, world!', () => {

  let crawler: BingPictureCrawler;

  beforeAll(done => {
    crawler = new BingPictureCrawler();
    done();
  });

  it('should get picture url', async done => {
    expect((await crawler.getPictureURL()).length).toBeGreaterThan(BingPictureCrawler.BASE.length);
    done();
  });

  it('should get picture stream', async done => {
    expect(await crawler.getPictureStream()).toBeInstanceOf(Stream);
    done();
  });

});
