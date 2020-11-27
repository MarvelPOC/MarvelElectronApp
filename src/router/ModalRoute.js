import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import "./Router.css";

export const ModalRoute = (props) => {
  const { path, render, display } = props;

  const onShow = () => {
    props.onDisplayChange(true);
  };
  const onHide = () => {
    props.onDisplayChange(false);
    let el = document.getElementById("f1Btn");
    el.style.background = "";
  };

  const closeIcon = (
    <span
      onClick={onHide}
      class="custom p-dialog-titlebar-close-icon pi pi-times"
    ></span>
  );

  return (
    <div className="route-modal-section">
      <Dialog
        id="routerModal"
        showHeader
        iconsTemplate={closeIcon}
        closable={false}
        visible={display}
        onHide={onHide}
        modal
        blockScroll
      >
        <Route path={path} render={render} />
      </Dialog>
    </div>
  );
};

ModalRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.any,
  display: PropTypes.bool,
  onDisplayChange: PropTypes.func,
};

ModalRoute.defaultProps = {
  path: "/",
};
