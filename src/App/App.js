import React from 'react';
import './App.scss';
import NavBar from '../components/shared/NavBar/NavBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
