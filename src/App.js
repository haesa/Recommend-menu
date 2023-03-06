import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Filter from './components/Filter/Filter';
import Restaurant from './components/Restaurant/Restaurant';
import getRandomRastaurant from './service/Random';

function App() {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(undefined);
  const [restaurant, setRestaurant] = useState({});

  const filtering = ({ university, groups }) => {
    const filters = groups.filter((group) => group.select);
    setLoading(true);
    setList({});

    filters.forEach((filter) => {
      fetch(
        `https://recommend-menu-default-rtdb.firebaseio.com/${university.filter}.json?orderBy="category"&equalTo="${filter.filter}"&print=pretty`,
      )
        .then((response) => response.json())
        .then((data) => setList((prev) => ({ ...prev, ...data })))
        .catch((error) => console.log(error))
        .finally(
          () => filter === filters[filters.length - 1] && setLoading(false),
        );
    });
  };

  useEffect(() => {
    if (loading === false) setRestaurant(getRandomRastaurant(list));
  }, [list]);

  return (
    <>
      <h1 className={styles.title}>Recommend Menu</h1>
      <Filter filtering={filtering} />
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        Object.keys(restaurant).length !== 0 && (
          <Restaurant restaurant={restaurant} />
        )
      )}
    </>
  );
}

export default App;
