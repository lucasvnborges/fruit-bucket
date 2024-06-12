import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BucketState {
  buckets: Bucket[];
  resetStore: () => void;
  addBucket: (bucket: Bucket) => void;
  deleteBucket: (bucketId: string) => void;
  addFruitToBucket: (bucketId: string, fruit: Fruit) => void;
  removeFruitFromBucket: (bucketId: string, fruitId: string) => void;
}

const useBucketStore = create<BucketState>()(
  persist(
    (set) => ({
      buckets: [],

      resetStore: () =>
        set(() => ({
          buckets: [],
        })),

      addBucket: (bucket: Bucket) =>
        set((state) => ({
          buckets: [...state.buckets, bucket],
        })),

      deleteBucket: (bucketId: string) =>
        set((state) => {
          const bucket = state.buckets.find((b) => b.id === bucketId);

          if (bucket && bucket.fruits.length > 0) {
            console.warn(`Buckets with fruits can not be excluded.`);
            return { buckets: state.buckets };
          }

          return {
            buckets: state.buckets.filter((b) => b.id !== bucketId),
          };
        }),

      addFruitToBucket: (bucketId, fruit) =>
        set((state) => {
          const updatedBuckets = state.buckets.map((bucket) => {
            if (bucket.id === bucketId) {
              if (bucket.fruits.length < bucket.fruitCapacity) {
                const updatedFruits = [...bucket.fruits, fruit];

                let totalPrice = updatedFruits.reduce(
                  (total, fruit) => total + fruit.price,
                  0
                );
                let occupation =
                  (updatedFruits.length / bucket.fruitCapacity) * 100;

                occupation = Number(occupation.toFixed(1));
                totalPrice = Number(totalPrice.toFixed(2));

                return {
                  ...bucket,
                  fruits: updatedFruits,
                  totalPrice,
                  occupation,
                };
              } else {
                console.warn(
                  `Bucket ${bucketId} is full! Cannot add more fruits.`
                );
                return bucket;
              }
            } else {
              return bucket;
            }
          });

          return { buckets: updatedBuckets };
        }),

      removeFruitFromBucket: (bucketId: string, fruitId: string) =>
        set((state) => ({
          buckets: state.buckets.map((bucket) => {
            const updatedFruits = bucket.fruits.filter(
              (fruit) => fruit.id !== fruitId
            );
            return bucket.id === bucketId
              ? {
                  ...bucket,
                  fruits: bucket.fruits.filter((fruit) => fruit.id !== fruitId),
                  occupation: Number(
                    (
                      (updatedFruits.length / bucket.fruitCapacity) *
                      100
                    ).toFixed(1)
                  ),
                  totalPrice: bucket.fruits
                    .filter((fruit) => fruit.id !== fruitId)
                    .reduce((total, fruit) => total + fruit.price, 0),
                }
              : bucket;
          }),
        })),
    }),
    {
      name: "bucket-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useBucketStore;