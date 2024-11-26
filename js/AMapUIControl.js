// ! 需要引入UI组件库
// 由于数据展示图层使用的另外一个脚本（LOCA数据可视化脚本）两者不兼容
// 需要重新定义图层管理器中开关图层的功能

// 设置两个指标对象进行存储图层是否可见
var optHeatmap = { opt: false };
var optPointsLayer = { opt: true };

function setMapLayers(id_name, opt_heatmap, opt_pointsLayer) {
    switch (id_name) {
        case "heatmap":
            // 开启、关闭热力图的展示
            if (opt_heatmap.opt) {
                map.setMapStyle('amap://styles/normal');
                hideHeatmap();
                opt_heatmap.opt = false;
            } else {
                map.setMapStyle('amap://styles/dark');
                showHeatmap();
                opt_heatmap.opt = true;
            }
            break;
        case "pointsLayer":
            if (opt_pointsLayer.opt) {
                hidePointsLayer();
                scatter.hide();
                opt_pointsLayer.opt = false;
            } else {
                showPointsLayer();
                scatter.show();
                opt_pointsLayer.opt = true;
            }
            break;
        default:
    }
}

var layerCtrl;
AMapUI.loadUI(["control/BasicControl"], function (BasicControl) {
    // 缩放控件对象
    var zoomCtrl = new BasicControl.Zoom({
        theme: "light",
        position: {
            bottom: "30px",
            left: "30px"
        },
        showZoomNum: false
    });

    layerCtrl = new BasicControl.LayerSwitcher({
        theme: "light",
        position: {
            bottom: "230px",
            left: "30px"
        },
        baseLayers: [
        ],
        overlayLayers: [
            {
                enable: false,
                id: "heatmap",
                name: "智能基础设施分布热力图",
                layer: heatmap,
            },
            {
                enable: true,
                id: "pointsLayer",
                name: "桥梁点",
                layer: pointsLayer,
            },
            {
                enable: false,
                id: "standard",
                name: "标准图",
                layer: new AMap.TileLayer(),
            },
            {
                enable: true,
                id: "satellite",
                name: "卫星图",
                layer: customTileLayer
            },
            {
                id: "traffic",
                name: "路况图",
                layer: new AMap.TileLayer.Traffic(),
            },
            {
                id: "roadNet",
                name: "路网图",
                layer: new AMap.TileLayer.RoadNet(),
            },
        ]
    });

    map.setLayers(layerCtrl.getEnabledLayers());

    // 重写图层开启关闭功能
    // ! 需要写到AMapUI.loadUI(...) 里面才能生效
    layerCtrl._eventHandlers["layerInputClick"] = function (e) {
        e.stopPropagation();
        var target = this;
        var layerId = target.getAttribute("data-layer-id");
        if ("INPUT" === target.tagName) {
            layerCtrl.syncPropsFromUI();
            layerCtrl._refreshMapLayers();
        }
        setMapLayers(layerId, optHeatmap, optPointsLayer, optPathsLayer);
    }
    // 添加控件
    map.addControl(zoomCtrl);
    map.addControl(layerCtrl);

    loca.animate.start();
});
