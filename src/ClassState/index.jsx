import React from "react";
import "./index.css";

const SECURITY_CODE = "key012455";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  // }

  // componentDidMount() {
  //   console.info("componentDidMount");
  // }

  componentDidUpdate() {
    if (this.state.loading) {
      const timeout = setTimeout(() => {
        this.setState({
          error: this.state.value !== SECURITY_CODE,
        });

        this.setState({
          loading: false,
        });
        clearTimeout(timeout);
      }, 3000);
    }
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
        {
          this.state.loading && (
            <p>Loading...</p>
          )
        }
        <label htmlFor="">
          <input
            type="text"
            placeholder="Security code"
            value={this.state.value}
            onChange={(event) => {
              this.setState({
                value: event.target.value,
              });
            }}
          />
          <button onClick={() => this.setState({ loading: true, })}>Comprobe</button>
        </label>
      </div>
    );
  }
}

export {
  ClassState,
};
