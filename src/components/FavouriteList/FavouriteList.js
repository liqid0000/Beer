import React from 'react';

import FavouriteItem from './FavouriteItem/FavouriteItem'

const favouriteList = (props) =>   
    props.favourites.map(favourite => {                
        return <FavouriteItem  
            key={favourite.id}
            name = {favourite.name}
            img = {favourite.image_url}        
        />      
    
  });

  export default favouriteList;