import React, { useEffect, useState } from 'react';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pak_boundaries from './data/pak_adm'; // Assuming this is a valid GeoJSON file
import Legend from './data/legend'; // Importing the Legend component directly
import LayerStyles from './data/LayerStyles'; // Assuming this file defines the layer styles
import MapboxRadioButtons from './data/radiobutton'; // Assuming this file contains the radio button component
import pak_label from './data/pak_label'; // Assuming this is a valid GeoJSON file
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  useEffect(() => {
    // Fetch data from your Express API here
    fetch('http://localhost:7000/')
      .then((result) => result.json())
      .then((resp) => {
        console.log('API Response:', resp); // Log the API response
        const geojsonData = convertToGeoJSON(resp); // Convert the API data to GeoJSON
        console.log('geojsondata', geojsonData);
        setApiData(geojsonData); // Save the converted GeoJSON data in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [apiData, setApiData] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const convertToGeoJSON = (data) => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Data is not in the expected format.');
      }

      const features = data.map((item) => {
        const wkbGeometry = item.wkb_geometry;
        const lngLatString = wkbGeometry.slice(6, -1); // Remove 'POINT(' and ')'
        const [longitude, latitude] = lngLatString.split(' ').map(parseFloat);

        return {
          type: 'Feature',
          properties: {
            ogc_fid: item.ogc_fid,
            osm_id: item.osm_id,
            code: item.code,
            fclass: item.fclass,
            name: item.name,
          },
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        };
      });

      return {
        type: 'FeatureCollection',
        features: features,
      };
    } catch (error) {
      console.error('Error converting data to GeoJSON:', error);
      return {
        type: 'FeatureCollection',
        features: [], // Return empty features in case of error
      };
    }
  };

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
        'red',
      ],
      'fill-extrusion-opacity': 0.5,
      'fill-extrusion-height': {
        property: selectedLayer,
        stops: LayerStyles[selectedLayer],
        
      },
    },
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
        <Source id="src-labels1" type="geojson" data={pak_label}>
          <Layer
            id="labels1"
            type="symbol"
            layout={{
              'text-field': ['get', selectedLayer],
              'text-size': 14,
            
              'text-offset': [0, -2],
              'text-allow-overlap':true ,
            }}
            paint={{
              'text-color': 'white',
              'text-halo-color': 'rgba(0,0,0,0.9)',
              'text-halo-width': 3,
            }}
          />
        </Source>
        <Source id="src-labels2" type="geojson" data={pak_label}>
          <Layer
            id="labels2"
            type="symbol"
            layout={{
              'text-field': ['get', 'NAME_1'],
              'text-size': 14,
              'text-offset': [0, -4],
              'text-allow-overlap': true,
            }}
            paint={{
              'text-color': 'white',
              'text-halo-color': 'rgba(0,0,0,0.9)',
              'text-halo-width': 3,
            }}
          />
        </Source>

        {/* Add a new Source and Layer for the fetched API data (pak_education) */}
        <Source id="api-data" type="geojson" data={apiData}>
          <Layer
            id="api-layer"
            type="circle"
            paint={{
              'circle-color': '#ff0000',
              'circle-radius': 6,
              'circle-opacity': 0.7,
              
            }}
          />
        </Source>
        {/* Add the Legend component */}
        <Legend selectedLayer={selectedLayer} / >
        
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
              {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)}:{' '}
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
