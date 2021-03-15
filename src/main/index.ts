// #!/usr/bin/env node
import { logger } from '@iinfinity/logger';
import { Command } from 'commander';
import { cd, pwd, rm } from 'shelljs';
import Git from 'simple-git';
import { CONFIG } from './config';

export const program = new Command();

// describe this project
program
  .version(CONFIG.VERSION)
  .description('使用模板轻松创建项目。');

// command: create
program
  .command('create <template> <name>')
  .alias('c')
  .description('根据模板 <template> 创建名为 <name> 的应用。')
  .option('-m, --mirror')
  .action(async (template: string, name: string, { mirror }: { mirror: boolean }) => {
    if (mirror) {
      logger.info(`正在通过镜像下载模板 ${template} ...`);
      await Git().clone(CONFIG.MIRROR, name);
    } else {
      logger.info(`正在下载模板 ${template} ...`);
      await Git().clone(CONFIG.GITBASE, name);
    }
    logger.info(`正在创建项目 ${name} ...`);
    cd(name);
    const git = Git(pwd());
    await git.checkout(template);
    rm('-rf', '.git');
    await git.init();
    await git.add('.');
    await git.commit(`init: init project ${name} with template ${template}`);
    logger.info(`项目 ${name} 创建完成`);
  });

// tips of no such command, parse argv
program
  .on('command:*', () => {
    logger.error('不可用的命令，请使用 -h 参阅帮助。');
  })
  .parse(process.argv);
