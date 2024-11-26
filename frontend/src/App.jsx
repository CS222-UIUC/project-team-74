import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';

function App({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  );
}
App.propTypes = {
  children: PropTypes.node,
};

export default App;