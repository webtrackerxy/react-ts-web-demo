import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './styles/App.scss';
           
function App() {
  const handleLogin = (username: string, password: string) => {
    console.log(`username: ${username}, password: ${password}`);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login onSubmit={handleLogin}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}


export default App;
