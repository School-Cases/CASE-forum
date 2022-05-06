export const getDateAndTime = () => {
  // let date = new Date().toLocaleDateString().split("-");
  // console.log(date);
  // let year = date[0].charAt(-2) + date[0].charAt(-1);
  // if (date[1].charAt(0) === "0" && date[2].charAt(0) === "0") {
  //   let day = date[2];
  //   let month = date[1];
  //   date = `${day[1]}/${month[1]}`;
  // } else if (date[1].charAt(0) === "0") {
  //   let month = date[1];
  //   date = `${date[2]}/${month[1]}`;
  // } else if (date[2].charAt(0) === "0") {
  //   let day = date[2];
  //   date = `${day[1]}/${date[1]}`;
  // } else {
  //   date = `${date[2]}/${date[1]}`;
  // }

  // let timeSplitted = new Date().toLocaleTimeString().split(":");
  // let time = timeSplitted[0] + ":" + timeSplitted[1];
  // return date + "-" + year + " " + time;
  // return date + " " + time;
  // console.log(new Date().toLocaleDateString());
  let date = new Date().toLocaleDateString().split("/");
  let time = new Date().toLocaleTimeString().split(":");
  // date = date[1] + "/" + date[2] + date[0];
  // time = time[0] + ":" + time[1];
  // return date + " " + time;
  return (
    date[1] + "/" + date[0] + "-" + date[2] + " " + time[0] + ":" + time[1]
  );
};
