import { Contact } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  if (page > Math.ceil(contactsCount / perPage)) {
    return {
      data: [],
      ...paginationData,
      reason: 'No contacts found for the requested page.',
    };
  }

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const addContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = async (contactId, contactData, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    {
      new: true,
      runValidators: true,
    },
  );
};
