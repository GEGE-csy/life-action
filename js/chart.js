$(function(){
    // home页 柱状图
    (function(){
         // 1.实例化对象 
        let myChart = echarts.init(document.getElementsByClassName("weekly-progress-chart")[0]);
        // 2.指定配置项和数据
        let option = {
            color: ["#fff"],
            tooltip: {
                backgroundColor: "#fe6b57",
                borderColor: "#fff",
                borderWidth: "1", //边框宽度设置1
                textStyle: {
                    color: "#fff" //设置文字颜色
                },
                borderRadius: 8 //边框圆角
            },
            grid: {
                // 距离上端的距离
                top: '10%',
                // 距离左端的距离
                left: '-5%',
                right: '15%',
                bottom: '10%',
                width: '210px',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                // x轴刻度线
                axisTick: {
                    alignWithLabel: true //显示刻度线
                },
                // x轴的标签
                axisLabel: {
                    // 刻度标签的颜色
                    color: "#fff",
                    fontSize: "12",
                    // 不隐藏x轴数值
                    interval: 0
                },
                // x轴
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff', //左边线的颜色
                        width: '1' //坐标线的宽度
                    }
                },
            }],
            yAxis: [{
                show: false,
                type: 'value'
            }],
            series: [{
                name: 'completed amount',
                type: 'bar',
                // 柱子粗细
                barWidth: '60%',
                data: [300, 522, 200, 334, 390, 330, {
                    // 对最后一根柱子单独设置样式
                    value: 220,
                    itemStyle: {
                        color: "#f5ba07"
                    }
                }]
            }]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);
    })();
    // data页 折线图
    (function(){
        let myChart = echarts.init(document.getElementsByClassName("data-line-chart")[0]);
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 提示线
                    lineStyle:{
                        color: "#99cac2",
                        width: 2,              
                    }
                },
                extraCssText: 'box-shadow: 14px 8px 6px 0px rgba(57, 50, 50, 0.16);',
                backgroundColor: "#fff",
                borderColor: "#99cac2",
                borderWidth: "2", //边框宽度设置1
                textStyle: {
                    color: "#99cac2" //设置文字颜色
                },
                borderRadius: 8 //边框圆角
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: "0",
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['6:30am', '7:30am','8:30am', '9:30pm','10:30am', '11:30am','12:30pm','13:30pm','14:30pm','15:30pm', '16:30pm','17:30pm','18:30pm','19:30pm','20:30pm','21:30pm','22:30pm'],
                    axisTick: {		//x轴刻度线
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: " #f5f4f4"
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#99cac2'
                        },
                        // 标签隔一个显示一个
                        interval: 2,
                    },

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false,
                },
                
            ],
            series: [
                {
                    name: 'completion',
                    type: 'line',
                    // 线条样式
                    lineStyle: {
                        width: 2,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [62, 362, 51, 200, 90, 240, 110,123,280,62, 362, 81, 214, 130, 270, 110,123,250,],
                    smooth:true,
                    // 折线下面的填充区域
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#99cac2'
                        }, {
                            offset: 0.8,
                            color: '#fff'
                        }])
                    },
                    // 拐点颜色
                    itemStyle: {
                        color: "#99cac2",
                    },
                    // 开始不显示，鼠标经过时显示拐点
                    showSymbol:false,
                },
            ]
        };
        myChart.setOption(option);
    })();
    // data页 柱状图
    (function(){
        let myChart = echarts.init(document.getElementsByClassName("data-bar-chart")[0]);
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { 
                    type: 'shadow', 
                    shadowStyle: {
                        // 触碰时条状的阴影颜色
                        color: 'rgba(153,202,194,0.2)',
                    },
                },  
                textStyle: {
                    color: "#2e2e30" //设置文字颜色
                },
                // 提示框阴影
                extraCssText: 'box-shadow: 14px 8px 6px 0px rgba(57, 50, 50, 0.16);',
                backgroundColor: "#fff",
                borderColor: "#fff",
                borderWidth: "1", //边框宽度设置1
                borderRadius: 5 //边框圆角
            },
            legend: {
                data: ['Completed task', 'Uncompleted task'],
                // 垂直放
                orient: 'vertical',
                bottom: '0',
                left: '2%',
                // 图例组件小图标的大小
                itemWidth: 20,
                itemHeight: 10,
                // 图例组件的文字
                textStyle: {
                    color:"black",
                    fontSize: "12",
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '35%',
                top: '2%'
            },
            xAxis: {
                type: 'category',
                data:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                axisTick: { // x轴刻度隐藏
                    show:false
                },
                axisLine: { // x轴颜色
                    lineStyle: {
                        color:"rgba(188,186,186,0.3)",
                    },
                },
                axisLabel: { // x轴标签颜色和间隔
                    color:'#2e2e30',
                    interval: 1,
                },
            },
            yAxis: {
                type: 'value',
                // 网格线
                splitLine: {
                   lineStyle:{
                        color:"rgba(188,186,186,0.3)"
                    }
                },
                axisTick: {
                    show:false
                },
                axisLine: {
                    show:false,
                },
                axisLabel:{
                    show:false
                },
            },
            series: [
                {
                    name: 'Completed task',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: false
                    },
                    color: '#54b9a9',
                    emphasis: {
                        focus: 'series'
                    },
                    barWidth: "35%",
                    itemStyle: {
                        barBorderRadius: 28
                    },
                    data: [80, 180, 101, 250, 135, 130, 120,80, 180, 101, 250, 135]
                },
                {
                    name: 'Uncompleted task',
                    type: 'bar',
                    stack: 'total',
                    label: {
                         show: false
                    },
                    color: 'rgba(254,107,87,0.81)',
                    emphasis: {
                        focus: 'series'
                    },
                    barWidth: "35%",
                    itemStyle: {
                        barBorderRadius: 28
                    },
                    data: [150, 132, 101, 134, 80, 230, 110,150, 132, 101, 134, 80,]
                },
        
            ]
        };
        myChart.setOption(option);
    })();
})
