(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{22:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var c,s=n(1),a=n.n(s),r=n(12),i=n.n(r),o=(n(22),n(3)),l=n.n(o),j=n(4),u=n(2),d=(n(24),n(25),n(0)),b=function(e){var t=e.condition,n=e.children;return Object(d.jsx)(d.Fragment,{children:t&&n})},h="http://localhost:8080",O=function(){var e=Object(j.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+t,{method:"GET",signal:n,headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(j.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),e.next=3,fetch(h+t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(e){var t=e.setLoggedIn,n=e.setMainState,c=(e.setPage,e.setUser),a=Object(s.useState)(null),r=Object(u.a)(a,2),i=r[0],o=r[1],b=Object(s.useState)(null),h=Object(u.a)(b,2),O=h[0],x=h[1],p=Object(s.useState)(null),f=Object(u.a)(p,2),g=f[0],v=f[1],w=function(){var e=Object(j.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/user/user_login",{name:i,password:O});case 2:n=e.sent,console.log(!n.fail),n.fail?(console.log("hej"),v(n.fail)):(c(n),t(!0));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("section",{className:"flex login-top",children:Object(d.jsx)("div",{className:"glimra-logo"})}),Object(d.jsxs)("section",{className:"flex login-container",children:[Object(d.jsx)("h2",{className:"login-welcome",children:"V\xe4lkommen!"}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{className:"login-text",htmlFor:"namn",children:"namn:"}),Object(d.jsx)("input",{className:"login-input",type:"text",name:"",placeholder:"namn",onChange:function(e){return o(e.target.value)}})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{className:"login-text",htmlFor:"password",children:"l\xf6senord:"}),Object(d.jsx)("input",{className:"login-input",type:"password",name:"",placeholder:"l\xf6senord",onChange:function(e){return x(e.target.value)}})]}),Object(d.jsx)("div",{children:g}),Object(d.jsx)("button",{className:"login-btn",onClick:function(){return w()},children:"logga in"}),Object(d.jsxs)("div",{className:"login-create-user",children:["Ny anv\xe4ndare?"," ",Object(d.jsx)("span",{className:"create-user-link",onClick:function(){return n("signup")},children:"skapa konto"})]}),Object(d.jsx)("div",{className:"login-tree"})]})]})},p=function(e){e.setLoggedIn;var t=e.setMainState,n=(e.setPage,e.setUser,Object(s.useState)(null)),c=Object(u.a)(n,2),a=c[0],r=c[1],i=Object(s.useState)("test@test.com"),o=Object(u.a)(i,2),b=o[0],h=(o[1],Object(s.useState)(0)),O=Object(u.a)(h,2),m=O[0],x=O[1],p=Object(s.useState)(null),f=Object(u.a)(p,2),g=f[0],v=f[1],w=Object(s.useState)(null),N=Object(u.a)(w,2),C=N[0],S=N[1],k=Object(s.useState)(null),_=Object(u.a)(k,2),y=_[0],F=(_[1],function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).append("image",C),t.append("name",a),t.append("password",g),t.append("email",b),t.append("type",m),e.next=8,fetch("http://localhost:8080/user/create_user",{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){return console.log(e)}));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("section",{className:"flex login-top",children:Object(d.jsx)("div",{className:"glimra-logo"})}),Object(d.jsxs)("section",{className:"flex login-container",children:[Object(d.jsxs)("section",{className:"flex JC-SB heading",children:[Object(d.jsx)("span",{className:"back-arrow login-welcome",onClick:function(){return t("login")},children:Object(d.jsx)("i",{class:"fas fa-arrow-left"})}),Object(d.jsx)("span",{className:"login-welcome",children:"Skapa konto"}),Object(d.jsx)("span",{})]}),Object(d.jsx)("input",{hidden:!0,className:"login-input",type:"text",name:"email",placeholder:"name",value:b}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("label",{className:"login-text",htmlFor:"",children:["name:"," "]}),Object(d.jsx)("input",{className:"login-input",type:"text",name:"name",placeholder:"name",onChange:function(e){return r(e.target.value)}})]}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("label",{className:"login-text",htmlFor:"password",children:["password:"," "]}),Object(d.jsx)("input",{className:"login-input",type:"password",name:"password",placeholder:"password",onChange:function(e){return v(e.target.value)}})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{className:"login-text",htmlFor:"",children:"Deltagare"})," ",Object(d.jsx)("input",{type:"checkbox",name:"type",onClick:function(){return x(0)}}),Object(d.jsx)("label",{className:"login-text",htmlFor:"",children:"Personal"})," ",Object(d.jsx)("input",{type:"checkbox",name:"type",onClick:function(){return x(1)}})]}),Object(d.jsx)("div",{className:"user-img-upload",children:Object(d.jsxs)("section",{className:"flex",children:[Object(d.jsxs)("label",{className:"login-text",htmlFor:"profilepic",children:["Profilbild:"," "]}),Object(d.jsx)("input",{className:"file-upload",name:"image",type:"file",src:"",alt:"",onChange:function(e){console.log(e.target.files[0]),S(e.target.files[0])}})]})}),Object(d.jsx)("div",{children:y}),Object(d.jsx)("button",{className:"login-btn",onClick:function(){return F()},children:"Skapa"})]})]})},f=function(e){var t=e.setLoggedIn,n=(e.theme,e.setTheme,e.setPage),c=e.setUser,a=Object(s.useState)("login"),r=Object(u.a)(a,2),i=r[0],o=r[1],l=Object(s.useState)(!1),j=Object(u.a)(l,2),h=j[0];j[1];return h?Object(d.jsx)("h3",{children:"loading .."}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(b,{condition:"login"===i,children:Object(d.jsx)(x,{setLoggedIn:t,setMainState:o,setPage:n,setUser:c})}),Object(d.jsx)(b,{condition:"signup"===i,children:Object(d.jsx)(p,{setLoggedIn:t,setMainState:o,setPage:n,setUser:c})})]})},g=n(13),v=function(e){var t=e.split("-");return t[1].split(" ")[0]===(new Date).getFullYear().toString().slice(2)?t[0]+" "+t[1].split(" ")[1]:e},w=function(){var e=(new Date).toLocaleDateString().split("-"),t=e[0].at(-2)+e[0].at(-1);if(0===e[1].at(0)&&0===e[2].at(0)){var n=e[2],c=e[1];e="".concat(n[1],"/").concat(c[1])}else if(0===e[1].at(0)){var s=e[1];e="".concat(e[2],"/").concat(s[1])}else if(0===e[2].at(0)){var a=e[2];e="".concat(a[1],"/").concat(e[1])}else e="".concat(e[2],"/").concat(e[1]);"0"===e.at(0)&&(e=e.slice(1));var r=(new Date).toLocaleTimeString().split(":");return e+"-"+t+" "+(r[0]+":"+r[1])},N=function(e){var t=e.setShowWriteComment,n=e.post_id,c=e.user;console.log(n);var a=Object(s.useState)("post lalalal post posst"),r=Object(u.a)(a,2),i=r[0],o=r[1],b=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/comment/create_comment",{post_id:n,user_id:c.user_id,text:i,time:w()});case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("h5",{onClick:function(){return t(!1)},children:[Object(d.jsx)("span",{children:"pil"}),Object(d.jsx)("span",{children:"cancel"})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{htmlFor:"",children:"upload img: "}),Object(d.jsx)("input",{type:"file",name:"",id:""})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("textarea",{name:"",id:"",cols:"30",rows:"10",placeholder:"What are you thinking..?",onChange:function(e){return o(e.target.value)}}),Object(d.jsx)("button",{onClick:function(){return b()},children:"send"})]})]})},C=function(e){var t=e.post,n=e.chosenPost,c=(e.showPostView,e.setShowPostView),a=e.setShowWriteComment,r=e.setCommentPost_id,i=e.user;console.log(t);var o=t.reactions.filter((function(e){return"0"===e.type&&e.post_id})),h=t.reactions.filter((function(e){return"1"===e.type&&e.post_id})),x=Object(s.useState)(!1),p=Object(u.a)(x,2),f=p[0],g=p[1],w=Object(s.useState)(!1),N=Object(u.a)(w,2),C=N[0],k=(N[1],function(){var e=Object(j.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/reaction/create_reaction",{post_id:t.post.post_id,user_id:i.user_id,type:0,reaction:0,comment_id:"null"});case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),_=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new AbortController,e.next=3,O("/hashtags/get_certain_hashtags/?hashtag=".concat(t),n.signal);case 3:return c=e.sent,console.log(c),e.abrupt("return",(function(){return n.abort()}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return C?Object(d.jsx)("h3",{children:"loading .."}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(b,{condition:n===t.post_id,children:Object(d.jsx)("div",{onClick:function(){return c(!1)},children:"back"})}),Object(d.jsxs)("section",{className:"flex single-post",onClick:function(e){e.target.classList.value.includes("noshow-com")||g(!f)},children:[Object(d.jsxs)("div",{className:"author-img-container",children:[Object(d.jsx)("div",{className:"author-img"}),Object(d.jsx)(b,{condition:n===t.post_id&&t.comments.length>0,children:Object(d.jsxs)("div",{className:"comment-line",children:[Object(d.jsx)("div",{className:"line"}),Object(d.jsx)("div",{className:"corner"})]})})]}),Object(d.jsxs)("div",{className:"w100",children:[Object(d.jsxs)("div",{className:"flex JC-SB post-top",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{className:"author-username",children:t.user.name}),Object(d.jsx)("span",{className:"post-timestamp",children:v(t.post.time)})]}),Object(d.jsxs)("div",{className:"flex noshow-com likes",children:[Object(d.jsx)(b,{condition:!o.some((function(e){return e.user_id===i.user_id})),children:Object(d.jsx)("span",{className:"noshow-com",onClick:function(){return k()},children:"LIKEIT"})}),Object(d.jsx)("span",{className:"noshow-com likes-number",children:o.length}),Object(d.jsx)("span",{className:"noshow-com likes-svg"})]})]}),Object(d.jsx)("div",{className:"post-content",children:Object(d.jsx)("p",{className:"post-text-content",children:t.post.text})}),Object(d.jsxs)("div",{className:"flex JC-SB post-bot",children:[Object(d.jsx)("div",{className:"flex FW-wrap",children:t.hashtags.map((function(e){return Object(d.jsx)("span",{onClick:function(){return _(e.content.slice(1))},className:"noshow-com post-hashtag ".concat(e.searched?"searched":""),children:e.content})}))}),Object(d.jsxs)("div",{className:"flex",children:[Object(d.jsx)("span",{className:"noshow-com",onClick:function(){r(t.post.post_id),a(!0)},children:Object(d.jsx)("i",{class:"fas fa-comment"})}),Object(d.jsx)("span",{className:"comment-number",children:t.comments.length}),Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-smile"})}),Object(d.jsx)("span",{className:"reaction-number",children:h.length})]})]})]})]}),Object(d.jsx)(b,{condition:n===t.post_id,children:t.comments.map((function(e,n){return Object(d.jsx)(S,{comment:e,index:n,length:t.comments.length-1})}))})]})},S=function(e){var t=e.comment,n=e.index,c=e.length;console.log(t),console.log(n),console.log(c);var s=t.reactions.filter((function(e){return"0"===e.type&&e.comment_id})),a=t.reactions.filter((function(e){return"1"===e.type&&e.comment_id}));return Object(d.jsxs)("section",{className:"flex comment-container",children:[Object(d.jsxs)("div",{className:"comment-img-container",children:[Object(d.jsx)("div",{className:"commentator-user-img"}),Object(d.jsx)(b,{condition:n!==c,children:Object(d.jsx)("div",{className:"comment-line",children:Object(d.jsx)("div",{className:"line",children:" "})})})]}),Object(d.jsxs)("div",{className:"w100",children:[Object(d.jsxs)("div",{className:"comment-top",children:[Object(d.jsx)("span",{className:"commentator-username",children:t.name}),Object(d.jsx)("span",{className:"comment-timestamp",children:v(t.time)})]}),Object(d.jsx)("p",{className:"comment-content",children:t.text}),Object(d.jsxs)("div",{className:"flex JC-E comment-bot",children:[Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-comment"})}),Object(d.jsx)("span",{className:"comment-number",children:s.length}),Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-smile"})}),Object(d.jsx)("span",{className:"reaction-number",children:a.length})]})]})]})},k=n(7),_=function(e){var t=e.setShowWritePost,n=e.user,c=Object(s.useState)(""),a=Object(u.a)(c,2),r=a[0],i=a[1],o=Object(s.useState)([]),h=Object(u.a)(o,2),x=h[0],p=h[1],f=Object(s.useState)(""),g=Object(u.a)(f,2),v=g[0],N=g[1],C=Object(s.useState)([]),S=Object(u.a)(C,2),_=S[0],y=S[1],F=function(){var e=Object(j.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/post/create_post",{user_id:n.user_id,text:r,time:w()});case 2:t=e.sent,c=t,x.forEach(function(){var e=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/hashtag/handle_hashtag",{content:t,post_id:c,user_id:n.user_id});case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new AbortController,e.next=3,O("/hashtag/get_certain_hashtags/?input=".concat(v),t.signal);case 3:return n=e.sent,console.log(n),y(n.hashtags),e.abrupt("return",(function(){return t.abort()}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("section",{className:"menu-container",children:[Object(d.jsx)("section",{className:"menu-header",children:Object(d.jsxs)("h5",{onClick:function(){return t(!1)},children:[Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-arrow-left"})}),Object(d.jsx)("span",{className:"menu-header-text",children:"cancel"})]})}),Object(d.jsxs)("section",{className:"write-post-container",children:[Object(d.jsx)("div",{children:Object(d.jsx)("textarea",{className:"write-post",name:"",id:"",cols:"30",rows:"8",placeholder:"What are you thinking..?",onChange:function(e){return i(e.target.value)}})}),Object(d.jsxs)("div",{className:"flex JC-SB write-post-bot",children:[Object(d.jsx)("input",{className:"file-upload write-post-file",type:"file",name:"",id:""}),Object(d.jsx)("div",{})]}),Object(d.jsx)("div",{className:"flex send-container",children:Object(d.jsx)("button",{className:"send-post-btn",onClick:function(){return F()},children:Object(d.jsx)("i",{class:"fas fa-pencil-alt"})})}),Object(d.jsxs)("section",{className:"flex",children:[Object(d.jsx)("div",{onClick:function(e){console.log(x),x.includes(e.target.textContent)||p((function(t){return[].concat(Object(k.a)(t),[e.target.textContent])}))},children:"#Deltagare"}),Object(d.jsx)("div",{onClick:function(e){console.log(x),x.includes(e.target.textContent)||p((function(t){return[].concat(Object(k.a)(t),[e.target.textContent])}))},children:"#Skola"})]}),Object(d.jsx)("div",{children:"Hashtag:"}),Object(d.jsxs)("section",{className:"flex",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("input",{type:"text",name:"",onChange:function(e){return N(e.target.value)}}),Object(d.jsx)("button",{onClick:function(){return P()},children:"s\xf6k"}),Object(d.jsx)("button",{children:"add"})]}),Object(d.jsx)("div",{className:"flex FW-wrap",children:x.map((function(e,t){return console.log(e),Object(d.jsx)("div",{onClick:function(){p(x.filter((function(t){return t!==e})))},children:e},t)}))})]}),Object(d.jsx)(b,{condition:0!==_.length,children:_.map((function(e,t){return Object(d.jsx)("div",{onClick:function(){x.includes(e.content)||p((function(t){return[].concat(Object(k.a)(t),[e.content])}))},children:e.content},t)}))})]})]})})},y=function(e){var t=e.setShowSearch,n=e.setPosts,c=Object(s.useState)(""),a=Object(u.a)(c,2),r=a[0],i=a[1],o=Object(s.useState)([]),h=Object(u.a)(o,2),m=h[0],x=h[1],p=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new AbortController,e.next=3,O("/hashtag/get_certain_hashtags/?input=".concat(r),t.signal);case 3:return n=e.sent,console.log(n),x(n.hashtags),e.abrupt("return",(function(){return t.abort()}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(j.a)(l.a.mark((function e(c){var s,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=new AbortController,e.next=3,O("/post/get_certain_posts_data/?input=".concat(c),s.signal);case 3:return a=e.sent,console.log(a),n(a),t(!1),e.abrupt("return",(function(){return s.abort()}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("section",{className:"menu-container",children:[Object(d.jsx)("section",{className:"menu-header",children:Object(d.jsxs)("h5",{onClick:function(){return t(!1)},children:[Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-arrow-left"})}),Object(d.jsx)("span",{className:"menu-header-text",children:"tillbaka"})]})}),Object(d.jsx)("input",{type:"text",name:"",onChange:function(e){return i(e.target.value)}}),Object(d.jsx)("button",{onClick:function(){return p()},children:"s\xf6k"}),Object(d.jsx)(b,{condition:0!==m.length,children:m.map((function(e,t){return Object(d.jsx)("div",{onClick:function(){f(e.content.slice(1))},children:e.content},t)}))})]})})},F=function(e){var t=e.user,n=e.setShowSettings,c=Object(s.useState)(null),a=Object(u.a)(c,2),r=a[0],i=a[1],o=Object(s.useState)(null),b=Object(u.a)(o,2),h=b[0],O=b[1],x=Object(s.useState)(null),p=Object(u.a)(x,2),f=p[0],g=p[1],v=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("/user/user_update",{user_id:t.user_id,current_password:r,new_password:h});case 2:e.sent.fail?g("Fel current l\xf6sen"):g("Uppdatering success");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("section",{className:"menu-container",children:[Object(d.jsx)("section",{className:"menu-header",children:Object(d.jsxs)("h5",{onClick:function(){return n(!1)},children:[Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-arrow-left"})}),Object(d.jsx)("span",{className:"menu-header-text",children:"tillbaka"})]})}),Object(d.jsx)("h4",{children:"Change password:"}),Object(d.jsxs)("div",{className:"flex FD-C",children:[Object(d.jsx)("label",{htmlFor:"",children:"current:"}),Object(d.jsx)("input",{type:"password",name:"",onChange:function(e){return i(e.target.value)}})]}),Object(d.jsxs)("div",{className:"flex FD-C",children:[Object(d.jsx)("label",{htmlFor:"",children:"new:"}),Object(d.jsx)("input",{type:"password",name:"",onChange:function(e){return O(e.target.value)}})]}),Object(d.jsx)("h4",{children:"Change pic:"}),Object(d.jsx)("div",{onClick:function(){v()},children:"save"}),Object(d.jsx)("div",{children:f})]})},P=function(e){var t=e.user,n=e.setShowMenu,c=e.setLoggedIn,a=Object(s.useState)(!1),r=Object(u.a)(a,2),i=r[0],o=r[1],h=function(){var e=Object(j.a)(l.a.mark((function e(){var t,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new AbortController,e.next=3,O("/user/user_logout",t.signal);case 3:return s=e.sent,console.log(s),c(!1),n(!1),e.abrupt("return",(function(){return t.abort()}));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(b,{condition:!i,children:Object(d.jsxs)("section",{className:"menu-container",children:[Object(d.jsx)("section",{className:"menu-header",children:Object(d.jsxs)("h5",{onClick:function(){return n(!1)},children:[Object(d.jsx)("span",{children:Object(d.jsx)("i",{class:"fas fa-arrow-left"})}),Object(d.jsx)("span",{className:"menu-header-text",children:"tillbaka"})]})}),Object(d.jsxs)("section",{children:[Object(d.jsx)("div",{onClick:function(){h()},children:"logout"}),Object(d.jsx)("div",{onClick:function(){o(!0)},children:"settings"})]})]})}),Object(d.jsx)(b,{condition:i,children:Object(d.jsx)(F,{user:t,setShowSettings:o})})]})},L=n(14),I=Object(L.a)("div")(c||(c=Object(g.a)(["\n  background-image: url(./static/media/",");\n"])),(function(e){return e.img})),T=function(e){var t=e.setLoggedIn,n=e.theme,c=e.setTheme,a=e.user;console.log(a);var r=Object(s.useState)(!1),i=Object(u.a)(r,2),o=i[0],h=i[1],m=Object(s.useState)(!1),x=Object(u.a)(m,2),p=x[0],f=x[1],g=Object(s.useState)(null),v=Object(u.a)(g,2),w=v[0],S=v[1],k=Object(s.useState)(!1),F=Object(u.a)(k,2),L=F[0],T=F[1],A=Object(s.useState)(!1),W=Object(u.a)(A,2),D=W[0],J=W[1],V=Object(s.useState)(!1),B=Object(u.a)(V,2),M=B[0],U=B[1],E=Object(s.useState)(null),G=Object(u.a)(E,2),H=G[0],K=G[1],Y=Object(s.useState)([]),q=Object(u.a)(Y,2),z=q[0],Q=q[1],R=Object(s.useState)("ALL"),X=Object(u.a)(R,2),Z=X[0],$=X[1],ee=Object(s.useState)([]),te=Object(u.a)(ee,2),ne=(te[0],te[1],Object(s.useState)([])),ce=Object(u.a)(ne,2),se=ce[0],ae=ce[1],re=Object(s.useState)([]),ie=Object(u.a)(re,2),oe=ie[0],le=ie[1],je=Object(s.useState)(!0),ue=Object(u.a)(je,2),de=ue[0],be=ue[1],he=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new AbortController,e.next=3,O("/post/get_certain_posts_data/?input=".concat(t),n.signal);case 3:return c=e.sent,console.log(c),le(c),e.abrupt("return",(function(){return n.abort()}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Oe=function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O("/post/get_posts_data",t);case 2:n=e.sent,ae(n),be(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),me=function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O("/hashtag/get_user_main_hashtags/?user_id=".concat(a.user_id),t);case 2:n=e.sent,console.log(n),Q(n.main_hashtags);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(s.useEffect)(Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new AbortController,e.next=3,me(t.signal);case 3:return e.next=5,Oe(t.signal);case 5:return e.abrupt("return",(function(){return t.abort()}));case 6:case"end":return e.stop()}}),e)}))),[]),de?Object(d.jsx)("h3",{children:"loading .."}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(b,{condition:!o&&!L&&!D&&!p&&!M,children:[Object(d.jsxs)("header",{className:"flex JC-SB header",children:[Object(d.jsx)(I,{img:a.image,className:"header-user-img"}),Object(d.jsx)("div",{className:"header-stars",onClick:function(){return c(!n)}})]}),Object(d.jsx)("section",{children:Object(d.jsxs)("section",{className:"top-btns flex JC-C",children:[Object(d.jsx)("div",{className:"menu-btn flex",onClick:function(){return J(!0)},children:Object(d.jsx)("i",{class:"fas fa-bars"})}),Object(d.jsx)("div",{className:"write-post-btn flex",onClick:function(){return h(!0)},children:Object(d.jsx)("i",{class:"fas fa-pencil-alt"})}),Object(d.jsx)("div",{className:"search-btn flex",onClick:function(){return T(!0)},children:Object(d.jsx)("i",{class:"fas fa-search"})})]})}),Object(d.jsxs)("section",{className:"container",children:[Object(d.jsxs)("div",{className:"flex",children:[Object(d.jsx)("div",{className:"ALL"===Z?"filter":"",onClick:function(){$("ALL"),le([])},children:"ALL"}),z.map((function(e){return Object(d.jsx)("div",{className:Z===e.content?"filter":"",onClick:function(){$(e.content),he(e.content.slice(1))},children:e.content})}))]}),Object(d.jsxs)("div",{className:"posts",children:[Object(d.jsx)(b,{condition:oe.length<1,children:se.map((function(e,t){return console.log(e),Object(d.jsx)("div",{onClick:function(){K(e),U(!0)},children:Object(d.jsx)(C,{post:e,chosenPost:H,showPostView:M,setShowPostView:U,setShowWriteComment:f,setCommentPost_id:S,user:a},t)})}))}),Object(d.jsx)(b,{condition:oe.length>1,children:oe.map((function(e,t){return console.log(e),Object(d.jsx)("div",{onClick:function(){K(e),U(!0)},children:Object(d.jsx)(C,{post:e,chosenPost:H,showPostView:M,setShowPostView:U,setShowWriteComment:f,setCommentPost_id:S,user:a},t)})}))})]})]})]}),Object(d.jsx)(b,{condition:o,children:Object(d.jsx)(_,{setShowWritePost:h,user:a})}),Object(d.jsx)(b,{condition:L,children:Object(d.jsx)(y,{setShowSearch:T,setPosts:ae})}),Object(d.jsx)(b,{condition:D,children:Object(d.jsx)(P,{user:a,setShowMenu:J,setLoggedIn:t})}),Object(d.jsx)(b,{condition:M,children:Object(d.jsx)("section",{className:"container",children:Object(d.jsx)("div",{className:"posts",children:Object(d.jsx)(C,{setShowPostView:U,post:H,user:a})})})}),Object(d.jsx)(b,{condition:p,children:Object(d.jsx)(N,{user:a,post_id:w,setShowWriteComment:f})})]})};var A=function(){var e=Object(s.useState)("home"),t=Object(u.a)(e,2),n=(t[0],t[1]),c=Object(s.useState)(null),a=Object(u.a)(c,2),r=a[0],i=a[1],o=Object(s.useState)(!0),l=Object(u.a)(o,2),j=l[0],h=l[1],O=Object(s.useState)(!1),m=Object(u.a)(O,2),x=m[0],p=m[1];return Object(d.jsxs)("div",{className:"App ".concat(j?"light":"dark"),children:[Object(d.jsx)(b,{condition:!x,children:Object(d.jsx)(f,{setLoggedIn:p,theme:j,setTheme:h,setPage:n,setUser:i})}),Object(d.jsx)(b,{condition:x,children:Object(d.jsx)(T,{setLoggedIn:p,theme:j,setTheme:h,setPage:n,user:r})})]})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};i.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(A,{})}),document.getElementById("root")),W()}},[[31,1,2]]]);