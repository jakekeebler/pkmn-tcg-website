import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import pokemon from 'pokemontcgsdk';

var pageN = 1;
const token = '0df16f92-c92c-4a6b-b91f-07b8e1ae60c1';
// const callAPI = `https://api.pokemontcg.io/v2/cards?q=name:clefairy&pageSize=30&orderBy=-set.releaseDate`;
// const callAPIsearch = `https://api.pokemontcg.io/v2/cards?pageSize=30&orderBy=-set.releaseDate&q=name:`;


const Homepage = () => {

  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPage, setNextPage] = useState([]);
  const [prevPage, setPrevPage] = useState([]);

  useEffect(() => {

    pageN = 1;
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:clefairy`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate' })
    .then(res => {console.log(res); setCards(res.data)});

  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    pageN = 1;
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:${searchTerm}`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate' })
    .then(res => {console.log(res); setCards(res.data)});

    // axios.get(callAPIsearch + searchTerm, { headers: { 'X-Api-Key': token } })
    // .then(res => { console.log(res); setCards(res.data.data); })
    // .catch((error) => { console.log('error -' + error)});

    // setSearchTerm('');

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleNextButtonPress = (e) => {
    e.preventDefault();

    pageN++;
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:${searchTerm}`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate' })
    .then(res => {console.log(res); setCards(res.data)});


  }

  const handlePrevButtonPress = (e) => {
    e.preventDefault();

    pageN--;
    pokemon.configure({apiKey: token})
    pokemon.card.where({ q: `name:${searchTerm}`, pageSize: 30, page: pageN, orderBy: '-set.releaseDate' })
    .then(res => {console.log(res); setCards(res.data)});


  }

  

  // useEffect( () => {
  //   fetch(callAPI)
  //   .then(res => res.json())
  //   .then(data => {
  //   console.log(data.data);
  //   setCards(data.data);
  //   });

  // }, []);


  return (
    <>

      <form onSubmit={handleOnSubmit} >
        <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
      </form>

      <div className='card-container'>
        {cards.map(card => (<Card key={card.id} {...card} />))}
      </div>

      <div className='button-container'>
        <button className='previous-button' type='submit' onClick={handlePrevButtonPress} >PREV</button>
        <button className='next-button' type='submit' onClick={handleNextButtonPress} >NEXT</button>
      </div>

    </>

  );
}

export default Homepage;