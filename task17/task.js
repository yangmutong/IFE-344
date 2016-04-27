var EventUtil = {
    addHandler:function(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type,handler);
        }
        else{
            element["on" + type] = handler;
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        }
        else if (element.attachEvent) {
            element.detachEvent("on" + type,handler);
        }
        else{
            element["on" + type] = null;
        }
    }
};

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95', '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];


// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};

//制作尺寸缩放尺函数
function scale(data){
    var max = 0;
    for(var i in data){
        if (max < data[i]){
            max = data[i];
        }
    }

    var sc = 500/max;
    return sc;
}

/**
 * 渲染图表
 */
function renderChart(city,className) {
    var wrap = document.getElementById("aqi-chart-wrap");
    wrap.innerHTML = "";
    var elWidth;
    var count = 0;
    var sca = scale(chartData[city][className]);
    var wrap = document.getElementById("aqi-chart-wrap");
    if(className == "day"){
        elWidth = 6.5;
    }
    else if(className == "week"){
        elWidth = 45;
    }
    else if(className == "month"){
        elWidth = 150;
    }
    console.log(elWidth);
    for (var i in chartData[city][className]){
        count ++;
        var bar = document.createElement("div");
        bar.setAttribute("class",className);
        bar.style.left  = count*elWidth*2;
        bar.style.bottom = 0;
        bar.style.width = elWidth;
        bar.style.height = chartData[city][className][i]*sca;
        console.log(chartData[city][className][i]*sca);
        bar.style.backgroundColor = colors[count%12];
        wrap.appendChild(bar);
    }

}


//renderChart(pageState.nowSelectCity,pageState.nowGraTime);

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(obj) {
    // 确定是否选项发生了变化
    val = obj.value;

    // 设置对应数据
    if(obj.checked && val != pageState.nowGraTime){
        pageState.nowGraTime = val;
        renderChart(pageState.nowSelectCity,pageState.nowGraTime);
        console.log(pageState.nowGraTime,pageState.nowSelectCity);
    }
    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(obj) {
    // 确定是否选项发生了变化
    var city = obj.value;
    // 设置对应数据
    if(city != pageState.nowSelectCity){
        pageState.nowSelectCity = city;
        renderChart(pageState.nowSelectCity,pageState.nowGraTime);
        console.log(pageState.nowGraTime,pageState.nowSelectCity);
    }
    // 调用图表渲染函数

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var time = document.getElementsByName("gra-time");
    for (var i in time){
        (function (m) {
            EventUtil.addHandler(time[m], 'click', function () {
                graTimeChange(time[m])
            })
        })(i);;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    for (var city in aqiSourceData){
        var count = 0;
        var num = 0;
        var weekNum = 0;
        var monthNum1 = 0;
        var monthNum2 = 0;
        var monthNum3 = 0;
        chartData[city] = {};
        chartData[city].week = {};
        chartData[city].month = {};
        chartData[city].day = aqiSourceData[city];
        for (var val in aqiSourceData[city]){
            num = num + aqiSourceData[city][val];
            count++;
            if (count % 7 == 0){
                chartData[city].week["" + weekNum] = num;
                num = 0;
                weekNum ++;
            }

            if(val.slice(5,7) == "01"){
                monthNum1 = monthNum1 + aqiSourceData[city][val];
            }
            else if(val.slice(5,7) == "02"){
                monthNum2 = monthNum2 + aqiSourceData[city][val];
            }
            else if(val.slice(5,7) == "03"){
                monthNum3 = monthNum3 + aqiSourceData[city][val];
            }
            chartData[city].month["一月"] = monthNum1;
            chartData[city].month["二月"] = monthNum2;
            chartData[city].month["三月"] = monthNum3;
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
