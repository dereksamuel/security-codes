import { useEffect, useReducer } from "react";
import "./index.css";

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const SECURITY_CODE = "paradigma";

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
    error: state.value !== SECURITY_CODE,
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

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(finalReducer, initialState);

  const onValidate = () => {
    dispatch({
      type: actionTypes.validate,
    });
  };

  const onError = () => {
    dispatch({
      type: actionTypes.error,
    });
  };

  const onWrite = (newValue) => {
    dispatch({
      type: actionTypes.write,
      payload: newValue,
    });
  };

  const onCheck = () => {
    dispatch({
      type: actionTypes.check,
    })
  };

  const onDelete = () => {
    dispatch({
      type: actionTypes.delete,
    })
  };

  const onReset = () => {
    dispatch({
      type: actionTypes.reset,
    })
  };

  const onErrorValidation = () => {
    dispatch({
      type: actionTypes.error_validate,
    });
  };

  useEffect(() => {
    if (state.loading) {
      const timeout = setTimeout(() => {
        onErrorValidation();

        if (state.value === SECURITY_CODE) {
          onValidate();
        } else {
          onError();
        }

        clearTimeout(timeout);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div className="UseState">
        <h2>Delete { name }</h2>
        <p>Please, write the security code.</p>
        {
          state.error && (
            <p>Error: the code is incorrect, it's not OK</p>
          )
        }
        {
          state.loading && (
            <p>Loading...</p>
          )
        }
        <label>
          <input
            type="text"
            placeholder="Security code"
            value={state.value}
            onChange={(event) => onWrite(event.target.value)}
          />
          <button
            onClick={onCheck}
          >Comprobe</button>
        </label>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div className="Confirmation">
        <p>We ask for the confirmation. Do you want delete this?</p>
        <button
          onClick={onDelete}
        >Yes, delete</button>
        <button
          onClick={onReset}
        >No, I regretted</button>
      </div>
    );
  } else {
    return (
      <div className="Confirmation">
        <p>Successfully deleted</p>
        <button
          onClick={onReset}
        >Reset, back to the order</button>
      </div>
    );
  }
}

export {
  UseReducer,
};
