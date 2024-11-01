import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';

function App({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

// Adding PropTypes for props validation
App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
