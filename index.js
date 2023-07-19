const { resolve } = require("node:path")
var fs = require('fs');
const fse = require('fs-extra');
const { argv, cwd, stdout, stderr } = require("node:process");
const { exec } = require('node:child_process');

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

exec(`cd ${destDir} && git init`, (error, stdout, stderr) => {
  if(error) {
    console.log(stderr);
    return;
  }
  console.log(stdout);
  console.log("Setting up npm for you....");
  exec(`cd ${destDir} && npm install`, (error, stdout, stderr) => {
    if(error) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
    console.log("Go inside you app directory");
    console.log("Run command \"npm run watch:purs && npm run dev\"");
  });
});




