import React, { Component } from 'react';
import axios from 'axios';

import BeerList from '../../components/BeerList/BeerList'
import FavouriteList from '../../components/FavouriteList/FavouriteList'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BeerBuilder.css'

class BeerBuilder extends Component { 
    state = {
        beers: [],
        counter: 1,
        favourites:[],
    }

    componentDidMount() { 
        axios.get("https://api.punkapi.com/v2/beers?page=1&per_page=12",{ crossDomain: false })
        .then(res => {
            const beers = [...res.data].map(beer =>{
                return {id: beer.id,name: beer.name,image_url: beer.image_url,
                    description: beer.description}
            });     
            
            let favourites = JSON.parse(localStorage.getItem("allFavourites"));            
            (favourites) ?                 
            this.setState({beers: beers, favourites: favourites}) :
            this.setState({beers: beers});  

        }).catch((err) => {
            console.log(err);
        });

        
      }    
      
    loadMore = () =>{
        let counter = this.state.counter + 1;
        axios.get("https://api.punkapi.com/v2/beers?page="+ counter +"&per_page=12",{ crossDomain: false })
        .then(res => {
            let counter = this.state.counter;

            let beers = [...this.state.beers];

            const newBeers = [...res.data].map(beer =>{
                return {id: beer.id, name: beer.name,image_url: beer.image_url,
                    description: beer.description }
            });               
           
            beers = beers.concat(newBeers);
            counter++;           
            
            this.setState({beers: beers,counter: counter})        
        }) 
    }

    arrayRemove(arr, id) { return arr.filter(function(e){ return e.id !== id; });}

    updateStorageFavourite = (favourite) => {
        let favouriteId = -1;       
        let existingFavourite = JSON.parse(localStorage.getItem("allFavourites"));
        if(existingFavourite == null) existingFavourite = [];
        
        const currentFavourite = existingFavourite.find(p=>{
            return p.id === favourite.id;
        });
        if( currentFavourite) favouriteId = currentFavourite.id;       

        (favouriteId !== -1) ?  existingFavourite = this.arrayRemove(existingFavourite, favouriteId):
                existingFavourite.push(favourite);

        localStorage.setItem("allFavourites", JSON.stringify(existingFavourite));

        return existingFavourite;
    };

    updateFavourite = (id) => {
        let favouriteId = -1; 

        const beerIndex = this.state.beers.findIndex(p=>{
            return p.id === id;
        });          

        const favourite = {
            ...this.state.beers[beerIndex]
        };

        let existingFavourite = JSON.parse(localStorage.getItem("allFavourites"));

        if(existingFavourite == null) existingFavourite = [];
        
        const currentFavourite = existingFavourite.find(p=>{
            return p.id === favourite.id;
        });

        if( currentFavourite) favouriteId = currentFavourite.id;       

        (favouriteId !== -1) ?  existingFavourite = this.arrayRemove(existingFavourite, favouriteId):
                existingFavourite.push(favourite);

        localStorage.setItem("allFavourites", JSON.stringify(existingFavourite));
                
        this.setState({
            favourites: existingFavourite
        });
    }
     
    render () {  
        return (
                      
            <div className="container">
                <div className="row" style={{margin:'30px'}}>
                    <div className="col-12 col-sm-10 col-lg-10" style={{margin:'auto'}}>
                        <h4 className="text-muted">Favourites Beers</h4> 
                        <ul className="list-group">
                            {this.state.favourites.length !== 0 ?
                                <FavouriteList favourites = {this.state.favourites}></FavouriteList>:
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Add beer to favourites     
                                </li>
                            }
                        </ul>
                    </div>
                </div>                
                <h4 className="text-muted">Beer List</h4> 
                <div className="card-deck">
                    <BeerList
                    clicked = {this.updateFavourite}
                    beers = {this.state.beers}
                    > </BeerList>
                </div>
                <Button onClick={this.loadMore} variant="outline-primary">LoadMore</Button>{' '}
            </div>                                       
            
        );
    }
}

export default BeerBuilder;