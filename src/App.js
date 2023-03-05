import { useEffect, useState } from 'react';
import './App.css';
import Category from './components/Category';
import Restaurant from './components/Restaurant';
import DropBox from './DropBox';
import getRandomRastaurant from './service/Random';
import useFilter from './service/use-filter';

const initial = {
  filter: localStorage.getItem('filter') ?? '한',
  univ: localStorage.getItem('univ') ?? '숙명여대',
};

function App() {
  const [filter, setFilter] = useState(initial.filter);
  const [univ, setUniv] = useState(initial.univ);
  const [loading, list] = useFilter(univ, filter);
  const [restaurant, setRestaurant] = useState({});
  const handleFilter = (current) => setFilter(current);
  const handleUniv = (current) => setUniv(current);

  useEffect(() => {
    localStorage.setItem('filter', filter);
    localStorage.setItem('univ', univ);
  }, [filter, univ]);

  useEffect(() => {
    loading === false && setRestaurant(getRandomRastaurant(list));
  }, [list]);

  return (
    <>
      <DropBox univ={univ} handleUniv={handleUniv} />
      <Category handleFilter={handleFilter} />
      {loading ? <p>Loading...</p> : <Restaurant restaurant={restaurant} />}
    </>
  );
}

export default App;
