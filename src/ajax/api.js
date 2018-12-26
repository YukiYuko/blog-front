import api from "./index";
import jsonp from "./jsonp";
const biying = "https://bing.ioliu.cn/v1";
const base_url = "http://192.168.199.175:3002";
/*
 * 获取必应地址
 * */
export const getImg = data => jsonp(biying, data);
/*
 * 获取新闻列表
 * */
export const getNews = data => api.post(base_url + "/news/newsList", data);

/*
 * 获取详情
 * @params id: 新闻ID
 * */
export const getNewsDetail = data =>
  api.post(base_url + "/news/newsDetail", data);
/*
 * 发表评论
 * @params desc: 内容
 * @params name: 昵称
 * @params mail: 邮箱
 * @params qq: QQ号
 * @params url: 外链
 * @params newsId: 新闻ID
 * @params userId: 用户ID
 * */
export const commentCreate = data =>
  api.post(base_url + "/comment/create", data);
export const commentUpdate = data =>
  api.post(base_url + "/comment/update", data);
/*
 * 获取文章下的评论
 * @params id: 新闻ID
 * @params page: 当前页数
 * */
export const getComment = data => api.post(base_url + "/comment/list", data);
