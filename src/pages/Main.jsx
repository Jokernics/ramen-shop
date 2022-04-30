import React from 'react';
import Header from '../components/Header';
import RamenList from '../components/RamenList';
import Footer from './Footer';

const Main = () => {
  return (
    <div className='main__wrapper'>
      <Header/>
      <RamenList />
      <Footer/>
    </div>
  );
}

export default Main;
