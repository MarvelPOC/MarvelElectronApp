import React from 'react';
import IconSiginin from '../../../assets/img/siginin_icon.png';
export const LeftSideMenu = ()=>{
    return(
          
           <div className="left-side-menu" >
               <ul className="menu__list">
                   <li className="app-row u-no-gutters"><button className="menu__btn menu__btn--selected"><div className="menu__btn-text">A
                   </div>
                    <div className="menu__btn-icon u-disable"><img src={IconSiginin} alt="Sign In"/></div>
                   </button>
                   
                   </li>
                   <li className="app-row u-no-gutters"><button className="menu__btn u-disable"><div className="menu__btn-text">B</div></button></li>
                   <li className="app-row u-no-gutters"><button className="menu__btn u-disable"><div className="menu__btn-text">C</div></button></li>
                   <li className="app-row u-no-gutters"><button className="menu__btn u-disable"><div className="menu__btn-text">D</div></button></li>
                   <li className="app-row u-no-gutters"><button className="menu__btn u-disable"><div className="menu__btn-text">E</div></button></li>
               </ul>
               &nbsp;
           </div>
    )
}
