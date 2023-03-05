import { useEffect, useState } from 'react';
import './App.css';
import Category from './components/Category';
import Restaurant from './components/Restaurant';
import DropBox from './DropBox';
import getRandomRastaurant from './service/Random';
import useFilter from './service/use-filter';

const univs = ['숙명여자대학교', '중앙대학교', '홍익대학교'];

function App() {
  const [filter, setFilter] = useState('한');
  const [univ, setUniv] = useState('숙명여대');
  const [loading, list] = useFilter(univ, filter);
  const [restaurant, setRestaurant] = useState({});
  const handleFilter = (current) => setFilter(current);

  useEffect(() => {
    loading === false && setRestaurant(getRandomRastaurant(list));
  }, [list]);

  return (
    <>
      <DropBox univs={univs} />
      <Category handleFilter={handleFilter} />
      {loading ? <p>Loading...</p> : <Restaurant restaurant={restaurant} />}
    </>
  );
}

export default App;

// 1. DB에서 필터에 맞게 데이터 가져오기 (OK!)
// 2. 랜덤 추첨 기능 (OK!)
