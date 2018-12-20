import api from "./index";
const base_url = "https://api.bgm.tv";
/*
 * 返回用户的基本信息
 * GET /user/:username
 * */
export const bangumi_get_user = data => api.get(base_url + `/user/${data}`);
