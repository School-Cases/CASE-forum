import { useContext } from "react";

import { GoBack } from "./GoBack";

import { get } from "../../../utils/http";

import { ShowContext } from "../Dashboard";

export const Notifications = ({ notifications, setChosenPost }) => {
  const { dispatch } = useContext(ShowContext);

  const getNotiText = (n) => {
    if (n.type === "0") {
      return `${n.NrOfDub} ${
        n.NrOfDub > 1 ? "nya interaktioner" : "ny interaktion"
      } på din post "${n.text.slice(0, 10)}${n.text.length > 10 ? "..." : ""}"`;
    } else if (n.type === "1") {
      return `${n.NrOfDub} ${
        n.NrOfDub > 1 ? "nya interaktioner" : "ny interaktion"
      } på din kommentar "${n.text.slice(0, 10)}${
        n.text.length > 10 ? "..." : ""
      }" till ${n.post.name}s post "${n.post.text.slice(0, 10)}${
        n.text.length > 10 ? "..." : ""
      }"`;
    } else {
      // return `${n.NrOfDub} ${
      //   n.NrOfDub > 1 ? "andra" : "annan"
      // }
      return `Andra
      har också kommenterat på ${n.post.name}s post "${n.text.slice(0, 10)}${
        n.text.length > 10 ? "..." : ""
      }"`;
    }
  };

  const fetchPostAndDeletNoti = async (id, compost, compost_id, type) => {
    const abortController = new AbortController();
    let res = await get(
      `/post/get_post_data_and_delete_noti/?id=${id}&compost=${compost}&compost_id=${compost_id}&type=${type}`,
      abortController.signal
    );
    console.log(res);
    setChosenPost(res[0]);
    dispatch({ type: "showPostView" });
    return () => abortController.abort();
  };

  // if (loading) {
  //   return <h3>loading ..</h3>;
  // }

  return (
    <>
      <GoBack show={"showPosts"} />

      <section>
        {notifications.map((n) => {
          return (
            <div
              onClick={() => {
                fetchPostAndDeletNoti(
                  n.origin,
                  n.post_id ? "post_id" : "comment_id",
                  n.post_id ? n.post_id : n.comment_id,
                  n.type
                );
              }}
            >
              <div>{getNotiText(n)}</div>
            </div>
          );
        })}
      </section>
    </>
  );
};
