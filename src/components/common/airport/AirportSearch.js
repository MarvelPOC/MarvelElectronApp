import React, { Component } from 'react';
import './AirportSearch.css';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import InputText from '../keyboard/InputText';
import Button from '../keyboard/Button';
import RadioButton from '../keyboard/RadioButton';
import { airportSearchActions, activePageActions } from '../../../action';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { activePageConstants } from '../../../constants';
import Error from '../error/Error';

class AirportSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            displayModal: false,
            partialMatch:'',
            prefixMatch:'',
            codeMatch:'',
            searchInput:'',
            searchSelection:'',
            selectedAirport:'',
            isCountrySelected: true,
            isSelectEnabled:true,
            airportInput:this.props.value,
            selectedRegion:'',
            isSearched: false,
            items: 1,
            loadingState: false,
            selectedSideOption:{
                regionCode:'JPN',
                countryCode:'',
                allRegion:''
            }
        }
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.renderFooter=this.renderFooter.bind(this);
        this.onRegionSelect=this.onRegionSelect.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.airportInput !== this.props.value) {
                this.setState({
                    airportInput:this.props.value,
                });
            }

        if(this.state.selectedSideOption.allRegion === 'all' && this.state.selectedSideOption.countryCode === ''){
            setTimeout(function() {
                this.onInfiniteScroll();
                }.bind(this), 10);
        }
    }

    static propTypes = {
        id:PropTypes.string,
        name:PropTypes.string,
        autoLabelId:PropTypes.string,
        disabled:PropTypes.bool,
        className: PropTypes.string,
        value:PropTypes.any,
        onChange:PropTypes.func,
        isError:PropTypes.bool,
        maxLength:PropTypes.number
    }

    static defaultProps = {
        isError: false,
        maxLength:3
    };

    onShow=(e)=> {
        let state= {};

        setTimeout(function() {
            if(document.getElementById("searchInpId")){
                document.getElementById("searchInpId").focus();
                }
            }, 300);

        if(!this.props.disabled){
            this.props.setPage(activePageConstants.AIRPORT_POPUP);
            if(this.state.airportInput !== null && this.state.airportInput !==''){
                state = {
                    displayModal: true,
                    searchInput:this.state.airportInput,
                    searchSelection:'codeMatch',
                    isCountrySelected: false,
                    isSearched:true,
                    selectedSideOption:{
                        regionCode:'',
                        countryCode:'',
                        allRegion:'all'
                    }
                };
            } else{
                state = {
                    displayModal: true,
                    isCountrySelected: false,
                    searchSelection:'partialMatch',
                };   
            }
            this.setState(state, ()=>{
                this.searchActions(this.state.searchSelection);
            });
        }   
    }

    onHide=() =>{
        this.props.setPage(activePageConstants.VACANCY_SEARCH);
        document.getElementById(this.props.id).focus();
        this.setState({
            displayModal:false,
            isSearched:false
        }, ()=>{
            this.resetAllData();
            this.props.clearErrors();
        });
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleFocus = (event) =>{
        event.target.select();
        event.target.setAttribute('autocomplete', 'off');
    }

    onSearchButtonClick=(e)=>{
        if(document.getElementById("searchInpId")){
                document.getElementById("searchInpId").focus();
            }
        this.setState({ isCountrySelected: false , isSearched:true})
        this.searchActions(this.state.searchSelection);
    }

    searchActions = (searchType)=>{
        if(this.state.searchInput){
            let searchInfo = {
                searchType: searchType,
                searchInput: this.state.searchInput,
                selectedSideOption:this.state.selectedSideOption
            }
            this.props.searchForAirports(searchInfo);
        }
    }

    onRadioChange=(e)=>{
        this.setState({
            searchSelection:e.target.value
        }, ()=>{
            if(document.getElementById("searchInpId")){
                document.getElementById("searchInpId").focus();
            }
        });
    }

    onRegionSelect=(e, value, name)=>{
        let selectedSideOption = {
            regionCode: value,
            countryCode:'',
            allRegion:''
        }
        this.sideMenuClassChange(e);
        this.props.getByRegion(value);
        this.setState({
            selectedSideOption,
            isCountrySelected: false,
            selectedRegion:name,
            isSearched:false,
        });
    }
    
    onOtherCountrySelect = (e, value, name)=>{
        let selectedSideOption = {
            regionCode: value,
            countryCode:'',
            allRegion:''
        }
        this.sideMenuClassChange(e);
        this.props.getByOtherCountry(value);
        this.setState({
            selectedSideOption,
            isCountrySelected: false,
            selectedRegion:name,
            isSearched:false,
        });
    }

    onAllRegionSelect=(e, value)=>{
        let selectedSideOption = {
            regionCode: '',
            countryCode:'',
            allRegion:'all'
        }
        this.sideMenuClassChange(e);
        this.props.getByCountry('all');
        this.setState({
            selectedSideOption,
            isCountrySelected: true,
            isSearched:false,
        });
    }

    onCountrySelect=(e, value, name)=>{
        let selectedSideOption = {
            regionCode: '',
            countryCode:value,
            allRegion:''
        }
        this.props.getByCountry(value);
        this.sideMenuClassChange(e);
        this.setState({
            selectedSideOption,
            isCountrySelected: true,
            selectedRegion:name,
            isSearched:false,
        });
    }


    sideMenuClassChange=(e)=>{
        const index = e.currentTarget.id;
        var current = document.getElementsByName("regionName");
        for (var i = 0; i < current.length; i++) {
            current[i].className=current[i].className.replace("active", "");
        }
        document.getElementById(index).className += "active";
    }

    onAirportSelect=(e, value)=>{
        this.setState({
            selectedAirport:value,
            isSelectEnabled:false,
        });
    }

    onMainSelectButtonClick=(e)=>{
        this.setState({
            airportInput:this.state.selectedAirport
        }, ()=>{
            this.resetAllData();
        });
        this.updatePropValues(e, this.state.selectedAirport);
    }

    searchForAirport=(e)=>{
        const inpText = e.target.value.toUpperCase();
        this.setState({
            [e.target.name]:inpText
        });
        this.updatePropValues(e, inpText);
    }

    updatePropValues(event, value) {
        this.props.autoLabelAirport(value);
        if (this.props.onChange) {
            this.props.onChange({
                originalEvent: event,
                value: value,
                stopPropagation : () =>{},
                preventDefault : () =>{},
                target: {
                    name: this.props.name,
                    id: this.props.id,
                    value: value
                }
            });
        }
    }

    renderFooter=(t)=> {
        return (
            <div>
                <Button id="airportBackBtn" label={t('airportSearch.labels.goBack')} hotkey="alt+b" pageId={activePageConstants.AIRPORT_POPUP} style={{float:'left'}} onClick={this.onHide} className="marvel-primary"/>
                <Button id="airportSlctBtn" label={t('airportSearch.labels.select')} hotkey="alt+e" pageId={activePageConstants.AIRPORT_POPUP} onClick={(e) => this.onMainSelectButtonClick(e)} disabled={this.state.isSelectEnabled} className="air-select-btn"/>
            </div>
        );
    }

    /* code for infinite scroll */
    onInfiniteScroll = () => {
        this.refs.iScroll.addEventListener("scroll", () => {
        if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
            this.refs.iScroll.scrollHeight - 100) {
                if(this.state.selectedSideOption.allRegion === 'all') {
                        this.loadMoreItems();
                    }
                }
        });
    };

    /* loading remaining items */
    loadMoreItems = () => {
        if (this.state.loadingState) {
            return;
        }
        this.setState({ loadingState: true });
            setTimeout(() => {
                this.setState(old => ({ items: old.items + 1, loadingState: false }));
            }, 100);
            if(this.state.selectedSideOption.allRegion === 'all') {
                this.props.getByCountry('all');
            }
    };

    renderAirportEnglish = ()=>{
        const { countryData, airportData } = this.props;
        let airColor = "#F0EEF0";
        if(!this.state.isCountrySelected){
            return (
                countryData.length ? countryData.map((country, index) =>{
                    let color = "#F0EEF0";
                    let arrLength = country.airport.length;
                    return <div key={index}>
                     <div className={this.state.selectedSideOption.regionCode === 'JPN' ? 'sub-country-header' : 'airport-sub-head'} style={{display:this.state.isSearched && this.state.selectedSideOption.regionCode === 'JPN' ? 'none' :''}}><li>{country.enName}</li><li></li><li></li></div>
                        <ul>
                            {
                            country.airport.sort(
                                (a, b)=>{
                                    let x = a.enName.toUpperCase(),
                                        y = b.enName.toUpperCase();
                                    return x === y ? 0 : x > y ? 1 : -1;
                                }).map((airport, i)=>{
                                    var airportElement = <li id={i} tabIndex={i} key={i} style={{background:color}} className="myClass" onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.enName}</li>
                                    if((i+1) % 3 === 0){
                                        if((i+1) % 2 === 0){
                                            color="#F0EEF0";
                                        } else{  
                                            color="#FFFFFF";
                                        }
                                    }                                 
                                    return React.createElement("div", {
                                        id:i+1,
                                    }, airportElement);
                            }, this)
                            }
                            {
                                arrLength % 3 !==0 ? ((arrLength+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':color}}, <li></li>) : (this.spaceFillFunction(color))) :''
                            }
                        </ul>
                    </div>
                }, this) : ''
            )
        } else {
            return(
                <>
                    {
                        this.state.selectedSideOption.allRegion ? 
                        airportData.slice(0, this.state.items).map((data, i) =>{
                            let color = "#F0EEF0";
                            let arrLength = data.airport.length;    
                            return <div key={i}>
                                <div className="sub-country-header"><li>{data.group}</li><li></li><li></li></div>
                                <ul>
                                { 
                                data.airport.sort(
                                    (a, b)=>{
                                        let x = a.enName.toUpperCase(),
                                            y = b.enName.toUpperCase();
                                        return x === y ? 0 : x > y ? 1 : -1;
                                    }).map((airport, index)=>{
                                        var airportElement = <li id={index} tabIndex={index} key={index} style={{background:color}} onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.enName}</li>
                                        if((index+1) % 3 === 0){
                                            if((index+1) % 2 === 0){
                                                color="#F0EEF0";
                                            } else{  
                                                color="#FFFFFF";
                                            }
                                        }                                 
                                        return React.createElement("div", {
                                            id:index+1,
                                        }, airportElement);
                                    }, this)
                                }
                                    {
                                        arrLength % 3 !==0 ? ((arrLength+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':color}}, <li></li>) : (this.spaceFillFunction(color))) :''
                                    }
                                </ul>
                            </div>
                        }, this)
                        : <ul>{
                            airportData.map((airport, index) =>{
                            var airportElement = <li tabIndex={index} key={index} style={{background:airColor}} onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.enName}</li>;
                                    if((index+1) % 3 === 0){
                                        if((index+1) % 2 === 0){
                                            airColor="#F0EEF0";
                                        } else{  
                                            airColor="#FFFFFF";
                                        }
                                    }
                                    return React.createElement("div", {
                                        id:index+1,
                                    }, airportElement);
                                    }, this)
                            }
                                {
                                airportData.length % 3 !==0 ? ((airportData.length+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':airColor}}, <li></li>) : (this.spaceFillFunction(airColor))) :''
                                }
                        </ul>
                    }
                </>)
             }
    }

    spaceFillFunction = (color)=>{
        return(
            <>
                <div className='extra-div' style={{background:color}}><li></li></div>
                <div className='extra-div' style={{background:color}}><li></li></div>
            </>
        )
    }

    renderAirportJapanese = ()=>{
        const { countryData, airportData } = this.props;
        let airColor = "#F0EEF0";
        if(!this.state.isCountrySelected){
            return (
                countryData.length ? countryData.map((country, index) =>{
                    let color = "#F0EEF0";
                    let arrLength = country.airport.length;
                    return <div key={index}>
                     <div className={this.state.selectedSideOption.regionCode === 'JPN' ? 'sub-country-header' : 'airport-sub-head'} style={{display:this.state.isSearched && this.state.selectedSideOption.regionCode === 'JPN' ? 'none' :''}}><li>{country.jpName}</li><li></li><li></li></div>
                        <ul>
                            {
                                country.airport.sort(
                                    (a, b)=>{
                                        let x = a.enName.toUpperCase(),
                                            y = b.enName.toUpperCase();
                                        return x === y ? 0 : x > y ? 1 : -1;
                                    }).map((airport, i)=>{
                                    var airportElement = <li tabIndex={i} key={i} style={{background:color}} onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.jpName}</li>
                                    if((i+1) % 3 === 0){
                                        if((i+1) % 2 === 0){
                                            color="#F0EEF0";
                                        } else{  
                                            color="#FFFFFF";
                                        }
                                    }                                 
                                    return React.createElement("div", {
                                        id:i+1,
                                    }, airportElement);
                                }, this)
                            }
                            {
                                arrLength % 3 !==0 ? ((arrLength+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':color}}, <li></li>) : (this.spaceFillFunction(color))) :''
                            }
                        </ul>
                    </div>
                }, this): ''
            )
        } else {
            return(
                <>
                {
                    this.state.selectedSideOption.allRegion ? 
                        airportData.slice(0, this.state.items).map((data, i) =>{
                            let color = "#F0EEF0";
                            let arrLength = data.airport.length;   
                            return <div key={i}>
                                <div className="sub-country-header"><li>{data.group}</li><li></li><li></li></div>
                                <ul>
                                { data.airport.sort(
                                        (a, b)=>{
                                            let x = a.enName.toUpperCase(),
                                                y = b.enName.toUpperCase();
                                            return x === y ? 0 : x > y ? 1 : -1;
                                        }).map((airport, index)=>{
                                        var airportElement = <li tabIndex={index} key={index} style={{background:color}} onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.jpName}</li>
                                        if((index+1) % 3 === 0){
                                            if((index+1) % 2 === 0){
                                                color="#F0EEF0";
                                            } else{  
                                                color="#FFFFFF";
                                            }
                                        }                                 
                                        return React.createElement("div", {
                                            id:index+1,
                                        }, airportElement);
                                    }, this)
                                 }
                                    {
                                        arrLength % 3 !==0 ? ((arrLength+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':color}}, <li></li>) : (this.spaceFillFunction(color))) :''
                                    }
                                </ul>
                            </div>
                        }, this)
                        : <ul>
                            {airportData.map((airport, index) =>{   
                            var airportElement = <li tabIndex={index} key={index} style={{background:airColor}} onClick={e => this.onAirportSelect(e, airport.threeDigitCode)}><label>{airport.threeDigitCode}</label>{airport.jpName}</li>
                            if((index+1) % 3 === 0){
                                if((index+1) % 2 === 0){
                                    airColor="#F0EEF0";
                                } else{  
                                    airColor="#FFFFFF";
                                }
                            }
                            return React.createElement("div", {
                                id:index+1,
                            }, airportElement);
                        }, this)
                        }
                        {
                            airportData.length % 3 !==0 ? ((airportData.length+1) % 3 === 0 ? React.createElement("div", {className:'extra-div', style:{'background':airColor}}, <li></li>) : (this.spaceFillFunction(airColor))) :''
                        }
                    </ul>
                    }
                </>)
             }
    }

    renderRegionEnglish = ()=>{
        const {regionData} = this.props;
        return(
            regionData.length ? regionData.map((region, index) =>(
                <div key={index}>
                    <ul className="modal-list-cat">
                        <li id={`region${index}`} name="regionName" tabIndex={index} className={region.mapKey==='JPN' && this.state.selectedSideOption.allRegion === ''? 'active': ''} onClick={e => this.onRegionSelect(e, region.mapKey, region.enName)}>
                            <span className="square"></span>{region.enName}
                        </li>                       
                    </ul>
                    <>
                    { region.subFlg !== '0' ?
                        region.displayCountry.sort(
                            (a, b)=>{
                                let x = a.enName.toUpperCase(),
                                    y = b.enName.toUpperCase();
                                return x === y ? 0 : x > y ? 1 : -1;
                            }
                        ).map((country, i) =>(
                            <ul className="modal-list-cat" key={i}>
                                <li id={`city${index}${i}`} name="regionName" tabIndex={i} className="child-link " onClick={e => this.onCountrySelect(e, country.threeDigitCode, country.enName)}>
                                    {country.enName}
                                </li>                       
                            </ul>
                        ), this) : ''
                    }
                    {
                        region.otherCountry.length ? 
                            <ul className="modal-list-cat">
                                <li id={`otherAirport ${region.mapKey}`} name="regionName" tabIndex={1} className="child-link " onClick={e => this.onOtherCountrySelect(e, region.mapKey, region.enOthrName)}>
                                    {region.enOthrName}
                                </li>                       
                            </ul> : ''
                    }
                    </>
                </div>
            ), this) :''
        )
    }

    renderRegionJapanese = ()=>{
        const {regionData} = this.props;
        return(
            regionData.length ? regionData.map((region, index) =>(
                <div key={index}>
                    <ul className="modal-list-cat">
                        <li id={`region${index}`} name="regionName" tabIndex={index} className={region.mapKey==='JPN' && this.state.selectedSideOption.allRegion === ''? 'active': ''} onClick={e => this.onRegionSelect(e, region.mapKey, region.jpName)}>
                            <span className="square"></span>{region.jpName}
                        </li>                       
                    </ul>
                    <>
                    { region.subFlg !== '0' ?
                        region.displayCountry.sort(
                            (a, b)=>{
                                let x = a.enName.toUpperCase(),
                                    y = b.enName.toUpperCase();
                                return x === y ? 0 : x > y ? 1 : -1;
                            }
                        ).map((country, i) =>(
                            <ul className="modal-list-cat" key={i}>
                                <li id={`city${index}${i}`} name="regionName" tabIndex={i} className="child-link " onClick={e => this.onCountrySelect(e, country.threeDigitCode, country.jpName)}>
                                    {country.jpName}
                                </li>                       
                            </ul>
                        ), this) : ''
                    }
                    {
                        region.otherCountry.length ? 
                            <ul className="modal-list-cat">
                                <li id={`otherAirport ${region.mapKey}`} name="regionName" tabIndex={1} className="child-link " onClick={e => this.onOtherCountrySelect(e, region.mapKey, region.jpOthrName)}>
                                    {region.jpOthrName}
                                </li>                       
                            </ul> : ''
                    }
                    </>
                </div>
            ), this):''
        )
    }

    renderHeader =()=>{ 
        const { t } = this.props;
        return(
            <div>
                <div className="search-title">
                    <div className="header-lbl">
                        <label>{t('airportSearch.labels.header')}</label>
                    </div>
                    <Error error={this.props.displayError} pageId={activePageConstants.AIRPORT_POPUP}></Error>
                </div>
            </div>
        )
    }

    resetAllData = () =>{
        this.setState({
            displayModal: false,
            partialMatch:'',
            prefixMatch:'',
            codeMatch:'',
            searchInput:'',
            searchSelection:'',
            selectedAirport:'',
            isCountrySelected: true,
            isSelectEnabled:true,
            selectedRegion:'',
            selectedSideOption:{
                regionCode:'JPN',
                countryCode:'',
                allRegion:''
                }
            }, ()=>{
                this.props.getAirportInfo();
            });
        }
    
    render () {      
        const {
            id,
            className,
            disabled,
            displayLanguage,
            t,
            isError,
            maxLength,
            displayError
          } = this.props;
      return (
        <div className={className}>
            <div className="air-disp-element">
                <div className="airport-inp-text">
                    <InputText id={id} name="airportInput" keyfilter="alpha" className={`airport-input ${isError ? 'error-textbox':''}`} onChange={this.searchForAirport} value={this.state.airportInput} style={{textTransform: 'uppercase'}} maxLength={maxLength} disabled={disabled} tabindex={1} customFocus={this.handleFocus}/>
                </div>
                <div className="air-modal-btn-element">
                    <img id="airportIcon" alt="airport" src={disabled ? require('../../../assets/img/loupe_s_disabled.png'):require('../../../assets/img/loupe_15.png')} className={`marvel-primary air-modal-btn ${disabled ? 'img-disabled' : ''}`} onClick={this.onShow} disabled={disabled}/> 
                </div>
            </div>
            <Dialog id="airportModal" header={t('airportSearch.labels.header')} visible={this.state.displayModal} style={{width: '802px'}} onHide={this.onHide} modal={true}
                footer={this.renderFooter(t)} disabled={disabled} className="air-serch-modal">
                <div className="airport-component font-class">   
                    <div className="container">
                        <div className="">
                            <div className="search-header">
                                {this.renderHeader()}
                            </div>
                            <div className="search-area">
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-6 p-lg-3">
                                        <InputText id="searchInpId" name="searchInput" keyfilter="alpha" className={`air-search-input ${displayError.length ? '': ''}`} value={this.state.searchInput} maxLength={100} onChange={this.onChange} customFocus={this.handleFocus}/>
                                    </div>
                                    <div className="p-col-12 p-md-6 p-lg-2 p-col-fixed" style={{width:'130px', marginTop:'.5em'}}>
                                        <RadioButton inputId="partialMatch" hotkey="alt+p" pageId={activePageConstants.AIRPORT_POPUP} name="partialMatch" value="partialMatch" onChange={this.onRadioChange} checked={this.state.searchSelection === 'partialMatch'} />
                                        <label htmlFor="rb1" className="p-radiobutton-label">{t('airportSearch.labels.partialMatch')}</label>
                                    </div>
                                    <div className="p-col-12 p-md-6 p-lg-2 p-col-fixed" style={{width:'130px',marginTop:'.5em'}}>
                                        <RadioButton inputId="prefixMatch" hotkey="alt+l" pageId={activePageConstants.AIRPORT_POPUP} name="prefixMatch" value="prefixMatch" onChange={this.onRadioChange} checked={this.state.searchSelection === 'prefixMatch'} />
                                        <label htmlFor="prefixMatch" className="p-radiobutton-label">{t('airportSearch.labels.leftMatch')}</label>
                                    </div>
                                    <div className="p-col-12 p-md-6 p-lg-2 p-col-fixed radio-arrange" style={{width:'130px',marginTop:'.5em'}}>
                                        <RadioButton className="" inputId="codeMatch"  hotkey="alt+c" pageId={activePageConstants.AIRPORT_POPUP} name="codeMatch" value="codeMatch" onChange={this.onRadioChange} checked={this.state.searchSelection === 'codeMatch'} />
                                        <label htmlFor="codeMatch" className="p-radiobutton-label">{t('airportSearch.labels.codeMatch')}</label>
                                    </div>
                                    <div className="p-col-12 p-md-6 p-lg-2 p-col-fixed" style={{float:'right', width:'118px'}} >
                                        <Button id="searchButton" label={t('airportSearch.labels.search')} hotkey="alt+s" pageId={activePageConstants.AIRPORT_POPUP} className="p-button-raised marvel-primary search-btn" onClick={this.onSearchButtonClick}/>
                                    </div>
                                </div>
                            </div>
                            <div className="airport-area">
                                <div className="p-grid sample-layout">
                                    <div className="table-div">
                                        <div id="catBox" className="cat-box">
                                            <ul className="modal-list-cat" key="100">
                                                <li id="region100" name="regionName" tabIndex="1" className={`${this.state.selectedSideOption.allRegion ? 'active' :''}`} onClick={e => this.onAllRegionSelect(e, "allData")}>
                                                {t('airportSearch.labels.all')}
                                                </li>                       
                                            </ul>
                                            {displayLanguage === 'en' ? this.renderRegionEnglish() : this.renderRegionJapanese()}
                                        </div>
                                    </div>
                                    <div className="p-col-nogutter airport-div">
                                        <div className="p-grid airport-grid">     
                                            <div className="p-col-12 int-reslut-box" ref="iScroll">
                                                {!this.state.selectedSideOption.allRegion && (this.state.selectedSideOption.regionCode === 'JPN' ||  this.state.isCountrySelected === true) ? <div className="airport-sub-head"><li>{this.state.selectedRegion ? this.state.selectedRegion: t('airportSearch.labels.japan')}</li><li></li><li></li></div> :'' }
                                                {displayLanguage === 'en' ? this.renderAirportEnglish() : this.renderAirportJapanese()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </Dialog>
        </div>
      )
    }
  }

  const mapStateToProps=(state)=>{
    const regionData = state.airportSearchReducer.regionInfo;
    const countryData = state.airportSearchReducer.countryData;
    const displayCountries = state.airportSearchReducer.displayCountries;
    const airportList = state.airportSearchReducer.airportList;
    const airportData = state.airportSearchReducer.airportData;
    const airportLabel = state.airportSearchReducer.airportLabel;
    const displayLanguage = state.translationReducer.selectedLanguage;
    const displayError = state.airportSearchReducer.error;
    return{ regionData, displayCountries, countryData, airportList, airportData, airportLabel, displayLanguage, displayError}
  }
   
  const mapDispatchToProps=(dispatch)=>{
   return{
    getAirportInfo: ()=>{
        dispatch(airportSearchActions.getAirportInfo())
    },
    getAllData: ()=>{
           dispatch(airportSearchActions.getAllData())
       },
    getByRegion: (value)=>{
        dispatch(airportSearchActions.getByRegion(value))
      },
    getByCountry: (value)=>{
        dispatch(airportSearchActions.getByCountry(value))
      },
    getByOtherCountry: (value)=>{
        dispatch(airportSearchActions.getByOtherCountry(value))
    },
    searchForAirports: (value) =>{
        dispatch(airportSearchActions.searchForAirports(value))
    },
    autoLabelAirport: (value) =>{
        dispatch(airportSearchActions.autoLabelAirport(value))
    },
    clearErrors: () =>{
        dispatch(airportSearchActions.clearErrors())
    },
    setPage: (pageId) =>{
        dispatch(activePageActions.setPage(pageId))
    }
   }
  }

  export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(AirportSearch));
