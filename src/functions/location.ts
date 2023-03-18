export const location = (array: string[]) => {
  switch (array.length) {
    case 1:
      return [['-100', '-100']];
    case 2:
      return [
        ['-100', '-100'],
        ['-100', '100']
      ];
    case 3:
      return [
        ['-100', '-100'],
        ['-100', '100'],
        ['100', '-100']
      ];
    case 4:
      return [
        ['-100', '-100'],
        ['-100', '100'],
        ['100', '-100'],
        ['100', '100']
      ];
  }
};
