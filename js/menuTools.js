// ! 下面用于设置搜索信息窗口的右键上下文菜单
var poi_name = '';
var menu = document.getElementById('menu');

// 隐藏上下文菜单
menu.style.display = "none";

search_info.oncontextmenu = function (e) {
    //取消默认的浏览器自带右键
    e.preventDefault();
    // 设置上下文菜单位置
    menu.style.top = e.clientY + 'px';
    menu.style.left = e.clientX + 'px';
    // 显示上下文菜单
    menu.style.display = "block";
    // 获取右键点击的poi信息栏的某个信息框中的节点路径，从而得到对应的地名
    var path = e.path;
    // 遍历提取出右键选中的地点名称
    for (var i = 0; i < path.length - 2; i += 1) { // 最后两个不是element类型，无法获取classname，避免报错因此跳过
        // 解析每个 element 元素的类名，得到 "poi-name" 下的地名
        var className = path[i].getAttribute('class');
        if (className == "poibox") {
            poi_name = path[i].innerText.split("\n")[0]; // 获取标签内容
            break;
        }
    }
}

// 关闭右键上下文菜单(左键点击关闭)
document.onclick = function () {
    if (menu.style.display != "none") {
        menu.style.display = "none"
    }
}

// 绑定设置“从这里出发”菜单的功能
document.getElementById("menu-nav-start").onclick = function () {
    if (poi_name != '') {
        setInputStartName(poi_name);
    }
    // 关闭上下文菜单
    menu.style.display = "none";
}

// 绑定设置“到这里去”菜单的功能
document.getElementById("menu-nav-end").onclick = function () {
    if (poi_name != '') {
        setInputEndName(poi_name);
    }
    // 关闭上下文菜单
    menu.style.display = "none";
}

// ! 下面是地图的右键上下文菜单
//创建右键菜单
var contextMenu = new AMap.ContextMenu();

//右键放大
contextMenu.addItem("放大一级", function () {
    map.zoomIn();
}, 0);

//右键缩小
contextMenu.addItem("缩小一级", function () {
    map.zoomOut();
}, 1);

//右键显示全国范围
contextMenu.addItem("缩放至全国范围", function (e) {
    map.setZoomAndCenter(4.75, [108.946609, 34.262324]);
}, 2);

//地图绑定鼠标右击事件——弹出右键菜单
map.on('rightclick', function (e) {
    console.log("Ss")
    contextMenu.open(map, e.lnglat);
    contextMenuPositon = e.lnglat;
});