import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Restaurant from './components/Restaurant';
import DropBox from './DropBox';
import useFilter from './service/use-filter';

const univs = ['숙명여자대학교', '중앙대학교', '홍익대학교'];
const filters = ['한식', '중식', '일식', '분식 및 김밥', '치킨', '패스트푸드 및 간편식', '그 외 기타'];

function App() {
  const [filter, setFilter] = useState('한');
  const [univ, setUniv] = useState('숙명여대');
  const [loading, list] = useFilter(univ, filter);
  const handleFilter = (current) => setFilter(current);
  const category = ['한', '중', '일', '분식 및 김밥 전문', '치킨 전문', '서양', '그외 기타', '피자, 햄버거, 샌드위치 및 유사'];
  const restaurant = 'hahaha';

  console.log(list);
  
  return (
    <>
      <DropBox univs={univs} />
      <div>
        {filters.map((filter, index) => (
          <Button key={index} filter={filter} onClick={handleFilter} />
        ))}
      </div>
      {loading ? <p>Loading...</p> : <Restaurant restaurant={restaurant} />}
    </>
  );
}

export default App;

// 1. DB에서 필터에 맞게 데이터 가져오기 (OK!)
// 2. 랜덤 추첨 기능 (OK!)
