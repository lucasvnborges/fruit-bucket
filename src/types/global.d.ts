interface Fruit {
  id: string;
  name: string;
  price: number;
}

interface Bucket {
  id: string;
  total: number;
  fruitCapacity: number;
  fruits: Fruit[];
}
