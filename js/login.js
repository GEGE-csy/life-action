$(function () {

    // // 登陆注册页切换
    const signIn = $("#signIn");
    const signUp = $("#signUp");
    const container = $("#container");

    signIn.on("click", container, function () {
        container.addClass("right-active");
        $("body").css("backgroundColor", "#F9D9CC");
    });
    signUp.on("click", container, function () {
        container.removeClass("right-active");
        $("body").css("backgroundColor", "#FCE3DF");
    });

    // // 滑块拖动验证
    let flag = false;  // !记录滑块是否拖动成功
    $(".validation-in-btn").on("mousedown", function (e) { // !鼠标按下按钮事件
        let downX = e.clientX; // 按下时,距离浏览器页面的x轴的距离
        $(".validation-in-btn").on("mousemove", function (e) { // !鼠标移动事件
            let moveX = e.clientX - downX; // !鼠标移动时距离x轴的距离-按下时距离x轴的距离 = 滑块相对盒子向右移动的距离
            if (moveX > 0) {
                $(this).css("left", moveX + "px"); // !设置滑块的移动值
                $(".validation-in-bg").width(moveX); // !设置背景的宽度 = 滑块相对盒子向右移动的距离
                // !移动的值超过了盒子-本身按钮的宽度，验证成功
                if (moveX >= ($(".validation-in-box").width() - $(this).width())) {
                    flag = true;
                    $(".validation-in-tip").html("<i>&#xe65b;</i>") // !出现验证成功icon
                    $(".validation-in-btn").unbind("mousemove"); // !取消绑定事件
                    $(".validation-in-btn").unbind("mousedown");
                }
            }
        })
    });
    // 未验证成功之前，鼠标松开按钮
    $(".validation-in-btn").on("mouseup", function () {
        $(".validation-in-btn").unbind("mousemove"); // 取消绑定鼠标移动事件，鼠标按下事件不取消（可能再次按下）
        if (flag) return; // 已经验证成功
        $(this).css("left", 0); // 滑块复原
        $(".validation-in-bg").width(0); // 背景复原
    });

    // 为登录按钮绑定单击响应事件
    $(".sign-in-btn").on("click", function () {
        // 出现验证滑块
        $(".validation-in-box").slideDown(300);  
        // 用户名或密码为空
        if ($("#sign-in-name").val().length === 0 || $("#sign-in-pw").val().length === 0) {
            addInvalidClass($(".login-username-font"), $("#sign-in-name"), "invalid-tip", "invalid-border", true);
            addInvalidClass($(".login-password-font"), $("#sign-in-pw"), "invalid-tip", "invalid-border", true);
            $(".tip").addClass("show");
            $(".tip").text("Username or password empty");
        }
        // 输入不为空
        else {
            const name = $("#sign-in-name").val();
            const password = $("#sign-in-pw").val();
            // 滑块成功验证
            if (flag == true) {
                $.getJSON("http://127.0.0.1:8000/check-account?callback=?", function (data) {
                    // 用户名或密码不匹配
                    if (name != data.name || password != data.password) {
                        $(".tip").addClass("show");
                        $(".tip").text(data.message);
                    }
                    // 成功登录
                    else{
                        $(".success-login").addClass("show");
                    }
                });
            }

        }
    });

    // 动态监听用户输入
    $(".input-box").on("input change", function () {
        $(".tip").removeClass("show");
        addInvalidClass($(".login-username-font"), $("#sign-in-name"), "invalid-tip", "invalid-border", false);
        addInvalidClass($(".login-password-font"), $("#sign-in-pw"), "invalid-tip", "invalid-border", false);
    });
})