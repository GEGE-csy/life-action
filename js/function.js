/*
 * @Author: AIpoem
 * @Date: 2021-05-27 19:12:42
 * @LastEditors: AIpoem
 * @LastEditTime: 2021-06-04 18:40:41
 * @Description: 
 */
  
  // # 菜单切换
  // 参数: 点击的菜单，需要切换的页面，用到的类名
  function switchMenu(menu, container, className) {
      menu.addClass(className); // 修改移入菜单背景色
      menu.siblings().removeClass(className); // 还原其他菜单的背景色
      const index = menu.index(); // 获取当前移入页面的索引
      const containerItem = container.eq(index); // 根据菜单的索引找到对应页面
      containerItem.addClass("show"); // 显示该索引对应页面
      containerItem.siblings().removeClass("show"); // 隐藏其他兄弟页面
  }
  // # 获取子元素节点个数
  function $getIndex(obj) {
      let index = 0;
      for (let item of obj) {
          index++;
      }
      return index;
  }
  // # urgent task首字母改大写
  function turnUpper(content) {
      // 全部变成小写字母
      content = content.toLowerCase();
      // 首字母设为大写，其他字母不变
      let newContent = content.slice(0, 1).toUpperCase() + content.slice(1);
      return newContent;
  }
  // # 弹窗的打开与关闭
  // 参数:打开按钮，关闭按钮，触发对象，触发事件，操作类名
  function windowOperate(openBtn, closeBtn, obj, event, className) {
      openBtn.on(event, function () {
          obj.addClass(className);
      })
      closeBtn.on(event, function () {
          obj.removeClass(className);
      })
  }

  // # 动态监听输入，置按钮可用
  function listenInput(container, inputField, btn) {
      container.on("change input", inputField, function () {
          $(this).val().length > 0 ? btn.prop("disabled", false) : btn.prop("disabled", true)
      })
  }

  // # home页日历(动态填充日历，点击切换不同月份)
  function setCalendar() {
      const date = new Date(); // 获取时间对象
      function addDate() {
          let currentYear = date.getFullYear(); // 获取当前年份
          let currentMonth = date.getMonth(); // 获取当前月份0-11
          let currentDate = date.getDate(); // 获取当前日期
          let week = new Date(currentYear, currentMonth, 1).getDay(); // 获取每个月的第一天是周几
          let dayAmount = new Date(currentYear, currentMonth + 1, 0).getDate(); // 获取每个月天数 
          let monthFullName = ["January", "February", "March", "April", "May", "June", "July", "August",
              "September", "October", "November", "December"
          ];
          $(".view-month").html(monthFullName[currentMonth]); // 更改为当前月份
          $(".view-year").html(currentYear); // 更改为当前年份

          let everyDate = "";
          for (let i = 0; i < week; i++) { // 每个月第一天之前填入空白
              everyDate += "<li></li>";
          }
          for (let i = 1; i <= dayAmount; i++) { // 设置这个月天数
              if (i == currentDate) {
                  everyDate += "<li class='view-day-active'>" + i + "</li>";
              } else {
                  everyDate += "<li class='view-hover-date'>" + i + "</li>";
              }
          }
          $("#view-every-date").html(everyDate);
      }
      addDate(); // 页面第一次进入，进行渲染
      $("#view-calendar-prev").on("click", () => { // 创建前一个月的日期
          date.setMonth(date.getMonth() - 1);
          addDate();
      })
      $("#view-calendar-next").on("click", () => { // 创建后一个月的日期
          date.setMonth(date.getMonth() + 1);
          addDate();
      })
  }
  // # 轮播插画
  // 参数: 超过则置零偏移位的宽度，轮播图的容器，轮播图，每次改变偏移位的时间
  function shuffling(overWidth, container, item, speed) {
      let offset = 0; // 偏移位
      let timer; // 定时器
      function autoPlay() {
          timer = setInterval(function () {
              offset += -10;
              if (offset <= overWidth) { // 超过四张图片宽度
                  offset = 0;
              }
              container.css("marginLeft", offset); // 将ul的marginLeft修改为偏移值
          }, speed);
      }
      autoPlay();
      item.hover(function () { // 鼠标移入停止播放，移出继续播放
          clearInterval(timer);
      }, function () {
          autoPlay();
      })
  }
  // # 搜索框特效
  function searchBoxEffects() {
      $(".search-input-field").focus(function () { // 搜索框绑定获得焦点事件
          $(this).stop().animate({ // 搜索框设置宽度增加动画
              width: "400px",
          }, 500);
          $(this).addClass("search-active"); // 搜索框样式变化
          $(".search-icon").addClass("search-icon-active"); // 搜索按钮样式变化
      });
      $(".search-input-field").blur(function () { // 搜索框绑定失去焦点事件
          $(this).stop().animate({ // 搜索框设置宽度减小动画
              width: "200px",
          }, 500);
          $(this).removeClass("search-active"); // 搜索框样式变回
          $(".search-icon").removeClass("search-icon-active"); // 搜索按钮样式变回
          // $(".hide-search-box").slideUp(200);
      })
  }
  // # home页隐藏菜单的出现和隐藏
  function showImplicitMenu() {
      $(".switch").on("click", function () {
          let check = $("#checkbox").prop("checked"); // 获取当前checked值
          if (!check) {
              $(".home-container").animate({ // 容器宽度增加
                  width: "1030px"
              }, 500);
          } else {
              $(".home-container").animate({ // 容器宽度减小
                  width: "980px"
              }, 500);
          }
      })
      $(".implicit-menu>li").on("click", function () {
          $(this).children(".home-sub-menu").stop().slideToggle(600); // 切换二级菜单（展开）
          $(this).siblings().children(".home-sub-menu").stop().slideUp(600); // 非当前二级菜单收起
      });
  }

  // # 读取本地数据
  function getData(localName) { // 读取本地存储的数据(转换为字符串格式)
      let data = localStorage.getItem(localName);
      if (data != null) {
          // 本地存储的数据是字符串格式的，要先转换为对象格式
          return JSON.parse(data);
      } else { // 没有数据，返回空对象(数组形式储存)
          return [];
      }
  }
  // ~ 将数据存到本地
  function saveData(localItem, localData) {
      localStorage.setItem(localItem, JSON.stringify(localData));
  }

  // ~ 将本地数据(to do list and done list)渲染到页面上
  function loadData() {
      let data = getData("toDoList"); // 读取本地存储的数据
      // 遍历之前清空ol和ul的内容
      $("#toDoList").empty();
      $("#doneList").empty();
      let todoCount = 0; // 正在进行事件数
      let doneCount = 0; // 已完成事件数
      $.each(data, function (index, eachData) { // 遍历本地存储的数据
          // done属性若为true，表明已完成，添加到doneList里
          if (eachData.done) {
              $("#doneList").prepend(`<li>
      <input type='checkbox' id="d${(index + 1)}" checked>
      <label class='label-input' for="d${(index + 1)}"></label>
      <p>${eachData.title}</p>
      <a href='javascript:;' data-id="${index}">
          <i class='task-del-icon'>&#xe607;</i>
      </a>
      <span class='task-label'>In Review</span>
  </li>`);
              doneCount++;
          } else {
              $("#toDoList").prepend(`<li>
            <input type='checkbox' id="c${(index + 1)}">
            <label class='label-input' for="c${(index + 1)}"></label>
            <p>${eachData.title}</p>
            <a href='javascript:;' data-id="${index}">
                <i class='task-del-icon'>&#xe607;</i>
            </a>
            <span class='task-label'>In Progress</span>
        </li>`);
              todoCount++;
          }
          if (index > 4) {
              index = 1;
          }
      });
      // 事件数填充到页面上
      $(".todo-count").text(todoCount);
      $(".done-count").text(doneCount);
  }
  // ~ 将本地数据(meeting list)渲染到页面上
  function loadMeeting() {
      let data = getData("meetingList"); // 读取本地存储的数据
      $(".meeting-list").empty();
      $.each(data, function (index, eachData) { // 遍历本地存储的数据
          $(".meeting-list").prepend(`<li class="meeting-item">
        <p class="meeting-detail-time">
            <span class="fromHour">${eachData.fromHour}</span>:
            <span class="fromMin">${eachData.fromMin}</span>-
            <span class="toHour">${eachData.toHour}</span>:
            <span class="toMin">${eachData.toMin}</span>
        </p>
        <p class="meeting-detail-event">
           ${eachData.event}
        </p>
        <span class="delete-meeting-event" data-name="${index}">
            <i>&#xe607;</i>
        </span>
    </li>`);
      });
  }

  // ~ toDoList 的移入移出
  function setToDoListDetail() {
      //  鼠标移入，每条任务的input框(label)改为正常透明度
      $("#toDoList").on("mouseenter", ".label-input", function () {
          $(this).css("opacity", "1");
      })
      //  鼠标移出，每条任务的input框(label)透明度变小
      $("#toDoList").on("mouseleave", ".label-input", function () {
          $(this).css("opacity", "0.6");
      })
      //  鼠标移入，出现删除图标
      $("#toDoList,#doneList").on("mouseenter", "li", function () {
          $(this).find(".task-del-icon").addClass("show");
      })
      //  鼠标移出，隐藏删除图标
      $("#toDoList,#doneList").on("mouseleave", "li", function () {
          $(this).find(".task-del-icon").removeClass("show");
      })
  }
  // ~ 生成当前时间
  function getTime() {
      const date = new Date();
      let arr = [
          date.getMonth() + 1 + "-",
          date.getDate() + " ",
          date.getHours() + ":",
          date.getMinutes(),
          //   date.getSeconds()
      ];
      return arr.join("");
  }
  // ~ 获取子元素在父元素中的索引
  function getIndex(e) {
      let index = 0;
      while (e && (e = e.previousElementSibling)) index++;
      return index;
  }

  // ~ 用户点赞，点倒赞操作
  function userAction(container, item, className) {
      let actionValue = parseInt(item.text()); // 获取当前点赞/倒赞数，转化为整型
      item.text(actionValue + 1);
      container.addClass(className);
  }
  // ~ 显示当前时间
  function getCurrentTime() {
      let time = new Date();
      let hour = time.getHours();
      let minute = time.getMinutes();
      if (minute < 10) minute = "0" + minute;
      $(".current-time").html("<span>" + hour + ":" + minute + "</span>");
      let t = setTimeout(getCurrentTime, 1000); // 设定定时器，循环运行
  }
  // ~ 输入不合法时添加类
  function addInvalidClass(obj1, obj2, invalidClass1, invalidClass2, isAdd) {
      if (isAdd) {
          obj1.addClass(invalidClass1);
          obj2.addClass(invalidClass2);
      } else {
          obj1.removeClass(invalidClass1);
          obj2.removeClass(invalidClass2);
      }
  }
  // ~ 实现瀑布流 所在页面显示出来之后再调用
  function waterFall() {
      // 获取主容器宽度
      const wrapper = document.getElementsByClassName("photo-wrapper")[0];
      const wrapperWidth = wrapper.offsetWidth;
      // 获取单个图片(容器)宽度
      const contents = wrapper.children;
      const contentsWidth = contents[0].offsetWidth;
      // 计算第一行可以排列多少张图片，向下取整
      const num = ~~(wrapperWidth / contentsWidth);
      // 收集第一排的高度
      let arrHeight = [];
      for (let i = 0; i < contents.length; i++) {
          if (i < num) { // 第一行图片高度添加进数组
              arrHeight.push(contents[i].offsetHeight);
          } else { // 第一行之后其他行的情况
              let obj = { // 创建高度元素对象，储存最小高度
                  minHeight: arrHeight[0],
                  minIndex: 0
              };
              for (let j = 0; j < arrHeight.length; j++) {
                  if (arrHeight[j] <= obj.minHeight) { // 找到第一行最小高度
                      obj.minHeight = arrHeight[j];
                      obj.minIndex = j;
                  }
              }
              contents[i].style.position = "absolute"; // 单个容器设置绝对定位
              contents[i].style.left = contents[obj.minIndex].offsetLeft + "px"; // 其left值就是第一行最小高度的容器的left值
              contents[i].style.top = obj.minHeight + "px"; // 其top值就是第一行最小高度的容器的高度
              arrHeight[obj.minIndex] = arrHeight[obj.minIndex] + contents[i].offsetHeight; // 更新最小高度为之前的最小高度+当前新增的容器高度
          }
      }
  }