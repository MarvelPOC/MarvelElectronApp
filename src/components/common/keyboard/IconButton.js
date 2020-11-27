import React, { Component } from 'react';
import { Button as CustomButton} from 'primereact/button';
import PropTypes from 'prop-types';
import { hotkeys } from 'react-keyboard-shortcuts';
import { connect } from 'react-redux';

class IconButton extends Component {

    static propTypes = {
        id:PropTypes.string.isRequired,
        className:PropTypes.string,
        onClick:PropTypes.func.isRequired,
        onKeyPress:PropTypes.func,
        src:PropTypes.any,
        alt: PropTypes.string
    }
      
    hot_keys = {
        [this.props.hotkey] : {
          priority: 1,
          handler: (event) => {
           if(this.props.pageId === this.props.activePageId){
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
        className,
        onClick,
        onKeyPress,
        src,
        alt
        
      } = this.props;

      return (
        <div id={id} onKeyPress={onKeyPress} className={className}
        onClick={onClick}  tabIndex={0}>
        <img src={src} alt={alt} />
      </div>
        )
    }
  }

  const mapStateToProps=(state)=>{
      const activePageId = state.activePageReducer.pageId;
      return{ activePageId};
  }

export default connect(mapStateToProps)(hotkeys(IconButton));
