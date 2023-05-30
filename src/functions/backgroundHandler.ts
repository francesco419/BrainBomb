export const elementBackgroundHandler = (id: string, func: boolean = true) => {
  const doc = document.getElementById(id);
  if (func) {
    if (doc) {
      doc.style.borderColor = '#fff';
      doc.style.backgroundColor = '#ff0000';
    }
  } else {
    if (doc) {
      doc.style.borderColor = '#000';
      doc.style.backgroundColor = '#456788';
    }
  }
};
