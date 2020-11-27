import React, { Component } from 'react';
import './VacancyResult.css'
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import DateSlider from '../common/dateSlider/DateSlider';
import VacancyResultTable from './VacancyResultTable';
import Button from '../common/keyboard/Button';
import { vacancySearchActions, activePageActions} from '../../action';
import SideElement from './SideElement';
import BreadCrumb from '../common/breadcrumb/BreadCrumb';
import { activePageConstants } from '../../constants';
import Error from '../common/error/Error';



class VacancyResult extends Component{

    constructor(props) {
        super(props);
        this.defaultDateCount =30;
        this.visibleDates =7;
        this.day = 60 * 60 * 24 * 1000;
        this.state = {
            date : new Date(),
            action:"",
            origin:"",
            destination:""
        };
        this.onClickedReverseButton = this.onClickedReverseButton.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.clickedBackward = this.clickedBackward.bind(this);
        this.clickedForward = this.clickedForward.bind(this);
        this.onFlightConfirmButtonClick = this.onFlightConfirmButtonClick.bind(this);
        this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
        this.onDummyAction = this.onDummyAction.bind(this);
        this.originDestinationRender = this.originDestinationRender.bind(this);
        this.fareFilterUpdFun = this.fareFilterUpdFun.bind(this);
        this.seatCountUpdFun = this.seatCountUpdFun.bind(this);
        
        setTimeout(() => {
            var preElement = document.getElementsByClassName("p-carousel-prev-icon");
                if(preElement && preElement.length >0)
                    preElement[0].className="p-carousel-prev-icon arrow-left ";
            var nextElement = document.getElementsByClassName("p-carousel-next-icon");
                if(nextElement && nextElement.length >0)
                    nextElement[0].className="p-carousel-next-icon arrow-right ";
            var element = document.getElementsByClassName("p-dropdown-trigger-icon");
                if(element && element.length >0) {
                    element[0].className="arrow-down p-clickable";
                }
                
        }, 100);
        
        
    }

    componentDidUpdate(prevProps, prevState) {
      

    }

    componentDidMount() {
        this.props.setPage(activePageConstants.VACANCY_RESULT);
        
    }
    componentWillUnmount() {
        this.props.setPage(activePageConstants.LANDING_PAGE);
    }

    onFlightConfirmButtonClick () {
       
    }
    onCloseButtonClick () {

        this.props.onHide(false);
    }
    onDummyAction() {

    }

    
    renderFooter =()=>{
        const { t } = this.props;
        return(
            <div className="footer-area vacancy-result-footer">
                <div className="btn-footer-right">
                    <Button id="dumBtn1" style={{marginRight:'.5em'}} className="marvel-primary clear-btn urg-res-button" label={t('vacancyResult.upgRes')} value="dumBtn1" disabled={false} onClick={this.onDummyAction}/>
                    <Button id="dumBtn2" style={{marginRight:'.5em'}} className="marvel-primary clear-bt open-res-button" label={t('vacancyResult.openFliRes')} value="dumBtn2" disabled={false} onClick={this.onDummyAction}/>
                    <Button id="dumBtn3" style={{marginRight:'.5em'}} className="marvel-primary clear-btn cust-info-button" label={t('vacancyResult.moveToCust')} value="dumBtn3" disabled={false} onClick={this.onDummyAction}/>
                    <Button id="flightConfirmBtn" className="btn-select-main res-main-conf-button" hotkey="alt+e" pageId={activePageConstants.VACANCY_RESULT} label={t('vacancyResult.confirm')} value="flightConfirmBtn" onClick={this.onFlightConfirmButtonClick}/>
                </div>
                <div className="btn-footer-left">
                    <Button id="backBtn" className="marvel-primary clear-btn result-close-button" hotkey="alt+c" pageId={activePageConstants.VACANCY_RESULT} label={t('vacancyResult.close')} value="backBtn" onClick={this.onCloseButtonClick}/>
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
                        <label>{t('vacancyResult.screenHeader')}</label>
                    </div>
                    <div><Error error={this.props.error.length ?  this.props.error : sysError} pageId={activePageConstants.VACANCY_RESULT} /></div>
                    <div className="header-icons">
                        <img id="starBtn" src={require('../../assets/img/star-icon.png')} className="star-icon"  onClick={this.onStarButtonClick} />
                        <img id="questionBtn" className="que-icon" src={require('../../assets/img/icn_help_30-30.png')} onClick={this.onQueButtonClick} />
                    </div>
                </div>
                <BreadCrumb isSearchScreen={false}/>
            </div>
        )
    }

    getDateStringfromDate(date){
        let dateString ;
        let year =  date.getFullYear();
        let month = date.getMonth()+1;
        month = ('0' + month).slice(-2);
        let day = date.getDate();
        day = ('0' + day).slice(-2);
        dateString = year+"-"+month+"-"+day;
        return dateString;
    }

    onClickedReverseButton () {
        if(this.props.searchRequest.isFlightNumSearch ) {
            this.props.searchRequest.depCode = this.state.destination;
            this.props.searchRequest.arvCode = this.state.origin;
            this.props.searchRequest.isFlightNumSearch = false;
        } else {
            this.props.searchRequest.depCode = [this.props.searchRequest.arvCode, this.props.searchRequest.arvCode = this.props.searchRequest.depCode][0];
        }
        this.props.searchRequest.resultPageFlag =true;
        this.props.searchRequest.depTime ="";
        this.props.getVacancyResult(this.props,this.props.searchRequest);
        this.setState({
           action:"reverse"
        });
    }

    clickedBackward(){
        let newDate = new Date(new Date(this.props.searchRequest.depDate).getTime() - this.day);
        this.props.searchRequest.depDate = this.getDateStringfromDate(newDate);
        this.props.searchRequest.resultPageFlag =true;
        this.props.searchRequest.depTime ="";
        this.props.getVacancyResult(this.props,this.props.searchRequest);
        this.setState({
             action:"forward"
        });
    }


    clickedForward(){
        let newDate = new Date( new Date(this.props.searchRequest.depDate).getTime() + this.day);
        this.props.searchRequest.depDate = this.getDateStringfromDate(newDate);
        this.props.searchRequest.resultPageFlag =true;
        this.props.searchRequest.depTime ="";
        this.props.getVacancyResult(this.props,this.props.searchRequest);
        this.setState({
           action:"backward"
        });
    }

    changeDate (date) {
        this.props.searchRequest.depDate = this.getDateStringfromDate(date);
        this.props.searchRequest.resultPageFlag =true;
        this.props.searchRequest.depTime ="";
        this.props.getVacancyResult(this.props,this.props.searchRequest); ;
        this.setState({
            action:"selection"
        });
        
    }


    originDestinationRender (depAirport,arrAirPost) {
        this.setState({
            origin:depAirport,
            destination:arrAirPost
        });
    }

    fareFilterUpdFun (fareFilter) {
        this.setState({
            fareFilter:fareFilter
        });
    }
    seatCountUpdFun(seatCount){
        this.props.searchRequest.bookSeats = seatCount;
    }

     
    render(){

        const { t } = this.props;
        return(
            <div className="vacancy-result-screen"> 
                <div className="container">
                    <div className="card">
                        <div className="main-section">
                            <div className="search-header">
                                {this.renderHeader()}
                            </div>
                            <div className="vacancy-result-full-container">
                                <div className="vacancy-result-main-container">
                                    <div className="vacancy-result-data-header">
                                        <div className ="route-diaplay-box">
                                            {this.props.searchRequest.depCode ? this.props.searchRequest.depCode : this.state.origin}-{this.props.searchRequest.arvCode ? this.props.searchRequest.arvCode : this.state.destination}
                                        </div>
                                        <div className ="reverse-button-container">
                                            <Button id="calculateButton"  label={t('vacancyResult.reverse')} hotkey="alt+r" pageId={activePageConstants.VACANCY_RESULT} className="marvel-primary result-reverse-button" size={6}  onClick={this.onClickedReverseButton}/>
                                        </div>
                                        <div  className ="carousel-container">
                                            <DateSlider t={ t } action={this.state.action} onSelect ={this.changeDate} page ={87}  backward ={this.clickedBackward} forward = {this.clickedForward} id="dateSlider" selValue = {this.props.searchRequest.depDate} numVisible={this.visibleDates} numScroll={1} ></DateSlider>
                                        </div>
                                    </div>
                                    <VacancyResultTable  t={ t } name="resultTable" id="resultTable" data ={this.props.vacancyResults} searchObj={this.props.searchRequest} history ={this.props.history} originDestinationRender ={this.originDestinationRender} fareFilterUpdFun ={this.fareFilterUpdFun} seatCountUpdFun={this.seatCountUpdFun}> </VacancyResultTable>
                                </div>
                                <div className="side-option-area">
                                    <SideElement/>
                                </div>

                            </div>
                            <div className="vacancy-result-main-footer">
                                {this.renderFooter()}
                            </div>
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
  const vacancyResults = state.vacancySearchReducer.searchResponse;
  const searchRequest = state.vacancySearchReducer.searchRequest;
  const error = state.vacancySearchReducer.error;
  return{ vacancyResults,searchRequest,error }
}

const mapDispatchToProps=(dispatch)=>{
	return{
	 getVacancyResult: (props,searchCriteria)=>{
            dispatch(vacancySearchActions.vacancySearch(props,searchCriteria))
     },
     setPage: (pageId) =>{
        dispatch(activePageActions.setPage(pageId))
     }
	}
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(VacancyResult));
