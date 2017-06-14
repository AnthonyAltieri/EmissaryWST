/**
 * @author Anthony Altieri on 6/10/17.
 */

export let validatePhoneNumber = phoneNumber => {
  let pruned = phoneNumber
    .toString()
    .replace('(', '')
    .replace(')', '')
    .replace('.', '')
    .replace(' ', '')
    .replace('-', '');
  return /[0-9]{10}/.test(+pruned)
};
