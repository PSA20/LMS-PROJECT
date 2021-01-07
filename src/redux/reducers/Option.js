import * as opt from "../types/OptionTypes";

export const options = (
  state = {
    score: 0,
    time: 0,
    color: "white",
  },
  action
) => {
  switch (action.type) {
    case opt.CHANGE_COLOR:
      return { ...state, color: action.payload };
    case opt.CHANGE_SCORE:
      return { ...state, score: action.payload };
    case opt.CHANGE_TIME:
      return { ...state, time: action.payload };
    default:
      return state;
  }
};
