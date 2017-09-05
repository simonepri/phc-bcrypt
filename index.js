'use strict';

const bcrypt = require('bcrypt');

const _ = require('lodash');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {Object}
 */
const defaultConfigs = {
  // The cost of processing the data.
  // See here https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  rounds: 10
};

/**
 * Generates an unique hash and the data needed to verify it.
 * @public
 * @param  {string} password The password to hash.
 * @param  {object} configs Configurations related to the hashing function.
 * @returns {Promise<string>} A promise that contains the generated hash string.
 */
function hashFunc(password, configs) {
  const cfgs = _.extend(defaultConfigs, configs);

  return bcrypt.genSalt(cfgs.rounds)
    .then(salt => bcrypt.hash(password, salt));
}

/**
 * Determines whether or not the user's input matches the stored password.
 * @public
 * @param  {string} hash Stringified hash object generated from this package.
 * @param  {string} input User's password input.
 * @returns {Promise<boolean>} A promise that contains a boolean that is true if
 *   if the hash computed for the input matches.
 */
function verifyFunc(hash, password) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hash: hashFunc,
  verify: verifyFunc,
  name: 'bcrypt'
};
