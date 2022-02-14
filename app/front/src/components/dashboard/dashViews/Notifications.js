import { useContext, useState } from "react";

import { GoBack } from "../partials/GoBack";

import { get } from "../../../utils/http";
import { checkYear } from "../../../utils/checkYear";
import { If } from "../../../utils/If";

import { Loading } from "../../animations/Loading";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

import styled from "styled-components";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const Notifications = ({
  notifications,
  setNotifications,
  setChosenPost,
}) => {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ShowContext);

  const [loading, setLoading] = useState(false);

  const fetchPostAndDeletNoti = async (
    id,
    compost,
    compost_id,
    type,
    notiId
  ) => {
    setLoading(true);
    const abortController = new AbortController();
    let res = await get(
      `/post/get_post_data_and_delete_noti/?id=${id}&compost=${compost}&compost_id=${compost_id}&type=${type}`,
      abortController.signal
    );
    setNotifications(notifications.filter((n) => n.notification_id !== notiId));
    console.log(res[0]);
    setChosenPost(res[0]);
    dispatch({ type: "showPostView" });
    setLoading(false);
    return () => abortController.abort();
  };

  if (loading) {
    return <Loading color={"white"} size={"big"} />;
  }

  return (
    <section className="main-container">
      <GoBack show={"showPosts"} />

      <section className="main-view">
        {notifications.map((n, i) => {
          return (
            <Notification
              n={n}
              lastHr={i !== notifications.length - 1}
              fetchPostAndDeletNoti={fetchPostAndDeletNoti}
            />
          );
        })}
      </section>
    </section>
  );
};

export const Notification = ({ n, lastHr, fetchPostAndDeletNoti }) => {
  const getNotiText = (n) => {
    console.log(n.post.name.at(-1));
    let postUser = n.post.name + (n.post.name.at(-1) === "s" ? "" : "s");
    if (n.type === "0") {
      return (
        <div>
          <span className="nr">{n.NrOfDub}</span>{" "}
          {n.NrOfDub > 1 ? "nya interaktioner" : "ny interaktion"} på{" "}
          <span className="user">din</span> post "
          <i>
            {n.text.slice(0, 10)}
            {n.text.length > 10 ? "..." : ""}
          </i>
          "
        </div>
      );
    } else if (n.type === "1") {
      return (
        <div>
          <span className="nr">{n.NrOfDub}</span>{" "}
          {n.NrOfDub > 1 ? "nya interaktioner" : "ny interaktion"} på{" "}
          <span className="user">din</span> kommentar "
          <i>
            {n.text.slice(0, 10)}
            {n.text.length > 10 ? "..." : ""}
          </i>
          " till <span className="user">{postUser}</span> post "
          <i>
            {n.post.text.slice(0, 10)}
            {n.post.text.length > 10 ? "..." : ""}
          </i>
          "
        </div>
      );
    } else {
      return (
        <div>
          Andra har också kommenterat på{" "}
          <span className="user">{postUser}</span> post "
          <i>
            {n.text.slice(0, 10)}
            {n.text.length > 10 ? "..." : ""}
          </i>
          "
        </div>
      );
    }
  };
  return (
    <>
      <div
        className="flex single-noti"
        onClick={() => {
          fetchPostAndDeletNoti(
            n.origin,
            n.post_id ? "post_id" : "comment_id",
            n.post_id ? n.post_id : n.comment_id,
            n.type,
            n.notification_id
          );
        }}
      >
        {/* <div className="flex noti-con-main"> */}
        <div>
          <i class="fas fa-circle"></i>
        </div>
        <div>
          {getNotiText(n)}
          <div className="noti-con-time">{checkYear(n.time)}</div>
        </div>
        <If condition={n.post.image}>
          <StyledDiv img={n.post.image} className="noti-img"></StyledDiv>
        </If>
        {/* </div> */}
      </div>
      <If condition={lastHr}>
        <hr />
      </If>
    </>
  );
};
