import './App.css';
import Button from './components/Button';
import Restaurant from './components/Restaurant';
import DropBox from './DropBox';
import getRandomInt from './service/Random';

const univs = ['숙명여자대학교', '중앙대학교', '홍익대학교'];
const filters = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식 및 김밥',
  '치킨',
  '패스트푸트 및 간편식',
  '그 외 기타',
];
const restaurants = [
  '고수찜닭',
  '고씨네 숙명여대점',
  '또와또',
  '베스트프렌드',
  '네코노스시',
  '무모한초밥',
  '민중의파스타',
  '버거인',
  '베나레스 숙대점',
  '숙대소반',
  '사이공마켓',
  '어바웃샤브 숙명여대점',
  '오복함흥냉면',
  '지랄닭발 숙대점',
  '파스타를부탁해 숙대점',
];

const number = getRandomInt(restaurants.length);
const restaurant = restaurants[number];

function App() {
  return (
    <>
      <DropBox univs={univs} />
      <div>
        {filters.map((filter, index) => (
          <Button key={index} filter={filter} />
        ))}
      </div>
      <Restaurant restaurant={restaurant} />
    </>
  );
}

export default App;

// 1. DB에서 필터에 맞게 데이터 가져오기
// 2. 랜덤 추첨 기능 (OK!)
