// 動態加載CSS，嘗試繞過廣告攔截器
document.addEventListener("DOMContentLoaded", function () {
  // 創建隨機字符串作為CSS文件名的後綴
  var randomStr = Math.random().toString(36).substring(2, 8);

  // 獲取主CSS文件的URL
  var cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  if (cssLinks.length > 0) {
    var mainCssLink = cssLinks[0];
    var cssUrl = mainCssLink.getAttribute("href");

    // 創建新的樣式標籤
    var style = document.createElement("style");
    style.type = "text/css";

    // 使用fetch獲取CSS內容並應用
    fetch(cssUrl)
      .then(function (response) {
        return response.text();
      })
      .then(function (cssText) {
        style.appendChild(document.createTextNode(cssText));
        document.head.appendChild(style);

        // 移除原始的CSS鏈接以避免重複
        mainCssLink.parentNode.removeChild(mainCssLink);
      })
      .catch(function (error) {
        console.error("CSS加載失敗:", error);
      });
  }
});
