import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DomHandler from '../calendar/DomHandler';
import './DateSlider.css';

class SliderItem extends Component {

    static defaultProps = {
        template: null,
        item: null,
        active: false,
        start: false,
        end: false,
        selValue:null,
        className: null,
        t:null,
        onSelect:null
    }

    static propTypes = {
        template: PropTypes.func,
        item: PropTypes.any,
        active: PropTypes.bool,
        start: PropTypes.bool,
        end: PropTypes.bool,
        selValue:PropTypes.object,
        t:PropTypes.func,
        onSelect:PropTypes.func,
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.dateTemplate = this.dateTemplate.bind(this);

    }

    getDayName(date) {
        const { t } = this.props;
        let day;
        switch(date.getDay()) {
            case 0:
                day =t('vacancyResult.sunday');
                break;
            case 1:
                day =t('vacancyResult.monday');
                break;
            case 2:
                day =t('vacancyResult.tuesday');
                break;
            case 3:
                day =t('vacancyResult.wednesday');
                break;
            case 4:
                day =t('vacancyResult.thursday');
                break;
            case 5:
                day =t('vacancyResult.friday');
                break;
            case 6:
                day =t('vacancyResult.saturday');
                break;
            default:
                day ="";
          }
          return day;
    }

    dateTemplate(date) {
        
        let className = "vacancy-result-date-selection";
        let dateSel = new Date(this.props.selValue);
        if(date.getFullYear() === dateSel.getFullYear() && date.getMonth() ===dateSel.getMonth() && date.getDate() ===dateSel.getDate())
        {
            className = "vacancy-result-date-selection vacancy-result-date-selected ";
        }
        let day = this.getDayName(date);
        
        return (
            <div className={className} onClick={() => this.props.onSelect(date)}>
                <div className="vacancy-result-date-day" >
                   {date.getDate()} { this.monthNames[date.getMonth()]}
                </div>
                <div className="vacancy-result-date-weekday">
                    {day}
                </div>
               
            </div>
        );
    }



    render() {
        const content = this.dateTemplate(this.props.item);
        const itemClassName = classNames(this.props.className, 'p-carousel-item', {
            'p-carousel-item-active': this.props.active,
            'p-carousel-item-start': this.props.start,
            'p-carousel-item-end': this.props.end
        });

        return (
            <div className={itemClassName}>
                {content}
            </div>
        );
    }
}

class DateSlider extends Component {

    static defaultProps = {
        id: null,
        value: null,
        selValue: null,
        page: 0,
        style: null,
        className: null,
        numVisible: 1,
        numScroll: 1,
        responsiveOptions: null,
        orientation: "horizontal",
        verticalViewPortHeight: "300px",
        contentClassName: null,
        containerClassName: null,
        onPageChange: null,
        backward: null,
        forward: null,
        t:null,
        action:"",
        onSelect: null
    }

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.any,
        page: PropTypes.number,
        style: PropTypes.object,
        selValue: PropTypes.object,
        t:PropTypes.func,
        className: PropTypes.string,
        action: PropTypes.string,
        backward: PropTypes.func,
        forward: PropTypes.func,
        numVisible: PropTypes.number,
        numScroll: PropTypes.number,
        responsiveOptions: PropTypes.array,
        orientation: PropTypes.string,
        verticalViewPortHeight: PropTypes.string,
        contentClassName: PropTypes.string,
        containerClassName: PropTypes.string,
        onPageChange: PropTypes.func,
        onSelect:PropTypes.func
    };

    constructor(props) {
        super(props);

        
        this.day = 60 * 60 * 24 * 1000;
        let dateList=[];

        if(this.props.selValue) {
            dateList = this.getDatesforSlider(new Date(this.props.selValue));

        }

        this.state = {
            numVisible: props.numVisible,
            numScroll: props.numScroll,
            totalShiftedItems: (props.page * props.numScroll) * -1,
            dateList : dateList,
            page: props.page

            
        }

       

        this.navBackward = this.navBackward.bind(this);
        this.navForward = this.navForward.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.totalDots = 0;
        this.remainingItems = 0;
        
       
        
        this.swipeThreshold = 20;

        this.id = this.props.id ;
    }

    getDatesforSlider(date) {
        let dates = [];
        let date1;
        for (let i=-90;i<91;i++) {
            date1 = new Date(date.getTime() + i*this.day);
            dates.push(date1);
        }
        return dates;
    }

    step(dir, page) {
        let totalShiftedItems = this.state.totalShiftedItems;
        

        if (page != null) {
            totalShiftedItems = (this.state.numScroll * page) * -1;

           
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += (this.state.numScroll * dir);
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - (this.state.numScroll * dir);
                this.isRemainingItemsAdded = false;
            }

            let originalShiftedItems =  totalShiftedItems;
            page = Math.abs(Math.floor(originalShiftedItems / this.state.numScroll));
        }

      
        
        if (page === (this.totalDots - 1) && this.remainingItems > 0) {
            totalShiftedItems += ((this.remainingItems * -1) - (this.state.numScroll * dir));
            this.isRemainingItemsAdded = true;
        }

        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer, 'p-items-hidden');
            this.changePosition(totalShiftedItems);
            this.itemsContainer.style.transition = 'transform 500ms ease 0s';
        }

        if (this.props.onPageChange) {
            this.setState({
                totalShiftedItems
            });

            this.props.onPageChange({
                page
            })
        }
        else {
            this.setState({
                page,
                totalShiftedItems
            });
        }
    }

    calculatePosition() {
        if (this.itemsContainer && this.responsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this.props.numVisible,
                numScroll: this.props.numScroll
            };

            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];

                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }

            let state = {};
            if (this.state.numScroll !== matchedResponsiveData.numScroll) {
                let page = this.getPage();
                page = Math.floor((page * this.state.numScroll) / matchedResponsiveData.numScroll);

                let totalShiftedItems = (matchedResponsiveData.numScroll * page) * -1;

                

                state = {
                    totalShiftedItems,
                    numScroll: matchedResponsiveData.numScroll
                };

                if (this.props.onPageChange) {
                    this.props.onPageChange({
                        page
                    })
                }
                else {
                    state = {
                        ...state,
                        page
                    };
                }
            }

            if (this.state.numVisible !== matchedResponsiveData.numVisible) {
                state = {
                    ...state,
                    numVisible: matchedResponsiveData.numVisible
                };
            }

            if (Object.keys(state).length) {
                this.setState(state);
            }
        }
    }

    navBackward(e, page) {
        if ( this.getPage() !== 0) {
            this.step(1, page);
        }
        if(this.props.backward) {
            this.props.backward()
        }
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    navForward(e, page) {
        if (this.getPage() < (this.totalDots - 1)) {
            this.step(-1, page);
        }
        if(this.props.forward) {
            this.props.forward()
        }
        if (e.cancelable) {
            e.preventDefault();
        }
    }


    onTransitionEnd() {
        if (this.itemsContainer) {
            DomHandler.addClass(this.itemsContainer, 'p-items-hidden');
            this.itemsContainer.style.transition = '';

        }
    }

    onTouchStart(e) {
        let touchobj = e.changedTouches[0];

        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];

        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }

    changePageOnTouch(e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {           // left
                this.navForward(e);
            }
            else {                    // right
                this.navBackward(e);
            }
        }
    }

    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = () => {
                this.calculatePosition();
            };

            window.addEventListener('resize', this.documentResizeListener);
        }
    }

    unbindDocumentListeners() {
        if(this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    isVertical() {
        return this.props.orientation === 'vertical';
    }


    getPage() {
        return this.props.onPageChange ? this.props.page : this.state.page;
    }

    getTotalDots() {
        return this.state.dateList ? Math.ceil((this.state.dateList.length - this.state.numVisible) / this.state.numScroll) + 1 : 0;
    }


    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }

        let innerHTML = `
            #${this.id} .p-carousel-item {
                flex: 1 0 ${ (100/ this.state.numVisible) }%
            }
        `;

        if (this.props.responsiveOptions) {
            this.responsiveOptions = [...this.props.responsiveOptions];
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;

                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${ (100/ res.numVisible) }%
                        }
                    }
                `
            }
        }

        this.carouselStyle.innerHTML = innerHTML;
    }

    changePosition(totalShiftedItems) {
        if (this.itemsContainer) {
            this.itemsContainer.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this.state.numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this.state.numVisible)}%, 0, 0)`;
        }
    }

    componentDidMount() {
        this.createStyle();
        this.calculatePosition();
        this.changePosition(this.state.totalShiftedItems);

        if (this.props.responsiveOptions) {
            this.bindDocumentListeners();
        }
        
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.selValue !== prevProps.selValue && this.props.action ==="selection") {
            let diff = Math.round((new Date(this.props.selValue) - new Date(prevProps.selValue)) / this.day);
            this.step(diff*-1);
        }
    }

    componentWillUnmount() {
        if (this.props.responsiveOptions) {
            this.unbindDocumentListeners();
        }

    }

    renderItems() {
        if (this.state.dateList && this.state.dateList.length) {
            let clonedItemsForStarting = null;
            let clonedItemsForFinishing = null;

           
            let items = this.state.dateList.map((item, index) => {
                            let firstIndex = (this.state.totalShiftedItems * -1),
                            lastIndex = firstIndex + this.state.numVisible - 1,
                            isActive = firstIndex <= index && lastIndex >= index,
                            start = firstIndex === index,
                            end = lastIndex === index;
                            return <SliderItem onSelect ={this.props.onSelect} t={this.props.t} selValue={this.props.selValue} key={index}  item={item} active={isActive} start={start} end={end}/>
                        });

            return (
                <React.Fragment>
                    {clonedItemsForStarting}
                    {items}
                    {clonedItemsForFinishing}
                </React.Fragment>
            );
        }
    }


    renderContent() {
        const items = this.renderItems();
        const height = this.isVertical() ? this.props.verticalViewPortHeight : 'auto';
        const backwardNavigator = this.renderBackwardNavigator();
        const forwardNavigator = this.renderForwardNavigator();
        const containerClassName = classNames('p-carousel-container', this.props.containerClassName);

        return (
            <div className={containerClassName}>
                {backwardNavigator}
                <div className="p-carousel-items-content" style={{'height': height}}>
                    <div ref={(el) => this.itemsContainer = el} className="p-carousel-items-container" onTransitionEnd={this.onTransitionEnd}
                        onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
                        {items}
                    </div>
                </div>
                {forwardNavigator}
            </div>
        );
    }

    renderBackwardNavigator() {
        let isDisabled = this.getPage() === 0;
        let buttonClassName = classNames('p-carousel-prev p-button', {
            'p-disabled': isDisabled
        }),
        iconClassName = classNames('p-carousel-prev-icon pi', {
            'pi-chevron-left': !this.isVertical(),
            'pi-chevron-up': this.isVertical()
        });

        return (
            <button type="button" className={buttonClassName} onClick={this.navBackward} disabled={isDisabled}>
                <span className={iconClassName}></span>
            </button>
        );
    }

    renderForwardNavigator() {
        let isDisabled = (this.getPage() === (this.totalDots - 1) || this.totalDots === 0);
        let buttonClassName = classNames('p-carousel-next p-button', {
            'p-disabled': isDisabled
        }),
        iconClassName = classNames('p-carousel-next-icon pi', {
            'pi-chevron-right': !this.isVertical(),
            'pi-chevron-down': this.isVertical()
        });

        return (
            <button type="button" className={buttonClassName} onClick={this.navForward} disabled={isDisabled}>
                <span className={iconClassName}></span>
            </button>
        );
    }



  

    render() {
        const className = classNames('p-carousel p-component', {
            'p-carousel-vertical': this.isVertical(),
            'p-carousel-horizontal': !this.isVertical()
        }, this.props.className);
        const contentClassName = classNames('p-carousel-content', this.props.contentClassName);

        this.totalDots = this.getTotalDots();
        const content = this.renderContent();
       
        

        return (
            <div id={this.id} className={className} style={this.props.style}>
                <div className={contentClassName}>
                    {content}
                    
                </div>
               
            </div>
        );
    }
}
export default DateSlider;
