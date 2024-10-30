import ContactCollection from '../db/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = 'name',
  sortOrder = SORT_ORDER[0],
  // filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const contactQuery = ContactCollection.find({ userId });
  // const contactQuery = ContactCollection.find();
  // if (filter.minReleaseYear) {
  //   contactQuery.where('releaseYear').gte(filter.minReleaseYear);
  // }
  // if (filter.maxReleaseYear) {
  //   contactQuery.where('releaseYear').lte(filter.maxReleaseYear);
  // }
  // if (filter.userId) {
  //   contactQuery.where('userId').eq(filter.userId);
  // }
  const data = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const count = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();
  const paginationData = calculatePaginationData({ count, perPage, page });
  return {
    data,
    page,
    perPage,
    // movies,
    totalItems: count,
    ...paginationData,
  };
};

export const getContact = (filter) => ContactCollection.findOne(filter);

export const createContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
