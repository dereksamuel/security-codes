import { useEffect, useState } from "react";
import "./index.css";

function UseState({ name }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        console.info("making the info");
        clearTimeout(timeout);
      }, 3000);
    }
  }, [loading]);

  return (
    <div className="UseState">
      <h2>Delete { name }</h2>
      <p>Please, write the security code.</p>
      {
        error && (
          <p>Error: the code is incorrect, it's not OK</p>
        )
      }
      {
        loading && (
          <p>Loading...</p>
        )
      }
      <label htmlFor="">
        <input type="text" placeholder="Security code"/>
        <button
          onClick={() => setLoading(true)}
        >Comprobe</button>
      </label>
    </div>
  );
}

export {
  UseState,
};
