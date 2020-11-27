import React, { Component } from 'react';
import { Button as CustomButton} from 'primereact/button';
import PropTypes from 'prop-types';
import { hotkeys } from 'react-keyboard-shortcuts';
import { connect } from 'react-redux';

class Button extends Component {

    static propTypes = {
        id:PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
        className: PropTypes.string,
        hotkey: PropTypes.string,
        iconPos: PropTypes.string,
        tooltip: PropTypes.any,
        disabled: PropTypes.bool,
        style: PropTypes.any,
        onFocus:PropTypes.func,
        onBlur:PropTypes.func,
        pageId: PropTypes.string
    }

    static defaultProps = {
        disabled: false,
    };
      
    hot_keys = {
        [this.props.hotkey] : {
          priority: 1,
          handler: (event) => {
           if(!this.props.disabled && this.props.pageId === this.props.activePageId){
              event.preventDefault();
              document.getElementById(this.props.id).focus();
              this.props.onClick();
            }
          },
        },
    }
   
    render () {
      const {
        id,
        label,
        icon,
        className,
        onClick,
        disabled,
        iconPos,
        tooltip,
        style,
        onFocus,
        onBlur
      } = this.props;

      return (
        <CustomButton id={id} label={label}  icon={icon} className={className}
        onClick={onClick} disabled={disabled} iconPos={iconPos} tooltip={tooltip} style={style} onFocus={onFocus} onBlur={onBlur} tabIndex={-1}/>
      )
    }
  }

  const mapStateToProps=(state)=>{
      const isFocused = state.keyboardReducer.isFocused;
      const activePageId = state.activePageReducer.pageId;
      return{ isFocused, activePageId};
  }

export default connect(mapStateToProps)(hotkeys(Button));
