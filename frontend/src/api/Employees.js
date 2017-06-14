/**
 * @author Anthony Altieri on 6/10/17.
 */

import { post, get, put, del } from './http';

export const create = async (
  firstName,
  lastName,
  password,
  email,
  phoneNumber,
  companyId,
  companyName,
  role
) => await post(
  '/employees',
  {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    company_id: companyId,
    company_name: companyName,
    password,
    role,
    email,
  }
);

export const getAllByCompanyId = async (companyId) => await post(
  `/employees/company/${companyId}`,
);

export const getByEmployeeId = async (employeeId) => await post(
  `/employees/${employeeId}`
);

export const deleteByEmployeeId = async (employeeId) => await post(
  `/employees/${employeeId}`
);

export const update = async (employeeId, fields) => {
  // Get the keys in fields (the fields that should be updated)
  const fieldKeys = Object.keys(fields);
  // Helper function to find the value of a key if it exists
  const findVlaueInFields = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.find(key)[0]) return fields[key];
    }
  };
  // Try to find all of the values that could be updated with this api call
  const data = {
    first_name: findVlaueInFields('first_name', 'firstName'),
    last_name: findVlaueInFields('last_name', 'lastName'),
    email: findVlaueInFields('email'),
    phone_number: findVlaueInFields('phone_number', 'phoneNumber'),
    password: findVlaueInFields('password'),
    role: findVlaueInFields('role')
  };
  return await put(`/employees/${employeeId}`, data)
};

export const login = async (email, password) => await post(
  `/employees/login`, { email, password }
);






