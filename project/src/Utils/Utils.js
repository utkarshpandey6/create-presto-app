export const href = (link) => {
  return function() {
    return window.location.href = link;
  }
}