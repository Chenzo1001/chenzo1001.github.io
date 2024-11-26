var detailInfo = document.getElementById("data-detail-info");
var lastTable = '';

function showdetailInfo() {
    detailInfo.style.display = "block";
}
function closedetailInfo() {
    detailInfo.style.display = "none";
}

function createTd(tr, text) {
    var td = document.createElement("td");
    td.innerText = text;
    tr.appendChild(td);
}

function createinfButton(tr, path) {
    var td = document.createElement("button");
    td.onclick = function () {
        window.open(path)
    };
    td.style.textAlign = "center";
    td.innerText = "详细信息";
    tr.appendChild(td);
}

function setDetailInfoData(name) {
    // 打开列表窗口显示
    showdetailInfo();
    // 获取数据列表
    var list = detail[name]['list'];
    // 清除上一个数据，新增一个新的数据
    if (lastTable != '') {
        detailInfo.removeChild(lastTable);
    }
    var infoTable = document.createElement("table");
    infoTable.id = "data-detail-info-table";

    var dataTitle = document.createElement("tr");
    createTd(dataTitle, "桥梁类型");
    createTd(dataTitle, "位置");
    createTd(dataTitle, "简介");
    createTd(dataTitle, "详细信息");
    infoTable.appendChild(dataTitle);
    for (var i = 0; i < list.length; i += 1) {
        var tr = document.createElement("tr");
        tr.className = "data-detail-info-tr";
        createTd(tr, list[i]["type"]);
        createTd(tr, list[i]["location"]);
        createTd(tr, list[i]["info"]);
        createinfButton(tr, list[i]["path"])
        infoTable.appendChild(tr);
    }
    detailInfo.appendChild(infoTable);
    lastTable = infoTable;
}

closedetailInfo();

map.on('click', function (e) {
    closedetailInfo();
});