# Gulp 4 Browserify
 ### A Gulp Workflow setup with **ITCSS + SMACSS Architecture** and **Browserify for ES6 Modules**
![Witch Devs](https://raw.githubusercontent.com/CristRocha/Gulp-4-Browserify/master/src/assets/img/WitchDevs.png)
## Specifications

 * Pug Templates
 * Browser Sync Live Reload
 * Sass to Css Compressed & Prefixed
 * Browserify
    * Glob
    * Uglify
    * Babelify
    * Event Stream
    * Vynil Source Stream & Vynil Buffer
  * Image Min
  * Sprite Smith

## Requirements
* Node Js
## Install
```bash
  npm install
```
## Guide
- Open the Gulp File
- Write the **First Name** of the entries of your js files
```javascript
const storeName = 'my-modular-file';
```
- Configure your paths 
```javascript
const path = {
        views: {
            src  : './src/views/**/[^_]*.pug',
            watch: './src/views/**/*.pug',
            dest : './dist'
        },
        styles: {
            src   : 'src/assets/sass/**/*.scss',
            dest  : './dist/css'
        },
        scripts: {
            src   : './src/assets/js/',
            dest  : './dist/js'
        },
  };
```
## Comand and Control
- Development
```bash
npm run dev
```
- Production
```bash
npm run prod
```

**Cheers**