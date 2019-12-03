import React from 'react';
// import logo from './logo.svg';
import './App.css';

//引入主router 文件
import {MainRouter} from "./scripts"

function App() {
  return (
    <div className="App">
        <MainRouter></MainRouter>
    </div>
  );
}

export default App;
