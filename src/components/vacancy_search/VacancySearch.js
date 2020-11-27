import React, { Component } from 'react';
import './VacancySearch.css';
import { connect } from 'react-redux';
import { airportSearchActions,  vacancySearchActions , activePageActions} from '../../action';
import { withTranslation } from 'react-i18next';
import  Button  from '../common/keyboard/Button';
import RadioButton from '../common/keyboard/RadioButton';
import InputText from '../common/keyboard/InputText';
import BreadCrumb from '../common/breadcrumb/BreadCrumb';
import { Dropdown } from '../common/dropdown/Dropdown';
import SearchHistory from '../common/search_history/SearchHistory';
import AirportSearch from '../common/airport/AirportSearch';
import Calendar from '../common/calendar/Calendar';
import Error from '../common/error/Error';
import { errorConstants, activePageConstants} from '../../constants';
import { monthValues, searchMenuTypes, timeValues } from '../../helpers/dropdown';
import SideElement from './SideElement';
import PropTypes from 'prop-types';
import {Checkbox} from 'primereact/checkbox';
import FocusLock from 'react-focus-lock';

class VacancySearch extends Component{

    constructor(props){
		super(props);
		this.state={
            searchMenuTypes: searchMenuTypes,
            dropdownMonth: monthValues,
            dropdownTime: timeValues,
            isFlightNumSearch:false,
            enquiryType:'vacantEnqFare',
            searchType:'segmentType',
            searchTypeSegmentTwo: 'not',
            dummyVariable:'',
            rowDate:'',
            departureDate:'',
            day:'',
            month:'',
            year:'',
            time:'',
            depAirport:'',
            arrAirport:'',
            flightNumCarrier:'NH',
            flightNumber:'',
            paxNumber:'',
            display:'inline-block',
            carrierType:'NH',
            bookingClass:'Y',
            searchOption:'notSpecified',
            isOpenedFirst:false,
            error:[]
        }
    }

    componentDidMount() {
        this.props.getAirportInfo();
        this.props.setPage(activePageConstants.VACANCY_SEARCH);
        this.props.clearProps();
        setTimeout(function() {
            this.loadPreviousSearch();
        }.bind(this), 10);
        let el = document.getElementById("f1Btn");
            el.style.background="linear-gradient(to bottom, #8effb1, #fff 40%, #8effb1 90%)";
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.isOpenedFirst){
            setTimeout(function() {
                if(document.getElementById("dateBox")){
                    document.getElementById("dateBox").focus();
                }
                this.setState({
                    isOpenedFirst:true
                })
            }.bind(this), 300);
        }
        if(this.state.day !== '' && this.state.month !=='' && this.state.year !=='' && this.state.day > 0 && this.state.day < 32){
            let tempDate =  this.state.day +"-"+this.state.month+"-"+"20"+this.state.year;
            let departureDate= new Date(tempDate);
            let compareDate = departureDate.setHours(0, 0, 0, 0);
            let stateDate = new Date(this.state.departureDate).setHours(0, 0, 0, 0);
            let match = this.state.dropdownMonth.filter(({label}) => label.toLowerCase() === this.state.month.toLowerCase());
            if( stateDate !== compareDate && match.length && String(this.state.year).length === 2 && String(this.state.day).length === 2
                && (prevState.year !== this.state.year || prevState.day !== this.state.day)){
                this.setState({
                    departureDate
                });
            }
        } else{
            let departureDate= new Date();
            let compareDate = departureDate.setHours(0, 0, 0, 0);
            let stateDate = new Date(this.state.departureDate).setHours(0, 0, 0, 0);
            if( stateDate !== compareDate){
                this.setState({
                    departureDate
                });
            }
        }
    }

    componentWillUnmount() {
        this.props.setPage(activePageConstants.LANDING_PAGE);
    }

    static propTypes = {
        onHide:PropTypes.string,
    }

    handleFocus = (event) =>{
        event.target.select();
        event.target.setAttribute('autocomplete', 'off');
    } 

    onKeyBoardAddEvent = ()=>{
       var element = document.getElementById("yearDropdown").getElementsByTagName("input")[1];
       element.addEventListener('keydown', (event)=>{
            if(event.key === 'Tab'){
                let filterByInput = this.state.dropdownMonth.filter(({label})=>(
                    label.toLowerCase().startsWith(this.state.month.toLowerCase())
                ));
                this.setState({
                    month:filterByInput[0].label
                });
            let doc = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-panel")[0];
                doc.className.replace("p-input-overlay-visible", "");
                doc.style.display = "none";
                doc.style.zIndex  = "0";
            let mainElement = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                mainElement.setAttribute("aria-expanded" , "false");
            }
            if(event.key === 'Enter'){
                let ariaSelected = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-item");
                for(let k= 0; k< ariaSelected.length; k++){
                    if(ariaSelected[k].getAttribute('aria-selected') === "true"){
                        let value = ariaSelected[k].getAttribute('aria-label');
                        this.setState({
                            month:value
                        });
                    }
                }
                let doc = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-panel")[0];
                    doc.className.replace("p-input-overlay-visible", "");
                    doc.style.display = "none";
                    doc.style.zIndex  = "0";
                let mainElement = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                    mainElement.setAttribute("aria-expanded" , "false");
            }
       });
    }

    onTimeKeyBoardAddEvent = ()=>{
        var element = document.getElementById("timeDropdown").getElementsByTagName("input")[1];
        element.addEventListener('keydown', (event)=>{
             if(event.key === 'Tab'){
                 let filterByInput = this.state.dropdownTime.filter(({label})=>(
                     label.toLowerCase().startsWith(this.state.time.toLowerCase())
                 ));
                 this.setState({
                     time:filterByInput[0].label
                 });
             let doc = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-panel")[0];
                 doc.className.replace("p-input-overlay-visible", "");
                 doc.style.display = "none";
                 doc.style.zIndex  = "0";
             let mainElement = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                 mainElement.setAttribute("aria-expanded" , "false");
             }
             if(event.key === 'Enter'){
                 let ariaSelected = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-item");
                 for(let k= 0; k< ariaSelected.length; k++){
                     if(ariaSelected[k].getAttribute('aria-selected') === "true"){
                         let value = ariaSelected[k].getAttribute('aria-label');
                         this.setState({
                             time:value
                         });
                     }
                 }
                 let doc = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-panel")[0];
                     doc.className.replace("p-input-overlay-visible", "");
                     doc.style.display = "none";
                     doc.style.zIndex  = "0";
                 let mainElement = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                     mainElement.setAttribute("aria-expanded" , "false");
             }
        });
     }

    /* History load After login*/
    loadPreviousSearch = () => {
        let searchState =  JSON.parse(localStorage.getItem('latestSearchCriteria')) || '';
        let state = {};
        if(searchState){
            let rowDate = searchState.depDate;
            let searchType = searchState.isFlightNumSearch ? 'flightType': 'segmentType';
            if(rowDate){
                let departureDate = new Date(rowDate);
                let dateArray = rowDate.split("-");
                let year = dateArray[0].slice(2, 4);
                let day = dateArray[2];
                let tempMonth = String(dateArray[1]).startsWith('0') ? String(dateArray[1]).slice(1,2) : String(dateArray[1]);
                let monthArray = this.state.dropdownMonth.filter(({value})=> value === tempMonth);
                let month = monthArray[0].label;
                    if(searchState.searchedDateFlag === 'noYear'){
                        year="";
                    }
                    if(searchState.searchedDateFlag === 'noDate'){
                        month="";
                        day="";
                        year="";
                    }
                state = {
                        rowDate,
                        departureDate,
                        day,
                        month,
                        year,
                    }
            }
        this.setState({
                ...state,
                paxNumber:searchState.bookSeats,
                time:searchState.depTime,
                flightNumber:searchState.fltNbr,
                bookingClass:searchState.bookingClass,
                searchType
            }, ()=>{
                this.changeSearchType();
            });
            this.setArrivalDepartureLoc(searchState.depCode, searchState.arvCode); 
        }
    }
    /**** */
    
    /* Button Events starts*/
    onClearBtnClick =()=>{
        this.clearFields();
        this.props.clearProps();
        setTimeout(function() {
            if(document.getElementById("dateBox")){
                document.getElementById("dateBox").focus();
            }
            this.setState({
                isOpenedFirst:true
            })
        }.bind(this), 10);
    }

    onBackButtonClick = ()=>{
        this.props.onHide(false);
        this.props.clearProps();
        this.clearFields();
        this.props.clearProps();
    }

    onFlightSearchButtonClick=()=>{
            let dateInfo = this.createDate();
            let date = dateInfo.rowDate;
            let searchDate = date !== "--" ? date : "";
            if(searchDate ===""){
                searchDate = this.formatNewDate();
            }
        if (this.validateInput(searchDate)){  
            const searchCriteria = {
                depCode:this.state.depAirport,
                arvCode:this.state.arrAirport,
                depDate:searchDate,
                depTime:this.state.time,
                bookSeats:this.state.paxNumber,
                targetMaxSegmentCount:'1000',
                transitFareOption:true,
                reverseSectionDefFlg:true,
                fltNbr:this.state.flightNumber,
                formatNo:1,
                cOption:true,
                bookingClass: this.state.bookingClass,
                searchedDateFlag: dateInfo.searchedDateFlag,
                isFlightNumSearch:this.state.isFlightNumSearch
            }
            this.props.vacancySearch(this.props, searchCriteria);
        }
    }
    reverseAirport=()=>{
        let tempArrCode=this.state.arrAirport;
        let tempDepCode=this.state.depAirport;
        this.setArrivalDepartureLoc(tempArrCode, tempDepCode);
    }

    onCarrierButtonClick=()=>{
        //Disabled for POC
    }
    onFareButtonClick=()=>{
        //Disabled for POC
    }
    onStarButtonClick = ()=>{
        //Disabled for POC
    }
    onQueButtonClick = () =>{
        //Disabled for POC
    }
    /*Button Events End*/

    /*Onchange Event Start*/
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });

        if(e.target.value.length === Number(e.target.maxLength)) {
            let id = e.target.getAttribute('nextFocus');
            if(id === "yearDropdown" || id === "timeDropdown"){
                document.getElementById(id).getElementsByTagName('input')[1].focus();
            } else{
                document.getElementById(id).focus();
            }
          }    
    }

    onMonthChange=(e)=>{
        let monthValue = e.target.value;
        let monthStartLet = ['j','f','m','a','s','o','n','d'];

        monthValue = monthValue.replace(/[^A-Za-z]/ig, '');
        let filterByInput = this.state.dropdownMonth.filter(({label})=>(
            label.toLowerCase().startsWith(monthValue.toLowerCase())
        ));

        if(!monthStartLet.includes(monthValue.substring(0, 1).toLowerCase())){
            monthValue = "";
        }
        
        if(!filterByInput.length){
            monthValue = this.state.month;
        }
        
        this.setState({
            [e.target.name]:monthValue
        }, () =>{
              let filtered = monthValue ? this.state.dropdownMonth.filter(({label})=> label.toLowerCase().startsWith(monthValue.toLowerCase()) || label === this.state.month): [];
              if(filtered.length){
                this.onKeyBoardAddEvent();
                let doc = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-panel")[0];
                    doc.className += " p-input-overlay-visible";
                    doc.style.display = "block";
                    doc.style.zIndex  = "1010";
                    doc.className.replace("p-input-overlay-hidden");
                let current = document.getElementsByClassName("p-dropdown-item");
                for (let i = 0; i < current.length; i++) {
                    current[i].className=current[i].className.replace(" p-highlight", "");
                    current[i].setAttribute("aria-selected", "false");
                }
                let mainElement = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                    mainElement.setAttribute("aria-expanded" , "true");
                    mainElement.setAttribute("aria-haspopup" , "listbox");
                    document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-items")[0].focus();
                let element = document.querySelector(`[aria-label=${filtered[0].label}]`);
                    element.focus();
                    element.setAttribute("aria-selected" , "true");
                    element.className += " p-highlight";
              } else{
                let doc = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-panel")[0];
                    doc.className.replace("p-input-overlay-visible", "");
                    doc.style.display = "none";
                    doc.style.zIndex  = "0";
                let mainElement = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-trigger")[0];
                    mainElement.setAttribute("aria-expanded" , "false");
                let current = document.getElementsByClassName("p-dropdown-item");
                for (let i = 0; i < current.length; i++) {
                    current[i].className=current[i].className.replace(" p-highlight", "");
                }
              }
        });
    }
    
    onMonthInputBlur = (e) =>{
        let mainElement = document.getElementById("yearDropdown").getElementsByClassName("p-dropdown-trigger")[0];
            mainElement.setAttribute("aria-expanded" , "false");
        let current = document.getElementsByClassName("p-dropdown-item");
        for (let i = 0; i < current.length; i++) {
            current[i].className=current[i].className.replace(" p-highlight", "");
        }
    }

    onTimeChange = (e) =>{
        let timeValue = e.target.value;
        let filterByInput = this.state.dropdownTime.filter(({label})=>(
            label.toLowerCase().startsWith(timeValue.toLowerCase())
        ));

        timeValue = timeValue.replace(/[^0-9\b:]/ig, '');
        let timeStartLet = ['0','1','2'];
        if(!timeStartLet.includes(timeValue.substring(0, 1).toLowerCase())){
            timeValue = "";
        }

        if(!filterByInput.length){
            timeValue = this.state.time;
        }

        this.setState({
            [e.target.name]:timeValue
        }, () =>{
            let filtered = timeValue ? this.state.dropdownTime.filter(({label, value})=> label.toLowerCase().startsWith(timeValue.toLowerCase()) || value === this.state.time): [];
              if(filtered.length){
                  this.onTimeKeyBoardAddEvent();
                let doc = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-panel")[0];
                    doc.className += " p-input-overlay-visible";
                    doc.style.display = "block";
                    doc.style.zIndex  = "1002";
                let current = document.getElementsByClassName("p-dropdown-item");
                for (let i = 0; i < current.length; i++) {
                    current[i].className=current[i].className.replace(" p-highlight", "");
                    current[i].setAttribute("aria-selected", "false");
                }
                let element = document.querySelector(`[aria-label="${filtered[0].label}"]`);
                    element.focus();
                    element.setAttribute("aria-selected" , "true");
                    element.className += " p-highlight";
              } else{
                let doc = document.getElementById("timeDropdown").getElementsByClassName("p-dropdown-panel")[0];
                    doc.className.replace("p-input-overlay-visible", "");
                    doc.style.display = "none";
                    doc.style.zIndex  = "0";
                let current = document.getElementsByClassName("p-dropdown-item");
                for (let i = 0; i < current.length; i++) {
                    current[i].className=current[i].className.replace(" p-highlight", "");
                }
              }
        });
    }

    onBlurTimeInput = () =>{
        let filterByInput = this.state.dropdownTime.filter(({label})=>(
            label.toLowerCase() === this.state.time.toLowerCase()
        ));
        if(!filterByInput.length){
            this.setState({
                time:""
            });
        }
    }

    onSearchTypeChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        }, ()=>{
                this.changeSearchType();
        });
    }

    onAirportChange=(e)=>{
        if(e.target.id === 'depAirport'){
            this.setState({
                depAirport:e.target.value
            },()=>{
            document.getElementById('autoDepLabel').innerHTML=this.props.airportLabel;
            if(e.target.value.length === 3){
                document.getElementById('arrAirport').focus();
            }
        });
        }else if(e.target.id === 'arrAirport'){
            this.setState({
                arrAirport:e.target.value
            },()=>{
            document.getElementById('autoArrLabel').innerHTML=this.props.airportLabel;
            if(e.target.value.length === 3){
                document.getElementById('paxNumBox').focus();
            }
        });
        }
    }

    onRowDateChange=(e)=>{
        document.getElementById('yearBox').focus();
        setTimeout(function() {
            document.getElementById('yearBox').select();
        }.bind(this), 10);
        
        if(e.target.value){
            let date = String(e.target.value);
            this.formatDate(e, date);
        }
    }

    onHistorySelect = (e)=>{
        let searchState = e.target.value;
        let state = {};
        if(searchState){
            let rowDate = e.target.value.depDate;
            let searchType = e.target.value.isFlightNumSearch ? 'flightType': 'segmentType';
            if(rowDate){
                let departureDate = new Date(rowDate);
                let dateArray = rowDate.split("-");
                let year = dateArray[0].slice(2, 4);
                let day = dateArray[2];
                let tempMonth = String(dateArray[1]).startsWith('0') ? String(dateArray[1]).slice(1,2) : String(dateArray[1]);
                let monthArray = this.state.dropdownMonth.filter(({value})=> value === tempMonth);
                let month = monthArray[0].label;
                    if(searchState.searchedDateFlag === 'noYear'){
                        year="";
                    }
                    if(searchState.searchedDateFlag === 'noDate'){
                        month="";
                        day="";
                        year="";
                    }
                state = {
                        rowDate,
                        departureDate,
                        day,
                        month,
                        year,
                    }
            }
        this.setState({
                ...state,
                paxNumber:searchState.bookSeats,
                time:searchState.depTime,
                flightNumber:searchState.fltNbr,
                bookingClass:searchState.bookingClass,
                searchType
            }, ()=>{
                this.changeSearchType();
            });
            this.setArrivalDepartureLoc(searchState.depCode, searchState.arvCode); 
        }
        if(document.getElementById('yearDropdown').getElementsByTagName('input')[1]){
            document.getElementById('yearDropdown').getElementsByTagName('input')[1].focus();
        }
    }

    onDummyChange = ()=>{
        //disabled function
    }
    /* Onchange Event Ends*/

    formatDate = (e, date)=>{
        let dateArray=date.split(" ",4);
        let monthArray = this.state.dropdownMonth.filter(({label})=> label.includes(dateArray[1]));
        let month = monthArray[0].label;
        let day = dateArray[2];
        let year = dateArray[3].slice(2, 4);
        this.setState({
            day,month,year,
            departureDate:new Date(e.target.value)
        });
    }
    formatNewDate = ()=>{
        let date = new Date();
        let dateArray=String(date).split(" ",4);
        let monthArray = this.state.dropdownMonth.filter(({label})=> label.includes(dateArray[1]));
        let monthValue = monthArray[0].value.length === 2 ? monthArray[0].value : '0'+ monthArray[0].value;
        let day = dateArray[2];
        let rowDate = dateArray[3]+'-'+ monthValue +'-'+ day;
        return rowDate;
    }
    
    createDate = ()=>{
        let day = this.state.day.length !== 1 ?  this.state.day : '0'+ this.state.day;
        let month = "";
        let searchedDateFlag = "";
        if(this.state.month){
            let monthArray = this.state.dropdownMonth.filter(({label})=> label.toLowerCase() === this.state.month.toLowerCase()) || [];
            month = monthArray.length ? monthArray[0].value.length === 2 ? monthArray[0].value : '0'+ monthArray[0].value :'';
        }
        let year = this.state.year ? '20'+ this.state.year : this.state.year;
        if(month !== "" && day !== "" && year === ""){
            year = new Date().getFullYear();
            searchedDateFlag = "noYear";
        }
        if(month === "" && day === "" && year === ""){
            searchedDateFlag = "noDate";
        }
        let rowDate = year+'-'+month+'-'+day;
        let dateInfo = {
            rowDate,searchedDateFlag
        }
        return dateInfo;
    }
    
    setArrivalDepartureLoc = (depCode, arrCode) =>{
        this.props.autoLabelAirport(depCode);
        this.setState({
            depAirport:depCode
        },()=>{
            document.getElementById('autoDepLabel').innerHTML=this.props.airportLabel;
            this.props.autoLabelAirport(arrCode);
            this.setState({
                arrAirport:arrCode,
            }, ()=>{
                document.getElementById('autoArrLabel').innerHTML=this.props.airportLabel;
            });
        });
    }

    changeSearchType = ()=>{
        if(this.state.searchType ==='flightType'){
            this.setState({
                isFlightNumSearch:true,
            });
        } else{
            this.setState({
                isFlightNumSearch:false,
            });
        }
    }

    validateInput = (searchDate) =>{
        const error = [];
        let flag = true;

         /* Flight Input validation */
        if(this.state.searchType !=='flightType'){
                if(this.state.depAirport === ''){
                    error.push(errorConstants.DMS1000_001);
                    flag = false;
                } else if(this.state.depAirport.length < 3){
                    error.push(errorConstants.DMS2000_001);
                    flag = false;
                }
                if(this.state.arrAirport === ''){
                    error.push(errorConstants.DMS1000_001_2);
                    flag = false;
                } else if(this.state.arrAirport.length < 3){
                    error.push(errorConstants.DMS2000_001_2);
                    flag = false;
                }
                if(this.state.depAirport !=='' && this.state.arrAirport !=='' && this.state.depAirport === this.state.arrAirport){
                    error.push(errorConstants.DMS5100_001);
                    flag = false;
                }
        } else{
            if(this.state.flightNumber === ''){
                error.push(errorConstants.DMS1000_001_3);
                flag = false;
            }
        }

        /* Date Validation */
        if (searchDate){
            let valDate = new Date(searchDate);
            let nowDate = new Date();
            let parts = searchDate.split("-");
            let day = parseInt(parts[2], 10);
            let month = parseInt(parts[1], 10);
            let year = parseInt(parts[0], 10);
            let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)){
                monthLength[1] = 29;
            }
           
            if(!isNaN(day) && isNaN(month) && isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(!isNaN(day) && isNaN(month) && !isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(isNaN(day) && !isNaN(month) && !isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(!isNaN(day) && !isNaN(month) && isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(isNaN(day) && !isNaN(month) && isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(isNaN(day) && isNaN(month) && !isNaN(year)){
                error.push(errorConstants.DMS4000_001);
                this.dateErrorStyle();
                flag = false;
            } else if(year < 1000 || year > 2099 || month === 0 || month > 12){
                error.push(errorConstants.DMS4000_003);
                this.dateErrorStyle();
                flag = false;
            } else if(!(day > 0 && day <= monthLength[month - 1])){
                error.push(errorConstants.DMS4000_003);
                this.dateErrorStyle();
                flag = false;
            } else if (valDate.setHours(0,0,0,0) - nowDate.setHours(0,0,0,0) < 0){
                 error.push(errorConstants.DMS4000_003);
                 this.dateErrorStyle();
                 flag = false;
            }
        }

        /*Number Of Seat Input Validation*/
        if(this.state.paxNumber !== "" && (this.state.paxNumber < 1 || this.state.paxNumber > 9)){
            error.push(errorConstants.DMS5000_001);
            flag = false;
        }

        this.setState({
            error
        });
        return flag;
    }

    dateErrorStyle =()=>{
        document.getElementById('yearDropdown').getElementsByTagName('input')[1].focus();
    }

    clearFields=()=>{
        this.setState({
            isFlightNumSearch:false,
            enquiryType:'vacantEnqFare',
            searchType:'segmentType',
            dummyVariable:'',
            rowDate:'',
            departureDate:'',
            day:'',
            month:'',
            year:'',
            time:'',
            depAirport:'',
            arrAirport:'',
            flightNumCarrier:'NH',
            flightNumber:'',
            paxNumber:'',
            carrierType:'NH',
            bookingClass:'Y',
            searchOption:'notSpecified',
            error:[]
        });
        document.getElementById('autoDepLabel').innerHTML='';
        document.getElementById('autoArrLabel').innerHTML='';
    }

    render(){
        const { t } = this.props;
        return(
            <div className="vacancy-search-screen" role='dialog'> 
                <div className="container">
                    <div className="card">
                        <div className="main-section">
                            <div className="search-header">
                                {this.renderHeader()}
                            </div>
                            <div className="vacancy-content-sec">
                                <div className="search-content">
                                    <div className="search-area">
                                        <div className="header-content">
                                            <div className="header-tab">
                                                {
                                                    this.state.searchMenuTypes.map((type, index)=>( 
                                                    <button key={index} className={`${!type.disabled ? 'selected-menu-search':''}`}  disabled={type.disabled}>
                                                        <span disabled={type.disabled}>{t(type.label)}(<u>{index+1}</u>)</span>
                                                    </button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="input-content">
                                            <div className="input-content-inline">
                                                <div className="upper-content">
                                                    <div className="radio-grp">
                                                        <div className="radio-element">
                                                            <RadioButton id="vacantEnqFare" inputId="vacantEnqFare" hotkey="alt+f" pageId={activePageConstants.VACANCY_SEARCH} name="enquiryType" value="vacantEnqFare" onChange={this.onChange} checked={this.state.enquiryType === 'vacantEnqFare'} />
                                                            <label htmlFor="vacantEnqFare" className="p-radiobutton-label" tabIndex="1">{t('vacancySearch.labels.availabilityFare')}</label>
                                                        </div>
                                                        <div className="radio-element">
                                                            <RadioButton id="vacantEnqDetails" inputId="vacantEnqDetails" pageId={activePageConstants.VACANCY_SEARCH} name="enquiryType" value="vacantEnqDetails" onChange={this.onChange} checked={this.state.enquiryType === 'vacantEnqDetails'} disabled={true}/>
                                                            <label htmlFor="vacantEnqDetails" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.availabilityDetail')}</label>
                                                        </div>
                                                        <div className="radio-element">
                                                            <RadioButton id="sheduleEnquery" inputId="sheduleEnquery" pageId={activePageConstants.VACANCY_SEARCH} name="enquiryType" value="sheduleEnquery" onChange={this.onChange} checked={this.state.enquiryType === 'sheduleEnquery'} disabled={true}/>
                                                            <label htmlFor="sheduleEnquery" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.sheduleInquery')}</label>
                                                        </div>
                                                        <div className="radio-element">
                                                            <RadioButton id="shutan" inputId="shutan" pageId={activePageConstants.VACANCY_SEARCH} name="enquiryType" value="shutan" onChange={this.onChange} checked={this.state.enquiryType === 'shutan'} disabled={true}/>
                                                            <label htmlFor="shutan" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.fieldInquery')}</label>
                                                        </div>
                                                    </div>
                                                    <div className="btn-element">
                                                        <Button id="clearBtn" className="marvel-primary clear-btn" hotkey="alt+l" pageId={activePageConstants.VACANCY_SEARCH} label={t('vacancySearch.labels.clearUndo')} value="clearBtn" onClick={this.onClearBtnClick}/>
                                                    </div>
                                                </div>

                                                <div className="segment-content">
                                                    <div className="segment-area">
                                                        {this.renderFirstSegment()}
                                                        {this.renderSecondSegment()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="side-option-area">
                                   <SideElement/>
                                </div>
                            </div>
                            <div className="search-footer">
                                {this.renderFooter()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderFooter =()=>{
        const { t } = this.props;
        return(
            <div className="footer-area">
                <div className="btn-footer-right">
                    <Button id="backToCustBtn" style={{marginRight:'.5em'}} className="marvel-primary clear-btn" hotkey="" pageId={activePageConstants.VACANCY_SEARCH} label={t('vacancySearch.labels.movetoCustomer')} value="moveToCustBtn" onClick={this.onDummyChange}/>
                    <Button id="flightSearchBtn" className="btn-select-main" hotkey="alt+s" pageId={activePageConstants.VACANCY_SEARCH} label={t('vacancySearch.labels.search')} value="flightSearchBtn" onClick={this.onFlightSearchButtonClick}/>
                </div>
                <div className="btn-footer-left">
                    <Button id="backBtn" className="marvel-primary clear-btn" hotkey="alt+c" pageId={activePageConstants.VACANCY_SEARCH} label={t('vacancySearch.labels.close')} value="backBtn" onClick={this.onBackButtonClick}/>
                </div>
            </div>
        )
    }

    renderHeader =()=>{
        const { t, sysError } = this.props;
        return(
            <div>
                <div className="search-title">
                    <div className="header-lbl">
                        <label>{t('vacancySearch.labels.header')}</label>
                    </div>
                    <div><Error error={this.state.error.length ?  this.state.error : sysError} pageId={activePageConstants.VACANCY_SEARCH} /></div>
                    <div className="header-icons">
                        <img id="starBtn" src={require('../../assets/img/star-icon.png')} className="star-icon"  onClick={this.onStarButtonClick} />
                        <img id="questionBtn" className="que-icon" src={require('../../assets/img/icn_help_30-30.png')} onClick={this.onQueButtonClick} />
                    </div>
                </div>
                <BreadCrumb isSearchScreen={true}/>
            </div>
        )
    }
    
    renderFirstSegment=()=>{
        const { t } = this.props;
        const dateError = this.state.error.includes(errorConstants.DMS4000_001) || this.state.error.includes(errorConstants.DMS4000_003);
        const noOfSeatError = this.state.error.includes(errorConstants.DMS5000_001);
        return(
            <FocusLock as='div'>
                <div className="segment">
                    <div className="first-row">
                        <div className="icon-element" tabIndex="-1">
                            <img src={require('../../assets/img/icon_bottom_title_15.png')}/>
                            <div className="seg-side-header">
                                <label className="p-icon-label" tabIndex="-1">{t('vacancySearch.labels.segCondition')}</label>
                            </div>
                        </div>
                        <div className="radio-element">
                            <RadioButton id="segementRadio" inputId="segementRadio" hotkey="alt+e" pageId={activePageConstants.VACANCY_SEARCH} name="searchType" value="segmentType" onChange={this.onSearchTypeChange} checked={this.state.searchType === 'segmentType'} />
                            <label htmlFor="segementRadio" className="p-radiobutton-label" tabIndex={this.state.searchType === 'segmentType' ? '1':'-1'}>{t('vacancySearch.labels.segment')}</label>
                        </div>
                        <div className="radio-element">
                            <RadioButton id="flightRadio" inputId="flightRadio" hotkey="alt+b" pageId={activePageConstants.VACANCY_SEARCH} name="searchType" value="flightType" onChange={this.onSearchTypeChange} checked={this.state.searchType === 'flightType'} />
                            <label htmlFor="flightRadio" className="p-radiobutton-label" tabIndex={this.state.searchType === 'flightType' ? '1':'-1'}>{t('vacancySearch.labels.flightNumber')}</label>
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="date-element">
                            <div className="label-element">
                                <label className="date-label">{t('vacancySearch.labels.boardingDate')}</label>
                            </div>
                            <InputText id="dateBox" name="day" keyfilter="pnum" className={`date-input ${dateError ? 'error-textbox' :''}`} maxLength={2} value={this.state.day} onChange={this.onChange} nextFocus="yearDropdown" disabled={false} tabindex={1} customFocus={this.handleFocus}/>
                            <Dropdown  id="yearDropdown" value={this.state.month} name="month" options={this.state.dropdownMonth} onChange={(e) => this.onMonthChange(e)} className={`month-input ${dateError ? 'error-textbox-dropdown' :''}`}
                                        editable={true} placeholder="" disabled={false} tabIndex={1} optionValue="label" onFocus={this.handleFocus} onBlur={this.onMonthInputBlur}/>
                            <InputText id="yearBox" name="year" keyfilter="pnum" className={`year-input ${dateError ? 'error-textbox' :''}`} maxLength={2} value={this.state.year} onChange={this.onChange} nextFocus="timeDropdown" disabled={false} tabindex={1} customFocus={this.handleFocus}/>
                        </div>
                        <div className="calendar-element">
                            <Calendar name="departureDate" showIcon className="calendar-input" numberOfMonths={3} t ={t} value={this.state.departureDate} onChange={this.onRowDateChange} disabled={false} style={{width: '40vw'}}></Calendar>
                        </div>
                        <div className="time-element">
                            <div className="label-element">
                                <label className="date-label time-label">{t('vacancySearch.labels.boardingTime')}</label>
                            </div>
                            <Dropdown id="timeDropdown" value={this.state.time} options={this.state.dropdownTime} name="time" onChange={this.onTimeChange} className="time-input"
                                        editable={true} placeholder="" disabled={this.state.isFlightNumSearch} tabIndex={1} onFocus={this.handleFocus} onBlur={this.onBlurTimeInput}/>
                        </div>
                        <div className="search-hist-element">
                            <SearchHistory id="searchHistory" className="search-history" onHistory={this.onHistorySelect} disabled={false} />
                        </div>
                    </div>
                    <div className="to-from-row">
                        <div className="from-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.depAirport')}</label>
                            </div>
                            <AirportSearch className="airport-search-elmnt" name="depAirport" maxLength={3}
                                id='depAirport' header='Airport Search' onChange={this.onAirportChange} 
                                value={this.state.depAirport} disabled={this.state.isFlightNumSearch} isError={this.state.error.length && this.state.searchType ==='segmentType' && this.state.depAirport.length < 3 ? true : false} />
                            <label id="autoDepLabel" className={`sel-air-label ${this.state.isFlightNumSearch ? 'label-disabled' : ''}`} disabled={this.state.isFlightNumSearch}></label>
                        </div>
                        <div className="to-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.arrAirport')}</label>
                            </div>
                            <AirportSearch className="airport-search-elmnt" name="arrAirport" maxLength={3}
                                id='arrAirport' header='Airport Search' onChange={this.onAirportChange} isError={this.state.error.length && this.state.searchType ==='segmentType' && this.state.arrAirport.length < 3 ? true : false}  
                                value={this.state.arrAirport} autoLabelId="arrAirportLabel" iconId="arrAirport" disabled={this.state.isFlightNumSearch}/>
                            <label id="autoArrLabel" className={`sel-air-label ${this.state.isFlightNumSearch ? 'label-disabled' : ''}`} disabled={this.state.isFlightNumSearch}></label>
                        </div>
                        <div className="reverse-element">
                            <Button id="reverseBtn" className="marvel-primary reverse-btn" hotkey="alt+," pageId={activePageConstants.VACANCY_SEARCH} label={t('vacancySearch.labels.reverse')} onClick={this.reverseAirport} disabled={this.state.isFlightNumSearch}/>
                        </div>
                    </div>
                    <div className="flight-num-row">
                        <div className="flight-num-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.flightNo')}</label>
                            </div>
                            <div style={{display:'inline-flex'}}>
                                <div className="airport-inp-text">
                                    <InputText id="flightCarrierInp" name="flightNumCarrier" value={this.state.flightNumCarrier} className="airline-carrier-input" maxLength={2} onChange={this.onChange} disabled={true} tabindex={-1} customFocus={this.handleFocus}/>
                                </div>
                                <div className="air-modal-btn-element">
                                    <img id="carrierFlightBtn" src={require('../../assets/img/loupe_s_disabled.png')} className="img-disabled air-carrier-btn" label="" disabled={true} onClick={this.onCarrierButtonClick}/> 
                                </div>
                                <div className="number-element">
                                    <InputText id="flightNumInput" className={`flight-num-input ${this.state.error.length && this.state.searchType !=='segmentType' ? 'error-textbox': ''}`} keyfilter="pnum" maxLength={4} nextFocus="paxNumBox" name="flightNumber" value={this.state.flightNumber} onChange={this.onChange} disabled={!this.state.isFlightNumSearch} tabindex={this.state.isFlightNumSearch ? '1' : '-1'} customFocus={this.handleFocus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pax-num-row">
                        <div className="pax-num-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.seatCount')}</label>
                            </div>
                            <InputText id="paxNumBox" name="paxNumber" keyfilter="pnum" value={this.state.paxNumber} className={`pax-num-input ${ noOfSeatError ? 'error-textbox' : '' }`} maxLength={1} nextFocus="economy" onChange={this.onChange} tabindex={1} customFocus={this.handleFocus}/>
                        </div>
                    </div>
                    <div className="airline-carrier-row" tabIndex="-1">
                        <div className="airline-carrier-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.airlineCarrier')}</label>
                            </div>
                            <div style={{display:'inline-flex'}}>
                                <div className="airport-inp-text">
                                    <InputText id="carrierInput" name="carrierType" value={this.state.carrierType} onChange={this.onChange} className="airline-carrier-input" maxLength={2} disabled={true} tabindex={-1} customFocus={this.handleFocus}/>
                                </div>
                                <div className="air-modal-btn-element">
                                    <img id="carrierBtn" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled air-carrier-btn" disabled={true} onClick={this.onCarrierButtonClick}/> 
                                </div>
                                <div className="label-element" style={{marginLeft:'3px', marginTop:'4px'}}> 
                                    <label className="label-disabled">ANA</label>
                                </div>
                                <div className="air-carrier-chkbox">
                                    <Checkbox onChange={e => this.setState({dummyVariable: e.checked})} checked={this.state.dummyVariable} disabled={true} tabIndex="-1"></Checkbox>
                                    <div className="label-element" style={{width:'134px'}}>
                                        <label className="from-label label-disabled">{t('vacancySearch.labels.allCarrier')}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fare-type-row" tabIndex="-1">
                        <div className="fare-type-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.fareType')}</label>
                            </div>
                            <div style={{display:'inline-flex'}}>
                                <div className="fare-type-text">
                                    <InputText id="fareType1" tabindex={-1} name="fareType1" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                                </div>
                                <div className="fare-type-btn-element">
                                    <img id="fareSearchBtn1" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                                </div>
                                <div className="fare-type-text">
                                    <InputText id="fareType2" tabindex={-1} name="fareType2" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                                </div>
                                <div className="fare-type-btn-element">
                                    <img id="fareSearchBtn2" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                                </div>
                                <div className="fare-type-text">
                                    <InputText id="fareType3" tabindex={-1} name="fareType3" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                                </div>
                                <div className="fare-type-btn-element">
                                    <img id="fareSearchBtn3" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                                </div>
                                <div className="fare-type-text">
                                    <InputText id="fareType4" tabindex={-1} name="fareType4" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                                </div>
                                <div className="fare-type-btn-element">
                                    <img id="fareSearchBtn4" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="boarding-class-row">
                        <div className="boarding-class-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.boardingClass')}</label>
                            </div>
                            <div className="boarding-rad-elmnt">
                                <RadioButton id="common" inputId="common" hotkey="alt+a" pageId={activePageConstants.VACANCY_SEARCH} name="bookingClass" value="A" onChange={this.onChange} checked={this.state.bookingClass === 'A'} />
                                <label className="bking-rad-label" tabIndex={this.state.bookingClass === 'A' ? '1' : '-1'}>{t('vacancySearch.labels.allClass')}</label>
                            </div>
                            <div className="boarding-rad-elmnt">
                                <RadioButton id="pyEconomy" inputId="pyEconomy" hotkey="alt+p" pageId={activePageConstants.VACANCY_SEARCH} name="bookingClass" value="PY" onChange={this.onChange} checked={this.state.bookingClass === 'PY'} />
                                <label className="bking-rad-label" tabIndex={this.state.bookingClass === 'PY' ? '1' : '-1'}>{t('vacancySearch.labels.pyClass')}</label>
                            </div>
                            <div className="boarding-rad-elmnt">
                                <RadioButton id="economy" inputId="economy" hotkey="alt+y" pageId={activePageConstants.VACANCY_SEARCH} name="bookingClass" value="Y" onChange={this.onChange} checked={this.state.bookingClass === 'Y'} />
                                <label className="bking-rad-label" tabIndex={this.state.bookingClass === 'Y' ? '1' : '-1'}>{t('vacancySearch.labels.normalClass')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="search-option-row" tabIndex="-1">
                        <div className="search-option-element">
                            <div className="label-element">
                                <label className="from-label">{t('vacancySearch.labels.searchOption')}</label>
                            </div>
                            <div className="search-option-rad-elmnt">
                                <RadioButton id="notSpecified" inputId="notSpecified" hotkey="alt+j" pageId={activePageConstants.VACANCY_SEARCH} name="searchOption" value="notSpecified" onChange={this.onChange} checked={this.state.searchOption === 'notSpecified'} disabled={true}/>
                                <label className="search-option-rad-label label-disabled" tabIndex="-1">{t('vacancySearch.labels.notSpecify')}</label>
                            </div>
                            <div className="search-option-rad-elmnt">
                                <RadioButton id="transferFare" inputId="transferFare" hotkey="alt+r" pageId={activePageConstants.VACANCY_SEARCH} name="searchOption" value="transferFare" onChange={this.onChange} checked={this.state.searchOption === 'transferFare'} disabled={true}/>
                                <label className="search-option-rad-label label-disabled" tabIndex="-1">{t('vacancySearch.labels.transit')}</label>
                            </div>
                            <div className="search-option-rad-elmnt">
                                <RadioButton id="connectionFlight" inputId="connectionFlight" hotkey="alt+g" pageId={activePageConstants.VACANCY_SEARCH} name="searchOption" value="connectionFlight" onChange={this.onChange} checked={this.state.searchOption === 'connectionFlight'} disabled={true}/>
                                <label className="search-option-rad-label label-disabled" tabIndex="-1">{t('vacancySearch.labels.connection')}</label>
                            </div>
                        </div>
                    </div>   
                </div>
            </FocusLock>
        )
    }

    renderSecondSegment=()=>{
        const { t } = this.props;
        let displaySecond = true;
        return(
            <div className="segment segment-second second" tabIndex="-1">
                <div className="first-row">
                    <div className="icon-element">
                        <img src={require('../../assets/img/icon_bottom_title_15.png')}/>
                        <div className="seg-side-header">
                            <label className="p-icon-label">{t('vacancySearch.labels.segConditionTwo')}</label>
                        </div>
                    </div>
                    <div className="radio-element">
                        <RadioButton id="segementRadio2" inputId="segementRadio2" hotkey="alt+k" name="dummyVariable" value="not" onChange={this.onSearchTypeChange} checked={this.state.searchTypeSegmentTwo === 'not'} disabled={displaySecond}/>
                        <label htmlFor="segementRadio2" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.notSegmentSpecify')}</label>
                    </div>
                    <div className="radio-element">
                        <RadioButton id="segementRadio2" inputId="segementRadio2" hotkey="alt+n" name="dummyVariable" value="segmentType" onChange={this.onSearchTypeChange} checked={this.state.searchTypeSegmentTwo === 'segmentType'} disabled={displaySecond}/>
                        <label htmlFor="segementRadio2" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.segmentTwo')}</label>
                    </div>
                    <div className="radio-element">
                        <RadioButton id="flightRadio2" inputId="flightRadio2" hotkey="alt+m" name="dummyVariable" value="flightType" onChange={this.onSearchTypeChange} checked={this.state.searchTypeSegmentTwo === 'flightType'} disabled={displaySecond}/>
                        <label htmlFor="flightRadio2" className="p-radiobutton-label label-disabled">{t('vacancySearch.labels.flightNumberTwo')}</label>
                    </div>
                </div>
                <div className="second-row">
                    <div className="date-element">
                        <div className="label-element">
                            <label className="date-label">{t('vacancySearch.labels.boardingDate')}</label>
                        </div>
                        <InputText id="dateBox2" name="day" className="date-input" maxLength={2} value={this.state.dummyVariable} onChange={this.onChange} disabled={this.state.isFlightNumSearch || displaySecond }/>
                        <Dropdown value={this.state.dummyVariable} name="month" options={this.state.dropdownMonth} onChange={this.onChange} className="month-input"
                                    editable={true} placeholder="" disabled={this.state.isFlightNumSearch || displaySecond}/>
                        <InputText id="yearBox2" name="year" className="year-input" maxLength={2} value={this.state.dummyVariable} onChange={this.onChange} disabled={this.state.isFlightNumSearch || displaySecond }/>
                        <Calendar showIcon={true} name="rowDate" className="calendar-input second-cal" numberOfMonths={3} t ={t} value={this.state.dummyVariable} onChange={this.onRowDateChange} disabled={true} style={{width: '40vw'}}></Calendar>
                    </div>
                    <div className="time-element">
                        <div className="label-element">
                            <label className="date-label">{t('vacancySearch.labels.boardingTime')}</label>
                        </div>
                        <Dropdown value={this.state.dummyVariable} options={this.state.dropdownTime} name="time" onChange={this.onChange} className="time-input"
                                    editable={true} placeholder="" disabled={this.state.isFlightNumSearch || displaySecond}/>
                    </div>
                    <div className="search-hist-element">
                        <SearchHistory id="searchHistory2" className="search-history" onHistory={this.onHistorySelect} disabled={true}/>
                    </div>
                </div>
                <div className="to-from-row">
                    <div className="from-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.depAirport')}</label>
                        </div>
                        <AirportSearch className="airport-search-elmnt" name="depAirport" 
                            id='depAirport2' header='Airport Search' onChange={this.onAirportChange} 
                            value={this.state.dummyVariable} disabled={true}/>
                        <label id="autoDepLabel2" className="sel-air-label"></label>
                    </div>
                    <div className="to-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.arrAirport')}</label>
                        </div>
                        <AirportSearch className="airport-search-elmnt" name="arrAirport" 
                            id='arrAirport2' header='Airport Search' onChange={this.onAirportChange} 
                            value={this.state.dummyVariable} autoLabelId="arrAirportLabel" iconId="arrAirport" disabled={true}/>
                        <label id="autoArrLabel2" className="sel-air-label"></label>
                    </div>
                    <div className="reverse-element">
                        <Button id="reverseBtn2" className="marvel-primary reverse-btn" label={t('vacancySearch.labels.reverseTwo')} onClick={this.reverseAirport} disabled={this.state.isFlightNumSearch || displaySecond}/>
                    </div>
                </div>
                <div className="flight-num-row">
                    <div className="flight-num-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.flightNo')}</label>
                        </div>
                        <div style={{display:'inline-flex'}}>
                            <div className="airport-inp-text">
                                <InputText id="flightCarrierInp2" name="flightNumCarrier" value={this.state.dummyVariable} className="airline-carrier-input" maxLength={2} onChange={this.onChange} disabled={true}/>
                            </div>
                            <div className="air-modal-btn-element">
                                <img id="carrierFlightBtn2" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled air-carrier-btn" disabled={true} onClick={this.onCarrierButtonClick}/> 
                            </div>
                            <div className="number-element">
                                <InputText id="flightNumInput2" className="flight-num-input" maxLength={3} name="flightNumber" value={this.state.dummyVariable} onChange={this.onChange} disabled={!this.state.isFlightNumSearch || displaySecond }/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pax-num-row">
                    <div className="pax-num-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.seatCount')}</label>
                        </div>
                        <InputText id="paxNumBox2" name="paxNumber" value={this.state.dummyVariable} className="pax-num-input" maxLength={1} disabled={displaySecond} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="airline-carrier-row">
                    <div className="airline-carrier-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.airlineCarrier')}</label>
                        </div>
                        <div style={{display:'inline-flex'}}>
                            <div className="airport-inp-text">
                                <InputText id="carrierInput2" name="carrierType" value={this.state.dummyVariable} onChange={this.onChange} className="airline-carrier-input" maxLength={2} disabled={this.state.isFlightNumSearch || displaySecond}/>
                            </div>
                            <div className="air-modal-btn-element">
                                <img id="carrierBtn2" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled air-carrier-btn" disabled={true} onClick={this.onCarrierButtonClick}/> 
                            </div>
                            <div className="label-element" style={{marginLeft:'3px', marginTop:'4px'}}>
                                <label className=""></label>
                            </div>
                            <div className="air-carrier-chkbox">
                                <Checkbox onChange={e => this.setState({dummyVariable: e.checked})} checked={this.state.dummyVariable} disabled={true}></Checkbox>
                                <div className="label-element" style={{width:'134px'}}>
                                    <label className="from-label label-disabled">{t('vacancySearch.labels.allCarrier')}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fare-type-row">
                    <div className="fare-type-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.fareType')}</label>
                        </div>
                        <div style={{display:'inline-flex'}}>
                            <div className="fare-type-text">
                                <InputText id="fareType12" name="fareType1" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                            </div>
                            <div className="fare-type-btn-element">
                                <img id="fareSearchBtn12" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                            </div>
                            <div className="fare-type-text">
                                <InputText id="fareType22" name="fareType2" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                            </div>
                            <div className="fare-type-btn-element">
                                <img id="fareSearchBtn22" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                            </div>
                            <div className="fare-type-text">
                                <InputText id="fareType32" name="fareType3" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                            </div>
                            <div className="fare-type-btn-element">
                                <img id="fareSearchBtn32" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                            </div>
                            <div className="fare-type-text">
                                <InputText id="fareType42" name="fareType4" className="fare-type-input" maxLength={3} value="" onChange={this.onChange} disabled={true}/>
                            </div>
                            <div className="fare-type-btn-element">
                                <img id="fareSearchBtn42" src={require('../../assets/img/loupe_s_disabled.png')} className="marvel-primary img-disabled fare-type-btn" disabled={true} onClick={this.onFareButtonClick}/> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="boarding-class-row">
                    <div className="boarding-class-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.boardingClass')}</label>
                        </div>
                        <div className="boarding-rad-elmnt">
                            <RadioButton id="economy2" inputId="economy" hotkey="alt+x" name="dummyVariable" value="Y" onChange={this.onChange} checked={this.state.dummyVariable === ''} disabled={displaySecond}/>
                            <label className="bking-rad-label label-disabled">{t('vacancySearch.labels.allClassTwo')}</label>
                        </div>
                        <div className="boarding-rad-elmnt">
                            <RadioButton id="pyEconomy2" inputId="pyEconomy" hotkey="alt+i" name="dummyVariable" value="PY" onChange={this.onChange} checked={this.state.dummyVariable === 'PY'} disabled={displaySecond}/>
                            <label className="bking-rad-label label-disabled">{t('vacancySearch.labels.pyClassTwo')}</label>
                        </div>
                        <div className="boarding-rad-elmnt">
                            <RadioButton id="business2" inputId="business" hotkey="alt+d" name="dummyVariable" value="B" onChange={this.onChange} checked={this.state.dummyVariable === 'B'} disabled={displaySecond}/>
                            <label className="bking-rad-label label-disabled">{t('vacancySearch.labels.normalClassTwo')}</label>
                        </div>
                    </div>
                </div>
                <div className="search-option-row">
                    <div className="search-option-element">
                        <div className="label-element">
                            <label className="from-label">{t('vacancySearch.labels.searchOption')}</label>
                        </div>
                        <div className="search-option-rad-elmnt">
                            <RadioButton id="notSpecified2" inputId="notSpecified" hotkey="alt+q" name="searchOption" value="notSpecified" onChange={this.onChange} checked={this.state.searchOption === 'notSpecified'} disabled={true}/>
                            <label className="search-option-rad-label label-disabled">{t('vacancySearch.labels.notSpecifyTwo')}</label>
                        </div>
                        <div className="search-option-rad-elmnt">
                            <RadioButton id="transferFare2" inputId="transferFare" hotkey="alt+v" name="searchOption" value="transferFare" onChange={this.onChange} checked={this.state.searchOption === 'transferFare'} disabled={true}/>
                            <label className="search-option-rad-label label-disabled">{t('vacancySearch.labels.transitTwo')}</label>
                        </div>
                        <div className="search-option-rad-elmnt">
                            <RadioButton id="connectionFlight2" inputId="connectionFlight" hotkey="alt+w" name="searchOption" value="connectionFlight" onChange={this.onChange} checked={this.state.searchOption === 'connectionFlight'} disabled={true}/>
                            <label className="search-option-rad-label label-disabled">{t('vacancySearch.labels.connectionTwo')}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    const airportLabel = state.airportSearchReducer.airportLabel;
    const sysError = state.vacancySearchReducer.error;
    const searchRequest = state.vacancySearchReducer.searchRequest;
    return{ airportLabel, sysError, searchRequest }
  }

const mapDispatchToProps=(dispatch)=>{
	return{
        getAirportInfo: ()=>{
			dispatch(airportSearchActions.getAirportInfo())
        },
        vacancySearch: (props, searchCriteria)=>{
			dispatch(vacancySearchActions.vacancySearch(props, searchCriteria))
        },
        autoLabelAirport: (value) =>{
            dispatch(airportSearchActions.autoLabelAirport(value))
        },
        setPage: (pageId) =>{
            dispatch(activePageActions.setPage(pageId))
        },
        clearProps: () =>{
            dispatch(vacancySearchActions.clearProps())
        }
	}
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(VacancySearch));
