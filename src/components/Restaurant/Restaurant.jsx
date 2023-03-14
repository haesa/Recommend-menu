import React from 'react';
import Button from '../Button/Button';
import styles from './Restaurant.module.css';

export default function Restaurant({ restaurant }) {
  const { title, img, link, address } = restaurant;
  const handleClick = () => window.open(link);

  return (
    <section className={styles.container}>
      <img className={styles.image} src={img} alt={title} />
      <p className={styles.title}>{title}</p>
      <Button text="자세히 보기" handleClick={handleClick} />
    </section>
  );
}
