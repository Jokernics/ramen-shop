import React from 'react';

const RamenItem = (props) => {
  const {imgURL, name, description, price, weight} = props.ramen

  return (
    <div className='menu__item'>
      <img src={imgURL} alt="картинка" />
      <h2 className='title'>{name}</h2>
      <p className='description'>{description}</p>
      <p className='price'>{price}</p>
      <p className='weight'>{weight}</p>
      <button className='buy__button'>купить</button>
      
    </div>
  );
}

export default RamenItem;
