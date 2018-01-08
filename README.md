<h1 align="center">
  <a href="https://github.com/simonepri/credential-plus"><img src="https://github.com/simonepri/credential-plus/blob/master/media/credential-plus.png?raw=true" alt="credential-plus-bcrypt" /></a>
</h1>
<div align="center">
  <a href="https://travis-ci.org/simonepri/credential-plus-bcrypt"> <img src="https://travis-ci.org/simonepri/credential-plus-bcrypt.svg?branch=master" alt="build status"></a>
  <a href="https://codecov.io/gh/simonepri/credential-plus-bcrypt"><img src="https://img.shields.io/codecov/c/github/simonepri/credential-plus-bcrypt/master.svg" alt="code coverage" /></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="code style" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-bcrypt"><img src="https://img.shields.io/npm/v/credential-plus-bcrypt.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/credential-plus-bcrypt"><img src="https://img.shields.io/npm/dm/credential-plus-bcrypt.svg" alt="npm downloads" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-bcrypt"><img src="https://david-dm.org/simonepri/credential-plus-bcrypt.svg" alt="dependencies" /></a>
  <a href="https://david-dm.org/simonepri/credential-plus-bcrypt#info=devDependencies"><img src="https://david-dm.org/simonepri/credential-plus-bcrypt/dev-status.svg" alt="dev dependencies" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/simonepri/credential-plus-bcrypt.svg" alt="license" /></a>
</div>
<br />
<div align="center">
  🛡 BCrypt password hashing function for <a href="https://github.com/simonepri/credential-plus">credential-plus</a>.
</div>
<div align="center">
  <sub>
    If you find a security flaw in this code, PLEASE <a href="https://github.com/simonepri/credential-plus-bcrypt/issues/new">report it</a>.
  </sub>
</div>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/simonepri/credential-plus-bcrypt.svg)](https://greenkeeper.io/)

```
$ npm install --save credential-plus-bcrypt
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-bcrypt'));

// Hash and verify with bcrypt and default configs
credential.hash('We are all unicorns', {func: 'bcrypt'})
  .then(hash) => {

    console.log(hash);
    //=> {"hash":"$2a$10$fxxhS75tSP7sP/8UNNJs8uspHSfusSCafU.EhTsn15ENdm/9n3IQe","func":"bcrypt"}

    credential.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });
```

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-bcrypt/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
