const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
  SECURITY_CODE: "paradigma",
};

const actionTypes = {
  validate: "VALIDATE",
  error_validate: "ERROR_VALIDATE",
  write: "WRITE",
  reset: "RESET",
  delete: "DELETE",
  check: "CHECK",
  error: "ERROR",
};

const reducerObject = (state, action) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
    error: false,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
    loading: false,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    error: false,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    value: action.payload,
    error: false,
  },
  [actionTypes.validate]: {
    ...state,
    confirmed: true,
    loading: false,
  },
  [actionTypes.error_validate]: {
    ...state,
    error: state.value !== state.SECURITY_CODE,
    loading: false,
  },
});

const finalReducer = (state, action) => {
  if (reducerObject(state, action)[action.type]) {
    return reducerObject(state, action)[action.type];
  } else {
    return {
      ...initialState
    };
  }
};

export {
  finalReducer,
  initialState,
  actionTypes
};

