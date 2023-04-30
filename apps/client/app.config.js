import { sync as findUpSync } from 'find-up';
import dotenv from 'dotenv';

dotenv.config({ path: findUpSync('.env') });

export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.API_URL,
    SOCKET_URL: process.env.SOCKET_URL,
  },
});
