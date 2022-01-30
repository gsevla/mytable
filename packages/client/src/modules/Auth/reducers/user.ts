const initialState = {
  cpf: '',
  personalData: {
    name: '',
    phone: '',
    email: '',
  },
};

function reducer(state, { type, payload }) {
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

export default {
  initialState,
  reducer: reducer,
  actions: {
    setCpf,
    setPersonalData,
  },
};
