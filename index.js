#! /usr/bin/env node
const { resolve } = require("node:path")
var fs = require('fs');
const fse = require('fs-extra');
const { argv, cwd, stdout, stderr } = require("node:process");
const { exec, spawn } = require('node:child_process');

const relativePath = argv[2]
const absolutePath = resolve(cwd(), relativePath);
const srcDir = __dirname + "/project";
const destDir = absolutePath;

fs.mkdirSync(absolutePath, { recursive: true });
const appName = absolutePath.split("/").pop();

console.log(`Copying files to ${appName}.....`);
try {
  fse.copySync(srcDir, destDir, { overwrite: true })
  console.log('success!')
} catch (err) {
  console.error("Failed to create folder structure", err)
}

const ignoreFiles = ['/dist/',
'/output/',
'/node_modules/',
'/.spago/',
'.DS_Store',
'.psc-ide-port',
'package-lock.json']


ignoreFiles.forEach((x) => {
  exec(`cd ${destDir} && echo ${x} >> .gitignore`, (error, stdout, stderr) => {

  })
})



exec(`cd ${destDir} && git init`, (error, stdout, stderr) => {
  if(error) {
    console.log(stderr);
    return;
  }
  console.log(stdout);
  console.log("Initiatlizing npm...");

  const npmInit = spawn(`npm`, ['install', '--prefix', destDir]);

  npmInit.stdout.on("data", data => {
    console.log(`${data}`);
  });

  npmInit.stderr.on("data", data => {
      console.log(`${data}`);
  });

  npmInit.on('error', (error) => {
      console.log(`${error.message}`);
  });

  npmInit.on("close", code => {
      console.log(`child process exited with code ${code}`);
  });

});




