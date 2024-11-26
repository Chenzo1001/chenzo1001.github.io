// ! 由于使用 api 中的 url 引入数据会设计跨域的问题，在仅使用 js 而没有后端来控制解决这个问题，所以直接用 js 的对象在存放 geojson 数据
const geojsonSrc = {
    "type": "FeatureCollection",
    "name": "structure",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "x": 114.770249,
                "y": 37.721902,
                "name": "赵州桥",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    114.770249,
                    37.721902
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 119.4200,
                "y": 32.3926,
                "name": "中国五亭桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    119.4200,
                    32.3926
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 14.4114,
                "y": 50.0865,
                "name": "查理大桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4114,
                    50.0865
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 4.5353,
                "y": 43.9472,
                "name": "加尔桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.5353,
                    43.9472
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 1.4317,
                "y": 44.4450,
                "name": "瓦伦悌桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    1.4317,
                    44.4450
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 8.3070,
                "y": 47.0511,
                "name": "卡佩尔廊桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.3070,
                    47.0511
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 4.8047,
                "y": 43.9536,
                "name": "阿维尼翁桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.8047,
                    43.9536
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 11.2531,
                "y": 43.7678,
                "name": "维琪奥桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.2531,
                    43.7678
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 8.7554,
                "y": 46.5572,
                "name": "佐兹桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.7554,
                    46.5572
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 91.6824,
                "y": 23.0467,
                "name": "塔瓦纳萨桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    91.6824,
                    23.0467
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 9.7092,
                "y": 46.8388,
                "name": "萨尔基纳山谷桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.7092,
                    46.8388
                ]
            }
        }, {
            "type": "Feature",
            "properties": {
                "x": -3.388726,
                "y": 56.000421,
                "name": "福斯桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -3.388726,
                    56.000421
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": -0.0753,
                "y": 51.5056,
                "name": "伦敦塔桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -0.0753,
                    51.5056
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": -73.9964,
                "y": 40.7057,
                "name": "布鲁克林大桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -73.9964,
                    40.7057
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": -80.0022,
                "y": 40.4347,
                "name": "Smithfield Street Bridge（史密斯菲尔德街大桥）"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -80.0022,
                    40.4347
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "x": 120.1344,
                "y": 30.1953,
                "name": "钱塘江大桥"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    120.1344,
                    30.1953
                ]
            }
        }


    ]
}