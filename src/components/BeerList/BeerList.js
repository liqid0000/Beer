import React from 'react';

import BeerItem from './BeerItem/BeerItem'

const beerList = (props) =>
    props.beers.map((beer, index) => {                
        return<BeerItem
        click = {() => props.clicked(beer.id)}
        name = {beer.name}
        img = {beer.image_url}
        description = {beer.description}        
        key={index}       
        />
  });

  export default beerList;