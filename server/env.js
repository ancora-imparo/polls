require('dotenv').config();
exports.GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'https://ancora-imparo-polls-default-rtdb.firebaseio.com';
exports.DATABASE_AUTH_VARIABLE_UID =
  process.env.DATABASE_AUTH_VARIABLE_UID || 'my-service-worker';
exports.SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || '4000';
