import * as ActionTypes from "../types/OptionTypes";

export const changeColor = (color) => ({
    type: ActionTypes.CHANGE_COLOR,
    payload: color
});