import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Restaurant from './components/Restaurant';
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
        `https://recommend-menu-default-rtdb.firebaseio.com/${university}.json?orderBy="category"&equalTo="${filter.text}"&print=pretty`,
      )
        .then((response) => response.json())
        .then((data) => setList((prev) => ({ ...prev, ...data })))
        .catch((error) => console.log(error))
        .finally(
          () => filter === filters[filters.length - 1] && setLoading(false),
        );
    });
  };

  loading === false && console.log(list);

  useEffect(() => setRestaurant(getRandomRastaurant(list)), [list]);

  console.log(restaurant);

  return (
    <>
      <Filter filtering={filtering} />
      {/* {filters === [] && <p>필터를 선택하세요</p>} */}
      {loading ? <p>Loading...</p> : <Restaurant restaurant={restaurant} />}
    </>
  );
}

export default App;
