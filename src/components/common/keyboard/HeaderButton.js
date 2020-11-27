import React, { Component } from "react";
import PropTypes from "prop-types";
import { hotkeys } from "react-keyboard-shortcuts";
import { connect } from "react-redux";

class HeaderButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    className: PropTypes.string,
    hotkey: PropTypes.string,
    tooltip: PropTypes.any,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    firstHeader: PropTypes.string,
    secondHeader: PropTypes.string,
    firstSpanClass: PropTypes.string,
    secondSpanClass: PropTypes.string,
    pageId: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    onClick: () => {
      return;
    },
  };

  hot_keys = {
    [this.props.hotkey]: {
      priority: 1,
      handler: (event) => {
        if (!this.props.disabled && this.props.pageId === this.props.activePageId) {
          event.preventDefault();
          document.getElementById(this.props.id).focus();
          this.props.onClick();
        } else {
          event.preventDefault();
        }
      },
    },
  };

  render() {
    const {
      id,
      icon,
      className,
      onClick,
      disabled,
      tooltip,
      style,
      onFocus,
      onBlur,
      firstHeader,
      secondHeader,
      firstSpanClass,
      secondSpanClass,
    } = this.props;

    return (
      // <button id={id} icon={icon} className={className}
      //      onClick={onClick} disabled={disabled} tooltip={tooltip} style={style} onFocus={onFocus} onBlur={onBlur}>
      //          <span className={firstSpanClass}>{firstHeader}</span>
      //          <span className={secondSpanClass}>{secondHeader}</span>
      // </button>

      <div className="col-1-of-4">
        <button
          id={id}
          className={disabled?"header-sub__btn u-disable": "header-sub__btn"}
          onClick={onClick}
          tooltip={tooltip}
          style={style}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <div className="header-sub__btn-text">{firstHeader}</div>
          <div className="header-sub__btn-fn-key">{secondHeader}</div>
        </button>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  const isFocused = state.keyboardReducer.isFocused;
  const activePageId = state.activePageReducer.pageId;
  return{ isFocused, activePageId};
}

export default connect(mapStateToProps)(hotkeys(HeaderButton));
