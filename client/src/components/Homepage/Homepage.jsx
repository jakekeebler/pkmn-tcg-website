import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import pokemon from 'pokemontcgsdk';

var nextData = '';
var buttonNextOp = {display: 'none'};
var buttonPrevOp = {display: 'none'};
var pageN = 1;
const token = '0df16f92-c92c-4a6b-b91f-07b8e1ae60c1';
// const callAPI = `https://api.pokemontcg.io/v2/cards?q=name:clefairy&pageSize=30&orderBy=-set.releaseDate`;
// const callAPIsearch = `https://api.pokemontcg.io/v2/cards?pageSize=30&orderBy=-set.releaseDate&q=name:`;





const Homepage = () => {

  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function accessAPI(name) {
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:${name}`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate,-number' })
    .then(res => {console.log(res); setCards(res.data); nextData = res;});
  }

  function NextButtonFunction() {
    if (pageN * nextData.pageSize > nextData.totalCount) {
      buttonNextOp = {display: 'none'}
    } else {
      buttonNextOp = {display: 'block'}
    }
  }

  function PrevButtonFunction() {
    if (pageN > 1) {
      buttonPrevOp = {display: 'block'};
    } else {
      buttonPrevOp = {display: 'none'};
    }
  }
  

  //default homepage load
  useEffect(() => {

    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:clefairy`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate,-number' })
    .then(res => {console.log(res); setCards(res.data)});

  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    pageN = 1;
    accessAPI(searchTerm)
    PrevButtonFunction();
    NextButtonFunction();
  };

  const handleOnChange = (e) => {
    pageN = 1;
    setSearchTerm(e.target.value);
  }

  const handleNextButtonPress = (e) => {
    e.preventDefault();

    pageN++;
    accessAPI(searchTerm)
    PrevButtonFunction();
    NextButtonFunction();
  }

  const handlePrevButtonPress = (e) => {
    e.preventDefault();

    pageN--;
    accessAPI(searchTerm)
    PrevButtonFunction();
    NextButtonFunction();
  }

  
  return (
    <>

      <form onSubmit={handleOnSubmit} >
        <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
      </form>

      <div className='card-container'>
        {cards.map(card => (<Card key={card.id} {...card} />))}
      </div>

      <div className='button-container'>
        <button className='previous-button' type='submit' style={buttonPrevOp} onClick={handlePrevButtonPress} >PREV</button>
        <button className='next-button' type='submit' style={buttonNextOp} onClick={handleNextButtonPress} >NEXT</button>
      </div>

    </>

  );
}

export default Homepage;