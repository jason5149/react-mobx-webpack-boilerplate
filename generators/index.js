const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
 prompting() {
   const dirName = path.basename(this.destinationPath())
   const prompts = [{
     type: 'input',
     name: 'appName',
     default: dirName,
     message: '请输入项目名',
   }];

   return this.prompt(prompts).then(answers => {
     this.answers = answers;
   });
 }

 install() {
   this.installDependencies({
     npm: true,
     bower: false,
     yarn: false,
   });
 }

 writing() {
   const srcDir = path.resolve('app');
   this.sourceDir(srcDir);

   this.fs.copy(
     path.relative(srcDir, '**'),
     this.destinationPath('./'),
     {
       globOptions: {
         dot: true,
         ignore: [
           '**/dist/**',
           path.resolve(srcDir, 'package.json'),
         ],
       },
     },
   );
   this.fs.copy(
     this.templatePath('package.json'),
     this.destinationPath('package.json'),
     {
       process: contents => {
         const contentStr = contents.toString();
         const { appName } = this.answers;

         return contentStr
          .replace(/\{\{appName\}\}/g, appName)
          .replace(/"version":.*/g, '"version": "1.0.0"')
       }
     }
   );
 }

 end() {
   this.log('\n', chalk.bold('你可以启动项目了！'))
 }
};
