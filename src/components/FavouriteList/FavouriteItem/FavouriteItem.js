import React from 'react';
import Auux from '../../../hoc/Auux'
export default (props) => {    
  
   return (    
    <Auux>
        <li className="list-group-item d-flex justify-content-between align-items-center">
        {props.name}
        <div className="image-parent">
            <img src={props.img} className="img-fluid" alt="beer" style={{width: '7%',display: 'block',margin: 'auto'}}/>
        </div>
        </li>  
    </Auux>        
    )
};

