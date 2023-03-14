export default function getRandomRastaurant(list) {
  const restaurants = Object.keys(list);
  const index = Math.floor(Math.random() * restaurants.length);
  const name = restaurants[index];
  return list[name] ?? {};
}
