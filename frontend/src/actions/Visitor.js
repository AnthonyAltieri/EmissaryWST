/**
 * @author Anthony Altieri on 6/4/17.
 */

export const leaveCheckIn = () => ({
  type: 'LEAVE_CHECK_IN',
});
export const clickCheckIn = () => ({
  type: 'CLICK_CHECK_IN',
});
export const clickBack = () => ({
  type: 'BACK_TO_CHECK_IN',
});

export const setVisitors = (visitors) => ({
  type: 'SET_VISITORS',
  visitors,
});

export const checkInVisitor = (companyId, firstName, lastName, phoneNumber, checkinTime, additionalInfo) => ({
  type: 'CHECK_IN_VISITOR',
  visitor: {
    companyId,
    firstName,
    lastName,
    phoneNumber,
    checkinTime,
    additionalInfo,
  },
});
