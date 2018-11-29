// import api from "./index";
import jsonp from "./jsonp";
const biying = "https://bing.ioliu.cn/v1";
/*
 * 获取必应地址
 * */
export const getImg = (data) => jsonp(biying, data);
