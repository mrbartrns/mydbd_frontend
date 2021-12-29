function setAutoHeight(e) {
  e.preventDefault();
  e.target.style.height = "inherit";
  e.target.style.height = `${e.target.scrollHeight}px`;
}

export default setAutoHeight;
