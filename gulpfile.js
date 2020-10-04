const gulp = require('gulp');
const { logger } = require('@iinfinity/logger');
const { execSync } = require('child_process');

const read = gulp.src;
const save = gulp.dest;

const task = process.argv[2];
const arch = process.argv[3];
const name = require('./package.json').name;
const registry = 'registry.don.red';

logger.log(
  '\x1B[36m%s\x1B[0m',
  `
  -------------------------------
  command: ${task}, arch: ${arch || 'amd64'}
  -------------------------------
  `
);

function catchError(err) {
  const noSuchArch = err.toString().search('File not found') > -1;
  if (noSuchArch) {
    logger.error(
      '\x1B[31m%s\x1B[39m',
      `
  -------------------------------------------------
  No matching arch: ${arch}, docker file not found.
  -------------------------------------------------
      `
    );
  } else {
    logger.error(err);
  }
  throw `
  -------------------------
  No matching arch: ${arch}
  -------------------------
  `;
}

/** Clean all dist folder. */
function clean() {
  // read(
  //   [
  //     'client/dist',
  //     'server/dist',
  //     'dist'
  //   ],
  //   { allowEmpty: true }
  // )
  //   .pipe(gulpClean());
  execSync('npm run clean');
}

/** Build and pack application. */
function pack(arch) {
  execSync('npm run pack');
  execSync(`docker build -t ${registry}/${name} .`);
  execSync(`docker push ${registry}/${name}`);
}

switch (task.toLowerCase()) {
  case 'clean': clean(); break;
  case 'pack': pack(arch); break;
  default: logger.error('Task: clean or pack.'); break;
}
