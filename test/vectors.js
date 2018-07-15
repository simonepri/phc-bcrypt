import test from 'ava';
import phc from '@phc/format';

import m from '..';

// See https://bitbucket.org/vadim/bcrypt.net/src/464c41416dc9/BCrypt.Net.Test/TestBCrypt.cs

test('should pass the test vector 1', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 6},
    salt: Buffer.from(
      '14 4b 3d 69 1a 7b 4e cf 39 cf 73 5c 7f a7 a7 9c'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '55 7e 94 f3 4b f2 86 e8 71 9a 26 be 94 ac 1e 16' +
        'd9 5e f9 f8 19 de e0'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$FEs9aRp7Ts85z3Ncf6ennA$VX6U80vyhuhxmia+lKweFtle+fgZ3uA
  t.true(await m.verify(phcstr, ''));
});

test('should pass the test vector 2', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 8},
    salt: Buffer.from(
      '26 c6 30 33 c0 4f 8b cb a2 fe 24 b5 74 db 62 74'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '56 70 1b 26 16 4d 8f 1b c1 52 25 f4 62 34 ac 8a' +
        'c7 9b f5 bc 16 bf 48'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=8$JsYwM8BPi8ui/iS1dNtidA$VnAbJhZNjxvBUiX0YjSsiseb9bwWv0g
  t.true(await m.verify(phcstr, ''));
});

test('should pass the test vector 3', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 10},
    salt: Buffer.from(
      '9b 7c 9d 2a da 0f d0 70 91 c9 15 d1 51 77 01 d6'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '7b 2e 03 10 6a 43 c9 75 38 21 db 68 8b 5c c7 59' +
        '0b 18 fd f9 ba 54 46'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=10$m3ydKtoP0HCRyRXRUXcB1g$ey4DEGpDyXU4Idtoi1zHWQsY/fm6VEY
  t.true(await m.verify(phcstr, ''));
});

test('should pass the test vector 4', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 6},
    salt: Buffer.from(
      'a3 61 2d 8c 9a 37 da c2 f9 9d 94 da 03 bd 45 21'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        'e6 d5 38 31 f8 20 60 dc 08 a2 e8 48 9c e8 50 ce' +
        '48 fb f9 76 97 87 38'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$m3ydKtoP0HCRyRXRUXcB1g$ey4DEGpDyXU4Idtoi1zHWQsY/fm6VEY
  t.true(await m.verify(phcstr, 'a'));
});

test('should pass the test vector 5', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 6},
    salt: Buffer.from(
      '2a 1f 1d c7 0a 3d 14 79 56 a4 6f eb e3 01 60 17'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        'd9 a2 75 b4 93 bc be 10 24 b0 ff 80 d3 30 25 3c' +
        'fd ca 34 68 7d 8f 69'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$Kh8dxwo9FHlWpG/r4wFgFw$2aJ1tJO8vhAksP+A0zAlPP3KNGh9j2k
  t.true(await m.verify(phcstr, 'abc'));
});

test('should pass the test vector 6', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 6},
    salt: Buffer.from(
      '02 d1 17 6d 74 15 8e e2 9c ff da c6 15 0c f1 23'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '4d 38 b5 23 ce 9d c6 f2 f6 ff 9f b3 c2 cd 71 df' +
        'e7 f9 6e b4 a3 ba f1'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$AtEXbXQVjuKc/9rGFQzxIw$TTi1I86dxvL2/5+zws1x3+f5brSjuvE
  t.true(await m.verify(phcstr, 'abcdefghijklmnopqrstuvwxyz'));
});

test('should pass the test vector 7', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 6},
    salt: Buffer.from(
      '85 12 ae 0d 0f ac 4e c9 a5 97 8f 79 b6 17 10 28'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '26 f5 17 fe 53 45 ad 57 5b a7 df b8 14 4f 01 bf' +
        'db 15 f3 d4 7c 1e 14'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$hRKuDQ+sTsmll495thcQKA$JvUX/lNFrVdbp9+4FE8Bv9sV89R8HhQ
  t.true(await m.verify(phcstr, '~!@#$%^&*()      ~!@#$%^&*()PNBFRD'));
});

// See http://cvsweb.openwall.com/cgi/cvsweb.cgi/Owl/packages/john/john/src/BF_fmt.c

test('should pass the test vector 8', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 5},
    salt: Buffer.from(
      '71 d7 9f 82 18 a3 92 59 a7 a2 9a ab b2 db af c3'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        'ee ee 31 f8 09 19 92 04 25 88 10 02 d1 40 d5 55' +
        'b2 8a 5c 72 e0 0f 09'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$cdefghijklmnopqrstuvww$7u4x+AkZkgQliBAC0UDVVbKKXHLgDwk
  t.true(
    await m.verify(
      phcstr,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789chars after 72 are ignored'
    )
  );
});

// See https://stackoverflow.com/a/12761326/3921589

test('should pass the test vector 9', async t => {
  const phcstr = phc.serialize({
    id: 'bcrypt',
    version: 'a'.charCodeAt(0),
    params: {r: 10},
    salt: Buffer.from(
      '01 5b d2 2f a2 ed f2 4b 9f e8 9a c0 a1 78 5b 83'.replace(/ /g, ''),
      'hex'
    ),
    hash: Buffer.from(
      (
        '8f c2 32 bb ab 50 48 1c 5f 0d ed 63 17 30 37 fc' +
        'f1 cc d9 af ba 16 78'
      ).replace(/ /g, ''),
      'hex'
    )
  });
  // $bcrypt$v=97$r=6$AVvSL6Lt8kuf6JrAoXhbgw$j8Iyu6tQSBxfDe1jFzA3/PHM2a+6Fng
  t.true(await m.verify(phcstr, 'ππππππππ'));
});
