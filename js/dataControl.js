var loca = window.loca = new Loca.Container({
    map,
});
var geo = new Loca.GeoJSONSource({
    data: geojsonSrc
});
var heatmap = new Loca.HeatMapLayer({
    zIndex: 10,
    opacity: 1,
    visible: true,
    zooms: [2, 22],
});

heatmap.setSource(geo, {
    radius: 600,
    unit: 'meter',
    height: 600,
    difference: false,
    gradient: {
        1: '#FF4C2F',
        0.8: '#FAA53F',
        0.6: '#FFF100',
        0.5: '#7DF675',
        0.4: '#5CE182',
        0.2: '#29CF6F',
    },
    value: function (index, feature) {
        return feature.properties.code;
    },
    opacity: [0, 1],
    heightBezier: [0, 0.53, 0.37, 0.98]
});
loca.add(heatmap);


// 新建分布点标注图层
var pointsLayer = new Loca.LabelsLayer({
    zIndex: 15,
    opacity: 1,
    visible: true,
});

// 设置标注图层的数据
pointsLayer.setSource(geo);
// 设置标注图层的样式
pointsLayer.setStyle({
    icon: {
        type: 'image',
        image: null,
        size: [68, 68],
        anchor: 'center',
    },
    text: {
        // 每项配置都可使用回调函数来动态配置
        content: (index, university) => {
            return university.properties.name;
        },
        style: {
            fontSize: 12,
            fontWeight: 'normal',
            fillColor: '#5CDE8E',
            strokeColor: '#000',
            strokeWidth: 2,
        },
        direction: 'bottom',
    },
    extData: (index, university) => {
        return university.properties;
    },
});
loca.add(pointsLayer);

var scatter = new Loca.ScatterLayer({
    loca,
    zIndex: 15,
    opacity: 1,
    visible: true,
})
scatter.setSource(geo);

scatter.setStyle({
    unit: "px",
    size: [100, 100],
    borderWidth: 0,
    texture: './resource/img/breath_red.png',
    duration: 500,
    animate: true,
});

pointsLayer.on('complete', () => {
    var normalMarker = new AMap.Marker({
        offset: [70, -15],
    });
    var labelMarkers = pointsLayer.getLabelsLayer().getAllOverlays();
    for (let marker of labelMarkers) {
        marker.on("click", () => {
            // 点击缩放到该地点
            map.setZoomAndCenter(18, [marker.getExtData().x, marker.getExtData().y]);
            // 展示详情表格数据
            setDetailInfoData(marker.getExtData().name);
        });
        // marker.on('mouseover', (e) => {
        //     // 展示简单的信息
        //     var position = e.data.data && e.data.data.position;
        //     if (position) {
        //         normalMarker.setContent(
        //             '<div class="data-info"><div class="data-info-title">' + marker.getExtData().name + '</div>年代：' + marker.getExtData().type + '</div>',
        //         );
        //         normalMarker.setPosition(position);
        //         map.add(normalMarker);
        //     }
        // });
        // marker.on('mouseout', () => {
        //     map.remove(normalMarker);
        // });
    }
});

var pl = window.pl = new Loca.PolygonLayer({
    zIndex: 120,
    shininess: 10,
    hasSide: true,
    cullface: 'back',
    depth: true,
});

var tileLayerUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';  // 这里需要替换为实际的影像图层瓦片URL

// 创建自定义瓦片图层
var customTileLayer = new AMap.TileLayer({
    getTileUrl: function (x, y, z) {
        return tileLayerUrl.replace('{x}', x).replace('{y}', y).replace('{z}', z);
    },
    tileSize: 256,  // 瓦片大小
    zooms: [0, 19], // 支持的缩放级别，0为全球，19为最大缩放
});

// map.on('complete', function () {
//     loca.animate.start();
//     setTimeout(animate, 2000);
// });

function hideHeatmap() {
    heatmap.hide();
}
function showHeatmap() {
    heatmap.show();
}

function hidePointsLayer() {
    pointsLayer.hide();
}
function showPointsLayer() {
    pointsLayer.show();
}