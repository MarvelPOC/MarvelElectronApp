import React from 'react';
import './index.css';

import large from './Equipments Data/largeEq';
import medium from './Equipments Data/mediumEq';
import small from './Equipments Data/smallEq';

import Column from './partials/Columns';
import { isNumber, useNormalizedData, isWing, isWingM } from './utils';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./partials/Columns/seat_icons', false, /\.(png|jpe?g|svg)$/));


function SeatMap(props) {

  const data = props.myKey === "lg" ? large : props.myKey === "md" ? medium : small;
  const newData = useNormalizedData(data);
  if(data === large){
    if (props.focusEconomy === false){
      return (
        <div className="tabu">
          {newData.map(function(config, index) {
            if (index < 10) {
              return (
                <div className="rows">
                <img className="image" src={isWing(config.area) ? images['37_wing_upper.png'] : ([992,995,997,989,42].includes(config.area)) ? images['21_emergency_exit_upper.png'] : ''} alt="" />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <Column colData={config} />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <img className="image"  src={isWing(config.area) ? images['37_wing_lower.png'] : ([992,995,989].includes(config.area)) ?  images['22_boarding_emergency_exit_lower.png'] :  ([42,997].includes(config.area)) ?  images['21_emergency_exit_lower.png'] : ''} alt="" />
              </div>
              )
            }
          })}
        </div>
    );
    }
    else {
      return (
        <div className="tabu">
          {newData.map(function(config, index) {
            if (index > 11) {
              return (
                <div className="rowsBig">
                <img className="image" src={isWing(config.area) ? images['37_wing_upper.png'] : ([992,993,995].includes(config.area)) ? images['21_emergency_exit_upper.png'] : ''} alt="" />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <Column colData={config} />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <img className="image"  src={isWing(config.area) ? images['37_wing_lower.png'] : ([992].includes(config.area)) ?  images['22_boarding_emergency_exit_lower.png'] :  ([993,995].includes(config.area)) ?  images['21_emergency_exit_lower.png'] : ''} alt="" />
              </div>
              )
            }
          })}
        </div>
    );
    }
  }
  else if(data === medium){
    if (props.focusEconomy === false){
      return (
        <div className="tabu">
          {newData.map(function(config, index) {
            if (index < 8) {
              return (
                <div className="rows">
                <img className="image" src={isWingM(config.area) ? images['37_wing_upper.png'] : ([992,995,997,42].includes(config.area)) ? images['21_emergency_exit_upper.png'] : ''} alt="" />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <Column colData={config} />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <img className="image"  src={isWingM(config.area) ? images['37_wing_lower.png'] : ([992,995].includes(config.area)) ?  images['22_boarding_emergency_exit_lower.png'] :  ([42,997].includes(config.area)) ?  images['21_emergency_exit_lower.png'] : ''} alt="" />
              </div>
              )
            }
          })}
        </div>
    );
    }
    else {
      return (
        <div className="tabu">
          {newData.map(function(config, index) {
            if (index > 7) {
              return (
                <div className="rowsBig">
                <img className="image" src={isWingM(config.area) ? images['37_wing_upper.png'] : ([11,12,998].includes(config.area)) ? images['21_emergency_exit_upper.png'] : ''} alt="" />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <Column colData={config} />
                <span className="area">{isNumber(config.area) ? config.area : ''}</span>
                <img className="image"  src={isWingM(config.area) ? images['37_wing_lower.png'] : ([992].includes(config.area)) ?  images['22_boarding_emergency_exit_lower.png'] :  ([11,12,998].includes(config.area)) ?  images['21_emergency_exit_lower.png'] : ''} alt="" />
              </div>
              )
            }
          })}
        </div>
    );
    }

  }
  else {
    return (
      <div className="tabu">
        {newData.map(function(config) {
            return (
              <div className="rows">
              <img className="image" src={([1,999].includes(config.area)) ? images['21_emergency_exit_upper.png'] : ''} alt="" />
              <span className="area">{isNumber(config.area) ? config.area : ''}</span>
              <Column colData={config} />
              <span className="area">{isNumber(config.area) ? config.area : ''}</span>
              <img className="image"  src={([998].includes(config.area)) ?  images['22_boarding_emergency_exit_lower.png'] :  ([999].includes(config.area)) ?  images['21_emergency_exit_lower.png'] : ''} alt="" />
            </div>
            )
        })}
      </div>
  );
  }
}



export default SeatMap;


