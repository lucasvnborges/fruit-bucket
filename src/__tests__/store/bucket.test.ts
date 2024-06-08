import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import useBucketStore from "../../store/bucket.store";
import { bucket_mock, fruit_mock } from "../../__mocks__";

describe("Gerenciamento de estado dos baldes", () => {
  afterEach(() => {
    const { result } = renderHook(() => useBucketStore());
    const { resetStore } = result.current;
    act(() => resetStore());
  });

  test("Espera uma lista vazia", () => {
    const { result } = renderHook(() => useBucketStore());
    expect(result.current.buckets.length).toEqual(0);
  });

  test("Espera adicionar um balde na lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket } = result.current;

    act(() => addBucket(bucket_mock));
    expect(result.current.buckets.length).toEqual(1);
  });

  test("Espera remover um balde da lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, deleteBucket } = result.current;

    const bucket = () =>
      result.current.buckets.find((b) => b.id === bucket_mock.id);

    act(() => addBucket(bucket_mock));
    expect(bucket()).toBeTruthy();

    act(() => deleteBucket("1"));
    expect(bucket()).toBeFalsy();
  });

  test("Espera impedir a remoção de um balde caso exista uma fruta na lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket, deleteBucket } = result.current;

    const bucket = () =>
      result.current.buckets.find((b) => b.id === bucket_mock.id);

    act(() => addBucket(bucket_mock));
    expect(bucket()).toBeTruthy();

    act(() => addFruitToBucket(bucket_mock.id, fruit_mock));
    const fruit = bucket()?.fruits.find((f) => f.id === fruit_mock.id);
    expect(fruit).toBeTruthy();

    act(() => deleteBucket("1"));

    expect(bucket()).toBeTruthy();
  });

  test("Espera adicionar uma fruta na lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket } = result.current;

    act(() => addBucket(bucket_mock));
    act(() => addFruitToBucket(bucket_mock.id, fruit_mock));

    const bucket = result.current.buckets.find((b) => b.id === bucket_mock.id);
    expect(bucket).toBeTruthy();
    expect(bucket).toBeTypeOf("object");

    const fruit = bucket?.fruits.find((f) => f.id === fruit_mock.id);
    expect(fruit).toBeTruthy();
  });

  test("Espera adicionar frutas até o limite do balde", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket } = result.current;

    act(() => addBucket(bucket_mock));

    for (let i = 0; i <= bucket_mock.fruitCapacity; i++) {
      act(() =>
        addFruitToBucket(bucket_mock.id, { ...fruit_mock, id: `${i}` })
      );
    }

    const bucket = result.current.buckets.find((b) => b.id === bucket_mock.id);
    expect(bucket?.fruits.length).toBe(bucket_mock.fruitCapacity);
  });

  test("Espera calcular corretamente o preenchimento do balde", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket } = result.current;

    act(() => addBucket(bucket_mock));

    const bucket = () =>
      result.current.buckets.find((b) => b.id === bucket_mock.id);

    const fruits = [
      fruit_mock,
      { ...fruit_mock, id: "2" },
      { ...fruit_mock, id: "3" },
    ];
    const occupations = [33.3, 66.7, 100];

    fruits.forEach((fruit, index) => {
      act(() => addFruitToBucket(bucket_mock.id, fruit));
      expect(bucket()?.occupation).toBe(occupations[index]);
    });
  });

  test("Espera calcular corretamente o preço total das frutas", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket } = result.current;

    act(() => addBucket(bucket_mock));

    const fruits = [
      fruit_mock,
      { ...fruit_mock, id: "2" },
      { ...fruit_mock, id: "3" },
    ];

    fruits.forEach((fruit) => {
      act(() => addFruitToBucket(bucket_mock.id, fruit));
    });

    const bucket = result.current.buckets.find((b) => b.id === bucket_mock.id);
    expect(bucket?.totalPrice).toBe(13.5);
  });

  test("Espera remover uma fruta da lista", () => {
    const { result } = renderHook(() => useBucketStore());
    const { addBucket, addFruitToBucket, removeFruitFromBucket } =
      result.current;

    const bucket = () =>
      result.current.buckets.find((b) => b.id === bucket_mock.id);
    const fruit = () => bucket()?.fruits.find((f) => f.id === fruit_mock.id);

    act(() => addBucket(bucket_mock));
    act(() => addFruitToBucket(bucket_mock.id, fruit_mock));

    expect(bucket()).toBeTruthy();
    expect(bucket()).toBeTypeOf("object");
    expect(fruit()).toBeTruthy();

    act(() => removeFruitFromBucket(bucket_mock.id, fruit_mock.id));
    expect(fruit()).toBeFalsy();
  });
});
