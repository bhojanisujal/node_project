// HOC.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const HOC = (Component) => {
  return function WithLayoutComponent(props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <div className="min-h-screen ">
        <Sidebar collapsed={collapsed} />
        <div
          className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} pt-16`}
        >
          <Header onToggle={() => setCollapsed(!collapsed)} collapsed={collapsed} />
          <main className="p-6 min-h-[calc(100vh-64px)] overflow-y-auto">
            <Component {...props} />
          </main>
        </div>
      </div>
    );
  };
};

export default HOC;