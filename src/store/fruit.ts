import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FruitStore = {
  fruits: Fruit[];
  resetStore: () => void;
  addFruit: (fruit: Fruit) => void;
  deleteFruit: (fruitId: string) => void;
};

const useFruitStore = create<FruitStore>()(
  persist(
    (set) => ({
      fruits: [],

      resetStore: () =>
        set(() => ({
          fruits: [],
        })),

      addFruit: (fruit) =>
        set((state) => ({ fruits: [...state.fruits, fruit] })),

      deleteFruit: (fruitId) =>
        set((state) => ({
          fruits: state.fruits.filter((fruit) => fruit.id !== fruitId),
        })),
    }),
    {
      name: "fruit-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useFruitStore;
