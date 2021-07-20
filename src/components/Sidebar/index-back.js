import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Style from "./index.less";
import { ToggleSiderBar } from "../../state/action";

// export default function MSiderBar({ dispatch }) {
function MSiderBar({ onClick, bool }) {
  return (
    <div className={!bool ? Style.hide : Style.siderBar}>
      <div onClick={onClick} className={Style.mask}></div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("SiderBar mapStateToProps ownProps", state, ownProps);
  return {
    bool: state.bool,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("SiderBar mapDispatchToProps ownProps", ownProps, dispatch);

  return {
    onClick: () => {
      dispatch(ToggleSiderBar(ownProps.bool));
    },
  };
};

const MSiderBarWidth = connect(mapStateToProps, mapDispatchToProps)(MSiderBar);

export default MSiderBarWidth;
