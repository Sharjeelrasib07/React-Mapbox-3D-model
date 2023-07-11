import React, { useState } from 'react';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pak_boundaries from './data/pak_adm';
import Legend from './data/legend';
import LayerStyles from './data/LayerStyles';
import MapboxRadioButtons from './data/radiobutton';
import pak_label from './data/pak_label';

function App() {
  const [selectedLayer, setSelectedLayer] = useState('population');
  const [selectedFeature, setSelectedFeature] = useState(null);

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
        property: selectedLayer,
        stops: LayerStyles[selectedLayer]
      }
    }
  };

  const handleOptionChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  const handleMapClick = (event) => {
    const features = event.features;
    if (features.length > 0) {
      const selectedFeature = features[0];
      setSelectedFeature(selectedFeature);
    } else {
      setSelectedFeature(null);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA"
        initialViewState={{
          latitude: 30,
          longitude: 70,
          zoom: 5,
          pitch: 60,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleMapClick}
      >
        <Source id="my-data" type="geojson" data={pak_boundaries}>
          <Layer {...FillExtrusionLayer} />
        </Source>
        <Source id="src-labels" type="geojson" data={pak_label}>
          <Layer
            id="labels"
            type="symbol"
            layout={{
              'text-field': ['get', 'NAME_1'],
              'text-size': 14,
              'text-offset': [0, -2],
            }}
            paint={{
              'text-color': 'white',
              'text-halo-color': 'rgba(0,0,0,0.9)',
              'text-halo-width': 3,
            }}
          />
        </Source>
        <Legend />
        <MapboxRadioButtons
          selectedLayer={selectedLayer}
          handleOptionChange={handleOptionChange}
        />
        {selectedFeature && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h3>{selectedFeature.properties.NAME_1}</h3>
            <p>
              {selectedLayer.charAt(0).toUpperCase() +
                selectedLayer.slice(1)}:{' '}
              {selectedFeature.properties[selectedLayer]}
            </p>
          </div>
        )}
        <NavigationControl showCompass={true} position="bottom-right" />
      </Map>
    </div>
  );
}

export default App;
