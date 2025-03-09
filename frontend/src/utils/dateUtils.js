/**
 * 格式化日期為人類可讀形式
 * @param {string} dateString - ISO日期字符串
 * @returns {string} 格式化後的日期
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
};
