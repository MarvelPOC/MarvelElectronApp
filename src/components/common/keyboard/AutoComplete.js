import React, { Component } from 'react';
import { AutoComplete as CustomeAutoComplete} from 'primereact/autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {keyboardActions} from '../../../action/index';

class AutoComplete extends Component {

    constructor(props){
        super(props);
        this.state={
          customEvent:{
            target:{
              value:props.value,
              name:props.name
            },
          }
        }
        this.onFocus=this.onFocus.bind(this);
        this.onBlur=this.onBlur.bind(this);
      }
    
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.any,
        name: PropTypes.string.isRequired,
        type: PropTypes.any,
        suggestions: PropTypes.array,
        field: PropTypes.any,
        scrollHeight: PropTypes.string,
        dropdown: PropTypes.bool,
        dropdownMode: PropTypes.string,	
        multiple: PropTypes.bool,	
        minLength: PropTypes.number,
        delay: PropTypes.number,
        style: PropTypes.any,
        className: PropTypes.string,
        inputId: PropTypes.string,
        inputStyle: PropTypes.string,
        inputClassName: PropTypes.string,
        placeholder: PropTypes.string,
        readonly: PropTypes.bool,
        disabled: PropTypes.bool,
        maxlength: PropTypes.number,
        size: PropTypes.number,
        appendTo: PropTypes.any, 
        tabindex: PropTypes.number,
        autoFocus: PropTypes.bool,
        tooltip: PropTypes.any,
        tooltipOptions: PropTypes.any,
        ariaLabelledBy: PropTypes.string,
        itemTemplate: PropTypes.func,
        selectedItemTemplate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        customFocus:PropTypes.func,
        customBlur:PropTypes.func,
        completeMethod: PropTypes.func.isRequired
        
    }

    static defaultProps = {
        disabled: false,
        customFocus: ()=>{return;},
        customBlur: ()=>{return;}
    };

    onBlur=()=>{
      this.props.onBlur();
      this.props.customBlur();
      
    }
      
    onFocus=()=>{
      this.props.onFocus();
      this.props.customFocus();
     
    }

   
    render () {
      const {
        id,
        value,
        name,
        size,
        type,
        suggestions,
        field,
        dropdown,
        multiple,
        disabled,
        onChange,
        completeMethod,
        tooltip,
        className,
       
        style
      } = this.props;

      return (
        <CustomeAutoComplete id={id} className={className} type={type} size={size} value={value}  name={name} onChange={onChange} disabled={disabled} 
         tooltip={tooltip} onFocus={this.onFocus} onBlur={this.onBlur} suggestions={suggestions} field={field} dropdown={dropdown} 
         multiple={multiple} completeMethod={completeMethod} style={style}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
