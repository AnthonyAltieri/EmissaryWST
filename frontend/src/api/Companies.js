/**
 * @author Anthony Altieri on 6/10/17.
 */

import { get, post, put, del } from './http';

export const create = async (email, name, phoneNumber) => await post(
  `/companies`,
  {
    phone_number: phoneNumber,
    email,
    name,
  }
);

export const getById = async (companyId) => await get(`/companies/${companyId}`);

export const getAll = async () => await get(`/companies`);

export const deleteByCompanyId = async (companyId) => await del(`/companies/${companyId}`);

export const update = async (companyId, fields) => {
  const fieldKeys = Object.keys(fields);
  const findValueInField = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.indexOf(key) >= 0) return fields[key];
    }
  };
  const data = {
    email: findValueInField('email'),
    name: findValueInField('name'),
    phone_number: findValueInField('phone_number', 'phoneNumber'),
  };
  console.log("DATA", data)
  return await put(`/companies/${companyId}`, data);
};

export const resetCredentials = async (email) => await put(
  `/companies/setting/${email}`
);
