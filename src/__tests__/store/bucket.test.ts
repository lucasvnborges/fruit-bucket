import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import useBucketStore from "../../store/bucket.store";

const bucket_mock: Bucket = {
  id: "1",
  total: 0,
  fruitCapacity: 3,
  fruits: [],
};

const fruit_mock: Fruit = {
  id: "1",
  name: "Uva",
  price: 4.5,
};

describe("Gerenciamento de estado dos buckets", () => {
  afterEach(() => {
    const { result } = renderHook(() => useBucketStore());
    const { resetStore } = result.current;
    act(() => resetStore());
  });

  test("Espera uma lista vazia", () => {
    const { result } = renderHook(() => useBucketStore());
    expect(result.current.buckets.length).toEqual(0);
  });

  test("Espera adicionar 1 bucket na lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket } = result.current;

    act(() => addBucket(bucket_mock));
    expect(result.current.buckets.length).toEqual(1);
  });

  test("Espera remover 1 bucket da lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, deleteBucket } = result.current;

    const find = () =>
      result.current.buckets.find((b) => b.id === bucket_mock.id);

    act(() => addBucket(bucket_mock));
    expect(find()).toBeTruthy();
    act(() => deleteBucket("1"));
    expect(find()).toBeFalsy();
  });

  test("Espera adicionar uma fruta na lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket } = result.current;

    act(() => addBucket(bucket_mock));
    act(() => addFruitToBucket(bucket_mock.id, fruit_mock));

    const bucket = result.current.buckets.find((b) => b.id === bucket_mock.id);
    const fruit = bucket?.fruits.find(f => f.id === fruit_mock.id)

    expect(bucket).toBeTruthy();
    expect(bucket).toBeTypeOf('object');
    expect(fruit).toBeTruthy();
  });
});
