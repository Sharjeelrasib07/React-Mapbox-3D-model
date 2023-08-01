import  { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Markers = ({ data, type }) => {
  const markerColor = {
    school: 'blue',
    college: 'green',
    university: 'red',
  };

  const addMarkersToMap = (map) => {
    data.forEach((item) => {
      const { geometry, properties } = item;
      const [longitude, latitude] = geometry.coordinates;
      const markerElement = document.createElement('div');
      markerElement.className = `marker marker-${type}`;
      markerElement.style.background = markerColor[type];

      new mapboxgl.Marker(markerElement)
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h3>${properties.name}</h3>`)
        )
        .addTo(map);
    });
  };

  useEffect(() => {
    // Create a new Mapbox GL map instance
    const map = new mapboxgl.Map({
      container: 'map', // Replace 'map' with the id of your map container
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [0, 0], // Replace with the center coordinates of your map
      zoom: 12, // Set the initial zoom level
    });

    map.on('load', () => {
      addMarkersToMap(map);
    });

    return () => {
      // Clean up the map instance when the component unmounts
      map.remove();
    };
  }, [data, type]);

  return null;
};

export default Markers;
