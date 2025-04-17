/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 15:02:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-16 15:46:40
 * @FilePath: /micro-child-vue2-job/src/public-path.js
 * @Description: 微前端环境判断，设置webpack publicPath
 */

if (window.__MICRO_APP_ENVIRONMENT) {
  // 微前端环境 
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH || '/';
} else {
    // 独立运行环境
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = process.env.BASE_URL;
} 