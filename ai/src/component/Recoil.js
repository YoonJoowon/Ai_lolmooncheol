import { atom, selector, useRecoilState } from "recoil";

export const inputValueState = atom({
  key: "inputValueState",
  default: "",
});

export const searchInputSelector = selector({
  key: "searchInputSelector",
  get: ({ get }) => get(inputValueState),
  set: ({ set }, newValue) => set(inputValueState, newValue),
});

export const checkAiAnswer = atom({
  key: "checkAiAnswer",
  default: "",
});

export const checkAiAnswerSelector = selector({
  key: "checkAiAnswerSelector",
  get: ({ get }) => get(checkAiAnswer),
});
