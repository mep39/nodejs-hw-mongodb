import ContactCollection from '../db/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const movieQuery = ContactCollection.find();
  if (filter.minReleaseYear) {
    movieQuery.where('releaseYear').gte(filter.minReleaseYear);
  }
  if (filter.maxReleaseYear) {
    movieQuery.where('releaseYear').lte(filter.maxReleaseYear);
  }
  if (filter.userId) {
    movieQuery.where('userId').eq(filter.userId);
  }
  const movies = await movieQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const count = await ContactCollection.find()
    .merge(movieQuery)
    .countDocuments();
  const paginationData = calculatePaginationData({ count, perPage, page });
  return {
    page,
    perPage,
    movies,
    totalItems: count,
    ...paginationData,
  };
};

export const getContact = (filter) => ContactCollection.findById(filter);

export const createContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
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
