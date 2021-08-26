export const upperCaseFirstLetter = (str: string): string => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};