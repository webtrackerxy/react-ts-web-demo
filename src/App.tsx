import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './styles/App.scss';

function App() {
  const onSubmit = (username:string, password:string) => {
    // Handle authentication here
  };

  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <Login onSubmit={onSubmit} {...props} />} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
