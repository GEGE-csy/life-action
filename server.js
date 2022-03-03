/*
 * @Author: AIpoem
 * @Date: 2021-06-02 00:16:43
 * @LastEditors: AIpoem
 * @LastEditTime: 2021-06-04 18:41:54
 * @Description: 
 */

// 引入express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由规则
// // 用户名检测是否存在
app.all("/check-account", (request, response) => {
    const data = {
        name: "csy123",
        password: "123456",
        message: " Incorrect username or password...",
    };
    // 将数据转化为字符串
    let str = JSON.stringify(data);
    // 接收callback参数(请求当中的参数的callback的值)
    let callback = request.query.callback;
    // 返回结果
    response.end(`${callback}(${str})`);
})
// 监听端口启动服务
app.listen(8000, () => {
    console.log("OK!")
});