import { atom, selector } from "recoil";

export const inputValueState = atom({
  key: "inputValueState",
  default: "",
});

export const nickNameInputState = atom({
  key: "nickNameInputState",
  default: "",
});

export const StartAskingNextState = atom({
  key: "StartAskingNextState",
  default: false,
});

export const searchInputSelector = selector({
  key: "searchInputSelector",
  get: ({ get }) => get(inputValueState),
  set: ({ set }, newValue) => set(inputValueState, newValue),
});

export const showCheckAnswerState = atom({
  key: "showCheckAnswerState",
  default: false,
});

export const conversationState = atom({
  key: "conversationState",
  default: "",
});

export const matchDataState = atom({
  key: "matchDataState",
  default: { matchDetails: [] },
});

export const lolTeamMemberDataState = atom({
  key: "lolTeamMemberDataState",
  default: { teamMembers: [] },
});

export const matchTimelineDataState = atom({
  key: "matchTimelineDataState",
  default: {
    myPuuId: {},
    yourPuuId: {},
    matchId: {},
    specificTime: {},
  },
});

export const timeState = atom({
  key: "timeState",
  default: {
    minute: 0,
    second: 0,
  },
});
