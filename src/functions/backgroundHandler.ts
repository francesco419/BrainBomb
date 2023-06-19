export const elementBackgroundHandler = (id: string, func: boolean = true) => {
  const doc = document.getElementById(id);
  if (doc) {
    if (func) {
      doc.classList.add('listHover');
    } else {
      doc.classList.remove('listHover');
    }
  }
};
