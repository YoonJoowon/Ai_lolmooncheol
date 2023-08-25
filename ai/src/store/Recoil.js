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

export const promptDataState = atom({
  key: "promptDataState",
  default: {
    // 내정보
    myChamp: "",
    myCurrentGold: "",
    myLevel: "",
    myPosition: { x: "", y: "" },
    myHealth: "",
    // 아군 분쟁 상대 정보
    yourChamp: "",
    yourCurrentGold: "",
    yourLevel: "",
    yourPosition: { x: "", y: "" },
    yourHealth: "",
    // 내 팀 정보
    myTeamGold: "",
    myTeamLevel: "",
    // 상대 팀 정보
    enemyTeamGold: "",
    enemyTeamLevel: "",
  },
});
