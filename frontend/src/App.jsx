import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';

function App({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
App.propTypes = {
  children: PropTypes.node,
};

export default App;