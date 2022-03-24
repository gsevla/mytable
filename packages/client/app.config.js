import { sync as findUpSync } from 'find-up';
import dotenv from 'dotenv';
dotenv.config({ path: findUpSync('.env') });

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
    },
  };
};
