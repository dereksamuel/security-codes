import { useEffect, useState } from "react";
import "./index.css";

function UseState({ name }) {
  const SECURITY_CODE = "key012455";
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
  });

  useEffect(() => {
    if (state.loading) {
      const timeout = setTimeout(() => {
        setState({
          ...state,
          error: state.value !== SECURITY_CODE,
          loading: false,
        });

        clearTimeout(timeout);
      }, 3000);
    }
  }, [state.loading]);

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
      <label htmlFor="">
        <input
          type="text"
          placeholder="Security code"
          value={state.value}
          onChange={(event) => {
            setState({
              ...state,
              value: event.target.value,
            });
          }}
        />
        <button
          onClick={() => setState({
            ...state,
            loading: true,
          })}
        >Comprobe</button>
      </label>
    </div>
  );
}

export {
  UseState,
};
