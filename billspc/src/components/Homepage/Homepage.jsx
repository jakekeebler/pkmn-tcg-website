import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import pokemon from 'pokemontcgsdk';

var nextData = '';
var buttonNextOp = {display: 'none'};
var buttonPrevOp = {display: 'none'};
var helloOp = {display: 'block'};
var pageN = 1;
const token = '0df16f92-c92c-4a6b-b91f-07b8e1ae60c1';
// const callAPI = `https://api.pokemontcg.io/v2/cards?q=name:clefairy&pageSize=30&orderBy=-set.releaseDate`;
// const callAPIsearch = `https://api.pokemontcg.io/v2/cards?pageSize=30&orderBy=-set.releaseDate&q=name:`;


const Homepage = () => {

  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function accessAPI(name) {
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:${name}*`, pageSize: 12, page: pageN, orderBy: '-set.releaseDate,-number' })
    .then(res => {console.log(res); setCards(res.data); nextData = res;});
  }

  function nextButtonFunction() {
    if (pageN * nextData.pageSize < nextData.totalCount) {
      buttonNextOp = {display: 'block'}
    } else {
      buttonNextOp = {display: 'none'}
    }
  }

  function prevButtonFunction() {
    if (pageN > 1) {
      buttonPrevOp = {display: 'block'};
    } else {
      buttonPrevOp = {display: 'none'};
    }
  }

  function helloOpacityHandler() {
    if (nextData.totalCount >= 1) {
      helloOp = {display: 'none'}
    } else {
      helloOp = {display: 'block'}
    }
  }
  

  //default homepage load
  useEffect(() => {



  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    pageN = 1;
    accessAPI(searchTerm);
    
    // prevButtonFunction();
    // nextButtonFunction();
  };

  const handleOnChange = (e) => {
    pageN = 1;
    setSearchTerm(e.target.value);
    
  }

  const handleNextButtonPress = (e) => {
    e.preventDefault();

    pageN++;
    accessAPI(searchTerm);
    // prevButtonFunction();
    // nextButtonFunction();
  }

  const handlePrevButtonPress = (e) => {
    e.preventDefault();

    pageN--;
    accessAPI(searchTerm);
    // prevButtonFunction();
    // nextButtonFunction();
  }

  helloOpacityHandler();
  prevButtonFunction();
  nextButtonFunction();

  
  return (
    <>

      <form onSubmit={handleOnSubmit}>
        <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
      </form>

      <div className='hello-container' style={helloOp}>
        <h1>
          Welcome to Bill's PC! Type in the name of a Pokémon, Trainer card, or Energy card in the search bar to view them here. 
        </h1>
        <h1>
          Try searching for Clefairy, Charizard, or Bill to start! Use the arrow buttons on the sides to see the next or previous page.
        </h1>
      </div>

      <div className='card-container'>
        {cards.map(card => (<Card key={card.id} {...card} />))}
      </div>

      <div className='button-container'>
        <button className='previous-button' type='submit' style={buttonPrevOp} onClick={handlePrevButtonPress} ></button>
        <button className='next-button' type='submit' style={buttonNextOp} onClick={handleNextButtonPress} ></button>
      </div>

    </>

  );
}

export default Homepage;