import React from 'react'

function FullScreenBtn({errorMessage,handleExitFullscreen,setIsFullscreen,isFullscreen}) {
    return (
        <>
        {errorMessage ? (
            <li className="header-bar__item" tabIndex="0"
              onClick={() =>
                alert(
                  "Fullscreen is unsupported by this browser, please try another browser."
                )
              }
            >
              {errorMessage}
            </li>
          ) : isFullscreen ? (
            <li onKeyPress={(event)=>event.key ==='Enter'? handleExitFullscreen() : null} onClick={handleExitFullscreen} className="header-bar__item" tabIndex="0" >Exit Fullscreen</li>
          ) : (
            <li  onKeyPress={(event)=>event.key ==='Enter'? setIsFullscreen() : null} className="header-bar__item" tabIndex="0" onClick={setIsFullscreen}>Enter Fullscreen</li>
          )}
          </>
    )
}

export default FullScreenBtn
