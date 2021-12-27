import { parseCookies } from 'nookies';
import { AuthModule } from '../../src/modules/Auth';

export default AuthModule;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  console.log('kkoo', cookies);
  return {
    props: {
      selectedStepPage: cookies.AUTH_STEP,
    },
  };
}
