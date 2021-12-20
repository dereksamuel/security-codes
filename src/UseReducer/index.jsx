import { useEffect, useReducer } from "react";
import {
  finalReducer,
  initialState,
  actionTypes
} from "../utils/reducers/useReducer.reducer";

import "./index.css";

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
        console.log(state.SECURITY_CODE);
        if (state.value === state.SECURITY_CODE) {
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
