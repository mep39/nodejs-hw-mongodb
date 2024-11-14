import { parseContactType, parseIsFavorite } from './parseNumber.js';

export const parseTypeFilterParams = ({ type }) => {
  const isType = parseContactType(type);
  return isType;
};

export const parseIsFavoriteParams = (value) => {
  const isFavorite = parseIsFavorite(value);
  return isFavorite;
};

export const parseContactsFilterParams = (query = {}) => {
  const { contactType, isFavorite } = query;

  const parsedType = parseContactType(contactType);
  const parsedIsFavorite = parseIsFavorite(isFavorite);

  const filter = {};

  if (parsedType) filter.contactType = parsedType;
  if (parsedIsFavorite !== undefined) {
    filter.isFavorite = parsedIsFavorite;
  }

  return filter;
};
