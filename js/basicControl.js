// ! 需要引入高德地图 api 2.0 js 脚本
// 创建地图
var map = new AMap.Map("container", {
    // 设置为全国显示范围
    center: [120.146609, 30.239],
    zoom: 6,
    zooms: [3, 16], // 限制地图的缩放等级范围
    resizeEnable: true,
    viewMode: '3D',
    pitch: 40, // 仰角
});

map.setMapStyle('amap://styles/light');

function hidddenByClassName(className) {
    var element = document.getElementsByClassName(className);
    for (var i = 0; i < element.length; i += 1) {
        element[i].style.display = "none";
    }
}

function showByClassName(className) {
    var element = document.getElementsByClassName(className);
    for (var i = 0; i < element.length; i += 1) {
        element[i].style.display = "block";
    }
}

var nav_info = document.getElementById("nav-info");
var search_info = document.getElementById("search-info");

function closeNavInfo() {
    nav_info.style.display = "none";
}
function closeSearchInfo() {
    search_info.style.display = "none";
}

function showNavInfo() {
    nav_info.style.display = "block";
}
function showSearchInfo() {
    search_info.style.display = "block";
}

function closeTools() {
    hidddenByClassName("input-card");
    hidddenByClassName("measureTools");
    hidddenByClassName("drawTools");
    hidddenByClassName("navigationTools");
    closeNavInfo();
}
