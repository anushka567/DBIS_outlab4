import React from 'react';

const Dashboard = () => {
  const valid=sessionStorage.getItem('valid')
  return (

    <div>
      {valid ? (
        <div>
          <h1>This is the dashboard</h1>
         
        </div>
      ) : (
        window.location.href='/'
      )}
    </div>
  );
};

export default Dashboard;