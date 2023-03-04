import { useEffect, useState } from 'react';

export default function useFilter(univ, filter) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://recommend-menu-default-rtdb.firebaseio.com/${univ}.json?orderBy="category"&equalTo="${filter}"&print=pretty`)
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [univ, filter]);
  
  return [loading, list];
}

