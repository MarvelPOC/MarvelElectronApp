import React, { Component } from 'react';
import './VacancyResultTable.css'
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PropTypes from 'prop-types';
import Button from '../common/keyboard/Button';
import InputText from '../common/keyboard/InputText';
import {Dropdown} from 'primereact/dropdown';
import { vacancyResultConstants, activePageConstants } from '../../constants';
import { airportSearchActions, activePageActions} from '../../action';

class VacancyResultTable extends Component{

    constructor(props) {
        super(props);
        this.fareLength =6;
        this.paginationData =[];
        this.state = {
            t:this.props.t,
            listNo:"",
            class1:"",
            class2:"",
            class3:"",
            class4:"",
            seatCount:"",
            fareFilter:"",
            fareFilterOptions:[]
        };
        this.routeTemplate = this.routeTemplate.bind(this);
        this.processDataForTable = this.processDataForTable.bind(this);
        this.premiumFareTemplate = this.premiumFareTemplate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fareFilterTemplate = this.fareFilterTemplate.bind(this);
        this.filterFares = this.filterFares.bind(this);
        this.onClickedFareForward = this.onClickedFareForward.bind(this);
        this.onClickedFareBackward = this.onClickedFareBackward.bind(this);
        this.processRawData = this.processRawData.bind(this);
        this.onClickedflightNextPage = this.onClickedflightNextPage.bind(this);
        this.onClickedflightPrevPage = this.onClickedflightPrevPage.bind(this);
        this.onClickedClearButton = this.onClickedClearButton.bind(this);
        this.researchFlights = this.researchFlights.bind(this);
        this.onseatCountChange = this.onseatCountChange.bind(this);
        
    }

    static propTypes = {
        id: PropTypes.string,
        data: PropTypes.any,
        name: PropTypes.string.isRequired,
        t:PropTypes.func,
        searchObj: PropTypes.object,
        history: PropTypes.any,
        originDestinationRender:PropTypes.func,
        fareFilterUpdFun:PropTypes.func,
        seatCountUpdFun:PropTypes.func
    }

    static defaultProps = {
        name:"",
        t:null,
        searchObj:null,
        history:null,
        originDestinationRender:null,
        fareFilterUpdFun:null,
        seatCountUpdFun:null
    };

    setFareOptions(){
        var fareFilterOptions = [
            {id:1 ,label:this.props.t('fareFilterOptions.all')},
            {id:2 ,label:this.props.t('fareFilterOptions.premiumClass')},
            {id:3 ,label:this.props.t('fareFilterOptions.premiumClassFlex')},
            {id:4 ,label:this.props.t('fareFilterOptions.premiumClassNonFlex')},
            {id:5 ,label:this.props.t('fareFilterOptions.normalSeat')},
            {id:6 ,label:this.props.t('fareFilterOptions.normalClassFlex')},
            {id:7 ,label:this.props.t('fareFilterOptions.normalClassNonFlex')}
        ];
        this.setState({
            fareFilterOptions:fareFilterOptions
        });
    }

    fareFilterTemplate(option) {
        if(option) {
            return (
                <div className="p-clearfix">
                    <span className="fare-drop-down-option">{option.label}</span>
                </div>
            );
        }
    }

    filterFares(e) {
        this.setFareList(this.paginationData[this.flightPage-1],e.value);
        this.farePage=1;
        this.processDataForTable(this.paginationData[this.flightPage-1]);
        this.farePageMax =Math.ceil(this.fareList.length/this.fareLength);
        if(this.props.fareFilterUpdFun) {
            let filterVal = "A";
            if(e.value ===2 || e.value ===3 || e.value ===4) {
                filterVal ="PY" ;
            } else if(e.value ===5 || e.value ===6 || e.value ===7) {
                filterVal ="Y" ;
            }
            this.props.fareFilterUpdFun(filterVal);
        }
        this.setState({
            data : this.tableData,
            fareFilter: e.value
        });
        setTimeout(() => {
            document.getElementById("listNo").focus();
        }, 100);
        
       
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onseatCountChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
        if(this.props.seatCountUpdFun){
            this.props.seatCountUpdFun(e.target.value);
        }

    }

    flightNoTemplate(rowData, column) {
        let flightNumWithCarrier = rowData.carrierCode+rowData.fltNbr;
        let operatorInfo ="";
        if(rowData.segmentCode) {
            operatorInfo = rowData.segmentCode+rowData.t('vacancyResult.dataTable.operation');
        }
       return (
            <div>
                <div className ="result-flightNoModelNo-column-span">{flightNumWithCarrier }</div>
                <div className ="result-flightNoModelNo-column-span margin-top-10" >{operatorInfo} </div>
                
            </div>
        );
    }




    routeTemplate(rowData, column) {
        let depClassname ="result-airport-column-div";
        if(vacancyResultConstants.BLUEAIRPORTS.includes(rowData.departureAirportCode)) {
            depClassname = "result-airport-column-div font-color-blue";
        } else if (vacancyResultConstants.PINKAIRPORTS.includes(rowData.departureAirportCode)) {
            depClassname = "result-airport-column-div font-color-violet";
        }
        let arrClassname ="result-airport-column-div margin-top-10";
        if(vacancyResultConstants.BLUEAIRPORTS.includes(rowData.arrivalAirportCode)) {
            arrClassname = "result-airport-column-div margin-top-10 font-color-blue";
        } else if (vacancyResultConstants.PINKAIRPORTS.includes(rowData.arrivalAirportCode)) {
            arrClassname = "result-airport-column-div margin-top-10 font-color-violet";
        }
        var depAirName ="";
        var arrAirName ="";
        var depAirport;
        var arrAirport;
        var depNameClass="";
        var arrNameClass="";
        var depCodeClass="";
        var arrCodeClass="";
        if(this.props.airportList && this.props.airportList.length) {
            depAirport = this.props.airportList.find(airport => airport.threeDigitCode === rowData.departureAirportCode);
            arrAirport = this.props.airportList.find(airport => airport.threeDigitCode === rowData.arrivalAirportCode);
            if(this.props.displayLanguage ==='en'){
                depAirName=depAirport.enName;
                arrAirName=arrAirport.enName;
                depNameClass="result-airport-column-name result-airport-column-name-en";
                arrNameClass ="result-airport-column-name result-airport-column-name-en";
                depCodeClass="result-airport-column-code";
                arrCodeClass="result-airport-column-code";
                
            }else{
                depAirName=depAirport.jpName;
                arrAirName=arrAirport.jpName;
                depNameClass="result-airport-column-name result-airport-column-name-jp";
                arrNameClass="result-airport-column-name result-airport-column-name-jp";
                depCodeClass="result-airport-column-code";
                arrCodeClass="result-airport-column-code";
            }
            if(rowData.departureAirportCode ==="KIX") {
                depNameClass = depNameClass +" line-height-12";
                depCodeClass = depCodeClass +" margin-top-7";
            }
            if(rowData.arrivalAirportCode ==="KIX") {
                arrNameClass = arrNameClass +" line-height-12";
                arrCodeClass = arrCodeClass +" margin-top-7";
            }
        }
        
        return (
            <div>
                <div className ={depClassname}>
                    <div  className ={depCodeClass} >{rowData.departureAirportCode }</div>
                    <div  className ={depNameClass} >{depAirName}</div>
                </div>
                <div className ={arrClassname}>
                    <div  className ={arrCodeClass} >{rowData.arrivalAirportCode }</div>
                    <div  className ={arrNameClass} >{arrAirName}</div>
                </div>
            </div>
        );
    }

    timeTemplate(rowData, column) {
        var depclassname ="result-time-column-div";
        if(rowData.departureTimeChangeFlag)  {
            depclassname ="result-time-column-div font-color-red"
        }
        var arrClassname ="result-time-column-div margin-top-10";
        if(rowData.arrivalTimeChangeFlag)  {
            arrClassname ="result-time-column-div font-color-red margin-top-10"
        }
        return (
            <div>
                <div className ={depclassname}>{rowData.departureTime }</div>
                <div className ={arrClassname}>{rowData.arrivalTime }</div>
                
            </div>
        );
    }

    modelTemplate(rowData, column) {
        let className =" result-flightNoModelNo-column-span";
        if(rowData.modelCodeChangeFlag) {
            className =" result-flightNoModelNo-column-span font-color-red";
        }
        var image = "";
        if(rowData.premiumFlag) {
            image = <img alt="" src={require('../../assets/img/dms_premium.png') } />;
        }
        return (
            <div>
                <div className ={className}>{rowData.modelCode}</div>
                <div className ="model-premium-class-indicator margin-top-10">{image} </div>
                
            </div>
        );
        
    }

    fareTemplate(rowData, column) {
        let className ="";
        let firstDivClassName ="";
        let secDivClassName ="";
        var vacancyInfo="";
        var priceInfo;
        var fareInfo;
        switch(column.field) {
            case "fare1":
                fareInfo = rowData.fareList[0];
                break;
            case "fare2":
                fareInfo = rowData.fareList[1];
                break;
            case "fare3":
                fareInfo = rowData.fareList[2];
                break;
            case "fare4":
                fareInfo = rowData.fareList[3];
                break;
            case "fare5":
                fareInfo = rowData.fareList[4];
                break;
            case "fare6":
                fareInfo = rowData.fareList[5];
                break;
            default:
                fareInfo =null;
        }
        if(fareInfo){
            vacancyInfo = fareInfo.bookingClassCode+fareInfo.availabilityStatusCode;
            priceInfo = fareInfo.fare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if(rowData.slNo % 2 === 0) {
                className =" result-fare-column-div background-light-green";
            }else{
                className =" result-fare-column-div background-light-blue";
            }
            if(fareInfo.lowest_fare_blink_flag)
                className =" result-fare-column-div background-light-red";
            
    
            if(rowData.arrivalAirportCode ==="KIX" || rowData.departureAirportCode ==="KIX")  {
                className = className+" padding-top-10";
            }


            firstDivClassName = "result-fare-display-div";
            secDivClassName = "result-fare-display-div margin-top-5";
            if(fareInfo.grayFare) {
                firstDivClassName = firstDivClassName+" blured-fare-amount";
                secDivClassName = secDivClassName+" blured-fare-amount"
            }
        } else {
            className ="result-fare-line"
        }
        return (
            <div className={className}>
                <div className ={firstDivClassName}>{vacancyInfo}</div>
                <div className ={secDivClassName}> {priceInfo}</div>
                
            </div>
        );
        
        
    }

    premiumFareTemplate(rowData, column) {
        if(rowData.premiumFareContainsFlag) {
            if(this.props.displayLanguage ==='en'){
                let mealLabel = rowData.t('vacancyResult.dataTable.meal');
                if(rowData.premiumFlag ===2)
                    mealLabel = rowData.t('vacancyResult.dataTable.liteMeal');
                return (
                    <div >
                        <div className ="premium-column-label"><img alt="" src={require('../../assets/img/dms_premium_new.png') } /></div>
                        <div className ="premium-column-meal-Info margin-top-5"> {mealLabel} </div>
                        
                    </div>
                );
            } else {
                let mealImg = "../../assets/img/dms_premium_meal_GOZEN.png";
                if(rowData.premiumFlag ===2) {
                    return (
                        <div >
                            <div className ="premium-column-label"><img alt="" src={require('../../assets/img/dms_premium_meal_SABO.png') } /></div>
                        </div>
                    );
                } else {
                    return (
                        <div >
                            <div className ="premium-column-label"><img alt="" src={require('../../assets/img/dms_premium_meal_GOZEN .png') } /></div>
                        </div>
                    );
                }
                
                
            }
        } else {
            return (
                <div >
                    <div className ="result-fare-line"></div>
                </div>
            );
        }
    }

    getFareLabel( fareName , noOfSeats) {

        let fareLabel="";
        if(noOfSeats) {
            if(vacancyResultConstants.ALLFAREHEADERS.includes(fareName)) {
                fareLabel = fareName;
            } else  {
                let modFareName = fareName.substring(0,fareName.length-1);
                if(vacancyResultConstants.ALLFAREHEADERS.includes(modFareName)) {
                    fareLabel = modFareName;
                }
            }
        } else {
            fareLabel= fareName;
        }
        return fareLabel;
    }

    getFareName(fareName) {
        let label = vacancyResultConstants.FARELABELS[fareName];
        if (label) {
            label="vacancyResult.dataTable.fareNames."+label;
            label = this.props.t(label);
        } else if (!this.props.searchObj.bookSeats) {
            label = vacancyResultConstants.FARELABELS[fareName.substring(0,fareName.length-1)];
            label="vacancyResult.dataTable.fareNames."+label;
            var subFareLabel = vacancyResultConstants.FARELABELS[fareName.substring(fareName.length-1 , fareName.length)]
            subFareLabel="vacancyResult.dataTable.fareNames."+subFareLabel;
            label = this.props.t(label) + this.props.t(subFareLabel) ;
        }
        return label;
    }

    getIfAlreadyIncludes(fareList,fareIdentifierLabel) {
        var index =-1;
        fareList.some(function(entry,i) {
            if(entry.displayName === fareIdentifierLabel ) {
                index = i;
                return true;
            }

        });
        return index;
    }

    setFareList(resultData,filterValue) {
        var fareList=[];
        var fareFilterList = this.getFareFilterArray(filterValue);
        var getIfAlreadyIncludes = this.getIfAlreadyIncludes;
        var getFareLabel = this.getFareLabel;
        var noOfSeats = this.props.searchObj.bookSeats ;
        var fareIdentifierLabel;
        var existingFareIndex;
        var fareObj;
        var farePriority ;
        resultData.forEach(function(flightInfo) {
            flightInfo.fareInformations.forEach(function(fareInfo) {
                fareIdentifierLabel = getFareLabel(fareInfo.fareName,noOfSeats);
                existingFareIndex = getIfAlreadyIncludes(fareList,fareIdentifierLabel);

                if(fareInfo.bookingClassCode && (fareFilterList.length === 0 || fareFilterList.includes(fareInfo.fareName) || fareFilterList.includes(fareInfo.fareName.substring(0,fareInfo.fareName.length-1)) )) {
                    farePriority = vacancyResultConstants.FAREPRIORITY[fareIdentifierLabel];
                    if (!farePriority) {
                        farePriority = vacancyResultConstants.FAREPRIORITY[fareIdentifierLabel.substring(0,fareIdentifierLabel.length -1)];
                    }
                    fareObj={
                        displayName :fareIdentifierLabel,
                        priorityOrder:farePriority
                    }
                    if (-1 === existingFareIndex) {
                        fareList.push(fareObj);
                    }
                    
                }
            });
        });
        this.fareList = fareList;
        this.fareList.sort(function(a, b){
            return a.priorityOrder-b.priorityOrder;
            
        })
    }
  
    setPremiumFareDetails (resultData) {
        var premiumModelExists = false;
        var fareLength =6;
        resultData.some(function(flightInfo) {
            if(flightInfo.premiumFlag) {
                premiumModelExists = true;
                fareLength =5;
                return true;
            }
        });
        this.premiumModelExists = premiumModelExists;
        this.fareLength = fareLength;
    }

    getFareFilterArray(fareFilter) {
        var fareList=[];
        if(fareFilter===2)
            fareList = vacancyResultConstants.PREMIUMFARES;
        else if(fareFilter===3)
            fareList = vacancyResultConstants.PREMIUMFLEX;
        else if(fareFilter===4)
            fareList = vacancyResultConstants.PREMIUMNONFLEX;
        else if(fareFilter===5)
            fareList = vacancyResultConstants.ECONOMYFARES;
        else if(fareFilter===6)
            fareList = vacancyResultConstants.ECONOMYFLEX;
        else if(fareFilter===7)
            fareList = vacancyResultConstants.ECONOMYNONFLEX;
        return fareList;
    }   

    createFareObj(fareInfo, noOfSeats){
        var fareObj = {};
        var availabilityCount = 0;
        fareObj.fareName = fareInfo.fareName;
        fareObj.bookingClassCode = fareInfo.bookingClassCode;
        fareObj.availabilityStatusCode = fareInfo.availabilityStatusCode;
        fareObj.lowest_fare_blink_flag = fareInfo.lowest_fare_blink_flag;
        fareObj.fare = fareInfo.fare;
        fareObj.grayFare =  false;
        if(fareInfo.availabilityStatusCode && fareInfo.availabilityStatusCode !=="C" && fareInfo.availabilityStatusCode !=="L") {
            availabilityCount=parseInt(fareInfo.availabilityStatusCode);
        } else {
            fareObj.grayFare = true;
        }
        if(noOfSeats && parseInt(noOfSeats) >  availabilityCount) {
            fareObj.grayFare = true;
        }
        fareObj.availabilityCount = availabilityCount;
        return  fareObj;
    }
  
    processDataForTable(resultData) {
        this.premiumFarePresent = false;
        var tableData =[];
        var flightObj;
        var fareloopStart;
        var fareloopEnd;
        var t = this.props.t;
        var getFareLabel = this.getFareLabel;
        var createFareObjFun = this.createFareObj;
        var fareList = this.fareList;
        var noOfSeats = this.props.searchObj.bookSeats;
        var secFareObj;
        if(resultData) {
            fareloopStart = (this.farePage-1)*this.fareLength;
            fareloopEnd = this.farePage * this.fareLength;
            if(fareloopEnd > this.fareList.length) {
                fareloopEnd = this.fareList.length;
            }
            resultData.forEach(function(flightInfo,i) {
                flightObj ={};
                flightObj.t = t;
                flightObj.slNo = i+1;
                flightObj.carrierCode = flightInfo.carrierCode;
                flightObj.fltNbr = flightInfo.fltNbr;
                flightObj.segmentCode = flightInfo.segmentCode;
                flightObj.departureAirportCode = flightInfo.departureAirportCode;
                flightObj.arrivalAirportCode = flightInfo.arrivalAirportCode;
                flightObj.departureTime = flightInfo.departureTime.substring(0,5);
                flightObj.arrivalTime = flightInfo.arrivalTime.substring(0,5);
                flightObj.departureTimeChangeFlag = flightInfo.departureTimeChangeFlag;
                flightObj.arrivalTimeChangeFlag = flightInfo.arrivalTimeChangeFlag;
                flightObj.modelCode = flightInfo.modelCode;
                flightObj.premiumFlag = flightInfo.premiumFlag;
                flightObj.modelCodeChangeFlag = flightInfo.modelCodeChangeFlag;
                flightObj.fareList=[];
                flightObj.premiumFareContainsFlag = false;
                var index=0;
                for (var j=fareloopStart;j<fareloopEnd ;j++) {
                    var fareObj =null;
                    flightInfo.fareInformations.forEach(function(fareInfo) {
                        secFareObj = null;
                        var fareIdentifierLabel = getFareLabel(fareInfo.fareName,noOfSeats);
                        if(fareInfo.bookingClassCode && fareIdentifierLabel === fareList[j].displayName ){
                            if(fareObj) {
                                secFareObj = createFareObjFun(fareInfo, noOfSeats);
                                if(fareObj.grayFare && fareObj.availabilityCount < secFareObj.availabilityCount) {
                                    fareObj = secFareObj;
                                } else if (!fareObj.grayFare && !secFareObj.grayFare && fareObj.fare && secFareObj.fare) {
                                    if(parseInt(secFareObj.fare) < parseInt(fareObj.fare)) {
                                        fareObj = secFareObj;
                                    }
                                }
                                
                            } else {
                                fareObj = createFareObjFun(fareInfo, noOfSeats);
                                
                            }
                        }
                    });

                   
                    if(fareObj) {
                        if(!flightObj.premiumFareContainsFlag && vacancyResultConstants.PREMIUMFARES.includes(fareObj.fareName)) {
                            flightObj.premiumFareContainsFlag =true;
                        }
                        flightObj.fareList[index] =fareObj;
                    }else{
                        flightObj.fareList[index] =null;
                    }
                    index =index +1;

                }
                tableData.push(flightObj);
            });
        }
        this.tableData= tableData;
        this.dynamicColumns =[];
        this.dynamicColumns.push(<Column field="slNo" headerClassName ="result-SlNo-column-header-def" bodyClassName ="result-SlNo-column" />);
        this.dynamicColumns.push(<Column field="fltNbr"  headerClassName ="result-flightNo-column-header-def" body={this.flightNoTemplate}  bodyClassName ="result-flightNo-column" />);
        this.dynamicColumns.push(<Column field="departureAirportCode" headerClassName ="result-route-column-header-def" body={this.routeTemplate}  bodyClassName ="result-route-column"/>);
        this.dynamicColumns.push(<Column field="departureTime" headerClassName ="result-time-column-header-def" body={this.timeTemplate}  bodyClassName ="result-time-column"  />);
        this.dynamicColumns.push(<Column field="modelCode" headerClassName ="result-model-column-header-def" body={this.modelTemplate} bodyClassName ="result-model-column" />);
        if(this.premiumModelExists) {
            this.dynamicColumns.push(<Column field="fare1" headerClassName ="premium-fare-header-def" body={this.premiumFareTemplate}  bodyClassName ="result-fare-column" />);
        } 
        this.dynamicColumns.push(<Column field="fare1" body={this.fareTemplate} headerClassName ="result-fare-header-def" bodyClassName ="result-fare-column" />);
        this.dynamicColumns.push(<Column field="fare2" body={this.fareTemplate}  headerClassName ="result-fare-header-def" bodyClassName ="result-fare-column" />);
        this.dynamicColumns.push(<Column field="fare3" body={this.fareTemplate}  headerClassName ="result-fare-header-def" bodyClassName ="result-fare-column"  />);
        this.dynamicColumns.push(<Column field="fare4" body={this.fareTemplate}  headerClassName ="result-fare-header-def" bodyClassName ="result-fare-column"  />);
        this.dynamicColumns.push(<Column field="fare5" body={this.fareTemplate}  headerClassName ="result-fare-header-def" bodyClassName ="result-fare-column"  />);
        if(!this.premiumModelExists) {
            this.dynamicColumns.push(<Column field="fare6" body={this.fareTemplate} headerClassName ="result-fare-header-def"  bodyClassName ="result-fare-column" />);
        }
    }

    compareDepartureTime(firstDepTime , secDepTime , date){
        var aDepHour = parseInt(firstDepTime.split(":")[0]);
        var aDepMin = parseInt(firstDepTime.split(":")[1]);
        var bDepHour = parseInt(secDepTime.split(":")[0]);
        var bDepMin = parseInt(secDepTime.split(":")[1]);
        var dateA=new Date(date.getFullYear(),date.getMonth(),date.getDate(),aDepHour,aDepMin);
        var dateB=new Date(date.getFullYear(),date.getMonth(),date.getDate(),bDepHour,bDepMin);
        return dateA-dateB //sort by date ascending
    }

    getSortedData (data) {
        let date = this.searchDate;
        let compareFun = this.compareDepartureTime;
        data.sort(function(a, b){
            if(a.departureTime && b.departureTime) {
                return compareFun(a.departureTime,b.departureTime,date);
            } else{
                return -1;
            }
        })
        return data;
    }

    componentDidMount() {
     
    }
    getDefaultFlightIndex(flightData) {
        let isFlightNumSearch = this.props.searchObj.isFlightNumSearch;
        let searchFltNbr =this.props.searchObj.fltNbr;
        let compareFun = this.compareDepartureTime;
        let originDestiFunction = this.props.originDestinationRender;
        var defIndex = -1;
        let searchDepTime;
        if(isFlightNumSearch && searchFltNbr){
            let filteredFlight = flightData.filter(function (flight) {
                return flight.fltNbr === searchFltNbr;
            });
            if(filteredFlight && filteredFlight.length >0) {
                searchDepTime = filteredFlight[0].departureTime;
                if(originDestiFunction) {
                    originDestiFunction(filteredFlight[0].departureAirportCode,filteredFlight[0].arrivalAirportCode);
                }
            }
        } else if (this.props.searchObj.depTime) {
            searchDepTime = this.props.searchObj.depTime;
        }


        if(searchDepTime) {
            flightData.some(function(flight,index) {
                if ( defIndex===-1 ) {
                    if(!searchFltNbr && parseInt(searchDepTime.split(":")[0]) >= 18) {
                        searchDepTime="18:00";
                    }
                    let dateDiff = compareFun(flight.departureTime , searchDepTime , new Date());
                    if(dateDiff >= 0) {
                        defIndex = index;
                        return true;
                    }
                   
                }
            });
        }
        return defIndex;
    }


    setDataForNextPage(flightData,start,end) {
        const displayWeightage =11;
        let paginationData = [];
        let airportCodeList = this.airportCodeList;
        let pageFlights =[];
        let totalWeightage =0;
        let weightage =0;
        var flight;
        for(var i=start;i<end;i++) {
            flight=flightData[i];
        
            // setting data for pagination
            if(flight.premiumFlag)
                weightage =2;
            else 
                weightage =1;
            if(totalWeightage + weightage > displayWeightage) {
                paginationData.push(pageFlights);
                pageFlights = [];
                totalWeightage =0;
            }
            totalWeightage =totalWeightage + weightage;
            pageFlights.push(flight);

            //setting airport data
            if(!airportCodeList.includes(flight.departureAirportCode)) {
                airportCodeList.push(flight.departureAirportCode);
            }
            if(!airportCodeList.includes(flight.arrivalAirportCode)) {
                airportCodeList.push(flight.arrivalAirportCode);
            }

        }
        paginationData.push(pageFlights);
        return paginationData;
        
    }


    setDataForPreviousPages(flightData,start,end) {
        const displayWeightage =11;
        let paginationData = [];
        let airportCodeList = this.airportCodeList;
        let pageFlights =[];
        let totalWeightage =0;
        let weightage =0;
        var flight;

        for(var i=start;i>=end;i--) {
            flight=flightData[i];
        
            // setting data for pagination
            if(flight.premiumFlag)
                weightage =2;
            else 
                weightage =1;
            if(totalWeightage + weightage > displayWeightage) {
                pageFlights.reverse();
                paginationData.push(pageFlights);
                pageFlights = [];
                totalWeightage =0;
            }
            totalWeightage =totalWeightage + weightage;
            pageFlights.push(flight);

            //setting airport data
            if(!airportCodeList.includes(flight.departureAirportCode)) {
                airportCodeList.push(flight.departureAirportCode);
            }
            if(!airportCodeList.includes(flight.arrivalAirportCode)) {
                airportCodeList.push(flight.arrivalAirportCode);
            }

        }
        pageFlights.reverse();
        paginationData.push(pageFlights);
        paginationData.reverse();
        return paginationData;
    }

    setDataForDefaultPage (flightData, defaultFlightIndex) {
        var nextPageData = this.setDataForNextPage(flightData,defaultFlightIndex-1,flightData.length);
        var previousPageData = this.setDataForPreviousPages(flightData,defaultFlightIndex-2,0);
        this.flightPage = previousPageData.length+1;
        this.paginationData = previousPageData.concat(nextPageData);
    }

    processRawData(flightData) {
        let defaultFlightIndex = this.getDefaultFlightIndex(flightData);
        if(defaultFlightIndex <= 1) {
            this.paginationData = this.setDataForNextPage(flightData,0,flightData.length);
            this.flightPage = 1;
        } else {
           this.setDataForDefaultPage(flightData, defaultFlightIndex);
        }
    }
    componentWillUnmount(){
        this.paginationData=[];
    }

    componentDidUpdate(prevProps, prevState) {
       if(JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data) || this.paginationData.length ===0){
            var defaultFareFilter = 1;
            if (this.state.fareFilter) {
                defaultFareFilter = this.state.fareFilter;
            }else if(this.props.searchObj.bookingClass) {
                if("Y" ===this.props.searchObj.bookingClass){
                    defaultFareFilter = 5;
                } else if ("PY" ===this.props.searchObj.bookingClass) {
                    defaultFareFilter = 2;
                }
            }
            
            this.setFareOptions();
            this.searchDate = new Date()//to be modified with real obj from search obj
            this.sortedData = this.getSortedData(this.props.data);
            this.paginationData=[];
            this.airportCodeList =[];
            this.processRawData(this.sortedData);
            if(this.airportCodeList.length){
                this.props.getAirportList(this.airportCodeList);
            }
            this.setPremiumFareDetails(this.paginationData[this.flightPage-1]);
            this.setFareList(this.paginationData[this.flightPage-1],defaultFareFilter);
            this.farePage=1;
            this.processDataForTable(this.paginationData[this.flightPage-1]);
            this.farePageMax =Math.ceil(this.fareList.length/this.fareLength);
            this.setState({
                data : this.tableData,
                fareFilter:defaultFareFilter,
                seatCount:this.props.searchObj.bookSeats
            });
            document.getElementById("listNo").focus();
        } else if (prevProps.displayLanguage !== this.props.displayLanguage) {
            this.setFareOptions();
        }
    }

    renderPremiumColumnHeader =()=>{
        if(this.premiumModelExists) {
            return(
                <div className ="premium-fare-header">
                    <div className ="premium-fare-header-content"><img alt="" src={require('../../assets/img/dms_premium_fareTitle.png') } className="premium-fare-image" /> </div>
                </div>
            )
        } else {
            return("")
        }
    }

    renderFareColumnHeader =()=>{
        let dynamicHeaders = [];
        var className="result-fare-header-content";
        if(this.fareList && this.fareList.length){
            let fareloopStart = (this.farePage-1)*this.fareLength;
            let fareloopEnd = this.farePage * this.fareLength;
            if(fareloopEnd > this.fareList.length) {
                fareloopEnd = this.fareList.length;
            }
            var index =0;
            for (var j=fareloopStart;j<fareloopEnd ;j++) {
                let fareName = this.getFareName(this.fareList[j].displayName);
                if(vacancyResultConstants.REDFARES.includes(this.fareList[j].displayName) || vacancyResultConstants.REDFARES.includes(this.fareList[j].displayName.substring(0,this.fareList[j].displayName.length-1))) {
                    className="result-fare-header-content red-background result-fare-header-content"+this.fareLength+index;
                } else{
                    className="result-fare-header-content blue-background result-fare-header-content"+this.fareLength+index;
                }

                dynamicHeaders.push(<div class ="result-fare-header" > <div class ={className}> <div className="fare-header-label-mod">{fareName}</div></div></div>);
                index ++;
            }
        }
        return dynamicHeaders;
    }

    onClickedFareBackward(event) {
        this.farePage--;
        this.loadDataOnFareChange();
    }

    loadDataOnFareChange() {
        this.processDataForTable(this.paginationData[this.flightPage-1]);
        this.farePageMax =Math.ceil(this.fareList.length/this.fareLength);
        this.setState({
            data : this.tableData
        });
        document.getElementById("listNo").focus();
    }
    onClickedFareForward(event) {
        this.farePage++;
        this.loadDataOnFareChange();
    }
    onClickedflightNextPage(event){
        this.flightPage++;
        this.loadDataOnPagination();
       
    }
    onClickedflightPrevPage(event){
        this.flightPage--;
        this.loadDataOnPagination();
    }
    loadDataOnPagination() {
        this.setPremiumFareDetails(this.paginationData[this.flightPage-1]);
        this.setFareList(this.paginationData[this.flightPage-1],this.state.fareFilter);
        this.loadDataOnFareChange();
    }

    onClickedClearButton(){
        this.setState({
            listNo:"",
            class1:"",
            class2:"",
            class3:"",
            class4:"",
        });
    }

    researchFlights() {
        this.props.setPage(activePageConstants.VACANCY_SEARCH);
        this.props.history.push("/vacancy");
    }
    
    render(){
        const { t } = this.props;
        return(
            <div className ="result-display-container">
                <div className="vacancy-result-table-container">
                    <div className ="fare-filter-container">
                        <Dropdown value={this.state.fareFilter} editable={true} optionValue="id" options={this.state.fareFilterOptions} onChange={this.filterFares} itemTemplate={this.fareFilterTemplate} className="fare-drop-down"/>
                    </div>
                    <div className="result-table-custom-header">
                        <div className="result-SlNo-column-header result-normal-column-header">
                            <label className="result-table-header-label">{this.props.t('vacancyResult.dataTable.slNo')}</label>
                        </div>
                        <div className="result-flightNo-column-header result-normal-column-header">
                            <label className="result-table-header-label">{this.props.t('vacancyResult.dataTable.fltNbr')}</label>
                        </div>
                        <div className="result-route-column-header result-normal-column-header">
                            <label className="result-table-header-label">{this.props.t('vacancyResult.dataTable.route')}</label>
                        </div>
                        <div className="result-time-column-header result-normal-column-header">
                            <label className="result-table-header-label">{this.props.t('vacancyResult.dataTable.time')}</label>
                        </div>
                        <div className="result-model-column-header result-normal-column-header">
                            <label className="result-table-header-label">{this.props.t('vacancyResult.dataTable.model')}</label>
                        </div>
                        {this.renderPremiumColumnHeader()}
                        {this.renderFareColumnHeader()}
                    </div>
                    <div className="result-table-custom-header-dummy">

                    </div>      
                    <div className="result-table-container">
                        <DataTable value={this.state.data}>
                        {this.dynamicColumns} 
                        </DataTable>
                    </div >
                    <div className="result-table-scroll-container">

                    </div>
                </div>
                <div className="vacancy-result-table-footer">
                    <div className="vacancy-result-table-footer-button"><Button id="changeSearchCondition" hotkey="alt+a" pageId={activePageConstants.VACANCY_RESULT} label={t('vacancyResult.dataTable.searchCondition')} className="marvel-primary reSearch-button" size={6}  onClick={this.researchFlights}/></div>
                    <div className="vacancy-result-table-footer-button" ><Button id="connectingFlight" disabled ={true} label={t('vacancyResult.dataTable.connectingFlightSearch')} className="marvel-primary connection-flight-button" size={6}  onClick={this.dummyFun}/></div>
                    <div class="result-footer-icon-container"><img alt="" src={require('../../assets/img/icn_FLIGHT.png') }  className="result-footer-icon"/> </div>
                    <div className="vacancy-result-table-footer-button"><Button id="vacancyResultNxtFltButton"  label="(N̲)" hotkey="alt+n" pageId={activePageConstants.VACANCY_RESULT} icon="pi pi-arrow-down" className="marvel-primary nextprev-flight-button"  size={6} disabled={this.flightPage === this.paginationData.length}  onClick={this.onClickedflightNextPage} /></div>
                    <div className="vacancy-result-table-footer-button"><Button id="vacancyResultPreFlightButton"  label="(P̲)" hotkey="alt+p" pageId={activePageConstants.VACANCY_RESULT} icon="pi pi-arrow-up" className="marvel-primary nextprev-flight-button" size={6} disabled={this.flightPage === 1} onClick={this.onClickedflightPrevPage} /></div>
                    <div class="result-footer-icon-container"><img alt="" src={require('../../assets/img/icn_YEN.png') } className="result-footer-icon" /> </div>
                    <div className="vacancy-result-table-footer-button"><Button id="vacancyResultPreFareButton"  label="(X̲)"  hotkey="alt+x" pageId={activePageConstants.VACANCY_RESULT} icon="pi pi-arrow-left" className="marvel-primary nextprev-yen-button" size={6} disabled={this.farePage === 1} onClick={this.onClickedFareBackward}/></div>
                    <div className="vacancy-result-table-footer-button"><Button id="vacancyResultNxtFareButton"  label="(Y̲)"  hotkey="alt+y" pageId={activePageConstants.VACANCY_RESULT} icon="pi pi-arrow-right" className="marvel-primary nextprev-yen-button" size={6} disabled={this.farePage === this.farePageMax}  onClick={this.onClickedFareForward}/></div>
                    <div className="vacancy-result-table-footer-button"> <Button id="vacancyResultPaxDetailsButton" hotkey="alt+i" pageId={activePageConstants.VACANCY_RESULT} label={t('vacancyResult.dataTable.passengerList')} className="marvel-primary paxlist-button" size={6} onClick={this.dummyFun}/></div>
                    <div className="vacancy-result-table-footer-button-dum"> <Button id="vacancyResultDummyButton" hotkey="alt+i" pageId={activePageConstants.VACANCY_RESULT} label="  " className="marvel-primary res-foot-dum-button" size={6} disabled={true} onClick={this.dummyFun}/></div>
                </div>


                <div className="quick-action-container">
                    <div className ="clear-button-div">
                        <Button id="vacancyResultClearButton" hotkey="alt+l" pageId={activePageConstants.VACANCY_RESULT} label={t('vacancyResult.dataTable.clear')} className="marvel-primary" size={6}  onClick={this.onClickedClearButton}/>
                    </div>
                   
                    
                   <div className ="float-right">
                   
                    <div className ="quick-fields-div">
                        <div className="label-element">
                            <label>{t('vacancyResult.dataTable.listNumber')}</label>
                        </div>
                        <InputText id="listNo" name="listNo" className="text-input line-number" size={1} value={this.state.listNo} onChange={this.onChange} disabled={false}/>
                        <div className="label-element">
                            <label>{t('vacancyResult.dataTable.class')}</label>
                        </div>
                        <InputText id="class1" name="class1" className="text-input" size={1} value={this.state.class1} onChange={this.onChange} disabled={false}/>
                        <InputText id="class2" name="class2" className="text-input" size={1} value={this.state.class2} onChange={this.onChange} disabled={false}/>
                        <InputText id="class3" name="class3" className="text-input" size={1} value={this.state.class3} onChange={this.onChange} disabled={false}/>
                        <InputText id="class4" name="class4" className="text-input" size={1} value={this.state.class4} onChange={this.onChange} disabled={false}/>
                    </div>
                    <div className ="confirm-action-div">
                        <div className="label-element">
                            <label >{t('vacancyResult.dataTable.seatCount')}</label>
                        </div>
                        <InputText id="seatCount" name="seatCount" className="text-input" size={1} value={this.state.seatCount} onChange={this.onseatCountChange} disabled={false}/>
                        <Button id="reserveBtn" className="reserve-btn" label={t('vacancyResult.dataTable.reserveFlight')} onClick={this.reserveSelection} />
                    </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    const airportList = state.airportSearchReducer.airportList;
    const displayLanguage = state.translationReducer.selectedLanguage;
    return{ airportList,displayLanguage}
}

const mapDispatchToProps=(dispatch)=>{
	return{
        getAirportList: (codeList)=>{
            dispatch(airportSearchActions.getAirports(codeList))
        },
        setPage: (pageId) =>{
            dispatch(activePageActions.setPage(pageId))
        }
	}
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(VacancyResultTable));
