// ! 需要引入 mouseTool 插件
// 新建鼠标工具
var mouseTool = new AMap.MouseTool(map);

// 存储当前功能对象
var recentFunc = "";

// 存储画好的覆盖物
var overlays = [];
mouseTool.on('draw', function (e) {
    // 如果是测量则不存储
    if (recentFunc != 'rule' && recentFunc != 'measureArea') {
        overlays.push(e.obj);
    }
})

// 匹配对应的功能: 绘图\测量
function draw(type) {
    switch (type) {
        // 距离测量
        case 'rule': {
            mouseTool.rule({
                // 配置显示的样式
                startMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        // 这里如果不加 https 是加载不到图片的
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                endMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                midMarkerOptions: {
                    icon: new AMap.Icon({
                        size: new AMap.Size(19, 31),//图标大小
                        imageSize: new AMap.Size(19, 31),
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
                    }),
                    offset: new AMap.Pixel(-9, -31)
                },
                lineOptions: {
                    strokeStyle: "solid",
                    strokeColor: "#FF33FF",
                    strokeOpacity: 1,
                    strokeWeight: 2
                }
            });
            break;
        }
        // 面积测量
        case 'measureArea': {
            mouseTool.measureArea({
                // 配置样式
                strokeColor: '#80d8ff',
                fillColor: '#80d8ff',
                fillOpacity: 0.3
            });
            break;
        }
        // 画点
        case 'marker': {
            mouseTool.marker({
                // 默认鼠标点击位置和图片左上角对齐,需要偏移调整效果
                offset: [-10, -20],
                // 默认的 icon 无法加载 
                icon: "./resource/img/position_icon.png"
            });
            break;
        }
        // 画线
        case 'polyline': {
            mouseTool.polyline({
                strokeColor: '#BC4248'
            });
            break;
        }
        // 画面
        case 'polygon': {
            mouseTool.polygon({
                fillColor: '#00b0ff',
                strokeColor: '#80d8ff'
            });
            break;
        }
        // 画多边形
        case 'rectangle': {
            mouseTool.rectangle({
                fillColor: '#00b0ff',
                strokeColor: '#80d8ff'
            });
            break;
        }
        // 画圆
        case 'circle': {
            mouseTool.circle({
                fillColor: '#00b0ff',
                strokeColor: '#80d8ff'
            });
            break;
        }
    }
}

// 清除覆盖物
function clearOverlays() {
    if (overlays.length > 0) {
        map.remove(overlays);
        overlays = [];
    }
}

// 关闭工具, 并且隐藏功能界面
function closeMouseTools() {
    //关闭工具
    mouseTool.close(true);
    // 取消所有功能勾选
    for (var i = 0; i < mouseToolsRadios.length; i += 1) {
        mouseToolsRadios[i].checked = false;
    }
    // 隐藏界面
    closeTools();
}

// 初始隐藏全部功能选项界面
closeTools();

// 绑定显示\隐藏功能界面的按钮的事件
document.getElementById('measureTools_button').onclick = function () {
    closeMouseTools(); // 关闭其他功能页面
    showByClassName("input-card");
    showByClassName("measureTools");
};
document.getElementById('drawTools_button').onclick = function () {
    closeMouseTools(); // 关闭其他功能页面
    showByClassName("input-card");
    showByClassName("drawTools");
};

// 绑定触发绘图\测量功能的按钮
var mouseToolsRadios = document.getElementsByName('mouseTools');
for (var i = 0; i < mouseToolsRadios.length; i += 1) {
    mouseToolsRadios[i].onchange = function (e) {
        draw(e.target.value)
        recentFunc = e.target.value;
    }
}

// 绑定触发关闭工具的按钮
document.getElementById('close-measure').onclick = closeMouseTools;
document.getElementById('close-draw').onclick = function () {
    closeMouseTools();
    // 将覆盖物加载到地图(要先关闭 mouseTools)
    if (overlays.length > 0) {
        map.add(overlays);
    }
}

// 绑定清除上一个覆盖物的按钮的事件
document.getElementById('clear-draw').onclick = function () {
    if (overlays.length >= 1) {
        // 弹出最后一个覆盖物
        map.remove(overlays[overlays.length - 1]);
        overlays.pop();
    }
};

// 绑定清空覆盖物按钮
document.getElementById('clear-all-draw').onclick = function () {
    clearOverlays();
};