export function timeDiff(date_string:string) {
  let date = new Date(Date.parse(date_string))
  // 获取当前时间的毫秒数
  let now = Date.now();
  // 获取参数时间的毫秒数
  let then = date.getTime();
  // 计算时间差，单位为毫秒
  let diff = now - then;
  // 定义一个变量，用于存储输出结果
  let output = "";
  // 判断时间差是否小于一分钟（60*1000毫秒）
  if (diff < 60 * 1000) {
    // 如果是，输出“刚刚”
    output = "刚刚";
  } else if (diff < 60 * 60 * 1000) {
    // 否则，判断时间差是否小于一小时（60*60*1000毫秒）
    // 如果是，计算时间差的分钟数，向下取整
    let minutes = Math.floor(diff / (60 * 1000));
    // 输出“xx分钟前”，其中xx为分钟数
    output = minutes + "分钟前";
  } else if (diff < 24 * 60 * 60 * 1000) {
    // 否则，判断时间差是否小于一天（24*60*60*1000毫秒）
    // 如果是，计算时间差的小时数，向下取整
    let hours = Math.floor(diff / (60 * 60 * 1000));
    // 输出“xx小时前”，其中xx为小时数
    output = hours + "小时前";
  } else {
    // 否则，计算时间差的天数，向下取整
    let days = Math.floor(diff / (24 * 60 * 60 * 1000));
    // 输出“xx天前”，其中xx为天数
    output = days + "天前";
  }
  // 返回输出结果
  return output;
}