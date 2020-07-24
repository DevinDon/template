import Axios from 'axios';
import { createWriteStream } from 'fs';
import { JSDOM } from 'jsdom';
import { Stream } from 'stream';

export class BingPictureCrawler {

  static readonly BASE = 'https://cn.bing.com';

  constructor() { }

  async getPictureURL() {
    const html = (await Axios.get(BingPictureCrawler.BASE)).data;
    const document = new JSDOM(html).window.document;
    return BingPictureCrawler.BASE + document.querySelector('#bgImgProgLoad')?.getAttribute('data-ultra-definition-src');
  }

  async getPictureStream(url?: string) {
    url = url ?? await this.getPictureURL();
    const stream = (await Axios.get<Stream>(url, { responseType: 'stream' })).data;
    return stream;
  }

  async savePicture(path: string, picture?: Stream) {
    picture = picture ?? await this.getPictureStream();
    picture.pipe(createWriteStream(path));
  }

}
