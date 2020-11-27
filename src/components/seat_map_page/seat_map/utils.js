import { useRef, useEffect, useState } from 'react';
import { TYPE } from './ENUM';

const isNumber = (num) => typeof num === 'number';
const isWing = (num) => typeof num === 'number' && [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,994].includes(num);
const isWingM = (num) => typeof num === 'number' && [9,10,13,14,15,16].includes(num);

const useNormalizedData = (data) => {
  const activeCabinIndex = useRef(0);
  const [normalizedData, setNormalizedData] = useState([]);
  useEffect(() => {
    const temp = data.reduce((acc, colData, index) => {
      if (colData.type === TYPE.CABIN) {
        activeCabinIndex.current = index;
        acc.push({
          ...colData,
          bgColor: colData['bgColor'],
        });
      } else {
        let count = 0;
        const updatedRow = data[activeCabinIndex.current].data.map((val, rowIndex) => {
          // empty col
          if (val === '|') {
            count += 1;
            return '';
          }
            return colData.data[rowIndex - count];
        });
        acc.push({
          ...colData,
          data: updatedRow,
          bgColor: data[activeCabinIndex.current]['bgColor'],
        });
      }
      return acc;
    }, []);
    setNormalizedData(temp);
  }, [data]);
  return normalizedData;
};

export { isNumber, useNormalizedData, isWing, isWingM };
