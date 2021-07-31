import { withRouter } from "react-router";
import Style from "./NavBar.less";

function NavBar(props) {
  return (
    <div className={Style.wrap}>
      <div className={Style.left}>
        <ul className={Style.ul}>{props.left}</ul>
      </div>
      <div className={Style.middle}>{props.title}</div>
      <div className={Style.right}>
        <ul className={Style.ul}>{props.right}</ul>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
