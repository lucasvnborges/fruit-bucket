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
            if (bucket.id !== bucketId) return bucket;
            if (bucket.fruits.length === bucket.fruitCapacity) {
              console.warn(
                `Bucket ${bucketId} is full! Cannot add more fruits.`
              );
              return bucket;
            }

            const updatedFruits = [...bucket.fruits, fruit];
            const totalPrice = updatedFruits
              .reduce((total, { price }) => total + price, 0)
              .toFixed(2);
            const occupation = (
              (updatedFruits.length / bucket.fruitCapacity) *
              100
            ).toFixed(1);

            return {
              ...bucket,
              fruits: updatedFruits,
              totalPrice: Number(totalPrice),
              occupation: Number(occupation),
            };
          });

          return { buckets: updatedBuckets };
        }),

      removeFruitFromBucket: (bucketId: string, fruitId: string) =>
        set((state) => ({
          buckets: state.buckets.map((bucket) => {
            if (bucket.id !== bucketId) return bucket;

            const updatedFruits = bucket.fruits.filter(
              (fruit) => fruit.id !== fruitId
            );
            const occupation = (
              (updatedFruits.length / bucket.fruitCapacity) *
              100
            ).toFixed(1);
            const totalPrice = updatedFruits
              .reduce((total, { price }) => total + price, 0)
              .toFixed(2);

            return {
              ...bucket,
              fruits: updatedFruits,
              occupation: Number(occupation),
              totalPrice: Number(totalPrice),
            };
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
