///**
// * aqiData，存储用户输入的空气指数数据
// * 示例格式：
// * aqiData = {
// *    "北京": 90,
// *    "上海": 40
// * };
// */
//
//var EventUtil = {
//    addHandler:function(element,type,handler){
//        if (element.addEventListener) {
//            element.addEventListener(type,handler,false);
//        }
//        else if (element.attachEvent) {
//            element.attachEvent("on" + type,handler);
//        }
//        else{
//            element["on" + type] = handler;
//        }
//    },
//    removeHandler:function(element,type,handler){
//        if (element.removeEventListener) {
//            element.removeEventListener(type,handler,false);
//        }
//        else if (element.attachEvent) {
//            element.detachEvent("on" + type,handler);
//        }
//        else{
//            element["on" + type] = null;
//        }
//    }
//};
//var aqiData = {};
//var que = {};
//var cityInput = document.getElementById("aqi-city-input");
//var aqiInput = document.getElementById("aqi-value-input");
//var btn = document.getElementById("add-btn");
//var table = document.getElementById("aqi-table");
//
///**
// * 从用户输入中获取数据，向aqiData中增加一条数据
// * 然后渲染aqi-list列表，增加新增的数据
// */
//function addAqiData() {
//    var city = cityInput.value.trim();
//    var val = aqiInput.value.trim();
//    if (!city.test(/^[A-Za-z\u4E00-\u9FA5]+$/)){
//        alert("请输入中文或者英文字符");
//        return;
//    }
//    if (!val.test(/^\d+$/)){
//        alert("请输入整数");
//        return
//    }
//    aqiData[city] = +val;
//}
//
///**
// * 渲染aqi-table表格
// */
//function renderAqiList() {
//    var head = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
//    var items = "";
//    for (var j in aqiData){
//        que[j] = aqiData[j];
//    }
//
//    aqiData = {};
//    if (que.length != 0){
//        for (var i in que){
//            items += "<tr><td>"+ i +"</td><td>"+que[i]+"</td><td><button>删除</button></td></tr>";
//        }
//        table.innerHTML = items;
//    }
//    else {
//        table.innerHTML = "";
//    }
//}
//
///**
// * 点击add-btn时的处理逻辑
// * 获取用户输入，更新数据，并进行页面呈现的更新
// */
//function addBtnHandle() {
//    addAqiData();
//    renderAqiList();
//}
//
///**
// * 点击各个删除按钮的时候的处理逻辑
// * 获取哪个城市数据被删，删除数据，更新表格显示
// */
//function delBtnHandle(city) {
//    // do sth.
//    delete que[city];
//    renderAqiList();
//}
//
//function init() {
//
//    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
//    EventUtil.addHandler(btn,"click",addBtnHandle());
//    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
//    EventUtil.addHandler(table,"click",function(event){
//        if (event.target.nodeName.toLowerCase() === "button"){
//            delBtnHandle.call(null,event.target.dataset.city);
//        }
//    })
//}
//
//init();

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();

    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })
}

init();