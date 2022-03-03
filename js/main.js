// $(function () {
window.onload = function () {

    // // 阻止浏览器默认的右键事件
    document.oncontextmenu = function () {
        return false;
    }

    // // 自定义滚动条
    $(".sharing-ex-list").mCustomScrollbar({
        scrollButtons: {
            enable: true
        },
    });

    // // home页日历
    setCalendar();

    // // 左侧菜单轮播插画
    shuffling(-800, $(".illustrator-list"), $(".illustrator-list li"), 50);

    // // 显示当前时间
    getCurrentTime();

    // // home页搜索框特效
    searchBoxEffects();

    // // home页隐藏菜单
    showImplicitMenu();

    // // task页展开输入任务框
    $(".todo-input-wrapper").on("mouseenter", function () { // 放在icon上展开
        $(".todo-input").addClass("input-longer");
    })
    $(".task-detail-container").on("mouseleave", function () { // 离开task容器再收回
        $(".todo-input").removeClass("input-longer");
        $(".todo-input").val("");
    })

    // // to do list和done list相关操作 
    // 存储的数据格式：let toDoList = [{title: "xxx",done:false}]
    loadData();
    $("#todo").on("keydown", function (event) {
        if (event.key === "Enter") { // 用户按下回车键
            if ($(this).val() === "") { // 用户输入为空
                $(".todo-task-empty").css("display", "inline-block");
                return; // 阻止向下
            } else {
                let localData = getData("toDoList"); // 读取本地原来存储的数据
                if (localData.length < 8) {
                    localData.push({ // localData数组进行更新数据
                        title: $(this).val(),
                        done: false // 按回车的事件都为未完成事件
                    })
                    saveData("toDoList", localData); // 数组localData存到本地
                    loadData(); //  本地存储数据渲染到页面
                    $(this).val("");
                } else if (localData.length >= 8) { // 总任务超过八个时，出现提示框
                    $(".todo-task-full").css("display", "inline-block");
                }
            }

        }
    });
    // // 删除任务
    $("#toDoList,#doneList").on("click", "a", function () { // 删除本地存储的数据从而删掉该条li    
        let data = getData("toDoList"); // 获取本地存储数据
        if (data.length <= 8) { // 若事件总数<=8，提示框消失
            $(".todo-task-full").css("display", "none");
        }
        let index = $(this).attr("data-id"); // 获取点击数据的自定义属性值 
        data.splice(index, 1); // 修改数组中储存的数据     
        saveData("toDoList", data); // 数据保存到本地
        loadData(); // 重新渲染页面
    });

    // // 将任务更换位置(todo->done,done->todo)
    $("#toDoList,#doneList").on("click", "input", function () {
        let data = getData("toDoList"); // 获取本地存储的数据   
        let index = $(this).siblings("a").attr("data-id"); // 找到该条复选框的兄弟a的自定义属性   
        data[index].done = $(this).prop("checked"); // 修改数据的done属性，和复选框是否被勾上的属性一致  
        saveData("toDoList", data); // 数据保存到本地 
        loadData(); // 重新渲染页面
    });

    // // 动态监听输入框，用户输入则提示框消失
    $("#todo").on("input change", function () {
        $(".todo-task-empty").css("display", "none");
    });

    // // toDoList 的移入移出
    setToDoListDetail();

    // // meeting list 相关操作 
    loadMeeting();
    $("#ok").on("click", function () {
        let localMeeting = getData("meetingList"); // 读取本地原来存储的会议
        // 相关数据添加进数组
        localMeeting.push({
            event: $(".meeting-input-field").val(),
            fromHour: $(".time-hour-from").val(),
            fromMin: $(".time-min-from").val(),
            toHour: $(".time-hour-to").val(),
            toMin: $(".time-min-to").val()
        });
        saveData("meetingList", localMeeting);
        loadMeeting();
        $(".mask-meeting").removeClass("show"); // 窗口关闭
        // 全部清空
        $(".meeting-add-time input,.meeting-input-field").val("");
    });

    // // 删除meeting
    $("body").on("mouseenter", ".meeting-item", function () { // 鼠标移入，出现删除按钮
        $(this).find(".delete-meeting-event").addClass("show");
    });
    $("body").on("mouseleave", ".meeting-item", function () { //  鼠标移出，隐藏删除按钮
        $(this).find(".delete-meeting-event").removeClass("show");
    });
    $(".meeting-list").on("click", ".delete-meeting-event", function () { // 删除本地存储的数据从而删掉该条li    
        let meeting = getData("meetingList"); // 获取本地存储数据
        let index = $(this).attr("data-name"); // 获取点击数据的自定义属性值 
        meeting.splice(index, 1); // 修改数组中储存的数据     
        saveData("meetingList", meeting); // 数据保存到本地
        loadMeeting(); // 重新渲染页面
    });

    // // 点击打开添加任务窗口,关闭紧急任务窗口
    windowOperate($(".task-add-btn"), $(".task-add-box>span:nth-child(2)"), $(".mask-urgent-task"), "click", "show");
    // // 点击打开添加meeting窗口，关闭meeting窗口
    windowOperate($(".meeting-add-icon"), $("#return"), $(".mask-meeting"), "click", "show");


    // // 点击添加紧急任务
    $(".task-add-ok").on("click", function () {
        let content = turnUpper($(".task-add-detail textarea").val()); // 具体内容
        let hour = $(".urgent-hour").val(); // 时间的小时
        let min = $(".urgent-min").val(); // 时间的分钟
        const newTask = ` <li draggable="true">
        <span class="decorate-shape"></span>
        <span class="task-item">${content}</span>
        <div class="task-time">${hour}:${min}</div>
    </li>`;
        $(".task-list").prepend(newTask); // 新增任务节点添加进列表
        $(".task-list li:nth-child(1) .decorate-shape").text(content.slice(0, 1)); // 小框中填入任务的首字母
        $(".task-add-detail input,.task-add-detail textarea").val(""); // 清空所有输入框
        $(".mask-urgent-task").removeClass("show"); // 隐藏输入窗口
        // 若ul中有四个以上的li，则删除最后一个li
        if ($getIndex($(".task-list li")) > 4) {
            $(".task-list li").eq(4).remove();
        }
    });

    // // 填充urgent task列表前面装饰小框的字母，与任务名首字母相同
    for (let i = 0; i < 4; i++) {
        $(".task-list .decorate-shape").eq(i).text($(".task-item").eq(i).text().slice(0, 1));
    }

    // // 设置timeline的头部
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateHead = $(".timeline-date li"); // 获取需填充日期的标签
    let date = new Date();
    dateHead.eq(date.getDay()).addClass("time-today"); // 今天日期高亮
    let currentFirstDate;

    function formDate(date) {
        let day = date.getDate();
        return day;
    }

    function addDate(date, n) {
        // 设置日期为当前日期+n
        date.setDate(date.getDate() + n);
        return date;
    }

    function setDate(date) {
        let week = date.getDay() - 1; // week为当前的周几-1
        date = addDate(date, week * -1);
        currentFirstDate = new Date(date);
        for (let i = 0; i < dateHead.length; i++) {
            if (i == 0) dateHead.eq(i).html(formDate(addDate(date, -1)));
            else dateHead.eq(i).html(formDate(addDate(date, 1)));
        }
        $(".timeline-header span:nth-child(2)").html(month[date.getMonth()]); // 填充现在月份
    }
    $("#prev").on("click", function () {
        setDate(addDate(currentFirstDate, -7));
    })
    $("#next").on("click", function () {
        setDate(addDate(currentFirstDate, +7));
    })
    setDate(new Date());


    // // 添加schedule
    $(".timeline-detail-container textarea").on("keydown", function (e) {
        if (e.key === "Enter") { // 用户按下回车键
            e.preventDefault(); // 取消默认事件(按回车换行)
            const content = turnUpper($(this).val()); // 首字母转大写
            if (content != "") {
                const schedule = `<li class="none">${content}</li>`; // 生成新节点
                $(".timeline-detail-container ol").prepend(schedule); // 添加到schedule里
                $(".timeline-detail-container ol li:nth-child(1)").slideDown(300); // 动画出现
                $(this).val(""); // 清空
            }
        }
    })

    // // 主菜单切换
    $(".left-menu>li").on("click", function () {
        switchMenu($(this), $("main>div"), "menu-active");
    })
    // // 社区切换
    $(".community-menu>li").on("click", function () {
        switchMenu($(this), $(".community-detail-wrapper>div"), "community-menu-active");
        if (($(".community-container").hasClass("show")) && ($(".community-photo-sharing").hasClass("show"))) {
            waterFall(); // 瀑布流
        }
    });

    // // 动态监听评论框
    listenInput($(".sharing-input-box"), ".sharing-input-editor", $("#send"));

    // // 添加评论
    $("#send").on("click", function () {
        // 拿到用户输入的内容
        const text = $(".sharing-input-editor").val();
        // 创建评论节点
        const content = `<li class="sharing-ex-item">
        <img src="../image/head-portrait.jpg" alt="">
        <p class="ex-info-text">
            ${text}
        </p>
        <p class="ex-info-operation">
            <span class="info-time">${getTime()}</span>
            <span>
                <a class="info-top" href="javascript:;"><i>&#xe62b;</i><span>0</span></a>
                <a class="info-down" href="javascript:;"><i>&#xeead;</i><span>0</span></a>
            </span>
        </p>
    </li>`
        $("#mCSB_2_container").prepend(content); // 添加节点
        $(".sharing-input-editor").val(""); // 清空输入
    });


    // // 监听喜欢的点击
    $(".sharing-ex-list").on("click", ".info-top", function () {
        // 点赞数+1
        userAction($(this).children("i"), $(this).children("span"), "like-active");
    })

    // // 监听👎的点击
    $(".sharing-ex-list").on("click", ".info-down", function () {
        // 👎数+1
        userAction($(this).children("i"), $(this).children("span"), "down-active");
    });

    // // 上传图片
    let upFile = document.querySelector("#file"); // input框
    let list = document.querySelector(".upload-pic-list"); // 上传图片列表
    let file = document.querySelector(".upload-file");
    let sendBtn = document.querySelector(".upload-pic-wrapper button");
    upFile.addEventListener("change", function () {
        // files属性可以访问到用户选择的文件
        for (let item of this.files) {
            let reader = new FileReader(); // 创建FileReader()对象
            // 将上传的图片格式转为base64格式
            reader.readAsDataURL(item);
            //  监听数据的加载
            reader.addEventListener("load", function () {
                // reader.result得到的是转换后的图片base64格式
                // 可以直接放到src路径
                let li = document.createElement("li");
                li.innerHTML = `
				<div class="upload-close">x</div>
				<img src="
					${this.result}     
					" />
				`;
                // 新生成的li节点添加到.upload-file之前
                list.insertBefore(li, file);
                // 保存本地上传的图片src
                let newImgSrc = this.result;

                // // 发布带图评论
                sendBtn.addEventListener("click", function () {
                    // 获取评论文字
                    let content = document.querySelector(".upload-pic-wrapper textarea");
                    let newPicComment = `<li class="sharing-ex-item">
        <div>
            <img src="../image/head-portrait.jpg" alt="">
        </div>
        <p class="ex-info-text">
           ${content.value}
        </p>
        <img src="${newImgSrc}" alt="">
        <p class="ex-info-operation">
            <span class="info-time">${getTime()}</span>
            <span>
                <a class="info-top" href="javascript:;"><i
                        class="like-active">&#xe62b;</i><span>24</span></a>
                <a class="info-down" href="javascript:;"><i>&#xeead;</i><span>0</span></a>
            </span>
        </p>
    </li>`;
                    $("#mCSB_1_container").prepend(newPicComment);
                    content.value = ""; // 清空评论框
                    li.remove(); // 删除已发出的图片
                });
            });
        }
    });

    // // 删除上传图片
    list.addEventListener("click", function (e) {
        // e.target触发事件的对象 
        // nodeName是每一个dom元素都有节点 且值全部都是大写
        if (e.target.nodeName == "DIV") {
            // 删除该x对应的li
            list.removeChild(e.target.parentNode);
        }
    })

    // // 瀑布流图片加人物头像
    for (let i = 0, k = 1; i <= $(".photo-item div").length; i++, k++) {
        // 一共四张头像
        if (k > 4) k = k % 4;
        let img = ` <img src="../image/头像 (${k}).png" alt="">
        <i>&#xe609;</i>`;
        // div添加进对应头像
        $(".photo-item div").eq(i).html(img);
    }

    // // 调节页面亮度
    $("#range").on("change", function () {
        $("body").css({
            // 页面亮度与range的数值相对应
            filter: "brightness(" + $("#range").val() + "%)"
        })
    });

    // // 拖拉task列表排序
    const dragUl = document.querySelector(".task-list"); // 获取需要进行拖拉的列表
    let dragging = null; // 保存当前拖动的li

    // ondragstart规定当元素被拖动时，会发生什么
    dragUl.ondragstart = function (e) {
        dragging = e.target; // 获取当前拖动的元素
    }
    // ondragover规定在何处放置被拖动的数据
    dragUl.ondragover = function (e) {
        e.preventDefault(); // 阻止默认事件(元素不能放到其他元素中)
        let target = e.target; // 获取要放置的元素
        // 判断要放置的地方是不是li，而且不能放在自己身上
        if (target.nodeName === "LI" && target !== dragging) {
            if (getIndex(dragging) < getIndex(target)) { // 当前拖动li比目标li在父元素中的位置更前
                target.parentNode.insertBefore(dragging, target.nextSibling); // 将拖动的li插入到目标li的后面一个位置
            } else { // 当前拖动li比目标li在父元素中的位置更后
                target.parentNode.insertBefore(dragging, target); // 将拖动的li插入到目标li的位置
            }
        }
    }

    // // 跳转至task页面
    $(".click-to-do,.click-to-be-done").on("click", function () {
        $(".home-container").removeClass("show");
        $(".task-container").addClass("show");
        $(".left-menu li:nth-child(1)").removeClass("menu-active");
        $(".left-menu li:nth-child(3)").addClass("menu-active");
    })

    // // 首页todo，done 数量填充
    const number = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
    let toDo = $(".todo-count").text();
    let done = $(".done-count").text();
    $(".event-to-do .event-amount").text(number[toDo]);
    $(".event-be-done .event-amount").text(number[done]);

    // // 全局nav 正在显示的li ， hover时不出现伪类
    if ($(".left-menu li").hasClass("menu-active")) {
        $(".left-menu li::before").css("opacity", "0");
    }

    // // task页面，goal切换
    $(".turn-next").on("click", function () { // 点击右侧按钮
        // 飞走本卡片
        $(this).parents(".goal-card").removeClass("back");
        $(this).parents(".goal-card").addClass("leave");
    });
    $(".turn-before").on("click", function () { // 点击左侧按钮
        // 获取到当前点击的卡片
        let currentId = $(this).parents(".goal-card").prop("id");
        let lastId = currentId - 1;
        // 上一张卡片飞回来
        $(".goal-card-wrapper div").eq(lastId).removeClass("leave");
        $(".goal-card-wrapper div").eq(lastId).addClass("back");
    });

    // // 社区评论，屏蔽操作
    $(".user-option li:nth-child(1) i").on("click", function () {
        const div = `<div class="mask-sharing">
            <i>&#xe682;</i>
        </div>`;
        $(this).parents(".sharing-ex-item").append(div);
        $(this).parents(".user-option").addClass("none");
    });

    // // 社区评论，删除操作
    $(".user-option li:nth-child(2) i").on("click", function () {
        $(this).parents(".sharing-ex-item").remove();
    })
}