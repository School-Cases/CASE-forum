export const getDateAndTime = () => {
  let date = new Date().toLocaleDateString().split("-");
  let year = date[0].charAt(-2) + date[0].charAt(-1);
  if (date[1].charAt(0) === "0" && date[2].charAt(0) === "0") {
    let day = date[2];
    let month = date[1];
    date = `${day[1]}/${month[1]}`;
  } else if (date[1].charAt(0) === "0") {
    let month = date[1];
    date = `${date[2]}/${month[1]}`;
  } else if (date[2].charAt(0) === "0") {
    let day = date[2];
    date = `${day[1]}/${date[1]}`;
  } else {
    date = `${date[2]}/${date[1]}`;
  }

  let timeSplitted = new Date().toLocaleTimeString().split(":");
  let time = timeSplitted[0] + ":" + timeSplitted[1];
  return date + "-" + year + " " + time;
  // return date + " " + time;
};
