export function formatDate(date) {
  // 01, 02, 03, ... 29, 30, 31
  let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
   
  // 01, 02, 03, ... 10, 11, 12
  let mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);

  // 1970, 1971, ... 2015, 2016, ...
  let yyyy = date.getFullYear();

  return `${yyyy}${mm}${dd}`;
} 