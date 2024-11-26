var searchName = '';
var placeSearch; // poi搜索对象
var searchInfoClose = document.getElementById("search-info-close");
var keywordSearch_CallBack;

// ! 引入搜索插件
AMap.plugin(["AMap.PlaceSearch"], function () {
    //构造地点查询类
    placeSearch = new AMap.PlaceSearch({
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        // city: "010", // 不要指定兴趣点城市, 不然搜索就只能搜这一个城市的结果了
        citylimit: true,  //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "search-info", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });
});

// 除搜索结果
function clearSearch() {
    searchInfoClose.style.display = "none";
    // 清空地图的搜索结果
    placeSearch.clear();
}

// 初始关闭信息窗口
closeSearchInfo();
// 关闭按钮初始设置为不显示
searchInfoClose.style.display = "none";

// 获取用户输入搜索的地点名称
searchInput = document.getElementById("search_input");
searchInput.addEventListener("change", function (e) {
    // 当搜索框内有内容时才显示清除按钮
    if (searchInput.value != '') {
        searchInfoClose.style.display = "block";
    } else {
        searchInfoClose.style.display = "none";
    }
    searchName = searchInput.value;
});

// 绑定关闭搜索结果按扭
searchInfoClose.onclick = function () {
    // 清空搜索框
    search_input.value = '';
    // 关闭搜索结果
    closeSearchInfo();
    clearSearch();
}

// 绑定搜索按钮
document.getElementById("search").onclick = function () {
    // 打开信息窗口
    showSearchInfo();
    // 如果输入内容不为空，则进行地点搜索
    if (searchName != '') {
        // 进行高德地图 api 关键字查询 pois
        placeSearch.search(searchName, function(status, result) {
            // status=error 说明今天100次查询的额度用完了 
            if (status == "error"){
                alert("今日开发者POI搜索额度已用尽！")
            }else{
                showSearchInfo();
                closeNavInfo();
            }
        });
    }
}

