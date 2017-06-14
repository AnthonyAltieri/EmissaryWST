/**
 * @author Anthony Altieri on 6/4/17.
 */

const Overlay = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_OVERLAY':
      return {
        ...state,
        mode: action.mode,
        isVisible: true,
      };

    case 'HIDE_OVERLAY':
      return {
        ...state,
        isVisible: false,
        mode: null,
      };





    default:
      return state;
  }
};

export default Overlay;
