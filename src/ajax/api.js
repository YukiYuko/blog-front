import api from "./index";
import jsonp from "./jsonp";
const biying = "https://bing.ioliu.cn/v1";
const base_url = "http://localhost:3002";
/*
 * 注册
 * */
export const register = data => api.post(base_url + "/users/register", data);
/*
 * 登陆
 * */
export const login = data => api.post(base_url + "/users/login", data);
/*
 * 获取用户信息
 * @params id
 * */
export const getUser = data => api.get(base_url + "/users/userInfo", data);
/*
 * 获取验证码
 * */
export const checkcode = () => api.get(base_url + "/other/checkcode");
/*
 * 获取必应地址
 * */
export const getImg = data => jsonp(biying, data);
/*
 * 获取新闻列表
 * */
export const getNews = data => api.post(base_url + "/news/newsList", data);
/*
 * 获取搜索结果
 * */
export const search = data => api.post(base_url + "/news/search", data);
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
/*
 * 获取最新的评论
 * @params limit: 限制几条
 * */
export const getLatestComment = data =>
  api.post(base_url + "/comment/latest", data);
/*
 * 获取所有标签
 * */
export const getTags = (data) => api.get(base_url + "/system/tag/list", data);
