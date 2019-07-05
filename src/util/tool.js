
export function timestampConvert(timestamp) {
  let date = new Date(timestamp);

  //处理时间排序中的次序问题
  var month = date.getUTCMonth() + 1;
  if (month < 10)
    month = "0" + month;
  var day = date.getUTCDay();
  if (day < 10)
    day = "0" + day;
  var hour = date.getHours();
  if (hour < 10)
    hour = "0" + hour;
  var minute = date.getMinutes();
  if (minute < 10)
    minute = "0" + minute;
  var second = date.getSeconds();
  if (second < 10)
    second = "0" + second;

  return date.getFullYear() + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
}
