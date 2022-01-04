// import { parseCookies } from 'nookies';
// import { AuthModule } from '../../src/modules/Auth';

import { AskForCpfPage } from '../../src/modules/Auth/pages/AskForCpf';

export default AskForCpfPage;

export async function getServerSideProps(context) {
  console.log('tá em auth');
  // const cookies = parseCookies(context);
  // console.log('kkoo', cookies);
  return {
    props: {
      // selectedStepPage: cookies.AUTH_STEP,
    },
  };
}
