export const formatTime = (time) => {
  const _time = new Date(parseInt(time, 10));  // 显式转换为整数
  const y = _time.getFullYear();
  const m = _time.getMonth() + 1;
  const d = _time.getDate();
  const h = _time.getHours();
  const min = _time.getMinutes();

  // 使用模板字符串返回格式化后的日期时间
  return `${y}/${m}/${d} ${h}:${min}`;
}
