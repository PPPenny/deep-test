// const baseApi = '/optimus-api/api/v1';
const baseApi = `/deepexi-demo`;
const urls = {
    GET_LIST: '/getList', //获取列表
    GET_DETAIL: '/getDetail', //获取详情
    CREATE_STORE:'/createStore',//构建门店
    UPDATE_STORE:'/updateStore',//更新门店

};
for (let key in urls) {
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
        let v = urls[key];
        if (v.indexOf('/') > 0) v = `/${v}`;
        urls[key] = `${baseApi}${v}`;
    }
}
export default urls;