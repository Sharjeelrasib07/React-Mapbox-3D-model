
const MapboxRadioButtons = ({ selectedLayer, handleOptionChange }) => {
  return (
    <div style={{position: 'absolute', zIndex: 1000}}>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="population"
            checked={selectedLayer === 'population'}
            onChange={handleOptionChange}
          />
          population
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="literacy_r"
            checked={selectedLayer === 'literacy_r'}
            onChange={handleOptionChange}
          />
          literacy_r
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="rural_loca"
            checked={selectedLayer === 'rural_loca'}
            onChange={handleOptionChange}
          />
          rural_loca
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="homeless"
            checked={selectedLayer === 'homeless'}
            onChange={handleOptionChange}
          />
        homeless
        </label>
      </div>
    </div>
  );
};

export default MapboxRadioButtons;
