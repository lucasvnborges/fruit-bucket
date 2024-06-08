import { create } from "zustand";

interface BucketState {
  buckets: Bucket[];
  addBucket: (bucket: Bucket) => void;
  deleteBucket: (bucketId: string) => void;
  resetStore: () => void;
  addFruitToBucket: (bucketId: string, fruit: Fruit) => void;
  removeFruitFromBucket: (bucketId: string, fruitId: string) => void;
}

const useBucketStore = create<BucketState>((set) => ({
  buckets: [],

  addBucket: (bucket: Bucket) =>
    set((state) => ({
      buckets: [...state.buckets, bucket],
    })),

  deleteBucket: (bucketId: string) =>
    set((state) => {
      const bucket = state.buckets.find((b) => b.id === bucketId);

      if (bucket && bucket.fruits.length > 0) {
        return { buckets: state.buckets };
      }

      return {
        buckets: state.buckets.filter((b) => b.id !== bucketId),
      };
    }),

  addFruitToBucket: (bucketId, fruit) =>
    set((state) => ({
      buckets: state.buckets.map((bucket) => {
        if (bucket.id === bucketId) {
          if (bucket.fruits.length < bucket.fruitCapacity) {
            return { ...bucket, fruits: [...bucket.fruits, fruit] };
          } else {
            console.warn(`Bucket ${bucketId} is full! Cannot add more fruits.`);
            return bucket;
          }
        } else {
          return bucket;
        }
      }),
    })),

  removeFruitFromBucket: (bucketId: string, fruitId: string) =>
    set((state) => ({
      buckets: state.buckets.map((bucket) =>
        bucket.id === bucketId
          ? {
              ...bucket,
              fruits: bucket.fruits.filter((fruit) => fruit.id !== fruitId),
            }
          : bucket
      ),
    })),
  resetStore: () =>
    set(() => ({
      buckets: [],
    })),
}));

export default useBucketStore;
