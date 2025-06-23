const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const isValidType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isValidType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
