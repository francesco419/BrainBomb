let aa: string;
let bb: string;

export const elementBackgroundHandler = (id: string, func: boolean = true) => {
  const doc = document.getElementById(id);
  if (doc) {
    if (func) {
      aa = doc.style.backgroundColor;
      bb = doc.style.borderColor;
      doc.style.borderColor = '#fff';
      doc.style.backgroundColor = '#ff0000';
      doc.style.transform = 'translate(-50%, -50%) translateY(-2px) scale(1.1)';
      doc.style.boxShadow = '0px 10px 20px 2px #00000040';
    } else {
      doc.style.borderColor = bb;
      doc.style.backgroundColor = aa;
      doc.style.transform = 'translate(-50%, -50%) scale(1)';
      doc.style.boxShadow = '0px 5px 10px 0px #00000080';
    }
  }
};
