import React, { Component } from 'react';
import './SearchHistory.css';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import InputText from '../keyboard/InputText';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from '../keyboard/Button';
import { searchHistoryActions, activePageActions } from '../../../action';
import { connect } from 'react-redux';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import Error from '../error/Error';
import { errorConstants, activePageConstants } from '../../../constants';
import { withTranslation } from 'react-i18next';

class SearchHistory extends Component {

    constructor(props){
        super(props);
        this.state={
            displayModal: false,
            selectedInput:'',
            SearchHistory:[],
            error:[]
        }
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.renderFooter=this.renderFooter.bind(this);
        this.clearHistory=this.clearHistory.bind(this);
        this.onIndexTemplate = this.onIndexTemplate.bind(this);
    }

    componentDidUpdate(){
        setTimeout(function() {
            if(document.getElementById("selectedInpId")){
                document.getElementById("selectedInpId").focus();
            }
            this.props.setPage(activePageConstants.HISTORY_POPUP);
        }.bind(this), 300);
    }

    static propTypes = {
        id:PropTypes.string,
        disabled:PropTypes.bool,
        className: PropTypes.string,
        onHistory:PropTypes.func
    }

    static defaultProps = {
        disabled: false,
    };

    onShow=()=> {
        if(!this.props.disabled){
            this.props.setPage(activePageConstants.HISTORY_POPUP);
            this.props.getHistory();
            let state = {
                displayModal: true
            };
            this.setState(state);
        }
    }

    onHide=() =>{
        this.props.setPage(activePageConstants.VACANCY_SEARCH);
        let selectedInput = this.state.selectedInput;
        if(this.state.error.length){
            selectedInput = ""
        }
        this.setState({
            displayModal:false,
            error:[],
            selectedInput
        });
        if(document.getElementById('yearDropdown').getElementsByTagName('input')[1]){
            document.getElementById('yearDropdown').getElementsByTagName('input')[1].focus();
        }
    }

    handleFocus = (event) =>{
        event.target.select();
        event.target.setAttribute('autocomplete', 'off');
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    clearHistory=()=>{
        this.props.clearHistory();
        this.resetData();
    }

    onMainSelectButtonClick=(e)=>{
        if ( this.state.selectedInput > this.props.history.length){
                let error = [errorConstants.DMS1100_003];
                this.setState({
                    error
                });
        } else if(this.state.selectedInput.charAt(0) === '0'){ 
                let error = [errorConstants.DMS1100_003];
                this.setState({
                    error
                });
        } else if(isNaN(this.state.selectedInput)){
            let error = [errorConstants.DMS1100_003];
                this.setState({
                    error
                });
        } else{
            const searchHistory = this.props.history.filter((history, index)=>
                              Number(this.state.selectedInput) === Number(index + 1));
            this.onHistorySelect(e, searchHistory[0]);
            this.onHide();
        }
    }

    onTableSelect=(e, rowData)=>{
        this.onHistorySelect(e, rowData);
        this.onHide();
    }

    onHistorySelect = (event, history)=>{
            this.props.onHistory({
                originalEvent: event,
                value: history,
                stopPropagation : () =>{},
                preventDefault : () =>{},
                target: {
                    id: this.props.id,
                    value: history
                }
            });
    }

    formatDate = (rowData)=>{
        let rowDate = rowData.depDate;
        let monthNames =["JAN","FEB","MAR","APR",
                      "MAY","JUN","JUL","AUG",
                      "SEP", "OCT","NOV","DEC"];
        if(rowData.searchedDateFlag === 'noYear'){
            let dateArray = rowDate.split("-");
            let year = "";
            let day = dateArray[2];
            let monthIndex = String(dateArray[1]).startsWith('0') ? String(dateArray[1]).slice(1,2) : String(dateArray[1]);
            let month = monthNames[monthIndex - 1];
            return (day+month+year);
        } else if(rowData.searchedDateFlag === 'noDate'){
            return '';
        } else{
            let dateArray = rowDate.split("-");
            let year = dateArray[0].slice(2, 4);
            let day = dateArray[2];
            let monthIndex = String(dateArray[1]).startsWith('0') ? String(dateArray[1]).slice(1,2) : String(dateArray[1]);
            let month = monthNames[monthIndex - 1];
            return (day+month+year);
        }             
    }

    resetData = () =>{
        this.setState({
            error:[]
        });
    }

    customTableTemplate = (rowData) =>{
        const {t} = this.props;
        return (
            <React.Fragment>
                <button className="button-link" value={rowData} onClick={ (e) => this.onTableSelect(e, rowData)}>{t('searchHistory.labels.selectTable')}</button>
            </React.Fragment>
        );
    }

    customLocationTemplate = (rowData)=>{
        let code = rowData.isFlightNumSearch ? 'NH'+rowData.fltNbr : rowData.depCode + rowData.arvCode ;
        return (
            <React.Fragment>
                <label className="dep-arr-label">{code}</label>
            </React.Fragment>
        );
    }
    
    onIndexTemplate = (data, props) =>{
        return props.rowIndex + 1;
    }
    renderFooter=(t)=> {
        return (
            <div>
                <Button id="histBackBtn" label={t('searchHistory.labels.close')} hotkey="alt+c" pageId ={activePageConstants.HISTORY_POPUP} style={{float:'left'}} onClick={this.onHide} className="marvel-primary hist-clear-btn"/>
                <div className="footer-class">
                    <div style={{display:'inline-block'}}>
                        <label className="footer-label" > {t('searchHistory.labels.numText')} 
                            <InputText id="selectedInpId" hotkey="alt+n" name="selectedInput" keyfilter="pnum" className={`search-input ${this.state.error.length ? 'error-textbox' : ''}`} type="text" style={{width: '70px'}} value={this.state.selectedInput} onChange={this.onChange} maxLength={5} customFocus={this.handleFocus}/>
                        </label>
                    </div>
                    <Button id="histSelectBtn" className="marvel-primary hist-clear-btn" label={t('searchHistory.labels.select')}  hotkey="alt+s" pageId ={activePageConstants.HISTORY_POPUP} onClick={this.onMainSelectButtonClick}></Button>
                </div>
            </div>
        );
    }

    render(){
        const {
            id,
            className,
            disabled,
            history,
            t
          } = this.props;
          let headerGroup = <ColumnGroup>
                            <Row>
                                <Column header={t('searchHistory.labels.numLabel')} style={{textAlign:'left', borderLeft:'0px'}} rowSpan={2}/>
                                <Column header={t('searchHistory.labels.segementOne')} style={{textAlign:'left', borderBottom:'1px solid #c8c8c8'}} colSpan={4} />
                                <Column header={t('searchHistory.labels.segementTwo')} style={{textAlign:'left', borderBottom:'1px solid #c8c8c8'}} colSpan={4} />
                                <Column header="" rowSpan={2} style={{width:'4em', borderRight:'0px'}}/>
                            </Row>
                            <Row>
                                <Column header={t('searchHistory.labels.boardingDate')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.segment')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.seatCount')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.fareType')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.boardingDate')} style={{textAlign:'left', width:'5em'}}/>
                                <Column header={t('searchHistory.labels.segment')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.seatCount')} style={{textAlign:'left'}}/>
                                <Column header={t('searchHistory.labels.fareType')} style={{textAlign:'left'}}/>
                            </Row>
                        </ColumnGroup>;
		return(
            <div className={`history-area ${className}`}>
                <img alt="Search History" id="histModalBtn" src={require('../../../assets/img/btn_header_rloc_15.png')} className={`history-modal ${disabled ? '' : ''}`} onClick={this.onShow} disabled={disabled}/>
                <Dialog id={id} visible={this.state.displayModal} style={{width: '802px'}} onHide={this.onHide} modal={true}
                    footer={this.renderFooter(t)} disabled={disabled}>
                    <div className="search-history-area">
                        <div className="container">
                            <div className="search-header">
                                {this.renderHeader()}
                            </div>
                            <div className="clear-button" style={{float:'right'}} >
                                <Button id="histSearchBtn" label={t('searchHistory.labels.clear')} hotkey="alt+l" pageId ={activePageConstants.HISTORY_POPUP} className="marvel-primary hist-clear-btn" onClick={this.clearHistory}/>
                            </div>
                            <div className="card">
                                <div className="history-container">
                                    <DataTable value={history} headerColumnGroup={headerGroup}
                                        scrollable={true} scrollHeight="332px">
                                        <Column field="Index" body={this.onIndexTemplate} style={{width:'4em', textAlign:'left', fontSize: '1.3rem'}}/>
                                        <Column body={this.formatDate} style={{textAlign:'left', fontSize: '1.3rem', width:'4.8em'}} />
                                        <Column body={this.customLocationTemplate} headerStyle={{width: '6.3em', textAlign: 'left'}} bodyStyle={{textAlign: 'left', overflow: 'visible', fontSize: '1.3rem'}}/>
                                        <Column field="bookSeats" style={{textAlign:'left', fontSize: '1.1rem', width:'4em'}} />
                                        <Column field="" style={{textAlign:'left', width:'5em'}} />
                                        <Column field="" style={{textAlign:'left', width:'4em'}} />
                                        <Column field="" style={{textAlign:'left', width: '6.3em'}} /> 
                                        <Column field="" style={{textAlign:'left', width:'3em'}} />
                                        <Column field="" style={{textAlign:'left', width:'5em'}} />
                                        <Column body={this.customTableTemplate} headerStyle={{width: '4em', textAlign: 'left'}} bodyStyle={{textAlign: 'left', overflow: 'visible', fontSize: '1.3rem'}}/>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
            )
        }

    renderHeader =()=>{
        const { t } = this.props;
        return(
            <div>
                <div className="search-title">
                    <div className="header-lbl">
                        <label>{t('searchHistory.labels.header')}</label>
                    </div>
                    <div><Error error={this.state.error} pageId={activePageConstants.HISTORY_POPUP}/></div>
                    <div className="header-icons">
                        <img id="starBtn" src={require('../../../assets/img/star-icon.png')} className="star-icon"  onClick={this.onStarButtonClick} />
                        <img id="questionBtn" className="que-icon" src={require('../../../assets/img/icn_help_30-30.png')} onClick={this.onQueButtonClick} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    const history = state.searchHistoryReducer.history;
    return { history }
  }
   
  const mapDispatchToProps=(dispatch)=>{
   return{
    clearHistory: ()=>{
            dispatch(searchHistoryActions.clearHistory())
      },
    getHistory: ()=>{
        dispatch(searchHistoryActions.getHistory())
      },
    setPage: (pageId) =>{
            dispatch(activePageActions.setPage(pageId))
      }
   }
  }

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps) (SearchHistory));
