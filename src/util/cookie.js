/**
 * Cookie Processes
 */
//获取cookie、
export function getCookie(name) {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  return arr ? arr[2] : null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expires) {
  let exdate = new Date();
  exdate.setTime(exdate.getTime() + expires);
  document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
  setCookie(name, '', -1)
};

// export default {
//   data: {
//     expiredays: 0 //time of cookie to keep alive
//   },
//   setCookie(c_name, value, expiredays = this.expiredays)
//   {
//     let extime = new Date();
//     extime.setTime(extime.getTime() + (expiredays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + extime.toUTCString();
//     document.cookie = c_name + "=" + value + "; " + expires;
//   },
//   getCookie(c_name)
//   {
//     let name = c_name + "=";
//     let ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') c = c.substring(1);
//       if (c.indexOf(name) != -1){
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   },
//   clearCookie(name) {
//     setCookie(name, "", -1);
//   },
//   checkCookie() {
//     let user = this.getCookie("username");
//     if (user != "") {
//       alert("Welcome again " + user);
//     } else {
//       user = prompt("Please enter your name:", "");
//       if (user != "" && user != null) {
//         this.setCookie("username", user, 365);
//       }
//     }
//   },
//   created() {
//     scroll(0, 0);
//     this.checkCookie();
//   }
// }

