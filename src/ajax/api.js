import api from "./index";
import jsonp from "./jsonp";
const biying = "https://bing.ioliu.cn/v1";
const base_url = "http://localhost:3002";
/*
 * 获取必应地址
 * */
export const getImg = data => jsonp(biying, data);
/*
 * 获取新闻列表
 * */
export const getNews = data => api.get(base_url + "/news/newsList", data);
