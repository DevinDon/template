import { description } from '../../package.json';
import { BingPictureCrawler } from '../main/index';

async function main() {
  console.log(description);

  const crawler = new BingPictureCrawler();

  const url = await crawler.getPictureURL();
  console.log(`Picture link is: ${url}`);

  await crawler.savePicture('dist/background.jfif');
  console.log(`Picture saved at ${new Date()}`);

}

main();
