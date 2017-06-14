/**
 * @author Anthony Altieri on 6/10/17.
 */

import { get, put, post, del } from './http';


export const create = async (
  firstName,
  lastName,
  phoneNumber,
  date,
  companyId,
  providerName
) => await post(
  `/appointments/`,
  {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    company_id: companyId,
    provider_name: providerName,
    date,
  }
);

export const getById = async (appointmentId) => await get(
  `/appointments/${appointmentId}`
);

export const getAllByCompanyId = async (companyId) => {
  const payload = await get(`/appointments/company/${companyId}`);
  if (payload.error)
    return payload

  const appointments = []

  payload.map((a) => {

    let appointment = {
      firstName: a.first_name,
      lastName: a.last_name,
      phoneNumber: a.phone_number,
      date: a.date
    }
    appointments.push(appointment)
  })

  return appointments
}

export const deleteByAppointmentId = async (appointmentId) => await del(
  `/appointments/${appointmentId}`
);

export const update = async (appointmentId, fields) => {
  // Get the keys in fields (the fields that should be updated)
  const fieldKeys = Object.keys(fields);
  // Helper function to find the value of a key if it exists
  const findVlaueInFields = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.find(key)[0]) return fields[key];
    }
  };
  const data = {
    first_name: findVlaueInFields('first_name', 'firstName'),
    last_name: findVlaueInFields('last_name', 'lastName'),
    phone_number: findVlaueInFields('phone_number', 'phoneNumber'),
    date: findVlaueInFields('date'),
    provider_name: findVlaueInFields('provider_name', 'providerName')
  };
  return await put(`/appointments/${appointmentId}`, data)
};

