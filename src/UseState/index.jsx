import { useEffect, useState } from "react";
import "./index.css";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onValidate = () => {
    setState({
      ...state,
      confirmed: true,
      loading: false,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
      error: false,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
      error: false,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
      loading: false,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      error: false,
      value: "",
    });
  };

  useEffect(() => {
    if (state.loading) {
      const timeout = setTimeout(() => {
        setState({
          ...state,
          error: state.value !== SECURITY_CODE,
          loading: false,
        });

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
  UseState,
};
