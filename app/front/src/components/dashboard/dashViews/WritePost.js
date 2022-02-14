import imageCompression from "browser-image-compression";
import Compressor from "compressorjs";

import { useState, useContext } from "react";

import { api_address } from "../../../utils/http";

import { GoBack } from "../partials/GoBack";

import { get, POST } from "../../../utils/http";
import { If } from "../../../utils/If";
import { getDateAndTime } from "../../../utils/getDate&Time";

import { Loading } from "../../animations/Loading";

import { ShowContext } from "../Dashboard";
import { UserContext } from "../../../App";

export const WritePost = ({
  // posts,
  setPosts,
  mainHashtags,
  favHashtags,
}) => {
  const { dispatch } = useContext(ShowContext);
  const { user } = useContext(UserContext);

  const [searchHashtagsInput, setSearchHashtagsInput] = useState("");
  const [searchedHashtagsResult, setSearchedHashtagsResult] = useState([]);

  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState([]);
  // const [image, setImage] = useState(null);

  const [showAddHashtag, setShowAddHashtag] = useState(false);

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [resMessage, setResMessage] = useState(null);

  // async function handleImageUpload(event) {
  //   const imageFile = event.target.files[0];
  //   console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  //   console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  //   const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //   };
  //   try {
  //     const compressedFile = await imageCompression(imageFile, options);
  //     console.log(
  //       "compressedFile instanceof Blob",
  //       compressedFile instanceof Blob
  //     ); // true
  //     console.log(
  //       `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
  //     ); // smaller than maxSizeMB

  //     await uploadToServer(compressedFile); // write your own logic
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const fetchCreatePost = async () => {
    setLoading(true);
    if (text === "") {
      return;
    }
    let formData = new FormData();
    console.log(JSON.stringify(hashtags));

    formData.append("user_id", user.user_id);
    formData.append("text", text);
    formData.append("time", getDateAndTime());
    formData.append("hashtags", JSON.stringify(hashtags));

    if (images.length > 0) {
      images.forEach(async (imageFile) => {
        // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        new Compressor(imageFile, {
          quality: 0.6,
          success(result) {
            console.log(result);
            // The third parameter is required for server
            // formData.append("images[]", result, result.name);
            // formData.append("images[]", imageFile);

            setImages((prev) => {
              return [...prev, result];
            });

            // Send the compressed image file to server with XMLHttpRequest.
          },
          error(err) {
            console.log(err.message);
          },
        });

        // const options = {
        //   maxSizeMB: 1,
        //   maxWidthOrHeight: 1920,
        //   useWebWorker: true,
        // };

        // from blob2file, appendblob formdata,

        // formData.append("images[]", imageFile);

        // try {
        // const compressedFile = await imageCompression(imageFile, options);
        // console.log(
        //   "compressedFile instanceof Blob",
        //   compressedFile instanceof Blob
        // ); // true
        // console.log(
        //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        // );
        // console.log(compressedFile);
        // console.log(imageFile);
        // formData.append("images[]", compressedFile);

        // formData.append("images[]", compressedFile, compressedFile.name);
        // } catch (error) {
        // console.log(error);
        // }
      });
      console.log(formData);
    }

    if (images.length > 0) {
      images.forEach((i) => {
        formData.append("images[]", i);
      });
    }

    let resPost;
    await fetch(`${api_address}/post/create_post`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (resPost = data));
    // .then((err) => console.log(err));
    console.log(resPost);
    if (!resPost.fail) {
      setPosts((prev) => {
        return [resPost, ...prev];
      });
      dispatch({ type: "showPosts" });
    }
  };

  const fetchCertainHashtags = async () => {
    const abortController = new AbortController();
    let res = await get(
      `/hashtag/get_certain_hashtags/?input=${searchHashtagsInput}`,
      abortController.signal
    );
    if (res.hashtags.length < 1) {
      setResMessage("Inga matchande hashtags hittade");
    } else {
      setResMessage(null);
    }
    setSearchedHashtagsResult(res.hashtags);
    return () => abortController.abort();
  };

  if (loading) {
    return <Loading color={"white"} size={"big"} />;
  }

  return (
    <section className="main-container">
      <GoBack show={"showPosts"} />

      <div className="pad-1 main-view">
        <section className="write-post-container">
          <div className="textarea-wrap">
            <textarea
              className="write-post"
              name=""
              id=""
              cols="30"
              rows={!showAddHashtag ? "8" : "4"}
              placeholder="What are you thinking..?"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button className="send-post-btn" onClick={() => fetchCreatePost()}>
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>
          <div className="flex FW-wrap write-post-imgs">
            {images.map((img, i) => {
              let splitImg = img.name.split(".");
              return (
                <div className="single-img" key={i}>
                  {(splitImg[0].length > 5
                    ? splitImg[0].slice(0, 5) + ".."
                    : splitImg[0]) +
                    "." +
                    splitImg[1]}
                  <span
                    className="img-delete"
                    onClick={() => {
                      setImages(images.filter((im) => im !== img));
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </div>
              );
            })}
          </div>
          <input
            className="file-upload write-post-file"
            type="file"
            // name="images"
            // multiple
            onChange={(e) => {
              console.log(e.target.files[0]);
              // setImage(e.target.files[0]);
              setImages((prev) => {
                return [...prev, e.target.files[0]];
              });
              console.log(images);
            }}
          />

          <div className="flex JC-SB write-post-bot">
            <div className="flex FW-wrap hashtags-filter">
              {hashtags.map((h, i) => {
                console.log(h);
                return (
                  <div className="hashtag-box orange">
                    {h}{" "}
                    <span
                      className="hashtag-delete"
                      key={i}
                      onClick={() => {
                        setHashtags(hashtags.filter((ha) => ha !== h));
                      }}
                    >
                      <i class="fas fa-times"></i>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex send-container">
            {/* <button className="send-post-btn" onClick={() => fetchCreatePost()}>
              <i class="fas fa-pencil-alt"></i>
            </button> */}
          </div>

          <h5
            className="add-hash-label"
            onClick={() => {
              console.log(images);
              setShowAddHashtag(!showAddHashtag);
            }}
          >
            Lägg till hashtag{" "}
            <If condition={!showAddHashtag}>
              <i class="fas fa-chevron-down"></i>
            </If>
            <If condition={showAddHashtag}>
              <i class="fas fa-chevron-up"></i>
            </If>
          </h5>
          <If condition={showAddHashtag}>
            <section className="flex FD-C add-hash-wrap">
              <div>
                <div>Mains:</div>
                <section className="flex hashtags-filter">
                  {mainHashtags.map((h) => {
                    return (
                      <If condition={!hashtags.includes(h.content)}>
                        <div
                          className="hashtag-box orange"
                          onClick={(e) => {
                            console.log(hashtags);
                            // if (!hashtags.includes(e.target.textContent)) {
                            setHashtags((prev) => {
                              return [...prev, h.content];
                            });
                            // }
                          }}
                        >
                          {h.content}
                        </div>
                      </If>
                    );
                  })}
                </section>
              </div>

              <If condition={favHashtags.length > 0}>
                <div>
                  <div>Dina favvos:</div>
                  <div className="flex FW-wrap hashtags-filter">
                    {favHashtags.map((h) => {
                      return (
                        <If condition={!hashtags.includes(h.content)}>
                          <div
                            className="hashtag-box orange"
                            onClick={(e) => {
                              console.log(hashtags);
                              // if (!hashtags.includes(e.target.textContent)) {
                              setHashtags((prev) => {
                                return [...prev, h.content];
                              });
                              // }
                            }}
                          >
                            {h.content}
                          </div>
                        </If>
                      );
                    })}
                  </div>
                </div>
              </If>

              <div>
                <div>Sök/Skapa:</div>
                <section className="flex">
                  <div className="flex hashtag-input-content">
                    <input
                      type="text"
                      name=""
                      onChange={(e) => setSearchHashtagsInput(e.target.value)}
                    />
                    <span
                      className="flex btn"
                      onClick={() => fetchCertainHashtags()}
                    >
                      <i class="fas fa-search"></i>
                    </span>
                    <span
                      className="flex btn"
                      onClick={() => {
                        if (!hashtags.includes("#" + searchHashtagsInput)) {
                          setHashtags((prev) => {
                            return [...prev, "#" + searchHashtagsInput];
                          });
                        }
                      }}
                    >
                      <i class="fas fa-plus"></i>
                    </span>
                  </div>
                </section>

                {/* sökta hash träffar */}
                <If condition={resMessage}>
                  <h6>{resMessage}</h6>
                </If>
                <If condition={searchedHashtagsResult.length !== 0}>
                  <div className="flex FW-wrap hashtags-filter">
                    {searchedHashtagsResult.map((h, i) => {
                      return (
                        <If condition={!hashtags.includes(h.content)}>
                          <div
                            className="hashtag-box orange"
                            key={i}
                            onClick={() => {
                              setHashtags((prev) => {
                                return [...prev, h.content];
                              });
                            }}
                          >
                            {h.content}
                          </div>
                        </If>
                      );
                    })}
                  </div>
                </If>
              </div>
            </section>
          </If>
        </section>
      </div>
    </section>
  );
};

// const WriteComment2 = () => {
//   const { dispatch } = useContext(ShowContext);
//   const { user } = useContext(UserContext);

//   const [text, setText] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [images, setImages] = useState([]);

//   const fetchCreateComment = async () => {
//     setLoading(true);
//     if (text === "") {
//       return;
//     }

//     let hashtagsIds = chosenPost.hashtags.map((h) => {
//       return h.hashtag_id;
//     });

//     let noInteractionUpd;
//     if (
//       chosenPost.comments.some((c) => c.user_id === user.user_id) ||
//       chosenPost.post.user_id === user.user_id
//     ) {
//       noInteractionUpd = 1;
//     } else {
//       noInteractionUpd = 0;
//     }

//     let formData = new FormData();
//     formData.append("post_id", chosenPost.post.post_id);
//     formData.append("user_id", user.user_id);
//     formData.append("text", text);
//     formData.append("time", getDateAndTime());
//     // formData.append("hashtags", chosenPost.hashtags);
//     formData.append("hashtags", JSON.stringify(hashtagsIds));
//     formData.append("noInteractionUpd", noInteractionUpd);
//     // formData.append("image", image);

//     if (images.length > 0) {
//       images.forEach((i) => {
//         formData.append("images[]", i);
//       });
//     }

//     // formData.append("images[]", images);

//     let resComment;
//     await fetch(`http://localhost:8080/comment/create_comment`, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => (resComment = data));

//     let arr = [];
//     if (
//       chosenPost.comments.length < 1 &&
//       user.user_id !== chosenPost.user.user_id
//     ) {
//       arr.push(chosenPost.user.user_id);
//     } else {
//       chosenPost.comments.map((c) => {
//         if (
//           c.user_id !== user.user_id &&
//           !arr.includes(c.user_id)
//           // && user.user_id !== chosenPost.user.user_id
//           // &&
//           // c.user_id !== chosenPost.user.user_id
//         ) {
//           arr.push(c.user_id);
//         }
//       });
//     }
//     let notiArr = arr.filter((n) => n !== user.user_id);

//     let notiRes = await POST(`/notification/create_notification`, {
//       time: getDateAndTime(),
//       post_id: chosenPost.post.post_id,
//       comment_id: "null",
//       type: 2,
//       notiUsers: notiArr,
//       post_user: chosenPost.user.user_id,
//       origin: chosenPost.post.post_id,
//     });

//     if (!resComment.fail) {
//       let ny = chosenPost;
//       ny.comments.push(resComment);
//       setChosenPost(ny);
//       // setPosts(haha);
//       dispatch({ type: "showPostView" });
//       // setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Loading color={"white"} size={"big"} />;
//   }

//   return (
//     <section className="main-container">
//       <GoBack show={"showPostView"} />

//       <div className="pad-1 main-view">
//         <section className="write-post-container">
//           <div className="textarea-wrap">
//             <textarea
//               className="write-post"
//               name=""
//               id=""
//               cols="30"
//               rows={"8"}
//               placeholder="What are you thinking..?"
//               onChange={(e) => setText(e.target.value)}
//             ></textarea>
//             <button
//               className="send-post-btn"
//               onClick={() => fetchCreateComment()}
//             >
//               <i class="fas fa-pencil-alt"></i>
//             </button>
//           </div>
//           <div className="flex FW-wrap write-post-imgs">
//             {images.map((img, i) => {
//               let splitImg = img.name.split(".");
//               return (
//                 <div className="single-img" key={i}>
//                   {(splitImg[0].length > 5
//                     ? splitImg[0].slice(0, 5) + ".."
//                     : splitImg[0]) +
//                     "." +
//                     splitImg[1]}
//                   <span
//                     className="img-delete"
//                     onClick={() => {
//                       setImages(images.filter((im) => im !== img));
//                     }}
//                   >
//                     <i class="fas fa-times"></i>
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//           <input
//             className="file-upload write-post-file"
//             type="file"
//             // name="images"
//             // multiple
//             onChange={(e) => {
//               console.log(e.target.files[0]);
//               // setImage(e.target.files[0]);
//               setImages((prev) => {
//                 return [...prev, e.target.files[0]];
//               });
//               console.log(images);
//             }}
//           />

//           <div className="flex send-container"></div>
//         </section>
//       </div>
//     </section>
//   );
// };
