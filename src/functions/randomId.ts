export const randomID = () => {
  var fourChars = function () {
    return (((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1)
      .toUpperCase();
  };
  return (
    fourChars() +
    fourChars() +
    '-' +
    fourChars() +
    '-' +
    fourChars() +
    '-' +
    fourChars() +
    '-' +
    fourChars() +
    fourChars() +
    fourChars()
  );
};
