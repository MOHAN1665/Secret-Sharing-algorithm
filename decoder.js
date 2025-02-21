// decoder.js - Converts values from different bases
function decodeValue(base, value) {
  return parseInt(value, base);
}

module.exports = { decodeValue };
