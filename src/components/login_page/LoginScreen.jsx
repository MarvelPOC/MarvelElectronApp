import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { activePageActions, LoginActions } from "../../action";
import "../../assets/css/common.css";
import SigninDom from "../../assets/img/signin_dom.png";
import SigninWelcome from "../../assets/img/signin_welcome.png";
import { activePageConstants } from "../../constants";
import ErrorModal from "../common/errorModal/ErrorModal";
import Button from "../common/keyboard/Button";

function LoginScreen(props) {
  const [lsn, setLsn] = useState("");
  const [uuid, setuuid] = useState("");
  const [agentId, setAgentId] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [enableErrorPopup, setEnableErrorPopup] = useState(true);
  useEffect(() => {
    let propsUUID = props.match.params.uuid;
    let sessionUUID = sessionStorage.getItem("uuid");
    let propsLSN = props.match.params.lsn;
    let sessionLSN = sessionStorage.getItem("lsn");
    let machineLSN = propsLSN ? propsLSN : sessionLSN ? sessionLSN : "";
    let machineUUID = propsUUID ? propsUUID : sessionUUID ? sessionUUID : "";
    setLsn(machineLSN);
    setuuid(machineUUID);
    props.setPage(activePageConstants.LOGIN_PAGE);

    //f1,f11,f12 disable
    document.addEventListener(
      "keydown",
      (event) => {
        if ([112, 122, 123].includes(event.keyCode)) {
          event.preventDefault();
        }
      },
      false
    );
  }, []);

  const onLogin = () => {
    setEnableErrorPopup(true);
    const loginCredentials = {
      agentId,
      uuid,
      lsn,
      agentPassword,
    };
    props.login(props, loginCredentials);
  };

  const onErrorhide = () => {
    setEnableErrorPopup(false);
  };

  return (
    <div className="app-row login-screen">
      <div className="form">
        <div className="form-header">
          <img
            src={SigninWelcome}
            alt="Welcome to marvel"
            className="form-header__img"
          />
        </div>
        {props.error && enableErrorPopup && (
          <ErrorModal closefn={onErrorhide} message={props.error} />
        )}
        <div className="form__header">
          <button className="form__header-btn" disabled>
            国際(<u>I</u>)
          </button>
          <button
            className="form__header-btn form__header-btn--active"
            onClick={(e) => {
              e.preventDefault();
              return null;
            }}
          >
            国内(<u>D</u>)
          </button>
        </div>
        <div className="form__body app-row">
          <div className="col-3-of-4">
            <div className="form__grp">
              <input
                className="form__input"
                type="text"
                name="agentId"
                id="agentId"
                onChange={(e) => setAgentId(e.target.value)}
              />
              <label className="form__label" htmlFor="agentId">
                サインイン番号:
              </label>
            </div>
            <div className="form__grp">
              <input
                className="form__input"
                type="password"
                name="agentPassword"
                id="agentPassword"
                onChange={(e) => setAgentPassword(e.target.value)}
              />
              <label className="form__label" htmlFor="agentPassword">
                パスワード:
              </label>
            </div>

            <img src={SigninDom} alt="Signin Domestic" className="form__img" />

            <div className="form__grp">
              <div className="col-1-of-3">
                日付:&nbsp;{moment().format("DDMMMYY")}{" "}
              </div>
              <div className="col-2-of-3"> 標準発売日:&nbsp;15Sep21</div>
            </div>

            <div className="form__grp">
              <div>UUID:&nbsp;{uuid ? uuid : "Not detected"}</div>
            </div>

            <div className="form__grp">
              <div className="col-1-of-3">
                LSN:&nbsp;{lsn ? lsn : "Not detected"}
              </div>
            </div>
            <div
              style={{
                marginLeft: "1rem",
                marginTop: "-1rem",
                marginBottom: ".25rem",
              }}
            >
              サインインエリア
            </div>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th colSpan="2">エリア</th>
                <th>オフィスコード</th>
                <th>サインイン</th>
                <th>ユーザーグループ</th>
                <th>表示中のPNR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="radio" name="area-select" defaultChecked />
                </td>
                <td className="area-code">A</td>
                <td>IBS001</td>
                <td>20089</td>
                <td>システムコントロール</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="area-select" disabled />
                </td>
                <td className="area-code">B</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="area-select" disabled />
                </td>
                <td className="area-code">C</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="area-select" disabled />
                </td>
                <td className="area-code">D</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="area-select" disabled />
                </td>
                <td className="area-code">E</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="form__grp">
            <Button
              className="app-btn app-btn--primary login-btn"
              id="loginMarvel"
              hotkey="alt+s"
              pageId={activePageConstants.LOGIN_PAGE}
              onClick={onLogin}
              label=" サインイン(S̲)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//Pass redux state as props
const mapStateToProps = (state) => {
  return {
    agentId: state.login.agentId,
    uuid: state.login.uuid,
    lsn: state.login.lsn,
    error: state.login.error,
  };
};
//Pass redux dispatch as props
const mapDispatchToProps = (dispatch) => {
  return {
    login: (props, loginCredentials) =>
      dispatch(LoginActions.login(props, loginCredentials)),
    setPage: (pageId) => dispatch(activePageActions.setPage(pageId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
