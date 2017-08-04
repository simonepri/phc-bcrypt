# credential-plus-bcrypt
[![Travis CI](https://travis-ci.org/simonepri/credential-plus-bcrypt.svg?branch=master)](https://travis-ci.org/simonepri/credential-plus-bcrypt) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/credential-plus-bcrypt/master.svg)](https://codecov.io/gh/simonepri/credential-plus-bcrypt) [![npm](https://img.shields.io/npm/dm/credential-plus-bcrypt.svg)](https://www.npmjs.com/package/credential-plus-bcrypt) [![npm version](https://img.shields.io/npm/v/credential-plus-bcrypt.svg)](https://www.npmjs.com/package/credential-plus-bcrypt) [![npm dependencies](https://david-dm.org/simonepri/credential-plus-bcrypt.svg)](https://david-dm.org/simonepri/credential-plus-bcrypt) [![npm dev dependencies](https://david-dm.org/simonepri/credential-plus-bcrypt/dev-status.svg)](https://david-dm.org/simonepri/credential-plus-bcrypt#info=devDependencies)
> 🛡 bcrypt plugin for credential-plus

This package is thought to be used in conjunction with [credential-plus](https://github.com/simonepri/credential-plus)

If you find a security flaw in this code, please [report it](issues/new).

## Install

```
$ npm install --save credential-plus-bcrypt
```

## Usage
```js
const credential = require('credential-plus');
credential.install(require('credential-plus-bcrypt'));

// Hash and verify with bcrypt and default configs
credential.hash('We are all unicorns', {func: 'bcrypt'}, (err, hash) => {
  console.log(hash);
  //=> {"hash":"$2a$10$fxxhS75tSP7sP/8UNNJs8uspHSfusSCafU.EhTsn15ENdm/9n3IQe","func":"bcrypt"}
  credential.verify(hash, 'We are all unicorns', (match) =>{
    console.log(match);
    //=> true
  })
});
```

## API

### hash(password, options, callback)

Creates a new 'unique' hash from a password.

#### password

Type: `string`

The password to hash.

#### options

Type: `object`

Configurations for the hash function.

#### rounds

Type: `number`<br>
Default: 10

The cost of processing the data.
See here https://www.npmjs.com/package/bcrypt#a-note-on-rounds

#### callback(err, hash)

Type: `function`

Called after the hash has been computed.

#### err

Type: `object`

Possible error thrown.

#### hash

Type: `object`

The generated hash.

### verify(hash, input, callback)

Determines whether or not the user's input matches the stored password.

#### hash

Type: `string`

An hash generated from this package.

#### input

Type: `string`

User's input input.

#### callback(err, valid)

Type: `string`

Called after the verification process has been computed.

#### err

Type: `object`

Possible error thrown.

##### valid

Type: `boolean`

True if the hash computed for the input matches.

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/credential-plus-bcrypt/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
