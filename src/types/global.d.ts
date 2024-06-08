interface Fruit {
  id: string;
  name: string;
  price: number;
}

interface Bucket {
  id: string;
  fruits: Fruit[];
  occupation: number;
  totalPrice: number;
  fruitCapacity: number;
}
