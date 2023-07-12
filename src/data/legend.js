import React from 'react';

const Legend = () => {
  return (
    <div style={{ bottom: 30, left: 0, height: 200, width: 200, backgroundColor: 'gray', position: 'absolute', zIndex: 1 }}>
      <div className="flex-container">
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#12e193', justifyContent: 'space-between' }}>
          Azad Kashmir
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>4000000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#ffb16d', justifyContent: 'space-between' }}>
          Baluchistan
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>20000000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#123727', justifyContent: 'space-between' }}>
          F.A.T.A.
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>6500000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#7f919d', justifyContent: 'space-between' }}>
          F.C.T.
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>2500000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'yellow', justifyContent: 'space-between' }}>
          N.W.F.P.
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>39000000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#ffb16d', justifyContent: 'space-between' }}>
          Northern Areas
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>2000000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#efbf4d', justifyContent: 'space-between' }}>
          Punjab
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>120000000</div>
        </div>
        <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: '#12e193', justifyContent: 'space-between' }}>
          Sind
          <div style={{ display: 'flex', marginLeft: 5, marginRight: 10, backgroundColor: 'gray', color: 'black', justifyContent: 'space-between' }}>55000000</div>
        </div>
      </div>
      </div>
  );
};

export default Legend;
