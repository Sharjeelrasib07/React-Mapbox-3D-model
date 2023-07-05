import React from 'react';
import Map, { Layer, Source, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pak_boundaries from './data/pak_adm';
import Legend from './data/legend';

const FillExtrusionLayer = {
  id: 'geojsonLayer',
  type: 'fill-extrusion',
  paint: {
    'fill-extrusion-color': [
      'match',
      ['get', 'NAME_1'],
      'Azad Kashmir',
      '#12e193',
      'Baluchistan',
      '#ffb16d',
      'F.A.T.A.',
      '#123727',
      'F.C.T.',
      '#7f919d',
      'N.W.F.P.',
      'yellow',
      'Northern Areas',
      '#ffb16d',
      'Punjab',
      '#efbf4d',
      'Sind',
      '#12e193',
      'red'
    ],
    'fill-extrusion-opacity': 0.5,
    'fill-extrusion-height': {
      property: 'population',
      stops: [
        [10000, 10000],
        [20000, 20000],
        [30000, 30000],
        [40000, 40000],
        [50000, 50000],
        [60000, 60000],
        [70000, 70000],
        [80000, 80000]
      ]
    }
  }
};

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map
        initialViewState={{
          longitude: 70,
          latitude: 30,
          zoom: 5,
          pitch: 60
        }}
        mapboxAccessToken="pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA"
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
      >
        <Source id="my-data" type="geojson" data={pak_boundaries}>
          <Layer {...FillExtrusionLayer} />
        </Source>

        <Legend />

        {/* Move the NavigationControl to the bottom-right corner */}
        
          <NavigationControl showCompass={true} position='bottom-right'/>
        </Map>
    </div>
  );
}
export default App;