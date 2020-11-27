import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Calendar.css';
import {InputText as ReactInputText} from 'primereact/inputtext';
import InputText from '../keyboard/InputText';
import Button from '../keyboard/Button';
import RadioButton from '../keyboard/RadioButton';
import {Dropdown} from 'primereact/dropdown';
import {CalendarPanel} from './CalendarPanel';
import DomHandler from './DomHandler';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import Error  from '../error/Error';
import { connect } from 'react-redux';
import {activePageActions} from '../../../action';
import { errorConstants, activePageConstants } from '../../../constants';


//import {tip} from "../tooltip/Tooltip";

class Calendar extends Component {

    static defaultProps = {
        id: null,
        name: null,
        value: null,
        viewDate: null,
        style: null,
        className: null,
        inline: false,
        selectionMode: 'single',
        inputId: null,
        inputStyle: null,
        inputClassName: null,
        required: false,
        readOnlyInput: false,
        keepInvalid: false,
        disabled: false,
        tabIndex: null,
        placeholder: null,
        showIcon: false,
        icon: 'pi pi-calendar',
        showOnFocus: true,
        numberOfMonths: 1,
        view: 'date',
        touchUI: false,
        showTime: false,
        timeOnly: false,
        showSeconds: false,
        showMillisec: false,
        hourFormat: '24',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1,
        stepMillisec: 1,
        shortYearCutoff: '+10',
        hideOnDateTimeSelect: false,
        showWeek: false,
        locale: {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear',
            weekHeader: 'Wk'
        },
        dateFormat: 'mm/dd/yy',
        panelStyle: null,
        panelClassName: null,
        monthNavigator: false,
        yearNavigator: false,
        disabledDates: null,
        disabledDays: null,
        minDate:new Date("2000-01-01"),
        maxDate: new Date("2099-12-31"),
        maxDateCount: null,
        showOtherMonths: true,
        selectOtherMonths: false,
        showButtonBar: false,
        todayButtonClassName: 'p-button-secondary',
        clearButtonClassName: 'p-button-secondary',
        autoZIndex: true,
        baseZIndex: 0,
        appendTo: null,
        tooltip: null,
        tooltipOptions: null,
        ariaLabelledBy: null,
        dateTemplate: null,
        headerTemplate: null,
        footerTemplate: null,
        onFocus: null,
        onBlur: null,
        onInput: null,
        onSelect: null,
        onChange: null,
        onViewDateChange: null,
        onTodayButtonClick: null,
        onClearButtonClick: null
    }

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.any,
        viewDate: PropTypes.any,
        style: PropTypes.object,
        className: PropTypes.string,
        inline: PropTypes.bool,
        selectionMode: PropTypes.string,
        inputId: PropTypes.string,
        inputStyle: PropTypes.object,
        inputClassName: PropTypes.string,
        required: PropTypes.bool,
        readOnlyInput: PropTypes.bool,
        keepInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        tabIndex: PropTypes.string,
        placeholder: PropTypes.string,
        showIcon: PropTypes.bool,
        icon: PropTypes.string,
        showOnFocus: PropTypes.bool,
        numberOfMonths: PropTypes.number,
        view: PropTypes.string,
        touchUI: PropTypes.bool,
        showTime: PropTypes.bool,
        timeOnly: PropTypes.bool,
        showSeconds: PropTypes.bool,
        showMillisec: PropTypes.bool,
        hourFormat: PropTypes.string,
        stepHour: PropTypes.number,
        stepMinute: PropTypes.number,
        stepSecond: PropTypes.number,
        stepMillisec: PropTypes.number,
        shortYearCutoff: PropTypes.string,
        hideOnDateTimeSelect: PropTypes.bool,
        showWeek: PropTypes.bool,
        locale: PropTypes.object,
        dateFormat: PropTypes.string,
        panelStyle: PropTypes.object,
        panelClassName: PropTypes.string,
        monthNavigator: PropTypes.bool,
        yearNavigator: PropTypes.bool,
        disabledDates: PropTypes.array,
        disabledDays: PropTypes.array,
        minDate: PropTypes.any,
        maxDate: PropTypes.any,
        maxDateCount: PropTypes.number,
        showOtherMonths: PropTypes.bool,
        selectOtherMonths: PropTypes.bool,
        showButtonBar: PropTypes.bool,
        todayButtonClassName: PropTypes.string,
        clearButtonClassName: PropTypes.string,
        autoZIndex: PropTypes.bool,
        baseZIndex: PropTypes.number,
        appendTo: PropTypes.any,
        tooltip: PropTypes.string,
        tooltipOptions: PropTypes.object,
        ariaLabelledBy: PropTypes.string,
        dateTemplate: PropTypes.func,
        headerTemplate: PropTypes.func,
        footerTemplate: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onInput: PropTypes.func,
        onSelect: PropTypes.func,
        onChange: PropTypes.func,
        onViewDateChange: PropTypes.func,
        onTodayButtonClick: PropTypes.func,
        onClearButtonClick: PropTypes.func,
        t:PropTypes.func
    }

    constructor(props) {
        super(props);
        if (!this.props.onViewDateChange && !this.props.disabled) {
            let propValue = this.props.value;
            if (Array.isArray(propValue)) {
                propValue = propValue[0];
            }
            this.selectedDate = this.props.value;
           

            let viewDate = this.props.viewDate && this.isValidDate(this.props.viewDate) ?
                            this.props.viewDate : (propValue && this.isValidDate(propValue) ? propValue : new Date());
            this.state = {
                viewDate,
                searchSelection:"dateSearch",
                focField:"searchDate",
                searchDateInput:"",
                searchOperator:"+",
                searchDays:"",
                calStartDateInput:"",
                calStartOperator:"+",
                calStartDays:"",
                calEndDateInput:"",
                calEndOperator:"+",
                calEndDays:"",
                calResult:"",
                selectButtonDisabled:false,
                storeValue:null,
                suggestOptions : null,
                error :[],
                errorFields:[],
                visibility:false,
                locale: {
                    firstDayOfWeek: 0,
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: [this.props.t('calendar.sunShort'),this.props.t('calendar.monShort'),this.props.t('calendar.tueShort'),this.props.t('calendar.wenShort'),this.props.t('calendar.thuShort'),this.props.t('calendar.friShort'),this.props.t('calendar.satShort')],
                    monthNames: [ this.props.t('calendar.january'),this.props.t('calendar.february'),this.props.t('calendar.march'),this.props.t('calendar.april'),this.props.t('calendar.may'),this.props.t('calendar.june'),this.props.t('calendar.july'),this.props.t('calendar.august'),this.props.t('calendar.september'),this.props.t('calendar.october'),this.props.t('calendar.november'),this.props.t('calendar.december') ],
                    monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    today: 'Today',
                    clear: 'Clear',
                    weekHeader: 'Wk'
                }
                

            }
        }
        this.operatorOptions = ["+","-"];

        this.navigation = null;
        this.onFocusSearchDateInput = this.onFocusSearchDateInput.bind(this);
        this.onFocusSearchOperator = this.onFocusSearchOperator.bind(this);
        this.onBlurSearchOperator = this.onBlurSearchOperator.bind(this);
        this.onFocusSearchDays = this.onFocusSearchDays.bind(this);
        this.onFocusCalStartOperator = this.onFocusCalStartOperator.bind(this);
        this.onFocusCalEndOperator = this.onFocusCalEndOperator.bind(this);
        this.onFocusCalStartDays = this.onFocusCalStartDays.bind(this);
        this.onFocusCalEndDays = this.onFocusCalEndDays.bind(this);
        this.onFocusCalResult = this.onFocusCalResult.bind(this);
        this.onFocusSearchFields = this.onFocusSearchFields.bind(this);
        this.onFocusCalcFields = this.onFocusCalcFields.bind(this);
        this.onUserInput = this.onUserInput.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onPrevButtonClick = this.onPrevButtonClick.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
        this.onPrevMultiMonthButtonClick = this.onPrevMultiMonthButtonClick.bind(this);
        this.onNextMultiMonthButtonClick = this.onNextMultiMonthButtonClick.bind(this);
        this.onMonthDropdownChange = this.onMonthDropdownChange.bind(this);
        this.onYearDropdownChange = this.onYearDropdownChange.bind(this);
        this.onTodayButtonClick = this.onTodayButtonClick.bind(this);
        this.onClearButtonClick = this.onClearButtonClick.bind(this);
        this.incrementHour = this.incrementHour.bind(this);
        this.decrementHour = this.decrementHour.bind(this);
        this.incrementMinute = this.incrementMinute.bind(this);
        this.decrementMinute = this.decrementMinute.bind(this);
        this.incrementSecond = this.incrementSecond.bind(this);
        this.decrementSecond= this.decrementSecond.bind(this);
        this.toggleAmPm = this.toggleAmPm.bind(this);
        this.onTimePickerElementMouseDown = this.onTimePickerElementMouseDown.bind(this);
        this.onTimePickerElementMouseUp = this.onTimePickerElementMouseUp.bind(this);
        this.onTimePickerElementMouseLeave = this.onTimePickerElementMouseLeave.bind(this);
        this.onMainSelectButtonClick = this.onMainSelectButtonClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.suggestItems = this.suggestItems.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.onSTodayButtonClick = this.onSTodayButtonClick.bind(this);
        this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
        this.getDateFromString = this.getDateFromString.bind(this);
        this.onFocusCalcStartDate = this.onFocusCalcStartDate.bind(this);
        this.onFocusCalcEndDate = this.onFocusCalcEndDate.bind(this);
        
        this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
        this.onChangeNumberOnly = this.onChangeNumberOnly.bind(this);
        this.onChangeOperator = this.onChangeOperator.bind(this);
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
        this.onDateSelectOnDateClick = this.onDateSelectOnDateClick.bind(this);
        
        document.addEventListener('keydown', this.onKeyPressHandler);
      
    }

   
    componentDidMount() {
        if(!this.props.disabled) {
            if (this.props.tooltip) {
                this.renderTooltip();
            }
    
            if(this.props.inline) {
                this.initFocusableCell();
            }
    
            if (this.selectedDate) {
                this.updateInputfield(this.selectedDate);
            }
        }
        
    }

    componentDidUpdate(prevProps) {
        if(!this.props.disabled) {
            if (prevProps.tooltip !== this.props.tooltip) {
                if (this.tooltip)
                    this.tooltip.updateContent(this.props.tooltip);
                else
                    this.renderTooltip();
            }

            if (!this.props.onViewDateChange && !this.viewStateChanged) {
                let propValue = this.props.value;
                if (Array.isArray(propValue)) {
                    propValue = propValue[0];
                }

                let prevPropValue = prevProps.value;
                if (Array.isArray(prevPropValue)) {
                    prevPropValue = prevPropValue[0];
                }

                if ((!prevPropValue && propValue) || (propValue && propValue instanceof Date && propValue.getTime() !== prevPropValue.getTime())) {
                    let viewDate = this.props.viewDate && this.isValidDate(this.props.viewDate) ?
                                this.props.viewDate : (propValue && this.isValidDate(propValue) ? propValue : new Date());

                    this.setState({
                        viewDate
                    }, () => {
                        this.viewStateChanged = true;
                    });
                }
            }

            if(this.panel) {
                this.updateFocus();
            }

            if (prevProps.value !== this.props.value && (!this.viewStateChanged || !this.panel.offsetParent)) {
                this.updateInputfield(this.props.value);
            }
        }
    }

    componentWillUnmount() {
        if(!this.props.disabled) {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
            if (this.mask) {
                this.disableModality();
                this.mask = null;
            }

            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }

            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
        }
    }

    renderTooltip() {
       // this.tooltip = tip({
         //   target: this.inputElement,
           // content: this.props.tooltip,
       //     options: this.props.tooltipOptions
       // });
    }

    onInputFocus(event) {
        if (this.props.showOnFocus && !this.panel.offsetParent) {
            this.selectedDate =this.props.value;
            this.setState({
                storeValue: this.props.value,
                locale: {
                    firstDayOfWeek: 0,
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: [this.props.t('calendar.sunShort'),this.props.t('calendar.monShort'),this.props.t('calendar.tueShort'),this.props.t('calendar.wenShort'),this.props.t('calendar.thuShort'),this.props.t('calendar.friShort'),this.props.t('calendar.satShort')],
                    monthNames: [ this.props.t('calendar.january'),this.props.t('calendar.february'),this.props.t('calendar.march'),this.props.t('calendar.april'),this.props.t('calendar.may'),this.props.t('calendar.june'),this.props.t('calendar.july'),this.props.t('calendar.august'),this.props.t('calendar.september'),this.props.t('calendar.october'),this.props.t('calendar.november'),this.props.t('calendar.december') ],
                    monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    today: 'Today',
                    clear: 'Clear',
                    weekHeader: 'Wk'
                }
            });
            this.showOverlay();
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        DomHandler.addClass(this.container, 'p-inputwrapper-focus');
    }

    onInputBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        if (!this.props.keepInvalid) {
            this.updateInputfield(this.selectedDate);
        }

        DomHandler.removeClass(this.container, 'p-inputwrapper-focus');
    }

    onInputKeyDown(event) {
        this.isKeydown = true;

        switch (event.which) {
            //escape
            case 27: {
                this.hideOverlay();
                break;
            }

            //tab
            case 9: {
                if(this.props.touchUI) {
                    this.disableModality();
                }

                if (event.shiftKey) {
                    this.hideOverlay();
                }
                break;
            }

            default:
                //no op
                break;
        }
    }

    onUserInput(event) {
        // IE 11 Workaround for input placeholder
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;

        let rawValue = event.target.value;

        try {
            let value = this.parseValueFromString(rawValue);
            if(this.isValidSelection(value)) {
                this.updateModel(event, value);
                this.updateViewDate(event, value.length ? value[0] : value);
            }
        }
        catch(err) {
            //invalid date
            let value = this.props.keepInvalid ? rawValue : null;
            this.updateModel(event, value);
        }

        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    isValidSelection(value) {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (!(this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false) && this.isSelectableTime(value))) {
                isValid = false;
            }
        } else if (value.every(v => (this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false) && this.isSelectableTime(value)))) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }

    onButtonClick(event) {
        if (!this.panel.offsetParent) {
            this.selectedDate =this.props.value;
            let selDate;
            if(!this.selectedDate) {
                this.selectedDate = new Date();
            } 
            this.searchStartDate="";
            let dateMeta ={
                month:this.selectedDate.getMonth(),
                year: this.selectedDate.getFullYear(),
                day:this.selectedDate.getDate()
            }
            selDate = this.getDateString(dateMeta);
            setTimeout(() => {
                var element = document.getElementsByClassName("p-dropdown-trigger-icon");
                if(element && element.length>4) {
                    element[3].className="arrow-down p-clickable";
                    element[2].className="arrow-down p-clickable";
                    element[1].className="arrow-down p-clickable";
                }
                if(document.getElementById("dateSearch")){
                    document.getElementById("dateSearch").focus();
                }
                this.setState({
                    storeValue: this.props.value,
                    searchSelection: 'dateSearch',
                    focField:"searchDate",
                    searchDateInput:selDate,
                    searchOperator:"+",
                    searchDays:"",
                    calStartDateInput:selDate,
                    calStartOperator:"+",
                    calStartDays:"",
                    calEndDateInput:"",
                    calEndOperator:"+",
                    calEndDays:"",
                    calResult:"",
                    error :[],
                    errorFields: [],
                    locale: {
                        firstDayOfWeek: 0,
                        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        dayNamesMin: [this.props.t('calendar.sunShort'),this.props.t('calendar.monShort'),this.props.t('calendar.tueShort'),this.props.t('calendar.wenShort'),this.props.t('calendar.thuShort'),this.props.t('calendar.friShort'),this.props.t('calendar.satShort')],
                        monthNames: [ this.props.t('calendar.january'),this.props.t('calendar.february'),this.props.t('calendar.march'),this.props.t('calendar.april'),this.props.t('calendar.may'),this.props.t('calendar.june'),this.props.t('calendar.july'),this.props.t('calendar.august'),this.props.t('calendar.september'),this.props.t('calendar.october'),this.props.t('calendar.november'),this.props.t('calendar.december') ],
                        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                        today: 'Today',
                        clear: 'Clear',
                        weekHeader: 'Wk'
                    }
                });

            }, 100);
            
            this.updateViewDate(null, new Date(dateMeta.year, dateMeta.month, dateMeta.day)) ;
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }

    onPrevButtonClick(event) {
        this.navigation = {backward: true, button: true, multy:false};
        this.navBackward(event);
    }

    onNextButtonClick(event) {
        this.navigation = {backward: false, button: true,multy:false};
        this.navForward(event);
    }
    onPrevMultiMonthButtonClick(event) {
        this.navigation = {backward: true, button: true,multy:true};
        this.navBackward(event,true);
    }

    onNextMultiMonthButtonClick(event) {
        this.navigation = {backward: false, button: true,multy:true};
        this.navForward(event,true);
    }

    onContainerButtonKeydown(event) {
        switch (event.which) {
            //tab
            case 9:
                this.trapFocus(event);
                break;

            //escape
            case 27:
                this.hideOverlay();
                event.preventDefault();
                break;

            default:
                //Noop
                break;
        }
    }

    trapFocus(event) {
        event.preventDefault();
        let focusableElements = DomHandler.getFocusableElements(this.panel);

        if (focusableElements && focusableElements.length > 0) {
            if (!document.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(document.activeElement);

                if (event.shiftKey) {
                    if (focusedIndex === -1 || focusedIndex === 0)
                        focusableElements[focusableElements.length - 1].focus();
                    else
                        focusableElements[focusedIndex - 1].focus();
                }
                else {
                    if (focusedIndex === -1 || focusedIndex === (focusableElements.length - 1))
                        focusableElements[0].focus();
                    else
                        focusableElements[focusedIndex + 1].focus();
                }
            }
        }
    }

    updateFocus() {
        let cell;
        if (this.navigation) {
            if (this.navigation.button) {
                this.initFocusableCell();

                if (this.navigation.backward){
                    if(this.navigation.multy)
                        DomHandler.findSingle(this.panel, '.p-datepicker-prev-multy').focus();
                    else
                        DomHandler.findSingle(this.panel, '.p-datepicker-prev-single').focus();
                }else {
                    if(this.navigation.multy)
                        DomHandler.findSingle(this.panel, '.p-datepicker-next-multy').focus();
                    else
                        DomHandler.findSingle(this.panel, '.p-datepicker-next-single').focus();
                   
                }
                    
            }
            else {
                if (this.navigation.backward) {
                    let cells = DomHandler.find(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)');
                    cell = cells[cells.length - 1];
                }
                else {
                    cell = DomHandler.findSingle(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)');
                }

                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }

            this.navigation = null;
        }
        else {
            this.initFocusableCell();
        }
    }

    initFocusableCell() {
        let cell;
        if (this.view === 'month') {
            let cells = DomHandler.find(this.panel, '.p-monthpicker .p-monthpicker-month');
            let selectedCell= DomHandler.findSingle(this.panel, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach(cell => cell.tabIndex = -1);
            cell = selectedCell || cells[0];
        }
        else {
            cell = DomHandler.findSingle(this.panel, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(this.panel, 'td.p-datepicker-today span:not(.p-disabled)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)');
            }
        }

        if (cell) {
            cell.tabIndex = '0';
        }
    }

    navBackward(event,multiMonth) {
        if(this.props.disabled) {
            event.preventDefault();
            return;
        }

        let newViewDate = new Date(this.getViewDate().getTime());
        newViewDate.setDate(1);

        if (this.props.view === 'date') {
            let increment =1;
            if(multiMonth){
                increment=this.props.numberOfMonths;
            }
            if(newViewDate.getMonth() === 0) {
                newViewDate.setMonth(11);
                newViewDate.setFullYear(newViewDate.getFullYear() - 1);
            }
            else {
                newViewDate.setMonth(newViewDate.getMonth() - increment);
            }
        }
        else if (this.props.view === 'month') {
            let currentYear = newViewDate.getFullYear();
            let newYear = currentYear - 1;

            if(this.props.yearNavigator) {
                const minYear = parseInt(this.props.yearRange.split(':')[0], 10);

                if(newYear < minYear) {
                    newYear = minYear;
                }
            }

            newViewDate.setFullYear(newYear);
        }

        this.updateViewDate(event, newViewDate);

        event.preventDefault();
    }

    navForward(event,multiMonth) {
        if(this.props.disabled) {
            event.preventDefault();
            return;
        }

        let newViewDate = new Date(this.getViewDate().getTime());
        newViewDate.setDate(1);

        if (this.props.view === 'date') {
            let increment =1;
            if(multiMonth){
                increment=this.props.numberOfMonths;
            }
            if(newViewDate.getMonth() === 11) {
                newViewDate.setMonth(0);
                newViewDate.setFullYear(newViewDate.getFullYear() + 1);
            }
            else {
                newViewDate.setMonth(newViewDate.getMonth() + increment);
            }
        }
        else if (this.props.view === 'month') {
            let currentYear = newViewDate.getFullYear();
            let newYear = currentYear + 1;

            if(this.props.yearNavigator) {
                const maxYear = parseInt(this.props.yearRange.split(':')[1], 10);

                if(newYear > maxYear) {
                    newYear = maxYear;
                }
            }

            newViewDate.setFullYear(newYear);
        }

        this.updateViewDate(event, newViewDate);

        event.preventDefault();
    }

    onMonthDropdownChange(event) {
        const currentViewDate = this.getViewDate();
        let newViewDate = new Date(currentViewDate.getTime());
        newViewDate.setMonth(parseInt(event.target.value, 10));

        this.updateViewDate(event, newViewDate);
    }

    onYearDropdownChange(event) {
        const currentViewDate = this.getViewDate();
        let newViewDate = new Date(currentViewDate.getTime());
        newViewDate.setFullYear(parseInt(event.target.value, 10));

        this.updateViewDate(event, newViewDate);
    }

    onTodayButtonClick(event) {
        const today = new Date();
        const dateMeta = {day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), today: true, selectable: true};
        const timeMeta = {hours: today.getHours(), minutes: today.getMinutes(), seconds: today.getSeconds(), milliseconds: today.getMilliseconds()};

        this.updateViewDate(event, today);
        this.onDateSelect(event, dateMeta, timeMeta);

        if (this.props.onTodayButtonClick) {
            this.props.onTodayButtonClick(event);
        }
    }

    onClearButtonClick(event) {
        this.updateModel(event, null);
        this.updateInputfield(null);
        this.hideOverlay();

        if (this.props.onClearButtonClick) {
            this.props.onClearButtonClick(event);
        }
    }

    onTimePickerElementMouseDown(event, type, direction) {
        if (!this.props.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }

    onTimePickerElementMouseUp() {
        if (!this.props.disabled) {
            this.clearTimePickerTimer();
        }
    }

    onTimePickerElementMouseLeave() {
        if (!this.props.disabled) {
            this.clearTimePickerTimer();
        }
    }

    repeat(event, interval, type, direction) {
        event.persist();

        let i = interval||500;

        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
        }, i);

        switch(type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;

            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;

            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;

            case 3:
                if (direction === 1)
                    this.incrementMilliSecond(event);
                else
                    this.decrementMilliSecond(event);
                break;

            default:
                break;
        }
    }

    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
        }
    }

    incrementHour(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentHour = currentTime.getHours();
        let newHour = currentHour + this.props.stepHour;
        newHour = (newHour >= 24) ? (newHour - 24) : newHour;

        if (this.validateHour(newHour, currentTime)) {

            if(this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getHours() === newHour) {
                if(this.props.maxDate.getMinutes() < currentTime.getMinutes()) {
                    if(this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
                        if(this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                            this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
                        }
                        else {
                            this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
                        }
                    }
                    else {
                        this.updateTime(event, newHour, this.props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else if(this.props.maxDate.getMinutes() === currentTime.getMinutes()) {
                    if(this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
                        if(this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                            this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
                        }
                        else {
                            this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
                        }
                    }
                    else {
                        this.updateTime(event, newHour, this.props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else {
                    this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    decrementHour(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentHour = currentTime.getHours();
        let newHour = currentHour - this.props.stepHour;
        newHour = (newHour < 0) ? (newHour + 24) : newHour;

        if (this.validateHour(newHour, currentTime)) {
            if(this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getHours() === newHour) {
                if(this.props.minDate.getMinutes() > currentTime.getMinutes()) {
                    if(this.props.minDate.getSeconds() > currentTime.getSeconds()) {
                        if(this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                            this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
                        }
                        else {
                            this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), currentTime.getMilliseconds());
                        }
                    }
                    else {
                        this.updateTime(event, newHour, this.props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else if(this.props.minDate.getMinutes() === currentTime.getMinutes()) {
                    if(this.props.minDate.getSeconds() > currentTime.getSeconds()) {
                        if(this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                            this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
                        }
                        else {
                            this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), currentTime.getMilliseconds());
                        }
                    }
                    else {
                        this.updateTime(event, newHour, this.props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else {
                    this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    incrementMinute(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentMinute = currentTime.getMinutes();
        let newMinute = currentMinute + this.props.stepMinute;
        newMinute = (newMinute > 59) ? (newMinute - 60) : newMinute;

        if (this.validateMinute(newMinute, currentTime)) {
            if(this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getMinutes() === newMinute) {
                if(this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
                    if(this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                        this.updateTime(event, currentTime.getHours(), newMinute, this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
                    }
                    else {
                        this.updateTime(event, currentTime.getHours(), newMinute, this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else {
                    this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    decrementMinute(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentMinute = currentTime.getMinutes();
        let newMinute = currentMinute - this.props.stepMinute;
        newMinute = (newMinute < 0) ? (newMinute + 60) : newMinute;

        if (this.validateMinute(newMinute, currentTime)) {
            if(this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getMinutes() === newMinute) {
                if(this.props.minDate.getSeconds() > currentTime.getSeconds()) {
                    if(this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                        this.updateTime(event, currentTime.getHours(), newMinute, this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
                    }
                    else {
                        this.updateTime(event, currentTime.getHours(), newMinute, this.props.minDate.getSeconds(), currentTime.getMilliseconds());
                    }
                }
                else {
                    this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    incrementSecond(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentSecond = currentTime.getSeconds();
        let newSecond = currentSecond + this.props.stepSecond;
        newSecond = (newSecond > 59) ? (newSecond - 60) : newSecond;

        if (this.validateSecond(newSecond, currentTime)) {
            if(this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getSeconds() === newSecond) {
                if(this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                    this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, this.props.maxDate.getMilliseconds());
                }
                else {
                    this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    decrementSecond(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentSecond = currentTime.getSeconds();
        let newSecond = currentSecond - this.props.stepSecond;
        newSecond = (newSecond < 0) ? (newSecond + 60) : newSecond;

        if (this.validateSecond(newSecond, currentTime)) {
            if(this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getSeconds() === newSecond) {
                if(this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                    this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, this.props.minDate.getMilliseconds());
                }
                else {
                    this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
                }
            }
            else {
                this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
            }
        }

        event.preventDefault();
    }

    incrementMilliSecond(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentMillisecond = currentTime.getMilliseconds();
        let newMillisecond = currentMillisecond + this.props.stepMillisec;
        newMillisecond = (newMillisecond > 999) ? (newMillisecond - 1000) : newMillisecond;

        if (this.validateMillisecond(newMillisecond, currentTime)) {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
        }

        event.preventDefault();
    }

    decrementMilliSecond(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentMillisecond = currentTime.getMilliseconds();
        let newMillisecond = currentMillisecond - this.props.stepMillisec;
        newMillisecond = (newMillisecond < 0) ? (newMillisecond + 999) : newMillisecond;

        if (this.validateMillisecond(newMillisecond, currentTime)) {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
        }

        event.preventDefault();
    }

    toggleAmPm(event) {
        const currentTime = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : this.getViewDate();
        const currentHour = currentTime.getHours();
        const newHour = (currentHour >= 12) ? currentHour - 12: currentHour + 12;

        this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        event.preventDefault();
    }

    getViewDate() {
        return this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
    }

    isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    validateHour(hour, value) {
        let valid = true;
        let valueDateString = value ? value.toDateString() : null;

        if(this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
            if(this.props.minDate.getHours() > hour) {
                valid = false;
            }
        }

        if(this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
            if(this.props.maxDate.getHours() < hour) {
                valid = false;
            }
        }

        return valid;
    }

    validateMinute(minute, value) {
        let valid = true;
        let valueDateString = value ? value.toDateString() : null;

        if(this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.minDate.getHours()){
                if(this.props.minDate.getMinutes() > minute) {
                    valid = false;
                }
            }
        }

        if(this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.maxDate.getHours()){
                if(this.props.maxDate.getMinutes() < minute) {
                    valid = false;
                }
            }
        }

        return valid;
    }

    validateSecond(second, value) {
        let valid = true;
        let valueDateString = value ? value.toDateString() : null;

        if(this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.minDate.getHours() && value.getMinutes() === this.props.minDate.getMinutes()) {
                if(this.props.minDate.getSeconds() > second) {
                    valid = false;
                }
            }
        }

        if(this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.maxDate.getHours() && value.getMinutes() === this.props.maxDate.getMinutes()){
                if(this.props.maxDate.getSeconds() < second) {
                    valid = false;
                }
            }
        }

        return valid;
    }

    validateMillisecond(millisecond, value) {
        let valid = true;
        let valueDateString = value ? value.toDateString() : null;

        if(this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.minDate.getHours() && value.getSeconds() === this.props.minDate.getSeconds() && value.getMinutes() === this.props.minDate.getMinutes()) {
                if(this.props.minDate.getMilliseconds() > millisecond) {
                    valid = false;
                }
            }
        }

        if(this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
            if(value.getHours() === this.props.maxDate.getHours() && value.getSeconds() === this.props.maxDate.getSeconds() && value.getMinutes() === this.props.maxDate.getMinutes()){
                if(this.props.maxDate.getMilliseconds() < millisecond) {
                    valid = false;
                }
            }
        }

        return valid;
    }

    updateTime(event, hour, minute, second, millisecond) {
        let newDateTime = (this.selectedDate && this.selectedDate instanceof Date) ? new Date(this.selectedDate) : new Date();

        newDateTime.setHours(hour);
        newDateTime.setMinutes(minute);
        newDateTime.setSeconds(second);
        newDateTime.setMilliseconds(millisecond);

        this.updateModel(event, newDateTime);

        if (this.props.onSelect) {
            this.props.onSelect({
                originalEvent: event,
                value: newDateTime
            });
        }

        this.updateInputfield(newDateTime);
    }

    updateViewDate(event, value) {
        if (this.props.yearNavigator) {
            let viewYear = value.getFullYear();

            if (this.props.minDate && this.props.minDate.getFullYear() > viewYear) {
                viewYear = this.props.minDate.getFullYear();
            }
            if (this.props.maxDate && this.props.maxDate.getFullYear() < viewYear) {
                viewYear = this.props.maxDate.getFullYear();
            }

            value.setFullYear(viewYear);
        }

        if (this.props.monthNavigator && this.props.view !== 'month') {
            let viewMonth = value.getMonth();
            let viewMonthWithMinMax = parseInt((this.isInMinYear(value) && Math.max(this.props.minDate.getMonth(), viewMonth).toString()) || (this.isInMaxYear(value) && Math.min(this.props.maxDate.getMonth(), viewMonth).toString()) || viewMonth);

            value.setMonth(viewMonthWithMinMax);
        }

        if (this.props.onViewDateChange) {
            this.props.onViewDateChange({
                originalEvent: event,
                value: value
            });
        }
        else {
            this.viewStateChanged = true;
            this.setState({
                viewDate: value
            });
        }
    }

    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;

        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigation = {backward: false};
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigation = {backward: false};
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }

            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigation = {backward: true};
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigation = {backward: true};
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }

            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(true, groupIndex, event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(true, groupIndex, event);
                }
                event.preventDefault();
                break;
            }

            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(false, groupIndex, event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex,event);
                }
                event.preventDefault();
                break;
            }

            //enter
            case 13: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
                this.hideOverlay()
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                this.trapFocus(event);
                break;
            }

            default:
                //no op
                break;
        }
    }

    navigateToMonth(prev, groupIndex, event) {
        if (prev) {
            if (this.props.numberOfMonths === 1 || (groupIndex === 0)) {
                this.navigation = {backward: true};
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.panel.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.props.numberOfMonths === 1 || (groupIndex === this.props.numberOfMonths - 1)) {
                this.navigation = {backward: false};
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.panel.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }

    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;

        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex -3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                event.preventDefault();
                break;
            }

            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            //enter
            case 13: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
                this.hideOverlay();
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                this.trapFocus(event);
                break;
            }

            default:
                //no op
                break;
        }
    }

    getDateString(dateMeta) {
        let month ;
        let year = dateMeta.year+"";
        if(dateMeta.month>9) {
            month = dateMeta.month +"";
        } else {
            month = "0"+dateMeta.month;
        }
        month = this.getMMMFromMM(month);
        let day = ('0'+dateMeta.day).slice(-2);

        return  day+month+year.substring(2,4);
    }

    onDateSelectOnDateClick(event, dateMeta, timeMeta) {
        if(this.props.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        DomHandler.find(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(cell => cell.tabIndex = -1);
        event.currentTarget.focus();

        this.selectDate(event, dateMeta, timeMeta);
        let dateString = this.getDateString(dateMeta);
        this.searchStartDate = "";
        if (this.state.focField ==="calcDate" || this.state.focField ==="calcStartDate" || this.state.focField ==="calcEndDate") {
            if(!this.state.calStartDateInput) {
                this.setState({
                    calStartDateInput:dateString,
                    error:[],
                    errorFields:[]
                });
            } else  {
                this.setState({
                    calEndDateInput:dateString,
                    error:[],
                    errorFields:[]
                });
            }
            if(document.getElementById("calEndDateInput")){
                document.getElementById("calEndDateInput").focus();
                setTimeout(() => {
                    document.getElementById("calEndDateInput").select();
                }, 100);
            }
            
        }else {
            this.setState({
                searchDateInput:dateString,
                error:[],
                errorFields:[]

            });
            if(document.getElementById("searchDateInput")){
                document.getElementById("searchDateInput").focus();
                setTimeout(() => {
                    document.getElementById("searchDateInput").select();
                }, 100);
            }
           
        }
        event.preventDefault();

    }
    
    
    onDateSelect(event, dateMeta, timeMeta) {
        if(this.props.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }

        DomHandler.find(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(cell => cell.tabIndex = -1);
        event.currentTarget.focus();

        if (this.isMultipleSelection()) {
            if (this.isSelected(dateMeta)) {
                let value = this.selectedDate.filter((date, i) => {
                    return !this.isDateEquals(date, dateMeta);
                });
                this.updateModel(event, value);
            }
            else if(!this.props.maxDateCount || !this.selectedDate || this.props.maxDateCount > this.selectedDate.length) {
                this.selectDate(event, dateMeta, timeMeta);
            }
        }
        else {
            this.selectDate(event, dateMeta, timeMeta);
        }

        if(!this.props.inline && this.isSingleSelection() && (!this.props.showTime || this.props.hideOnDateTimeSelect)) {
            setTimeout(() => {
                this.hideOverlay();
            }, 100);

            if(this.mask) {
                this.disableModality();
            }
        }

        event.preventDefault();
    }

    selectTime(date, timeMeta) {
        if (this.props.showTime) {
            let hours, minutes, seconds, milliseconds;

            if (timeMeta) {
                ({hours, minutes, seconds, milliseconds} = timeMeta);
            }
            else {
                let time = (this.selectedDate && this.selectedDate instanceof Date) ? this.selectedDate : new Date();
                [hours, minutes, seconds, milliseconds] = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()];
            }

            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);
            date.setMilliseconds(milliseconds);
        }
    }

    selectDate(event, dateMeta, timeMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);

        this.selectTime(date, timeMeta);

        if(this.props.minDate && this.props.minDate > date) {
            date = this.props.minDate;
        }

        if(this.props.maxDate && this.props.maxDate < date) {
            date = this.props.maxDate;
        }

        let selectedValues = date;

        if (this.isSingleSelection()) {
            this.updateModel(event, date);
        }
        else if(this.isMultipleSelection()) {
            selectedValues = this.selectedDate ? [...this.selectedDate, date] : [date];
            this.updateModel(event, selectedValues);
        }
        else if (this.isRangeSelection()) {
            if (this.selectedDate && this.selectedDate.length) {
                let startDate = this.selectedDate[0];
                let endDate = this.selectedDate[1];

                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }

                selectedValues = [startDate, endDate];
                this.updateModel(event, selectedValues);
            }
            else {
                selectedValues = [date, null];
                this.updateModel(event, selectedValues);
            }
        }

        if (this.props.onSelect) {
            this.props.onSelect({
                originalEvent: event,
                value: date
            });
        }

        this.updateInputfield(selectedValues);
    }

    onMonthSelect(event, month) {
        this.onDateSelect(event, {year: this.getViewDate().getFullYear(), month: month, day: 1, selectable: true});
        event.preventDefault();
    }

    updateModel(event, value) {
       
        this.selectedDate =value;
        this.viewStateChanged = true;
        
    }

    showOverlay() {
        this.props.setPage(activePageConstants.CALENDAR);
        if (this.props.autoZIndex) {
            this.panel.style.zIndex = String(this.props.baseZIndex + DomHandler.generateZIndex());
        }
        this.panel.style.display = 'block';

        setTimeout(() => {
            DomHandler.addClass(this.panel, 'p-input-overlay-visible');
            DomHandler.removeClass(this.panel, 'p-input-overlay-hidden');
        }, 1);

        this.alignPanel();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.setState({
            visibility:true
        });

    }

    hideOverlay() {
        if (this.panel) {
            this.props.setPage(activePageConstants.VACANCY_SEARCH);
            DomHandler.addClass(this.panel, 'p-input-overlay-hidden');
            DomHandler.removeClass(this.panel, 'p-input-overlay-visible');
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();

            this.hideTimeout = setTimeout(() => {
                this.panel.style.display = 'none';
                DomHandler.removeClass(this.panel, 'p-input-overlay-hidden');
            }, 150);
            this.setState({
                visibility:false
            });
            document.getElementById("yearBox").focus();
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = (event) => {
                if (this.isOutsideClicked(event)) {
                   // this.hideOverlay();
                }
            };

            document.addEventListener('mousedown', this.documentClickListener);
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('mousedown', this.documentClickListener);
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.props.touchUI) {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    isOutsideClicked(event) {
        return this.container && !(this.container.isSameNode(event.target) || this.isNavIconClicked(event) ||
            this.container.contains(event.target) || (this.panel && this.panel.contains(event.target)));
    }

    isNavIconClicked(event) {
        return (DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
            || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }

    onWindowResize() {
        if (this.panel.offsetParent && !DomHandler.isAndroid()) {
            this.hideOverlay();
        }
    }

    alignPanel() {
        if (this.props.touchUI) {
            this.enableModality();
        }
        else {
            if(this.props.appendTo) {
                DomHandler.absolutePosition(this.panel, this.inputElement);
                this.panel.style.minWidth = DomHandler.getWidth(this.container) + 'px';
            }
            else {
                DomHandler.relativePosition(this.panel, this.inputElement);
            }
        }
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.panel.style.zIndex, 10) - 1);
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker');

            this.maskClickListener = () => {
                this.disableModality();
            };
            this.mask.addEventListener('click', this.maskClickListener);

            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.mask) {
            this.mask.removeEventListener('click', this.maskClickListener);
            this.maskClickListener = null;
            document.body.removeChild(this.mask);
            this.mask = null;

            let bodyChildren = document.body.children;
            let hasBlockerMasks;
            for (let i = 0; i < bodyChildren.length; i++) {
                let bodyChild = bodyChildren[i];
                if(DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                    hasBlockerMasks = true;
                    break;
                }
            }

            if (!hasBlockerMasks) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            this.hideOverlay();
        }
    }

    getFirstDayOfMonthIndex(month, year) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);

        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }

    getDaysCountInMonth(month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }

    getDaysCountInPrevMonth(month, year) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }

    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }

        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

        return date;
    }

    getPreviousMonthAndYear(month, year) {
        let m, y;

        if(month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }

        return {'month':m, 'year':y};
    }

    getNextMonthAndYear(month, year) {
        let m, y;

        if(month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }

        return {'month':m,'year':y};
    }

    getSundayIndex() {
        return this.state.locale.firstDayOfWeek > 0 ? 7 - this.state.locale.firstDayOfWeek : 0;
    }

    createWeekDays() {
        let weekDays = [];
        let dayIndex = this.state.locale.firstDayOfWeek;
        let day;
        for(let i = 0; i < 7; i++) {
            day ={
                day:this.state.locale.dayNamesMin[dayIndex],
                dayIndex : dayIndex
            }
            weekDays.push(day);
            dayIndex = (dayIndex === 6) ? 0 : ++dayIndex;
        }

        return weekDays;
    }

    createMonths(month, year) {
       
        let months = [];
        for (let i = 0 ; i < this.props.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }

            months.push(this.createMonth(m, y));
        }

        return months;
    }

    createMonth(month, year) {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);

        for(let i = 0; i < monthRows; i++) {
            let week = [];

            if(i === 0) {
                for(let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true)});
                }

                let remainingDaysLength = 7 - week.length;
                for(let j = 0; j < remainingDaysLength; j++) {
                    week.push({day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year, false)});
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if(dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({day: dayNo - daysLength, month: next.month, year: next.year, otherMonth:true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true)});
                    }
                    else {
                        week.push({day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false)});
                    }

                    dayNo++;
                }
            }

            if (this.props.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }

            dates.push(week);
        }

        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    }

    getWeekNumber(date) {
        let checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - ( checkDate.getDay() || 7 ));
        let time = checkDate.getTime();
        checkDate.setMonth( 0 );
        checkDate.setDate( 1 );
        return Math.floor( Math.round((time - checkDate.getTime()) / 86400000 ) / 7 ) + 1;
    }

    isSelectable(day, month, year, otherMonth) {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;
        let validMonth = true;

        if (this.props.minDate) {
            if(this.props.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if(this.props.minDate.getFullYear() === year) {
                if(this.props.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if(this.props.minDate.getMonth() === month) {
                    if(this.props.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }

        if (this.props.maxDate) {
            if(this.props.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if(this.props.maxDate.getFullYear() === year) {
                if(this.props.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if(this.props.maxDate.getMonth() === month) {
                    if(this.props.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }

        if (this.props.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }

        if (this.props.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year)
        }

        if (this.props.selectOtherMonths === false && otherMonth) {
            validMonth = false;
        }

        return validMin && validMax && validDate && validDay && validMonth;
    }

    isSelectableTime(value){
        let validMin = true;
        let validMax = true;

        if (this.props.minDate && this.props.minDate.toDateString() === value.toDateString()) {
            if(this.props.minDate.getHours() > value.getHours()) {
                validMin = false;
            }
            else if(this.props.minDate.getHours() === value.getHours()) {
                if(this.props.minDate.getMinutes() > value.getMinutes()) {
                    validMin = false;
                }
                else if(this.props.minDate.getMinutes() === value.getMinutes()) {
                    if(this.props.minDate.getSeconds() > value.getSeconds()) {
                        validMin = false;
                    }
                    else if(this.props.minDate.getSeconds() === value.getSeconds()) {
                        if(this.props.minDate.getMilliseconds() > value.getMilliseconds()) {
                            validMin = false;
                        }
                    }
                }
            }
        }

        if (this.props.maxDate && this.props.maxDate.toDateString() === value.toDateString()) {
            if(this.props.maxDate.getHours() < value.getHours()) {
                validMax = false;
            }
            else if(this.props.maxDate.getHours() === value.getHours()) {
                if(this.props.maxDate.getMinutes() < value.getMinutes()) {
                    validMax = false;
                }
                else if(this.props.maxDate.getMinutes() === value.getMinutes()) {
                    if(this.props.maxDate.getSeconds() < value.getSeconds()) {
                        validMax = false;
                    }
                    else if(this.props.maxDate.getSeconds() === value.getSeconds()) {
                        if(this.props.maxDate.getMilliseconds() < value.getMilliseconds()) {
                            validMax = false;
                        }
                    }
                }
            }
        }

        return validMin && validMax;
    }

    isSelected(dateMeta) {
        if(this.selectedDate) {
            if(this.isSingleSelection()) {
                return this.isDateEquals(this.selectedDate, dateMeta);
            }
            else if(this.isMultipleSelection()) {
                let selected = false;
                for(let date of this.selectedDate) {
                    selected = this.isDateEquals(date, dateMeta);
                    if(selected) {
                        break;
                    }
                }

                return selected;
            }
            else if(this.isRangeSelection()) {
                if(this.selectedDate[1])
                    return this.isDateEquals(this.selectedDate[0], dateMeta) || this.isDateEquals(this.selectedDate[1], dateMeta) || this.isDateBetween(this.selectedDate[0], this.selectedDate[1], dateMeta);
                else {
                    return this.isDateEquals(this.selectedDate[0], dateMeta);
                }

            }
        }
        else {
            return false;
        }
    }

    isMonthSelected(month) {
        const viewDate = this.getViewDate();

        if(this.selectedDate && this.selectedDate instanceof Date)
            return this.selectedDate.getDate() === 1 && this.selectedDate.getMonth() === month && this.selectedDate.getFullYear() === viewDate.getFullYear();
        else
            return false;
    }

    isDateEquals(value, dateMeta) {
        if(value && value instanceof Date)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }

    isDateBetween(start, end, dateMeta) {
        let between = false;
        if(start && end) {
            let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }

        return between;
    }

    isSingleSelection() {
        return this.props.selectionMode === 'single';
    }

    isRangeSelection() {
        return this.props.selectionMode === 'range';
    }

    isMultipleSelection() {
        return this.props.selectionMode === 'multiple';
    }

    isToday(today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }

    isDateDisabled(day, month, year) {
        if (this.props.disabledDates) {
            for (let i = 0 ; i < this.props.disabledDates.length; i++) {
                let disabledDate = this.props.disabledDates[i];

                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }

        return false;
    }

    isDayDisabled(day, month, year) {
        if(this.props.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();

            return this.props.disabledDays.indexOf(weekdayNumber) !== -1;
        }

        return false;
    }

    updateInputfield(value) {
        if (!this.inputElement) {
            return;
        }

        let formattedValue = '';

        if (value) {
            try {
                if(this.isSingleSelection()) {
                    formattedValue = this.isValidDate(value) ? this.formatDateTime(value) : '';
                }
                else if(this.isMultipleSelection()) {
                    for(let i = 0; i < value.length; i++) {
                        let selectedValue = value[i];
                        let dateAsString = this.isValidDate(selectedValue) ? this.formatDateTime(selectedValue) : '';
                        formattedValue += dateAsString;
                        if(i !== (value.length - 1)) {
                            formattedValue += ', ';
                        }
                    }
                }
                else if(this.isRangeSelection()) {
                    if(value && value.length) {
                        let startDate = value[0];
                        let endDate = value[1];

                        formattedValue = this.isValidDate(startDate) ? this.formatDateTime(startDate) : '';
                        if(endDate) {
                            formattedValue += (this.isValidDate(endDate) ? ' - ' + this.formatDateTime(endDate) : '');
                        }
                    }
                }
            }
            catch(err) {
                formattedValue = value;
            }
        }

        this.inputElement.value = formattedValue;
    }

    formatDateTime(date) {
        let formattedValue = null;
        if(date) {
            if(this.props.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.props.dateFormat);
                if(this.props.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }

        return formattedValue;
    }

    formatDate(date, format) {
        if (!date) {
            return '';
        }

        let iFormat;
        const lookAhead = (match) => {
                const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            formatNumber = (match, value, len) => {
                let num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            },
            formatName = (match, value, shortNames, longNames) => {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
        let output = '';
        let literal = false;

        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                        literal = false;
                    } else {
                        output += format.charAt(iFormat);
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.state.locale.dayNamesShort, this.state.locale.dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o',
                                Math.round((
                                    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                    new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M',date.getMonth(), this.state.locale.monthNamesShort, this.state.locale.monthNames);
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }

    formatTime(date) {
        if (!date) {
            return '';
        }

        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let milliseconds = date.getMilliseconds();

        if (this.props.hourFormat === '12' && hours > 11 && hours !== 12) {
            hours -= 12;
        }

        if (this.props.hourFormat === '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        }
        else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;

        if (this.props.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }

        if (this.props.showMillisec) {
            output += '.';
            output += milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') + milliseconds : milliseconds;
        }

        if (this.props.hourFormat === '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }

        return output;
    }

    parseValueFromString(text) {
        if(!text || text.trim().length === 0) {
            return null;
        }

        let value;

        if(this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if(this.isMultipleSelection()) {
            let tokens = text.split(',');
            value = [];
            for(let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if(this.isRangeSelection()) {
            let tokens = text.split(' - ');
            value = [];
            for(let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }

        return value;
    }

    parseDateTime(text) {
        let date;
        let parts = text.split(' ');

        if(this.props.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            if(this.props.showTime) {
                date = this.parseDate(parts[0], this.props.dateFormat);
                this.populateTime(date, parts[1], parts[2]);
            }
            else {
                date = this.parseDate(text, this.props.dateFormat);
            }
        }

        return date;
    }

    populateTime(value, timeString, ampm) {
        if(this.props.hourFormat === '12' && (ampm !== 'PM' && ampm !== 'AM')) {
            throw new Error('Invalid Time');
        }

        let time = this.parseTime(timeString, ampm);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
        value.setMilliseconds(time.millisecond);
    }

    parseTime(value, ampm) {
        value = this.props.showMillisec ? value.replace('.', ':') : value;
        let tokens = value.split(':');
        let validTokenLength = this.props.showSeconds ? 3 : 2;
        validTokenLength = this.props.showMillisec ? validTokenLength + 1 : validTokenLength;

        if(tokens.length !== validTokenLength || tokens[0].length !== 2 || tokens[1].length !== 2 ||
            (this.props.showSeconds && tokens[2].length !== 2) ||
            (this.props.showMillisec && tokens[3].length !== 3)) {
            throw new Error('Invalid time');
        }

        let h = parseInt(tokens[0], 10);
        let m = parseInt(tokens[1], 10);
        let s = this.props.showSeconds ? parseInt(tokens[2], 10) : null;
        let ms = this.props.showMillisec ? parseInt(tokens[3], 10) : null;

        if(isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.props.hourFormat === '12' && h > 12) ||
            (this.props.showSeconds && (isNaN(s) || s > 59)) ||
            (this.props.showMillisec && (isNaN(s) || s > 1000))) {
            throw new Error('Invalid time');
        }
        else {
            if(this.props.hourFormat === '12' && h !== 12 && ampm === 'PM') {
                h+= 12;
            }

            return {hour: h, minute: m, second: s, millisecond: ms};
        }
    }

    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if(format == null || value == null) {
            throw new Error('Invalid arguments');
        }

        value = (typeof value === "object" ? value.toString() : value + "");
        if(value === "") {
            return null;
        }

        let iFormat, dim, extra,
            iValue = 0,
            shortYearCutoff = (typeof this.props.shortYearCutoff !== "string" ? this.props.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.props.shortYearCutoff, 10)),
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = false,
            date,
            lookAhead = (match) => {
                let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if(matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = (match) => {
                let isDoubled = lookAhead(match),
                    size = (match === "@" ? 14 : (match === "!" ? 20 :
                        (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
                    minSize = (match === "y" ? size : 1),
                    digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
                    num = value.substring(iValue).match(digits);
                if(!num) {
                    throw new Error('Missing number at position ' + iValue);
                }
                iValue += num[ 0 ].length;
                return parseInt(num[ 0 ], 10);
            },
            getName = (match, shortNames, longNames) => {
                let index = -1;
                let arr = lookAhead(match) ? longNames : shortNames;
                let names = [];

                for(let i = 0; i < arr.length; i++) {
                    names.push([i,arr[i]]);
                }
                names.sort((a,b) => {
                    return -(a[ 1 ].length - b[ 1 ].length);
                });

                for(let i = 0; i < names.length; i++) {
                    let name = names[i][1];
                    if(value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = names[i][0];
                        iValue += name.length;
                        break;
                    }
                }

                if(index !== -1) {
                    return index + 1;
                } else {
                    throw new Error('Unknown name at position ' + iValue);
                }
            },
            checkLiteral = () => {
                if(value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw new Error('Unexpected literal at position ' + iValue);
                }
                iValue++;
            };

        if (this.props.view === 'month') {
            day = 1;
        }

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if(literal) {
                if(format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.state.locale.dayNamesShort, this.state.locale.dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.state.locale.monthNamesShort, this.state.locale.monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if(lookAhead("'")) {
                            checkLiteral();
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }

        if(iValue < value.length) {
            extra = value.substr(iValue);
            if(!/^\s+/.test(extra)) {
                throw new Error('Extra/unparsed characters found in date: ' + extra);
            }
        }

        if(year === -1) {
            year = new Date().getFullYear();
        } else if(year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }

        if(doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if(day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }

        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw new Error('Invalid date'); // E.g. 31/02/00
        }

        return date;
    }

    renderBackwardNavigator() {
        return (
            <div className="cal-nav-button-conatiner">
                <button type="button" id="backSingle" className="marvel-primary cal-nav-button p-datepicker-prev  p-datepicker-prev-single p-link p-datepicker-div-margin-left" onClick={this.onPrevButtonClick} >
                    <span className="p-datepicker-prev-icon pi pi-chevron-left"></span>
                </button>
            </div>
        );
    }

    renderBackwardMultiMonthNavigator() {
        return (
            <div className="cal-nav-button-conatiner">
                <button type="button" id="backMulti" className="marvel-primary cal-nav-button p-datepicker-prev p-datepicker-prev-multy p-link" onClick={this.onPrevMultiMonthButtonClick} >
                    <span className="p-datepicker-prev-icon pi pi-chevron-left" style={{paddingLeft:'8px'}}></span>
                    <span className="p-datepicker-prev-icon pi pi-chevron-left p-datepicker-prev-icon-double" ></span>
                </button>
            </div>
        );
    }

    renderForwardNavigator() {
        return (
            <div className="cal-nav-button-conatiner">
                <button type="button" id="forwrdSingle" className="marvel-primary cal-nav-button p-datepicker-next p-datepicker-next-single p-link p-datepicker-div-margin-right" onClick={this.onNextButtonClick} >
                    <span className="p-datepicker-next-icon pi pi-chevron-right"></span>
                </button>
            </div>
        );
    }

    renderForwardMultiMonthNavigator() {
        return (
            <div className="cal-nav-button-conatiner">
                <button type="button" id="forwrdMulti" className="marvel-primary cal-nav-button p-datepicker-next p-datepicker-next-multy p-link " onClick={this.onNextMultiMonthButtonClick} >
                    <span className="p-datepicker-next-icon pi pi-chevron-right" style={{paddingLeft:'8px'}}></span>
                    <span className="p-datepicker-next-icon pi pi-chevron-right p-datepicker-prev-icon-double" ></span>
                    
                </button>
            </div>
        );
    }

    isInMinYear(viewDate) {
        return this.props.minDate && this.props.minDate.getFullYear() === viewDate.getFullYear();
    }

    isInMaxYear(viewDate) {
        return this.props.maxDate && this.props.maxDate.getFullYear() === viewDate.getFullYear();
    }

    renderTitleMonthElement(month) {
        if (this.props.monthNavigator && this.props.view !== 'month') {
            let viewDate = this.getViewDate();
            let viewMonth = viewDate.getMonth();

            return (
                <select className="p-datepicker-month" onChange={this.onMonthDropdownChange} value={viewMonth}>
                    {
                        this.state.locale.monthNames.map((month, index) => {
                            if ((!this.isInMinYear(viewDate) || index >= this.props.minDate.getMonth()) && (!this.isInMaxYear(viewDate) || index <= this.props.maxDate.getMonth())) {
                                return <option key={month} value={index}>{month}</option>
                            }
                            return null;
                        })
                    }
                </select>
            );
        }
        else {
            return (
                <span className="p-datepicker-month">{this.state.locale.monthNames[month]}</span>
            );
        }
    }

    renderTitleYearElement(year) {
        if (this.props.yearNavigator) {
            let yearOptions = [];
            const years = this.props.yearRange.split(':');
            const yearStart = parseInt(years[0], 10);
            const yearEnd = parseInt(years[1], 10);

            for(let i = yearStart; i <= yearEnd; i++) {
                yearOptions.push(i);
            }

            let viewDate = this.getViewDate();
            let viewYear = viewDate.getFullYear();

            return (
                <select className="p-datepicker-year" onChange={this.onYearDropdownChange} value={viewYear}>
                    {
                        yearOptions.map(year => {
                            if (!(this.props.minDate && this.props.minDate.getFullYear() > year) && !(this.props.maxDate && this.props.maxDate.getFullYear() < year)) {
                                return <option key={year} value={year}>{year}</option>
                            }
                            return null;
                        })
                    }
                </select>
            );
        }
        else {
            return (
                <span className="p-datepicker-year">{year}</span>
            );
        }
    }

    renderTitle(monthMetaData) {
        const month = this.renderTitleMonthElement(monthMetaData.month);
        const year = this.renderTitleYearElement(monthMetaData.year);

        return (
            <div className="p-datepicker-title">
                {month}
                {year}
            </div>
        );
    }

    renderDayNames(weekDays) {
        const dayNames = weekDays.map((weekDay) =>{
            let classname ="";
            if (weekDay.dayIndex ===0) {
                classname ="calendar-font-red";
            } else if (weekDay.dayIndex ===6) {
                classname ="calendar-font-blue";
            }
            return (
                <th key={weekDay.dayIndex} scope="col">
                    <span className={classname} >{weekDay.day}</span>
                </th>
            );
                
        });

        if (this.props.showWeek) {
            const weekHeader = (
                <th scope="col" key={'wn'} className="p-datepicker-weekheader p-disabled">
                    <span>{this.state.locale['weekHeader']}</span>
                </th>
            );

            return [weekHeader, ...dayNames];
        }
        else {
            return dayNames;
        }
    }


    renderDateCellContent(date, className, groupIndex , index) {
        let content = "";
        if (date.selectable) {
            content = date.day ;
        }
        let renderedHtml ;
        if (index ===0  && !className.startsWith('p-highlight')) {
            renderedHtml = (
                <span className={className} style={{color:'red'}} onClick={e => this.onDateSelectOnDateClick(e, date)} onKeyDown={e => this.onDateCellKeydown(e, date, groupIndex)}>
                    {content}
                </span>
            );
        } else if (index ===6 && !className.startsWith('p-highlight')) {
            renderedHtml = (
                <span className={className}  style={{color:'blue'}} onClick={e => this.onDateSelectOnDateClick(e, date)} onKeyDown={e => this.onDateCellKeydown(e, date, groupIndex)}>
                    {content}
                </span>
            );
        } else {
            renderedHtml = (
                <span className={className}  onClick={e => this.onDateSelectOnDateClick(e, date)} onKeyDown={e => this.onDateCellKeydown(e, date, groupIndex)}>
                    {content}
                </span>
            );
        }
        return renderedHtml;
    }

    renderWeek(weekDates, weekNumber, groupIndex) {
        const week = weekDates.map((date,index) => {
            const selected = this.isSelected(date);
            let blueSelected = false;
            if (!selected && this.searchStartDate ) {
                blueSelected = this.isDateEquals(this.searchStartDate, date);
            }
            const cellClassName = classNames({'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today, 'p-datepicker-otherday': !date.today});
            const dateClassName = classNames({'p-highlight': selected && date.selectable , 'p-disabled': !date.selectable, 'p-blue-highlight': blueSelected});
            const content = (date.otherMonth && !this.props.showOtherMonths) ? null : this.renderDateCellContent(date, dateClassName, groupIndex, index);

            return (
                <td key={date.day} className={cellClassName}>
                    {content}
                </td>
            );
        });

        if (this.props.showWeek) {
            const weekNumberCell = (
                <td key={'wn' + weekNumber} className="p-datepicker-weeknumber">
                    <span className="p-disabled">
                        {weekNumber}
                    </span>
                </td>
            );

            return [weekNumberCell, ...week];
        }
        else {
            return week;
        }
    }

    renderDates(monthMetaData, groupIndex) {
       
        let dateArray;
        if(monthMetaData.dates.length ===5) {
            dateArray =[];
            for(var i=0;i<7;i++) {
                dateArray.push({day: 32+i, month: monthMetaData.month, year: 2020, today: false, selectable: false});
            }
            monthMetaData.dates.push(dateArray);
        }
        return monthMetaData.dates.map((weekDates, index) => {
            return (
                <tr key={index}>
                    {this.renderWeek(weekDates, monthMetaData.weekNumbers[index], groupIndex)}
                </tr>
            );
        });
    }

    renderDateViewGrid(monthMetaData, weekDays, groupIndex) {
        const dayNames = this.renderDayNames(weekDays);
        const dates = this.renderDates(monthMetaData, groupIndex);

        return (
            <div className="p-datepicker-calendar-container">
                <table className="p-datepicker-calendar">
                    <thead>
                    <tr >
                        {dayNames}
                    </tr>
                    </thead>
                    <tbody>
                    {dates}
                    </tbody>
                </table>
            </div>
        );
    }

    renderMonth(monthMetaData, index) {
        const weekDays = this.createWeekDays();
        const title = this.renderTitle(monthMetaData);
        const dateViewGrid = this.renderDateViewGrid(monthMetaData, weekDays, index);
       
        let classNames="p-datepicker-group calendar-no-border";
        return (
            <div key={monthMetaData.month} className={classNames} >
                <div className="p-datepicker-header">
                   {title}
                </div>
                {dateViewGrid}
            </div>
        );
    }

    renderMonths(monthsMetaData) {
        return (
            monthsMetaData.map((monthMetaData, index) => {
                return this.renderMonth(monthMetaData, index);
            })
        );
    }

    renderDateView() {
        let viewDate = this.getViewDate();
        const monthsMetaData = this.createMonths(viewDate.getMonth(), viewDate.getFullYear());
        this.monthsMetaData = monthsMetaData;
        const months = this.renderMonths(monthsMetaData);
        
        return (
            <React.Fragment>
                {months}
            </React.Fragment>
        );
    }


    renderDatePicker() {
        
        if (!this.props.timeOnly) {
            if (this.props.view === 'date') {
                return this.renderDateView();
            }
            else {
                return null;
            }
        }
    }


    renderInputElement() {
        if (!this.props.inline) {
            const className = classNames('p-inputtext p-component', this.props.inputClassName);

            return (
                <ReactInputText ref={(el) => this.inputElement = ReactDOM.findDOMNode(el)} id={this.props.inputId} name={this.props.name} type="hidden" className={className} style={this.props.inputStyle}
                           readOnly={this.props.readOnlyInput} disabled={this.props.disabled} required={this.props.required} autoComplete="off" placeholder={this.props.placeholder}
                           onInput={this.onUserInput} onFocus={this.onInputFocus} onBlur={this.onInputBlur} onKeyDown={this.onInputKeyDown} aria-labelledby={this.props.ariaLabelledBy}/>
            );
        }
        else {
            return null;
        }
    }

    renderButton() {
        if (this.props.showIcon) {
            return (
                <div style={{display:'inline', pointerEvents:`${this.props.disabled ? 'none': 'auto'}`}} disabled={this.props.disabled}>
                  <img src={this.props.disabled ? require('../../../assets/img/icon-calender_15_dis.gif') :require('../../../assets/img/icon-calender_15.gif')} onClick={this.onButtonClick} tabIndex="-1"
                        disabled={this.props.disabled} className={`p-datepicker-trigger p-calendar-button custom-cal-width ${this.props.disabled ? 'img-cal-disabled' : ''}`} />
                </div>
            );
        }
        else {
            return null;
        }
    }

    onMainSelectButtonClick(){
        this.hideOverlay();
        if (this.props.onChange) {
            this.props.onChange({
                originalEvent: null,
                value: this.selectedDate,
                stopPropagation : () =>{},
                preventDefault : () =>{},
                target: {
                    name: this.props.name,
                    id: this.props.id,
                    value: this.selectedDate
                }
            });
        }
    }
    onHide(event){
        this.updateModel(event, this.state.storeValue);
        this.updateInputfield(this.state.storeValue);
        
        this.hideOverlay();
    }

    renderFooter() {
        return (
            <div className="footer-area">
                <div>
                    <div className="float-left cal-footer-close-div "><Button id="calendarClose" label={this.props.t('calendar.closec')} hotkey="alt+c"  pageId={activePageConstants.CALENDAR} style={{float:'left'}} onClick={this.onHide} className="marvel-primary clear-btn calendar-close-button"/></div>
                    <div className="float-right" ><Button id="calendarMainSelect" label={this.props.t('calendar.confirm')}  hotkey="alt+o" pageId={activePageConstants.CALENDAR} disabled={this.state.selectButtonDisabled}  style={{float:'right'}} className="btn-select-main" onClick={this.onMainSelectButtonClick}></Button></div>
                </div>
            </div>
        ) 
            
    }

    clearFields(){
        this.setState({
            searchSelection:"dateSearch",
            searchDateInput:"",
            searchOperator:"+",
            searchDays:"",
            calStartDateInput:"",
            calStartOperator:"+",
            calStartDays:"",
            calEndDateInput:"",
            calEndOperator:"+",
            calEndDays:"",
            calResult:"",
            selectButtonDisabled:false,
            error:[],
            errorFields:[],
            focField:"searchDate"
        });
        if(document.getElementById("searchDateInput")) {
            document.getElementById("searchDateInput").focus();
            setTimeout(() => {
                document.getElementById("searchDateInput").select();
            }, 100);
        }
        
    }

    onRadioChange=(e)=>{
       if (e.target.value ==="dateSearch") {
            
            this.setState({
                searchSelection:e.target.value,
                selectButtonDisabled:false,
                focField:"searchDate"
                
            });
        } else {
            this.setState({
                searchSelection:e.target.value,
                selectButtonDisabled:true,
                focField:"calcDate"
               
            });
        }
        
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onChangeNumberOnly=(e)=>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                [e.target.name]:e.target.value
            });
        }
       
    }
    onChangeOperator=(e)=>{
        if (e.target.value === '+' || e.target.value === '-') {
            this.setState({
                [e.target.name]:e.target.value
            });
        }

        if(e.target.id === "searchOperator") {
            if(document.getElementById("searchDays")) {
                document.getElementById("searchDays").focus();
                setTimeout(() => {
                    document.getElementById("searchDays").select();
                }, 100);
            }
        } else if(e.target.id === "calStartOperator") {
            if(document.getElementById("calStartDays")) {
                document.getElementById("calStartDays").focus();
                setTimeout(() => {
                    document.getElementById("calStartDays").select();
                }, 100);
            }
        } else if(e.target.id === "calEndOperator") {
            if(document.getElementById("calEndDays")) {
                document.getElementById("calEndDays").focus();
                setTimeout(() => {
                    document.getElementById("calEndDays").select();
                }, 100);
            }
        }
       
    }

    onTextFieldBlur=()=>{
        this.setState({
            searchDateInput:this.state.searchDateInput.toUpperCase(),
            calStartDateInput:this.state.calStartDateInput.toUpperCase(),
            calEndDateInput:this.state.calEndDateInput.toUpperCase()
        });
    }

    suggestItems(event) {
		
		let results = this.operatorOptions.filter((item) => {
		    let searchField = item;
		    return searchField.toLowerCase().startsWith(event.query.toLowerCase());
		});
		this.setState({ suggestOptions: results });
    }

   

    onSTodayButtonClick(event){
        const today = new Date();
        const dateMeta = {day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), today: true, selectable: true};
        const timeMeta = {hours: today.getHours(), minutes: today.getMinutes(), seconds: today.getSeconds(), milliseconds: today.getMilliseconds()};
        this.updateViewDate(event, today);
        if(!dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        DomHandler.find(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(cell => cell.tabIndex = -1);
        // event.currentTarget.focus();
        this.selectDate(event, dateMeta, timeMeta);
        if(this.selectedDate) {
            let dateMeta ={
                month:this.selectedDate.getMonth(),
                year: this.selectedDate.getFullYear(),
                day:this.selectedDate.getDate()
            }
            let selDate = this.getDateString(dateMeta);
            this.setState({
                searchDateInput:selDate,
                searchOperator:"+",
                searchDays:"",
                calStartDateInput:"",
                calStartOperator:"+",
                calStartDays:"",
                calEndDateInput:"",
                calEndOperator:"+",
                calEndDays:"",
                calResult:"",
                error:[],
                errorFields:[]
            });
           
            if(document.getElementById("searchDateInput")) {
                document.getElementById("searchDateInput").focus();
                setTimeout(() => {
                    document.getElementById("searchDateInput").select();
                }, 100);
            }
           
        }
        //this.onDateSelect(event, dateMeta, timeMeta);
    }

    getMMFromMMM(month){
        const months={
            "JAN" : "00",
            "FEB" : "01",
            "MAR" : "02",
            "APR" : "03",
            "MAY" : "04",
            "JUN" : "05",
            "JUL" : "06",
            "AUG" : "07",
            "SEP" : "08",
            "OCT" : "09",
            "NOV" : "10",
            "DEC" : "11"
        }
        return months[month];
    }

    getMMMFromMM(month){
        const months={
            "00" : "JAN",
            "01" : "FEB",
            "02" : "MAR",
            "03" : "APR",
            "04" : "MAY",
            "05" : "JUN",
            "06" : "JUL",
            "07" : "AUG",
            "08" : "SEP",
            "09" : "OCT",
            "10" : "NOV",
            "11" : "DEC"
        }
        return months[month];
    }

    getDateFromString(dateString){
        let day,month,year;
        day = parseInt(dateString.substring(0,2));
        month = parseInt(this.getMMFromMMM(dateString.substring(2,5)));
        year = parseInt("20"+dateString.substring(5,7));
        return new Date(year,month,day);
        
    }

    isValidDateCheck(day,month,year) {
       var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        // Adjust for leap years
        if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            monthLength[1] = 29;
        if ( year < 2000 ||  year > 2050)  {
            return false;
        }
        if (!(month > 0 && month < 13)) {
            return false;
        }
        if (day < 0 || day > monthLength[month]) {
            return false;
        }
        return true;
      }

    validateDate (dateStr) {
        let error=[];
        if(dateStr.length !== 7 || isNaN(dateStr.substring(0,2)) || !this.getMMFromMMM(dateStr.substring(2,5)) || isNaN(dateStr.substring(5,7))){
            error.push(errorConstants.CAL01001);
        } else if (!this.isValidDateCheck(parseInt(dateStr.substring(0,2)),parseInt(this.getMMFromMMM(dateStr.substring(2,5))),parseInt("20"+dateStr.substring(5,7)))) {
            error.push(errorConstants.CAL01003);
        }
        return error;
    }

    validateDay (day) {
        let error=[];
        if(day < 0 || day >355){
            error.push(errorConstants.CAL01002);
        }
        return error;
    }

    onSearchButtonClick(event){
        if(this.state.searchDateInput) {

            let dateError= this.validateDate(this.state.searchDateInput);
            let dayError = this.validateDay(this.state.searchDays);
            let errorFields=[];
            if(dateError.length >0 || dayError.length >0) {
                if(dateError.length >0 && document.getElementById("searchDateInput")){
                    document.getElementById("searchDateInput").focus();
                } else if (dayError.length >0 && document.getElementById("searchDays")) {
                    document.getElementById("searchDays").focus();
                }
                if(dateError.length >0)
                    errorFields.push("searchDateInput");
                if(dayError.length >0)
                    errorFields.push("searchDays");
                this.setState({
                    error : dateError.concat(dayError),
                    errorFields : errorFields
                });

            } else {
                let date = this.getDateFromString(this.state.searchDateInput);
                this.searchStartDate = this.getDateFromString(this.state.searchDateInput);
                this.addOrSubtractDays(date,this.state.searchOperator,this.state.searchDays);
                const dateMeta = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), today: false, selectable: true};
                const timeMeta = {hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds(), milliseconds: date.getMilliseconds()};
                if(this.monthsMetaData && this.monthsMetaData.length === 3 ) {
                    if(this.monthsMetaData[0].year !== date.getFullYear() || ![this.monthsMetaData[0].month,this.monthsMetaData[1].month,this.monthsMetaData[2].month].includes(date.getMonth())){
                        this.updateViewDate(event, date);
                    }
                }
                if(!dateMeta.selectable) {
                    event.preventDefault();
                    return;
                }
                DomHandler.find(this.panel, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(cell => cell.tabIndex = -1);
                // event.currentTarget.focus();
                this.selectDate(event, dateMeta, timeMeta);
                this.setState({
                    error:[],
                    errorFields:[]
                });
                if(document.getElementById("searchDateInput")) {
                    document.getElementById("searchDateInput").focus();
                    setTimeout(() => {
                        document.getElementById("searchDateInput").select();
                    }, 100);
                }
                
            }
        } else {
            this.onSTodayButtonClick(event);
        }
        
    }

    addOrSubtractDays(date,operator,days) {
        if(operator!=="" && days !==""){
            if(operator ==="+"){
                date.setDate(date.getDate() + parseInt(days));
            }else {
                date.setDate(date.getDate() - parseInt(days));
            }
        }
        return date;
    }

    onCalcButtonClick(event){
       let startdateError= this.validateDate(this.state.calStartDateInput);
       let startdayError = this.validateDay(this.state.calStartDays);
       let enddateError= this.validateDate(this.state.calEndDateInput);
       let enddayError = this.validateDay(this.state.calEndDays);
       let errorFields=[];
       if(startdateError.length >0 || startdayError.length >0 || enddateError.length >0 || enddayError.length >0) {
            if(startdateError.length >0 && document.getElementById("calStartDateInput")){
                document.getElementById("calStartDateInput").focus();
            } else if (startdayError.length >0 && document.getElementById("calStartDays")) {
                document.getElementById("calStartDays").focus();
            } else if (enddateError.length >0 && document.getElementById("calEndDateInput")) {
                document.getElementById("calEndDateInput").focus();
            } else if (enddayError.length >0 && document.getElementById("calEndDays")) {
                document.getElementById("calEndDays").focus();
            }
            if(startdateError.length >0)
                errorFields.push("calStartDateInput");
            if(startdayError.length >0)
                errorFields.push("calStartDays");
            if(enddateError.length >0)
                errorFields.push("calEndDateInput");
            if(enddayError.length >0)
                errorFields.push("calEndDays");
            
            this.setState({
                error : startdateError.concat(startdayError.concat(enddateError.concat(enddayError))),
                errorFields : errorFields
            });

       } else {
            let fromdate = this.getDateFromString(this.state.calStartDateInput);
            this.addOrSubtractDays(fromdate,this.state.calStartOperator, this.state.calStartDays);
            let todate = this.getDateFromString(this.state.calEndDateInput);
            this.addOrSubtractDays(todate,this.state.calEndOperator, this.state.calEndDays);
            const oneDay = 24 * 60 * 60 * 1000;
            let res = Math.round((todate - fromdate) / oneDay);
            if(res<-999){
                res = res *-1;
            }
            this.setState({
                calResult:res,
                error:[],
                errorFields:[]
            });
            
       }
    }
    onFocusSearchFields() {
        this.setState({
             searchSelection:"dateSearch",
             selectButtonDisabled:false,
             focField : "searchDate"
             
         });
    }

    onFocusSearchDateInput(){
        this.onFocusSearchFields();
        setTimeout(() => {
            if(document.getElementById("searchDateInput"))
                document.getElementById("searchDateInput").select();
        }, 100);
    }
    onFocusSearchOperator(){
        this.onFocusSearchFields();
    }

    onBlurSearchOperator() {
        
    }
    onFocusSearchDays(){
        this.onFocusSearchFields();
        setTimeout(() => {
            if(document.getElementById("searchDays"))
                document.getElementById("searchDays").select();
        }, 100);
    }
    onFocusCalcFields(field) {
        this.setState({
            searchSelection:"dayCalculation",
            selectButtonDisabled:true,
            focField:"calcDate"
            
        });
    }

    onFocusCalStartOperator(){
        this.onFocusCalcFields();
        
    }
    onFocusCalEndOperator(){
        this.onFocusCalcFields();
       
    }
    onFocusCalStartDays(){
        this.onFocusCalcFields();
        setTimeout(() => {
            if(document.getElementById("calStartDays"))
                document.getElementById("calStartDays").select();
        }, 100);
    }
    onFocusCalEndDays(){
        this.onFocusCalcFields();
        setTimeout(() => {
            if(document.getElementById("calEndDays"))
                document.getElementById("calEndDays").select();
        }, 100);
    }

    onFocusCalResult(){
        this.onFocusCalcFields();
        setTimeout(() => {
            if(document.getElementById("calResult"))
                document.getElementById("calResult").select();
        }, 100);
    }

    onFocusCalcStartDate() {
        this.onFocusCalcFields();
        setTimeout(() => {
            if(document.getElementById("calStartDateInput"))
                document.getElementById("calStartDateInput").select();
        }, 100);
    }

    onFocusCalcEndDate() {
        this.onFocusCalcFields();
        setTimeout(() => {
            if(document.getElementById("calEndDateInput"))
                document.getElementById("calEndDateInput").select();
        }, 100);
    }

    onKeyPressHandler(e) {
       
        if(this.props.activePageId === activePageConstants.CALENDAR && !e.handled ) {
            e.handled =true;
            if(e.code ==="Enter" || e.code ==="Escape" || (e.code ==="F4" && e.altKey)) {
                this.hideOverlay();
                e.preventDefault();
            } else if(e.code ==="ArrowUp" && this.state) {
                if(this.state.searchSelection ==="dayCalculation"){
                    
                    this.setState({
                        searchSelection:"dateSearch",
                        selectButtonDisabled:false,
                        focField:"searchDate"
                        
                    });
                }
            }else if(e.code ==="ArrowDown" && this.state) {
                if(this.state.searchSelection ==="dateSearch"){
                    this.setState({
                        searchSelection:"dayCalculation",
                        selectButtonDisabled:true,
                        focField:"calcDate"
                       
                    });
                }
            } else if(e.code ==="KeyX" && e.ctrlKey){
                e.preventDefault();
            } else if (e.code ==="Tab") {
                
                var element = document.getElementsByClassName("p-dropdown-label");
                if(document.activeElement ===document.getElementById("dateSearch")){
                    if(!e.shiftKey && document.getElementById("searchDateInput")) {
                        document.getElementById("searchDateInput").focus();
                    } else if(e.shiftKey && document.getElementById("forwrdMulti")) {
                        document.getElementById("forwrdMulti").focus();
                    }
                } else if(document.activeElement === document.getElementById("searchDateInput") ){
                    if(!e.shiftKey && element && element.length>1) {
                        element[1].focus();
                    } else if(e.shiftKey && document.getElementById("forwrdMulti")) {
                        document.getElementById("forwrdMulti").focus();
                    }
                } else if(element && element.length>1 && document.activeElement === element[1]) {
                    if(!e.shiftKey && document.getElementById("searchDays")) {
                        document.getElementById("searchDays").focus();
                    } else if(e.shiftKey && document.getElementById("searchDateInput")) {
                        document.getElementById("searchDateInput").focus();
                    }
                } else if(document.activeElement === document.getElementById("searchDays") ){
                    if(!e.shiftKey && document.getElementById("searchButtonCal")) {
                        document.getElementById("searchButtonCal").focus();
                    } else if(e.shiftKey && element && element.length>1) {
                        element[1].focus();
                    }
                } else if(document.activeElement === document.getElementById("searchButtonCal") ){
                    if(!e.shiftKey && document.getElementById("todayButtonCal")) {
                        document.getElementById("todayButtonCal").focus();
                    } else if(e.shiftKey && document.getElementById("searchDays")) {
                        document.getElementById("searchDays").focus();
                    }
                } else if(document.activeElement === document.getElementById("todayButtonCal") ){
                    if(!e.shiftKey && document.getElementById("calStartDateInput")) {
                        document.getElementById("calStartDateInput").focus();
                    } else if(e.shiftKey && document.getElementById("searchButtonCal")) {
                        document.getElementById("searchButtonCal").focus();
                    }
                }else if(document.activeElement === document.getElementById("calStartDateInput") ){
                    if(!e.shiftKey && element && element.length>2) {
                        element[2].focus();
                    } else if(e.shiftKey && document.getElementById("todayButtonCal")) {
                        document.getElementById("todayButtonCal").focus();
                    }
                } else if(element && element.length>2 && document.activeElement === element[2]) {
                    if(!e.shiftKey && document.getElementById("calStartDays")) {
                        document.getElementById("calStartDays").focus();
                    } else if(e.shiftKey && document.getElementById("calStartDateInput")) {
                        document.getElementById("calStartDateInput").focus();
                    }
                } else if(document.activeElement === document.getElementById("calStartDays") ){
                    if(!e.shiftKey && document.getElementById("calEndDateInput")) {
                        document.getElementById("calEndDateInput").focus();
                    } else if(e.shiftKey && element && element.length>2) {
                        element[2].focus();
                    }
                } else if(document.activeElement === document.getElementById("calEndDateInput") ){
                    if(!e.shiftKey && element && element.length>3) {
                        element[3].focus();
                    } else if(e.shiftKey && document.getElementById("calStartDays")) {
                        document.getElementById("calStartDays").focus();
                    }
                } else if(element && element.length>3 && document.activeElement === element[3]) {
                    if(!e.shiftKey && document.getElementById("calEndDays")) {
                        document.getElementById("calEndDays").focus();
                    } else if(e.shiftKey && document.getElementById("calEndDateInput")) {
                        document.getElementById("calEndDateInput").focus();
                    }
                } else if(document.activeElement === document.getElementById("calEndDays") ){
                    if(!e.shiftKey && document.getElementById("calculateButton")) {
                        document.getElementById("calculateButton").focus();
                    } else if(e.shiftKey && element && element.length>3) {
                        element[3].focus();
                    }
                } else if(document.activeElement === document.getElementById("calculateButton") ){
                    if(!e.shiftKey && document.getElementById("calResult")) {
                        document.getElementById("calResult").focus();
                    } else if(e.shiftKey && document.getElementById("calEndDays")) {
                        document.getElementById("calEndDays").focus();
                    }
                } else if(document.activeElement === document.getElementById("calResult") ){
                    if(!e.shiftKey && document.getElementById("calendarClose")) {
                        document.getElementById("calendarClose").focus();
                    } else if(e.shiftKey && document.getElementById("calculateButton")) {
                        document.getElementById("calculateButton").focus();
                    }
                } else if(document.activeElement === document.getElementById("calendarClose") ){
                    if(!e.shiftKey && document.getElementById("backMulti")) {
                        document.getElementById("backMulti").focus();
                    } else if(e.shiftKey && document.getElementById("calResult")) {
                        document.getElementById("calResult").focus();
                    }
                }else if(document.activeElement === document.getElementById("backMulti") ){
                    console.log("fffff");
                    if(!e.shiftKey && document.getElementById("backSingle")) {
                        document.getElementById("backSingle").focus();
                    } else if(e.shiftKey && document.getElementById("calendarClose")) {
                        document.getElementById("calendarClose").focus();
                    }
                } else if(document.activeElement === document.getElementById("backSingle") ){
                    if(!e.shiftKey && document.getElementById("forwrdSingle")) {
                        document.getElementById("forwrdSingle").focus();
                    } else if(e.shiftKey && document.getElementById("backMulti")) {
                        document.getElementById("backMulti").focus();
                    }
                }  else if(document.activeElement === document.getElementById("forwrdSingle") ){
                    if(!e.shiftKey && document.getElementById("forwrdMulti")) {
                        document.getElementById("forwrdMulti").focus();
                    } else if(e.shiftKey && document.getElementById("backSingle")) {
                        document.getElementById("backSingle").focus();
                    }
                } else if(document.activeElement === document.getElementById("forwrdMulti") ){
                    if(!e.shiftKey && document.getElementById("searchDateInput")) {
                        document.getElementById("searchDateInput").focus();
                    } else if(e.shiftKey && document.getElementById("forwrdSingle")) {
                        document.getElementById("forwrdSingle").focus();
                    }
                }
                console.log("document.activeElement--",document.activeElement);
                e.preventDefault();
            }
        }
    }

    renderActionBar(){
        let searchFieldClassName ="p-radiobutton-label";
        let calcFieldClassName ="p-radiobutton-label";
        if(document.getElementById("dateSearch") && document.getElementById("dateSearch") === document.activeElement) {
            searchFieldClassName ="p-radiobutton-label p-radiobutton-label-higlight";
        }
        if(document.getElementById("dayCalculation") && document.getElementById("dayCalculation") === document.activeElement)  {
            calcFieldClassName ="p-radiobutton-label p-radiobutton-label-higlight";
        }
        let searchDateInputClass ="cal-search-input-date";
        let searchDaysClass ="cal-search-input-addval";
        let calStartDateInputClass = "cal-search-input-date";
        let calStartDaysClass = "cal-search-input-addval";
        let calEndDateInputClass = "cal-search-input-date";
        let calEndDaysClass = "cal-search-input-addval";

        if(this.state.errorFields && this.state.errorFields.length >0) {
            if(this.state.errorFields.includes("searchDateInput")){
                searchDateInputClass ="cal-search-input-date cal-error-field";
            }
            if(this.state.errorFields.includes("searchDays")){
                searchDaysClass ="cal-search-input-addval cal-error-field";
            }
            if(this.state.errorFields.includes("calStartDateInput")){
                calStartDateInputClass ="cal-search-input-date cal-error-field";
            }
            if(this.state.errorFields.includes("calStartDays")){
                calStartDaysClass ="cal-search-input-addval cal-error-field";
            }
            if(this.state.errorFields.includes("calEndDateInput")){
                calEndDateInputClass ="cal-search-input-date cal-error-field";
            }
            if(this.state.errorFields.includes("calEndDays")){
                calEndDaysClass ="cal-search-input-addval cal-error-field";
            }
        }
  
        return (
            <div className="calender-action-area ">
              
                        <div className="action-header">
                           
                            <div className="header-label">
                            <div className="cal-header-label-icon"><img alt="" src={require('../../../assets/img/passenger_title.png') }  className="calendar-optionl-label-img"/></div>
                                <div className="cal-header-label-span"><span ><label className="p-icon-label">{this.props.t('calendar.optionalSearch')}</label></span></div>
                            </div>
                            <div className="clear-button header-button "  >
                                <Button id="clearButton" label={this.props.t('calendar.clear')} hotkey="alt+l" pageId={activePageConstants.CALENDAR} className="float-right marvel-primary cal-action-button " onClick={this.clearFields}/>
                            </div>
                        </div>
                        <div className="action-date-selection-area">
                            <div className="radio-element radio-selection-area">
                                <RadioButton inputId="dateSearch" hotkey="alt+1" pageId={activePageConstants.CALENDAR} name="dateSearch" value="dateSearch" onChange={this.onRadioChange} checked={this.state.searchSelection === 'dateSearch'} />
                                <label htmlFor="dateSearch" className={searchFieldClassName}>{this.props.t('calendar.dateSearch')}</label>
                            </div>
                            <div className="date-input-area">
                                <div className="date-input">
                                    <span className="p-float-label" ><label className="float-label" htmlFor="searchDateInput">{this.props.t('calendar.date')}</label> </span>
                                    <InputText id="searchDateInput" maxLength={7} name="searchDateInput"  customBlur ={this.onTextFieldBlur} customFocus={this.onFocusSearchDateInput} className={searchDateInputClass} type="text" size={6} value={this.state.searchDateInput} onChange={this.onChange} />
                                </div>
                               
                                <div className="operator-input">      
                                   <Dropdown id="searchOperator" className="cal-search-input-ope" value={this.state.searchOperator} onBlur={this.onBlurSearchOperator} onFocus ={this.onFocusSearchOperator} name="searchOperator" size={1} options={this.operatorOptions} onChange={this.onChangeOperator} 
                                            editable={true} placeholder="" />
                               </div>
                                <div className="day-input">
                                    <span className="p-float-label" > <label className="float-label" htmlFor="searchDays"></label> </span>
                                    <InputText id="searchDays" keyfilter="pnum" maxLength={4} name="searchDays" customFocus={this.onFocusSearchDays} className={searchDaysClass} type="text" size={1} value={this.state.searchDays} onChange={this.onChangeNumberOnly} />
                                        
                                   
                                </div>
                            </div>
                            <div className="date-button-area">
                                <div className="float-left"><Button id="searchButtonCal" onFocus={this.onFocusSearchFields} size={6} label={this.props.t('calendar.search')} hotkey="alt+s" pageId={activePageConstants.CALENDAR} className="float-left marvel-primary cal-action-button" onClick={this.onSearchButtonClick}/></div>
                                <div className="float-left today-button-div"><Button id="todayButtonCal" label={this.props.t('calendar.today')} hotkey="alt+t" pageId={activePageConstants.CALENDAR} size={6} onFocus={this.onFocusSearchFields} className="float-left marvel-primary cal-action-button cal-today-button" onClick={this.onSTodayButtonClick}/></div>
                            </div>
                        </div>

                        <div className="action-calcdate-selection-area">
                            <div className="radio-element radio-selection-area">
                                <RadioButton inputId="dayCalculation"  hotkey="alt+2" pageId={activePageConstants.CALENDAR} name="dayCalculation" value="dayCalculation" onChange={this.onRadioChange} checked={this.state.searchSelection === 'dayCalculation'} />
                                <label htmlFor="dayCalculation" className={calcFieldClassName}>{this.props.t('calendar.countDays')}</label>
                            </div>
                            <div className="date-input-area">
                                <div className="date-input">
                                    <span className="p-float-label" >  <label className="float-label" htmlFor="calStartDateInput">{this.props.t('calendar.start')}</label>
                                    </span>
                                    <InputText id="calStartDateInput" maxLength={7} customBlur ={this.onTextFieldBlur} customFocus={this.onFocusCalcStartDate} name="calStartDateInput"  className={calStartDateInputClass} type="text" size={6} value={this.state.calStartDateInput} onChange={this.onChange} />
                                       
                                </div>
                               
                                <div className="operator-input">      
                                    <Dropdown id="calStartOperator" className="cal-search-input-ope" value={this.state.calStartOperator} onFocus ={this.onFocusCalStartOperator} name="calStartOperator" size={1} options={this.operatorOptions} onChange={this.onChangeOperator} 
                                            editable={true} placeholder="" />
                                </div>
                                <div className="day-input">
                                    <span className="p-float-label" ><label className="float-label" htmlFor="calStartDays"></label>
                                    </span>
                                    <InputText id="calStartDays" keyfilter="pnum" maxLength={4} customFocus={this.onFocusCalStartDays}  name="calStartDays" className={calStartDaysClass} type="text" size={1} value={this.state.calStartDays} onChange={this.onChangeNumberOnly} />
                                        
                                </div>
                            </div>
                            <div className="date-input-area">
                                <div className="date-input">
                                    <span className="p-float-label" >
                                    <label className="float-label" htmlFor="calEndDateInput">{this.props.t('calendar.last')}</label>
                                    </span>
                                        <InputText id="calEndDateInput" maxLength={7} customBlur ={this.onTextFieldBlur} customFocus={this.onFocusCalcEndDate} name="calEndDateInput"  className={calEndDateInputClass} type="text" size={6} value={this.state.calEndDateInput} onChange={this.onChange} />
                                       
                                </div>
                               
                                <div className="operator-input">      
                                    <Dropdown id="calEndOperator" className="cal-search-input-ope" value={this.state.calEndOperator} onFocus ={this.onFocusCalEndOperator} name="calEndOperator" size={1} options={this.operatorOptions} onChange={this.onChangeOperator} 
                                        editable={true} placeholder="" />
                                            
                                </div>
                                <div className="day-input">
                                    <span className="p-float-label" >
                                    <label className="float-label" htmlFor="calEndDays"></label>
                                    </span>
                                        <InputText id="calEndDays" keyfilter="pnum" maxLength={4} customFocus={this.onFocusCalEndDays} name="calEndDays" className={calEndDaysClass} type="text" size={1} value={this.state.calEndDays} onChange={this.onChangeNumberOnly} />
                                           
                                </div>
                            </div>
                            <div className="day-button-area">
                                <div className="float-left cal-calc-button" >
                                    <Button id="calculateButton"   onFocus={this.onFocusCalcFields} label={this.props.t('calendar.calc')}  size={6} hotkey="alt+a" pageId={activePageConstants.CALENDAR} className="float-left marvel-primary cal-action-button" onClick={this.onCalcButtonClick}/>
                                </div>
                                <span className="p-float-label float-left result-span-area" >  <label className="float-label" htmlFor="calResult">{this.props.t('calendar.result')}</label>
                                </span>
                                    <InputText id="calResult" maxLength={0} customFocus={this.onFocusCalResult} name="calResult" className="cal-search-input-res" type="text" size={3} value={this.state.calResult} onChange={this.onChange} />
                                   
                            </div>

                        </div>
                       
                             
            </div>
        )
    }

    renderheaderPanel() {
        return (
            <div className="calendar-title-bar">
                <div>
                    <span id="myId_header" className="calendar-title">{this.props.t('calendar.calendar')}</span>
                </div>
                <div><Error error={this.state.error} pageId={activePageConstants.CALENDAR} /></div>
           
            </div>
        );
    }

    renderTitlePanel() {
        return (
            <div className="calendar-close-bar">
                <div className="float-right">
                    <button type="button" className="calendar-title-icon p-dialog-titlebar-close p-link" onClick={this.onHide} tooltip="{this.props.t('calendar.close')}">
                        <span className="p-dialog-titlebar-close-icon pi pi-times"></span>
                    </button>
                </div>
            </div>
        );
    }

    render() {
        
        const className = classNames('p-calendar', this.props.className, {
            'p-calendar-timeonly': this.props.timeOnly,
            'p-inputwrapper-filled': this.selectedDate || (DomHandler.hasClass(this.inputElement, 'p-filled') && this.inputElement.value !== ''),
        });
        const panelClassName = classNames('p-datepicker p-component', this.props.panelClassName, {
            'p-datepicker-inline': this.props.inline,
            'p-input-overlay': !this.props.inline,
            'p-shadow': !this.props.inline,
            'p-disabled': this.props.disabled,
            'p-datepicker-timeonly': this.props.timeOnly,
            'p-datepicker-multiple-month': this.props.numberOfMonths > 1,
            'p-datepicker-monthpicker': (this.props.view === 'month'),
            'p-datepicker-touch-ui': this.props.touchUI
        });
        const input = this.renderInputElement();
        const button = this.renderButton();
        let backwardNavigator = "";
        let backwardMultiMonthNavigator = "";
        let forwardNavigator = "";
        let forwardMultiMonthNavigator ="";
        let datePicker ="";
        let actionBar ="";
        let footer ="";
        let headerPanel ="";
        let titlePanel ="";
        if(!this.props.disabled && this.state.visibility) {
            datePicker = this.renderDatePicker();
            actionBar = this.renderActionBar();
            footer = this.renderFooter();
            headerPanel = this.renderheaderPanel();
            titlePanel = this.renderTitlePanel();
            backwardNavigator = this.renderBackwardNavigator();
            backwardMultiMonthNavigator = this.renderBackwardMultiMonthNavigator();
            forwardNavigator = this.renderForwardNavigator();
            forwardMultiMonthNavigator = this.renderForwardMultiMonthNavigator();
        }
        

        return (
            <span ref={(el) => this.container = el} id={this.props.id} className={className} style={this.props.style}>
                {input}
                {button}
                <CalendarPanel ref={(el) => this.panel = ReactDOM.findDOMNode(el)} className={panelClassName} style={this.props.panelStyle}
                               appendTo={this.props.appendTo}>
                    {titlePanel}
                    {headerPanel}
                    <div className="calendar-navigator-container">
                        {backwardNavigator}
                        {backwardMultiMonthNavigator}
                        {forwardNavigator}
                        {forwardMultiMonthNavigator}
                    </div>
                    <div className="calendar-main-container">
                        {datePicker}
                        {actionBar}
                    </div>
                    {footer}
                </CalendarPanel>
            </span>
        );
    }
}
const mapStateToProps=(state)=>{
    const activePageId = state.activePageReducer.pageId;
    return{ activePageId}
  }
const mapDispatchToProps=(dispatch)=>{
	return{
        setPage: (pageId) =>{
            dispatch(activePageActions.setPage(pageId))
        }
        
	}
}
export default withTranslation()(connect(mapStateToProps,mapDispatchToProps)(Calendar));
