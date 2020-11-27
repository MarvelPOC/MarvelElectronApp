import { errorConstants } from '../constants/index';

export const airportSearchService = {
    getAirportInfo,
    searchForAirport,
    getAirportsForCodeList
};

function getAirportInfo(){
    let airportInfo = JSON.parse(localStorage.getItem("airportInfo")) || [];
    if(airportInfo !==null && typeof airportInfo !== 'undefined'){
        let countryData = initDisplayCountries(airportInfo.regionInfo);
        let airportData = groupAirportData(airportInfo.airportList);
        airportInfo['countryData'] = countryData;
        airportInfo['airportData'] = airportData;
        return Promise.resolve(airportInfo);
    } else{
        return Promise.reject('Error while fetching from Local Storage');
    }
}

function searchForAirport(searchInfo){
    let airportInfo = JSON.parse(localStorage.getItem("airportInfo")) || [];
    let searchType = searchInfo.searchType;
    let searchInput = searchInfo.searchInput;
    let selectedSideOption = searchInfo.selectedSideOption;
    let resultAirports = [];
    let error = [];
    return new Promise((resolve, reject) => {
        if(searchType === 'partialMatch'){
            resultAirports = searchByName(airportInfo, searchInput, selectedSideOption);
        } else if (searchType === 'prefixMatch'){
            resultAirports = searchByLeftName(airportInfo, searchInput, selectedSideOption);
        }else if (searchType === 'codeMatch'){
            resultAirports = searchByCode(airportInfo, searchInput, selectedSideOption);
        }
        if(resultAirports.length){
            const japanIds = [239,240,241,242,243,244,245];
            let filterAirport = [];
            let japanCountry = { 
                airport: [],
                displayFlag: "1",
                enName: "Japan",
                id: 239,
                jpName: "日本",
                threeDigitCode: "JPN",
                twoDigitCode: "JP" }

            resultAirports.forEach((country)=>{
                if(japanIds.includes(country.id)){
                    country.airport.forEach((air)=>{
                        japanCountry.airport.push(air);
                    });
                }
            });

            if(japanCountry.airport.length){
                filterAirport = resultAirports.filter((airport) =>{
                    return !japanIds.includes(airport.id);
                });    
                filterAirport.push(japanCountry);
            } else {
                filterAirport = resultAirports;
            }

            let sortedResult =  filterAirport.sort((a, b)=>{
                let x = a.enName.toUpperCase(),
                    y = b.enName.toUpperCase();
                return x === y ? 0 : x > y ? 1 : -1;
            });
            
            resolve(sortedResult);
        } else{
            error.push(errorConstants.SELECTAIRPORT002)
            reject(error);
        }
    });
}

function searchByCode(airportInfo, code, selectedSideOption){
    let selectedRegion = selectedSideOption.regionCode;
    let selectedCountry = selectedSideOption.countryCode;
    let allSelected = selectedSideOption.allRegion;
    let countryArray = [];
    if(selectedRegion){
        let reduceRegion = airportInfo.regionInfo.filter(({mapKey})=> mapKey === selectedRegion);
        countryArray = reduceRegion[0].displayCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({threeDigitCode})=> threeDigitCode.toLowerCase().includes(code.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(selectedCountry){
        let reduceCountry = airportInfo.displayCountries.filter(({threeDigitCode})=> threeDigitCode === selectedCountry);
        countryArray =reduceCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({threeDigitCode})=> threeDigitCode.toLowerCase().includes(code.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(allSelected){
        let tempArray = airportInfo.regionInfo.map((region) =>{
            return region.displayCountry.reduce((accumulator, country) => {
                var filtered = country.airport.filter(({threeDigitCode})=> threeDigitCode.toLowerCase().includes(code.toLowerCase()));
                if (filtered.length) {
                    accumulator.push(Object.assign({}, country, {airport: filtered}));
                }
                return accumulator;
            }, []);
            }).filter(e=> e.length);

        let otherTempArray = airportInfo.regionInfo.map((region) =>{
            return region.otherCountry.reduce((accumulator, country) => {
                var filtered = country.airport.filter(({threeDigitCode})=> threeDigitCode.toLowerCase().includes(code.toLowerCase()));
                    if (filtered.length) {
                        accumulator.push(Object.assign({}, country, {airport: filtered}));
                        }
                        return accumulator;
                    }, []);
                }).filter(e=> e.length);

        let finalArray = tempArray.concat(otherTempArray);
            countryArray = finalArray.reduce((accumulator, element) => {
                for(let i=0; i< element.length; i++) {
                    accumulator.push(element[i]);
                }
                return accumulator;
            }, []);
    }
    return countryArray;
}

function searchByName(airportInfo, inputName, selectedSideOption){
    let selectedRegion = selectedSideOption.regionCode;
    let selectedCountry = selectedSideOption.countryCode;
    let allSelected = selectedSideOption.allRegion;
    let countryArray = [];
    if(selectedRegion){
        let reduceRegion = airportInfo.regionInfo.filter(({mapKey})=> mapKey === selectedRegion);
        countryArray = reduceRegion[0].displayCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().includes(inputName.toLowerCase()) || jpName.toLowerCase().includes(inputName.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(selectedCountry){
        let reduceCountry = airportInfo.displayCountries.filter(({threeDigitCode})=> threeDigitCode === selectedCountry);
        countryArray = reduceCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().includes(inputName.toLowerCase()) || jpName.toLowerCase().includes(inputName.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(allSelected){
        let tempArray = airportInfo.regionInfo.map((region) =>{
                  return region.displayCountry.reduce((accumulator, country) => {
                    var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().includes(inputName.toLowerCase()) || jpName.toLowerCase().includes(inputName.toLowerCase()));
                    if (filtered.length) {
                        accumulator.push(Object.assign({}, country, {airport: filtered}));
                    }
                    return accumulator;
                    }, []);
                }).filter(e=> e.length);

        let otherTempArray = airportInfo.regionInfo.map((region) =>{
            return region.otherCountry.reduce((accumulator, country) => {
              var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().includes(inputName.toLowerCase()) || jpName.toLowerCase().includes(inputName.toLowerCase()));
              if (filtered.length) {
                  accumulator.push(Object.assign({}, country, {airport: filtered}));
              }
              return accumulator;
                }, []);
            }).filter(e=> e.length);

        let finalArray = tempArray.concat(otherTempArray);

        countryArray = finalArray.reduce((accumulator, element) => {
            for(let i=0; i< element.length; i++) {
                accumulator.push(element[i]);
            }
            return accumulator;
        }, []);
    } 
    return countryArray;
}

function searchByLeftName(airportInfo, inputName, selectedSideOption){
    let selectedRegion = selectedSideOption.regionCode;
    let selectedCountry = selectedSideOption.countryCode;
    let allSelected = selectedSideOption.allRegion;
    let countryArray = [];
    if(selectedRegion){
        let reduceRegion = airportInfo.regionInfo.filter(({mapKey})=> mapKey === selectedRegion);
        countryArray = reduceRegion[0].displayCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().startsWith(inputName.toLowerCase()) || jpName.toLowerCase().startsWith(inputName.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(selectedCountry){
        let reduceCountry = airportInfo.displayCountries.filter(({threeDigitCode})=> threeDigitCode === selectedCountry);
        countryArray = reduceCountry.reduce((accumulator, country) => {
            var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().startsWith(inputName.toLowerCase()) || jpName.toLowerCase().startsWith(inputName.toLowerCase()));
            if (filtered.length) {
                accumulator.push(Object.assign({}, country, {airport: filtered}));
            }
            return accumulator;
        }, []);
    } else if(allSelected){
        let tempArray = airportInfo.regionInfo.map((region) =>{
            return region.displayCountry.reduce((accumulator, country) => {
                var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().startsWith(inputName.toLowerCase()) || jpName.toLowerCase().startsWith(inputName.toLowerCase()));
                if (filtered.length) {
                    accumulator.push(Object.assign({}, country, {airport: filtered}));
                }
                return accumulator;
            }, []);
            }).filter(e=> e.length);

        let otherTempArray = airportInfo.regionInfo.map((region) =>{
            return region.otherCountry.reduce((accumulator, country) => {
                var filtered = country.airport.filter(({enName, jpName})=> enName.toLowerCase().startsWith(inputName.toLowerCase()) || jpName.toLowerCase().startsWith(inputName.toLowerCase()));
                if (filtered.length) {
                    accumulator.push(Object.assign({}, country, {airport: filtered}));
                }
                return accumulator;
            }, []);
            }).filter(e=> e.length);

        let finalArray = tempArray.concat(otherTempArray);

            countryArray = finalArray.reduce((accumulator, element) => {
                for(let i=0; i< element.length; i++) {
                    accumulator.push(element[i]);
                }
                return accumulator;
            }, []);
        } 
    return countryArray;
}

//For getting airports for a list of airport codes
function getAirportsForCodeList(codeList) {
    let airports =[];
    let airportInfo = JSON.parse(localStorage.getItem("airportInfo")) || [];
    return new Promise((resolve) => {
        airports = airportInfo.airportList.filter(function (airport) {
            return codeList.includes(airport.threeDigitCode);
        });
        resolve(airports);
    });
}

//For InitialLoadAirport
function groupAirportData(airportList){
    let groupAirports = airportList.reduce((groupAirport, e) => {
      let group = e.enName[0];
      if(!groupAirport[group]) {
          groupAirport[group] = {group, airport: [e]}
      }else {
          groupAirport[group].airport.push(e);
      }
      return groupAirport;
    }, {})
    return Object.values(groupAirports);
}

function initDisplayCountries(regionInfo){
  return regionInfo.filter(region=>
      'JPN' === region.mapKey
  )[0].displayCountry
}
