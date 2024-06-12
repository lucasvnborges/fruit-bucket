import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { useFruitStore } from "../../store";
import { fruit_mock } from "../../mocks";

describe("Gerenciamento de estado das frutas", () => {
  afterEach(() => {
    const { result } = renderHook(() => useFruitStore());
    const { resetStore } = result.current;
    act(() => resetStore());
  });

  test("Espera uma lista vazia", () => {
    const { result } = renderHook(() => useFruitStore());
    expect(result.current.fruits.length).toEqual(0);
  });

  test("Espera adicionar uma fruta na lista", () => {
    const { result } = renderHook(() => useFruitStore());
    const { addFruit } = result.current;

    act(() => addFruit(fruit_mock));
    expect(result.current.fruits.length).toEqual(1);
  });

  test("Espera remover uma fruta da lista", () => {
    const { result } = renderHook(() => useFruitStore());
    const { addFruit, deleteFruit } = result.current;

    const fruit = () =>
      result.current.fruits.find((b) => b.id === fruit_mock.id);

    act(() => addFruit(fruit_mock));
    expect(fruit()).toBeTruthy();

    act(() => deleteFruit("1"));
    expect(fruit()).toBeFalsy();
  });
});
