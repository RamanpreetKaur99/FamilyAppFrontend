import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

const Location = () => {
  
  const google = window.google;

  return (
    <div className='container-fluid bg-danger p-0'>
      
        <Map
          google={google}
          //   mapType='satellite'
          zoom={14}
          initialCenter={{
            lat: 28.503531,
            lng: 77.32859,
          }}
          style={{
            height: 'vh-100',
          }}
        >
        </Map>
     
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCvPv1nI4ihrAv3a7pAXjGZUCs_YRiIuOc',
})(Location);