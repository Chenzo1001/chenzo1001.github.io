// ! 需要引入路线规划相关插件
// 存储用户输入的导航起点和终点
var startName = '';
var endName = '';
var navigationType = "driving";
var functionType = AMap.DrivingPolicy.LEAST_TIME;

// 绑定 input 地点输入框, 对输入的内容进行监听
var inputStartName = document.getElementById("startName");
var inputEndName = document.getElementById("endName");
inputStartName.addEventListener("change", function (e) {
    startName = inputStartName.value;
});
inputEndName.addEventListener("change", function (e) {
    endName = inputEndName.value;
});

function setInputStartName(name) {
    inputStartName.value = name;
    startName = inputStartName.value;
}

function setInputEndName(name) {
    inputEndName.value = name;
    endName = inputEndName.value;
}


// 绑定选择出行方式的按钮
var navigationTypeRadios = document.getElementsByName("navigationType");
for (var i = 0; i < navigationTypeRadios.length; i += 1) {
    navigationTypeRadios[i].onchange = function (e) {
        navigationType = e.target.value;
    }
}

// 匹配选择的路线方案
function selectFunctionType(type) {
    switch (type) {
        // 时间最短
        case '0': {
            functionType = AMap.DrivingPolicy.LEAST_TIME;
            break;
        }
        // 花费最少
        case '1': {
            functionType = AMap.DrivingPolicy.LEAST_FEE;
            break;
        }
        // 距离最短
        case '2': {
            functionType = AMap.DrivingPolicy.LEAST_DISTANCE;
            break;
        }
        // 考虑实时路况
        case '3': {
            functionType = AMap.DrivingPolicy.REAL_TRAFFIC;
            break;
        }
    }
}

// 绑定选择路线方案的按钮
var functionTypeRadios = document.getElementsByName("functionType");
for (var i = 0; i < functionTypeRadios.length; i += 1) {
    functionTypeRadios[i].onchange = function (e) {
        selectFunctionType(e.target.value);
    }
}

// 构造驾车路线导航对象
var driving = new AMap.Driving({
    map: map,
    panel: "nav-info",
    policy: functionType
});

// 构造公交路线导航对象
var transfer = new AMap.Transfer({
    map: map,
    panel: "nav-info",
    nightflag: true, // 是否计算夜班车
    city: '广州市', // 这里必须指定城市才能搜索, 但是用户输入的地点可以不是这个城市里面的
    policy: functionType
});

// 构造步行路线导航对象
var walking = new AMap.Walking({
    map: map,
    panel: "nav-info",
    policy: functionType
});

// 匹配出行方式, 进行不同的规划导航函数
function navigation(type) {
    switch (type) {
        // 驾车路线规划导航
        case "driving": {
            driving.search([
                { keyword: startName },
                { keyword: endName }
            ], function (status, result) {
                if (status === "complete") {
                    // 显示具体导航信息窗口
                    showNavInfo();
                    console.log("ss")
                }
                else {
                    // 关闭信息窗口
                    closeNavInfo();
                    alert("输入的地点无法识别! 请重新尝试!")
                }
            });
            break;
        }
        // 公交路线规划导航
        case "transfer": {
            transfer.search([
                { keyword: startName },
                { keyword: endName }
            ], function (status, result) {
                if (status === "complete") {
                    // 显示具体导航信息窗口
                    showNavInfo();
                }
                else {
                    // 关闭信息窗口
                    closeNavInfo();
                    alert("输入的地点无法识别! 请重新尝试!")
                }
            });
            break;
        }
        // 步行路线规划导航
        case "walking": {
            walking.search([
                { keyword: startName },
                { keyword: endName }
            ], function (status, result) {
                if (status === "complete") {
                    // 显示具体导航信息窗口
                    showNavInfo();
                }
                else {
                    // 关闭信息窗口
                    closeNavInfo();
                    alert("输入的地点无法识别! 请重新尝试!")
                }
            });
            break;
        }
    }
}

// 清空路径规划结果
function clearNavigationResult() {
    driving.clear();
    transfer.clear();
    walking.clear();
}

// 绑定开始导航按钮
document.getElementById("navigation_button_start").onclick = function () {
    // 清除上一次的结果
    clearNavigationResult();
    navigation(navigationType);
    // console.log(startName,endName,navigationType,functionType);
}

// 绑定关闭导航按钮
document.getElementById("navigation_button_close").onclick = function () {
    // 关闭功能界面窗口, 同时清楚导航搜索结果
    closeTools();
    clearNavigationResult();
}

// 绑定打开导航界面功能的按钮
document.getElementById("navigationTools_button").onclick = function () {
    closeTools();
    showByClassName("input-card");
    showByClassName("navigationTools");
}