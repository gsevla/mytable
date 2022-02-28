import { IUser } from '../../../../_dos/user';

const initialState = {
  cpf: '',
  personalData: {
    name: '',
    phone: '',
    email: '',
  },
} as IUser;

function reducer(state: IUser, { type, payload }) {
  switch (type) {
    case 'setCpf':
      return {
        ...state,
        cpf: payload.cpf,
      };
    case 'setPersonalData':
      return {
        ...state,
        personalData: payload.personalData,
      };
    case 'setUser': {
      const { user }: { user: IUser } = payload;

      const cpf = user?.cpf ?? state.cpf;
      const personalData = {
        name: user?.personalData?.name ?? state.personalData.name,
        phone: user?.personalData?.phone ?? state.personalData.phone,
        email: user?.personalData?.email ?? state.personalData.email,
      };
      const id = user?.id ?? state?.id;
      const identifier = user?.id ?? state?.identifier;

      return {
        ...state,
        cpf,
        personalData,
        id,
        identifier,
      };
    }
    default:
      throw new Error('Unrecognized error on userReducer');
  }
}

function setCpf(cpf: string) {
  return {
    type: 'setCpf',
    payload: { cpf },
  };
}

function setPersonalData({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}) {
  return {
    type: 'setPersonalData',
    payload: {
      personalData: {
        name,
        phone,
        email,
      },
    },
  };
}

function setUser(user: Partial<typeof initialState>) {
  return {
    type: 'setUser',
    payload: {
      user,
    },
  };
}

export default {
  initialState,
  reducer: reducer,
  actions: {
    setCpf,
    setPersonalData,
    setUser,
  },
};
