require('dotenv').config();
exports.GOOGLE_APPLICATION_CREDENTIALS_SERVER =
  process.env.GOOGLE_APPLICATION_CREDENTIALS_SERVER;

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'https://ancora-imparo-polls-default-rtdb.firebaseio.com';
exports.DATABASE_AUTH_VARIABLE_UID_SERVER =
  process.env.DATABASE_AUTH_VARIABLE_UID_SERVER || 'my-service-worker';
exports.SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || '4000';

exports.GOOGLE_APPLICATION_CREDENTIALS_CLIENT =
  process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT;

exports.DATABASE_AUTH_VARIABLE_UID_CLIENT =
  process.env.DATABASE_AUTH_VARIABLE_UID_CLIENT || 'my-service-worker';
