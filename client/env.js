import dotenv from 'dotenv';
'dotenv'.config();
export const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'https://ancora-imparo-polls-default-rtdb.firebaseio.com';
export const DATABASE_AUTH_VARIABLE_UID =
  process.env.DATABASE_AUTH_VARIABLE_UID || 'my-service-worker';
export const SERVER_PORT =
  process.env.PORT || process.env.SERVER_PORT || '4000';
