import test from 'ava';

import m from '..';

test("should throw an error if the 'rounds' option is not a number", async t => {
  const err = await t.throws(m.hash('password', {rounds: 'rounds'}));
  t.is(err.message, "The 'rounds' option must be an integer");
});

test("should throw an error if the 'rounds' option is out of range", async t => {
  let err = await t.throws(m.hash('password', {rounds: -1}));
  t.regex(err.message, /The 'rounds' option must be in the range/);

  err = await t.throws(m.hash('password', {rounds: 32}));
  t.regex(err.message, /The 'rounds' option must be in the range/);
});

test("should throw an error if the 'saltSize' option is out of range", async t => {
  let err = await t.throws(m.hash('password', {saltSize: -1}));
  t.regex(err.message, /The 'saltSize' option must be in the range/);

  err = await t.throws(m.hash('password', {saltSize: 1025}));
  t.regex(err.message, /The 'saltSize' option must be in the range/);
});
