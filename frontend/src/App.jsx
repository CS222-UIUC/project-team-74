import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';

function App({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, overflow: 'hidden' }}>{children}</main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
