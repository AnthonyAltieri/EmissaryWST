/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

const initialState = {
  isFillingInformation: false,
  visitors: [],
};

const Visitor = (state = initialState, action) => {
  switch (action.type) {
    case 'BACK_TO_CHECK_IN':
      return {
        ...state,
        isFillingOutInformation: false,
      };

    case 'CLICK_CHECK_IN':
      return {
        ...state,
        isFillingOutInformation: true,
      };
    case 'CHECK_IN_VISITOR':
      return {
        ...state,
        visitors: [
          ...state.visitors,
          action.visitor
        ],
      };
    case 'SET_VISITORS':
      return {
        ...state,
        visitors: action.visitors,
      };
    case 'LEAVE_CHECK_IN': return initialState;
    default:
      return state;
  }
}

export default Visitor
