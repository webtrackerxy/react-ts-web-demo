import React, { Component } from 'react';
import '../styles/Login.scss';
import { RouteComponentProps } from 'react-router-dom';

interface LoginProps extends RouteComponentProps {
  onSubmit: (username: string, password: string) => void;
};

interface LoginState {
  username: string;
  password: string;
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSubmit, history } = this.props;
    onSubmit(username, password);
    history.push('/dashboard'); // Navigate to the Dashboard
  };

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { username, password } = this.state;
    const isFormValid = username && password;
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit} data-testid="login-form">
          <h1>Weclome!</h1>
          <p>Please enter your username and password:</p>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.handleUsernameChange}
            data-testid="username-input"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
            data-testid="password-input"
          />
          <button
            id="login"
            data-testid="login-submit"
            type="submit"
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
