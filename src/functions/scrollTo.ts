export const toLocate = (id: string) => {
  const location = document.getElementById(id);
  if (id === 'contact') {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
    return;
  }

  if (location) {
    window.scrollTo({
      left: 0,
      top: location.offsetTop - 100,
      behavior: 'smooth'
    });
  }
};
