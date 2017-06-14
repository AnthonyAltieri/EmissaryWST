/**
 * @author Anthony Altieri on 6/10/17.
 */

import { post, get, del } from './http';

export const create = async (
  companyId,
  firstName,
  lastName,
  phoneNumber,
  checkinTime,
  additionalInfo,
) => await post(
  '/visitors',
  {
    company_id: companyId,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    checkin_time: checkinTime,
    additional_info: additionalInfo,
  }
);

export const getAllByCompanyId = async (companyId) => await get(
  `/visitors/company/${companyId}`, { company_id: companyId }
);

export const del = async (companyId, visitorId) => await del(
  `company/${companyId}/visitor/${visitorId}`
);

export const delByVisitorListId = async (visitorListId) => await del(
  `/visitors/${visitorListId}`
);

