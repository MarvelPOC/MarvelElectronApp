import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import { TYPE, CABIN_MAPPING, ROW_MAPPING } from '../../ENUM';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


const images = importAll(require.context('./seat_icons', false, /\.(png|jpe?g|svg)$/));

function Column({ colData }) {
  const { type, data } = colData;
  const getColValue = () => {
    if (Array.isArray(data)) {
      return (
        type === TYPE.CABIN ?
        data.map(colValue => (
              <span className="colValue">{CABIN_MAPPING[colValue]}</span>
            )) :
            data.map(colValue => (
            <img className="colValue iconImage" alt="" src={images[ROW_MAPPING[colValue]]} />
            ))
      );
    } return data;
  };
 // console.log({ images });
  return (
    <div className="tableDisplay" style={{ backgroundColor: `#${colData.bgColor}` }}>
      {getColValue()}
    </div>
  );
}

Column.propTypes = {
  colData: PropTypes.object.isRequired,
};

export default Column;
