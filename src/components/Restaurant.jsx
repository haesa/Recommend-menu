import React from 'react';
import Button from './Button';

export default function Restaurant({ restaurant }) {
  const { title, img, link, address } = restaurant;
  const handleClick = () => window.open(link);
  return (
    <div>
      <img src={img} alt={title} />
      <p>{title}</p>
      <Button text="자세히 보기" handleClick={handleClick} />
    </div>
  );
}
