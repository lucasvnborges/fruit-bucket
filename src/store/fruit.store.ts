import { create } from "zustand";

type FruitStore = {
  fruits: Fruit[];
  resetStore: () => void;
  addFruit: (fruit: Fruit) => void;
  deleteFruit: (fruitId: string) => void;
};

const useFruitStore = create<FruitStore>((set) => ({
  fruits: [],

  resetStore: () =>
    set(() => ({
      fruits: [],
    })),

  addFruit: (fruit) => set((state) => ({ fruits: [...state.fruits, fruit] })),

  deleteFruit: (fruitId) =>
    set((state) => ({
      fruits: state.fruits.filter((fruit) => fruit.id !== fruitId),
    })),
}));

export default useFruitStore;
