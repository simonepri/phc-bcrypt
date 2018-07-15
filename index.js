/* eslint-disable capitalized-comments,complexity,prefer-destructuring */
'use strict';

const bcrypt = require('bcrypt');
const tsse = require('tsse');
const phc = require('@phc/format');
const gensalt = require('@kdf/salt');
const bb64 = require('./bcrypt-b64');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaults = Object.freeze({
  // The cost of processing the data.
  // See here https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  rounds: 10,
  // The minimum recommended size for the salt is 128 bits.
  saltSize: 16
});

/**
 * Supported bcrypt versions.
 * @private
 * @type {number[]}
 */
const versions = [
  0x61, // a (97)
  0x62 // b (98)
];

/**
 * Computes the hash string of the given password in the PHC format using bcrypt
 * package.
 * @public
 * @param  {string} password The password to hash.
 * @param  {Object} [options] Optional configurations related to the hashing
 * function.
 * @param  {number} [options.rounds=10] Optional
 * Must be an integer within the range (`4` <= `rounds` <= `31`).
 * @return {Promise.<string>} The generated secure hash string in the PHC
 * format.
 */
function hash(password, options) {
  options = options || {};
  const rounds = options.rounds || defaults.rounds;
  const saltSize = options.saltSize || defaults.saltSize;
  const version = versions[versions.length - 1];

  // Rounds Validation
  if (typeof rounds !== 'number' || !Number.isInteger(rounds)) {
    return Promise.reject(
      new TypeError("The 'rounds' option must be an integer")
    );
  }
  if (rounds < 4 || rounds > 31) {
    return Promise.reject(
      new TypeError(
        `The 'rounds' option must be in the range (4 <= rounds <= 31)`
      )
    );
  }

  // Salt Size Validation
  if (saltSize < 8 || saltSize > 1024) {
    return Promise.reject(
      new TypeError(
        "The 'saltSize' option must be in the range (8 <= saltSize <= 1023)"
      )
    );
  }

  return gensalt(saltSize).then(salt => {
    const bb64salt = bb64.encode(salt);
    const padrounds = String(rounds).padStart(2, '0');
    const decver = String.fromCharCode(version);
    const parstr = `$2${decver}$${padrounds}$${bb64salt}`;
    return bcrypt.hash(password, parstr).then(enchash => {
      const hash = bb64.decode(enchash.split(parstr)[1]);
      const phcstr = phc.serialize({
        id: 'bcrypt',
        version,
        params: {
          r: rounds
        },
        salt,
        hash
      });
      return phcstr;
    });
  });
}

/**
 * Determines whether or not the hash stored inside the PHC formatted string
 * matches the hash generated for the password provided.
 * @public
 * @param  {string} phcstr Secure hash string generated from this package.
 * @param  {string} password User's password input.
 * @returns {Promise.<boolean>} A boolean that is true if the hash computed
 * for the password matches.
 */
function verify(phcstr, password) {
  let phcobj;
  try {
    phcobj = phc.deserialize(phcstr);
  } catch (err) {
    return Promise.reject(err);
  }

  // Identifier Validation
  if (phcobj.id !== 'bcrypt') {
    return Promise.reject(
      new TypeError(`Incompatible ${phcobj.id} identifier found in the hash`)
    );
  }

  // Parameters Existence Validation
  if (typeof phcobj.params !== 'object') {
    return Promise.reject(new TypeError('The param section cannot be empty'));
  }

  // Version Validation
  if (typeof phcobj.version === 'undefined') {
    phcobj.version = versions[0]; // Old bcrypt strings without the version.
  }
  if (versions.indexOf(phcobj.version) === -1) {
    return Promise.reject(
      new TypeError(`Unsupported ${phcobj.version} version`)
    );
  }
  const version = phcobj.version;

  // Rounds Validation
  if (
    typeof phcobj.params.r !== 'number' ||
    !Number.isInteger(phcobj.params.r)
  ) {
    return Promise.reject(new TypeError("The 'r' param must be an integer"));
  }
  if (phcobj.params.r < 4 || phcobj.params.r > 31) {
    return Promise.reject(
      new TypeError(`The 'r' param must be in the range (4 <= r <= 31)`)
    );
  }
  const rounds = phcobj.params.r;

  // Salt Validation
  if (typeof phcobj.salt === 'undefined') {
    return Promise.reject(new TypeError('No salt found in the given string'));
  }
  const salt = phcobj.salt;

  // Hash Validation
  if (typeof phcobj.hash === 'undefined') {
    return Promise.reject(new TypeError('No hash found in the given string'));
  }
  const hash = phcobj.hash;
  // const keylen = phcobj.hash.byteLength;

  const bb64salt = bb64.encode(salt);
  const padrounds = String(rounds).padStart(2, '0');
  const decver = String.fromCharCode(version);
  const parstr = `$2${decver}$${padrounds}$${bb64salt}`;
  return bcrypt.hash(password, parstr).then(enchash => {
    const newhash = bb64.decode(enchash.split(parstr)[1]);
    const match = tsse(hash, newhash);
    return match;
  });
}

/**
 * Gets the list of all identifiers supported by this hashing function.
 * @public
 * @returns {string[]} A list of identifiers supported by this hashing function.
 */
function identifiers() {
  return ['bcrypt'];
}

module.exports = {
  hash,
  verify,
  identifiers
};
