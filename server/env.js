require('dotenv').config();
exports.GOOGLE_APPLICATION_CREDENTIALS_SERVER =
  process.env.GOOGLE_APPLICATION_CREDENTIALS_SERVER;
exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'https://ancora-imparo-polls-default-rtdb.firebaseio.com';
exports.DATABASE_AUTH_VARIABLE_UID_SERVER =
  process.env.DATABASE_AUTH_VARIABLE_UID_SERVER || 'my-service-worker';
exports.SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || '4000';

exports.AUTH_DOMAIN =
  process.env.AUTH_DOMAIN || 'ancora-imparo-polls.firebaseapp.com';
exports.API_KEY = process.env.API_KEY;
exports.PROJECT_ID = process.env.PROJECT_ID || 'ancora-imparo-polls';
exports.SENDER_ID = process.env.SENDER_ID;
exports.APP_ID = process.env.APP_ID;
exports.MEASUREMENT_ID = process.env.MEASUREMENT_ID;
