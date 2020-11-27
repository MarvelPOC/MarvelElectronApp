import React, { Component } from 'react';
import {InputText as CustomText} from 'primereact/inputtext';
import PropTypes from 'prop-types';
import {hotkeys} from 'react-keyboard-shortcuts';
import { connect } from 'react-redux';
import {keyboardActions} from '../../../action/index';

class InputText extends Component {

    constructor(props){
        super(props);
        this.onFocus=this.onFocus.bind(this);
        this.onBlur=this.onBlur.bind(this);
      }
    
    static propTypes = {
        id:PropTypes.string,
        type:PropTypes.any,
        size:PropTypes.number,
        name:PropTypes.string.isRequired,
        value:PropTypes.any,
        disabled:PropTypes.bool,
        onChange:PropTypes.func.isRequired,
        validateOnly:PropTypes.bool,
        tooltip: PropTypes.any,
        hotkey: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.any,
        customFocus:PropTypes.func,
        customBlur:PropTypes.func,
        maxLength:PropTypes.number,
        keyfilter:PropTypes.string,
        nextFocus:PropTypes.string,
        tabindex:PropTypes.number,
    }

    static defaultProps = {
        disabled: false,
        hotkey: '',
        id:'',
        name:'',
        value:'',
        keyfilter: null,
        nextFocus:'',
        maxLength:100,
        tabindex:null,
        customFocus: ()=>{return;},
        customBlur: ()=>{return;}
    };

    onBlur=(e)=>{
      this.props.onBlur();
      this.props.customBlur(e);
    }
      
    onFocus=(e)=>{
      this.props.onFocus();
      this.props.customFocus(e);
    }

    hot_keys = {
        [this.props.hotkey] : {
          priority: 1,
          handler: (event) => {
            event.preventDefault();
            document.getElementById(this.props.id).focus();
            if (this.props.onChange) {
              this.props.onChange({
                  originalEvent: event,
                  value: this.props.value,
                  stopPropagation : () =>{},
                  preventDefault : () =>{},
                  target: {
                      name: this.props.name,
                      id: this.props.id,
                      value: this.props.value,
                      maxLength: this.props.maxLength,
                      nextFocus: this.props.nextFocus
                    }
                });
              }
            },
        },
    }
    render () {
      const {
        id,
        type,
        name,
        size,
        value,
        disabled,
        onChange,
        validateOnly,
        tooltip,
        className,
        style,
        maxLength,
        keyfilter,
        nextFocus,
        tabindex
      } = this.props;

      return (
        <CustomText id={id} className={className} keyfilter={keyfilter} type={type} size={size} value={value} name={name} onChange={onChange} disabled={disabled} 
        validateOnly={validateOnly} tooltip={tooltip} onFocus={this.onFocus} onBlur={this.onBlur} style={style} maxLength={maxLength} nextFocus={nextFocus} tabIndex={tabindex} />
      )
    }
  }

  const mapStateToProps=(state)=>{
    return{
      isFocused:state.keyboardReducer.isFocused
    }
  }
   
  const mapDispatchToProps=(dispatch)=>{
   return{
    onFocus: ()=>{
           dispatch(keyboardActions.onFocus())
       },
    onBlur: ()=>{
        dispatch(keyboardActions.onBlur())
      }
   }
  }

export default connect(mapStateToProps, mapDispatchToProps)(hotkeys(InputText));