import React from "react";
import "./index.css";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  render() {
    return (
      <div className="ClassState">
        <h2>Delete {this.props.name}</h2>
        <p>Please, write the security code.</p>
        {
          this.state.error && (
            <p>Error: the code is incorrect, it's not OK</p>
          )
        }
        <label htmlFor="">
          <input type="text" placeholder="Security code"/>
          <button onClick={() => this.setState({ error: !this.state.error, })}>Comprobe</button>
        </label>
      </div>
    );
  }
}

export {
  ClassState,
};
