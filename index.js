#!/usr/bin/env node

const fs = require('fs-extra')
const { exec } = require('child_process');
const chalk = require('chalk');
const log = console.log;

const truffleBuildTemplate = {
  contract_name: null,
  abi: null,
  unlinked_binary: null,
  networks: {},
  schema_version: '0.0.5',
  updated_at: null
};

const truffleBuildDir = `${ process.cwd() }/build/contracts`;
const startAt = new Date();

if (!process.argv[2]) {
  log ('usage: truffle-fast-compile ./contract/', chalk.gray ('{MyContract}'),'.sol');
  process.exit();
}

exec(`solc --optimize --abi --bin ${ process.argv[2] }`, { maxBuffer: 1024 * 10000 }, (err, stdout, stderr) => {
  if (err) {
    log (chalk.bold.red('Compile error'), '\n' ,chalk.yellow (err));
    return;
  }

  fs.ensureDirSync(truffleBuildDir);
  let parts = stdout.split('=======');

  log (chalk.bold ('Compiled contracts:'),'\n');

  for (let pos = 1; pos < parts.length; pos += 2) {


    let [contractPath, contractName] = parts[pos].trim().split(':');
    log(chalk.bold (contractName), chalk.yellow (contractPath));

    let [, , binary, , abi] = parts[pos + 1].split('\n');

    let truffleBuildFile = `${ truffleBuildDir }/${ contractName }.json`;

    let truffleBuild;
    if (fs.existsSync(truffleBuildFile)) {

      truffleBuild = require(truffleBuildFile);
      log( chalk.gray (`  previously builded at ${ new Date (truffleBuild.updated_at) }`));

    }
    else truffleBuild = Object.assign({}, truffleBuildTemplate);

    truffleBuild.contract_name = contractName;
    truffleBuild.abi = JSON.parse(abi);
    truffleBuild.unlinked_binary = binary;
    truffleBuild.updated_at = Date.now();

    fs.writeFileSync(truffleBuildFile, JSON.stringify(truffleBuild, null, 2));
  }


  log ('\n', chalk.bold ((parts.length-1)/2),'contract(s) in', chalk.bold (((new Date()) - startAt)/1000), 'c');

});


