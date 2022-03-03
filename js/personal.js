/*
 * @Author: AIpoem
 * @Date: 2021-05-02 13:06:42
 * @LastEditors: AIpoem
 * @LastEditTime: 2021-06-04 18:41:50
 * @Description: 
 */

$(function() {
    // // 阻止浏览器默认的右键事件
    document.oncontextmenu = function() {
        return false;
    }
    // // 动态监听对话输入
    listenInput($(".message-send-wrapper"),".message-input-field",$("#submit"));

    let sendCnt = 0;     // 记录发送次数
    let messageCnt = $(".message-count").text();    // 获取消息总数
    // // 监听send按钮点击
    $("#submit").on("click",function(){
        const content = $(".message-input-field").val();    // 获取用户输入内容
        const sendContent = ` <div class="sender-side">
        <i>&#xe797;</i>
        <img src="../image/head-portrait.jpg" alt="">
        <div class="sender-dialogue">
            <p class="dialogue-content">
                ${content}
            </p>
        </div>
    </div>`;
        $(".message-detail-wrapper").append(sendContent);   // 将用户输入内容添加到对话框中
        sendCnt++;  // 发送次数增加
        const height = 40 + 140*sendCnt;
        //  滚动条下滚
        $(".message-detail-wrapper").animate({
            scrollTop: height
        },300);
        $(".message-input-field").val("");   // 清空输入框
        messageCnt++;        // 消息总数增加
        $(".message-count").text(messageCnt);   // 消息总数渲染到页面上
    })

    
    $(".message-detail-wrapper").on("mousedown",".sender-dialogue",function(e){
        // 用户按下右键
        if (e.which == 3){ // 对话文字变色，撤回按钮出现
            $(this).children(".dialogue-content").css("color","#fff");
            $(this).parents(".sender-side").children("i").addClass("show");
        } // ~ 按了左键
        if(e.which == 1){  // 恢复
            $(".sender-dialogue").children(".dialogue-content").css("color","#232134");
            $(".sender-dialogue").parents(".sender-side").children("i").removeClass("show");
        } 
    })

    // 撤回按钮的点击事件委托
    $(".message-detail-wrapper").on("click",".sender-side i",function(){
        const remContent = $(this).parents(".sender-side");
        remContent.remove();   // 移除内容  
        messageCnt--;   // 消息总数-1
        $(".message-count").text(messageCnt);
    })

    
})