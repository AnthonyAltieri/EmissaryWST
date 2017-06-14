/**
 * @author Anthony Altieri on 6/10/17.
 */

const initialState = {
  list: [],
};

const Appointments = (state = initialState, action) => {
  switch(action.type) {

    case 'APPOINTMENTS_SET':
      return { ...state, list: action.appointments };




    default:
      return state;
  }
};

export default Appointments;