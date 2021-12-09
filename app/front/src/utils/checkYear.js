export const checkYear = (data) => {
  let split = data.split("-");
  let postYear = split[1].split(" ")[0];
  let thisYear = new Date().getFullYear().toString().slice(2);
  if (postYear === thisYear) {
    return split[0] + " " + split[1].split(" ")[1];
  } else {
    return data;
  }
};
