import React, { Component } from 'react';
import {RadioButton as CustomRadioButton} from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import {hotkeys} from 'react-keyboard-shortcuts';
import { connect } from 'react-redux';

class RadioButton extends Component {

    constructor(props){
      super(props);
      this.state={
        isCheked: false,
      }
    }

    static propTypes = {
        id:PropTypes.string.isRequired,
        inputId:PropTypes.string.isRequired,
        value:PropTypes.any,
        name:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        disabled:PropTypes.bool,
        checked:PropTypes.any,
        tooltip:PropTypes.any,
        required:PropTypes.bool,
        style:PropTypes.string,
        hotkey: PropTypes.string,
        className: PropTypes.string,
        pageId: PropTypes.string
    }

    static defaultProps = {
        disabled: false,
        checked: false,
        id:'',
        value:'',
        name:''
    };
      
    hot_keys = {
        [this.props.hotkey] : {
          priority: 1,
          handler: (event) => {
            if(this.props.pageId === this.props.activePageId){
              event.preventDefault();
              if (this.props.onChange) {
                  this.props.onChange({
                      originalEvent: event,
                      value: this.props.value,
                      stopPropagation : () =>{},
                      preventDefault : () =>{},
                      target: {
                          name: this.props.name,
                          id: this.props.id,
                          value: this.props.value
                      }
                    });
                }
              }
            },
        },
    }

    render () {
        const {
            inputId,
            value,
            name,
            onChange,
            disabled,
            checked,
            tooltip,
            required,
            style,
            className
          } = this.props;
    
          return (
            <CustomRadioButton inputId={inputId} className={className} value={value} name={name} onChange={onChange} checked={checked} disabled={disabled}
            tooltip={tooltip} required={required} style={style} />
          )
    }
  }

  const mapStateToProps=(state)=>{
    const isFocused = state.keyboardReducer.isFocused;
    const activePageId = state.activePageReducer.pageId;
    return{ isFocused, activePageId};
}

export default connect(mapStateToProps)(hotkeys(RadioButton));
