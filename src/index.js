import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
if (!global._babelPolyfill) {
	require('babel-polyfill');
}

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
  )
