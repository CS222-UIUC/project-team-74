import React from 'react';
import Navbar from './components/Navbar';

function App({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default App;
