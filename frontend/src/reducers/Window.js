/**
 * @author Anthony Altieri on 6/4/17.
 */

const initialState = {
  width: -1,
  height: -1,
  mode: null,
};
import { displayMode } from '../dimens';

const Window = (state = initialState, action) => {
  switch (action.type) {

    case 'WINDOW_RESIZE': {
      const oldMode = state.mode;
      const newMode = displayMode(action.width);
      if (oldMode !== newMode) {
        return {
          ...state,
          width: action.width,
          height: action.height,
          mode: newMode
        }
      }
      return {
        ...state,
        width: action.width,
        height: action.height,
      }
    }

    default: {
      return state;
    }
  }
};

export default Window;
