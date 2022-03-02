import { IUser } from '../../../../_dos/user';

interface IState extends IUser {}

type TAction =
  | ReturnType<typeof setCpf>
  | ReturnType<typeof setPersonalData>
  | ReturnType<typeof setUser>;

const initialState: IState = {
  cpf: '',
  personalData: {
    name: '',
    phone: '',
    email: '',
  },
};

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'setCpf':
      return {
        ...state,
        cpf: action.payload.cpf,
      };
    case 'setPersonalData':
      return {
        ...state,
        personalData: action.payload.personalData,
      };
    case 'setUser': {
      const { user } = action.payload;

      const cpf = user?.cpf ?? state.cpf;
      const personalData = {
        name: user?.personalData?.name ?? state.personalData.name,
        phone: user?.personalData?.phone ?? state.personalData.phone,
        email: user?.personalData?.email ?? state.personalData.email,
      };
      const id = user?.id ?? state?.id;
      const identifier = user?.identifier ?? state?.identifier;

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
  } as const;
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
  } as const;
}

function setUser(user: Partial<typeof initialState>) {
  return {
    type: 'setUser',
    payload: {
      user,
    },
  } as const;
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
