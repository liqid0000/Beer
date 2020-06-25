import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './BeerItem.css'
export default (props) => {    
  
   return (    
    
    <Card style={{ width: '18rem'}}>        
        <Card.Img style={{width: '20%',display: 'block',margin: 'auto'}}
        variant="top"
        src={props.img}/>                
        <Card.Body>
        <Card.Title variant="down">{props.name}</Card.Title>
            <Card.Text>
                {props.description}
            </Card.Text>     
            <Button onClick={props.click} style={{position: 'absolute', bottom: '0',margin: '0', 
            left: '50%', right: '-50%',transform: 'translate(-50%, 0%)'}}
            >Favourite
            </Button>
        </Card.Body> 
    </Card>

   )
};

