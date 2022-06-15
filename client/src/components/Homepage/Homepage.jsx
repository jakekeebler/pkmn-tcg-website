import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';

const token = '0df16f92-c92c-4a6b-b91f-07b8e1ae60c1';
const callAPI = `https://api.pokemontcg.io/v2/cards?q=name:clefairy&pageSize=30&orderBy=-set.releaseDate`;
const callAPIsearch = `https://api.pokemontcg.io/v2/cards?pageSize=30&orderBy=-set.releaseDate&q=name:`;


const Homepage = () => {

  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextPage, setNextPage] = useState([]);
  const [prevPage, setPrevPage] = useState([]);

  useEffect(() => {


    axios.get(callAPI, { headers: { 'X-Api-Key': token } })
      .then(res => { console.log(res); setCards(res.data.data) })
      .catch((error) => { console.log('error -' + error) });

    
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();


    axios.get(callAPIsearch + searchTerm, { headers: { 'X-Api-Key': token } })
    .then(res => { console.log(res); setCards(res.data.data); })
    .catch((error) => { console.log('error -' + error)});

    setSearchTerm('');

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleNextButtonPress = (e) => {
    e.preventDefault();

    axios.get(callAPIsearch + searchTerm, { headers: { 'X-Api-Key': token } })
    .then(res => { console.log(res); setCards(res.data.data); setNextPage(res.data.data) })
    .catch((error) => { console.log('error -' + error)});

  }

  const handlePrevButtonPress = (e) => {
    e.preventDefault();

    axios.get(callAPIsearch + searchTerm, { headers: { 'X-Api-Key': token } })
    .then(res => { console.log(res); setCards(res.data.data); })
    .catch((error) => { console.log('error -' + error)});


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