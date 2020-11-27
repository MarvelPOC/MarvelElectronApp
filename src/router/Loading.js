import React from 'react';

export const Loading = () =>{
    return(
        <div style={{position:'fixed', backgroundColor:'#EEEEEE', width:'100%', height:'100%'}}>
            <div style={{position:'absolute', top:'12em', left:'33%'}}>
                <img style={{height:'70%', width:'70%'}} src={require('../assets/img/splash_bk_marvel.png')} alt="loading" />
                <img style={{width:'6%', position:'absolute', top:'46%', left:'32%'}} src={require('../assets/img/splash_loader_48-48.gif')} alt="loading curl"/>
            </div>
        </div>       
    )
}
    
