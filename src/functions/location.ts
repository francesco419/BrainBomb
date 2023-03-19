export const locationMap = (array: string[]) => {
  switch (array.length) {
    case 1:
      return [['-10', '-100']];
    case 2:
      return [
        ['-10', '-100'],
        ['-10', '70']
      ];
    case 3:
      return [
        ['-10', '-100'],
        ['-10', '70'],
        ['-90', '-10']
      ];
    case 4:
      return [
        ['-10', '-120'],
        ['-10', '90'],
        ['90', '-10'],
        ['-110', '-10']
      ];
  }
};
