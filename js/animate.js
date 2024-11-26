function animate() {
    var speed = 1;
    map.setZoom(9, true);
    map.setPitch(30, true);
    map.setCenter([120.115093, 30.24349], true);
    map.setRotation(1, true);
    pl.hide(3000);

    // 下钻
    loca.viewControl.addAnimates([{
        pitch: {
            value: 30,
            control: [[0, 20], [1, 0]],
            timing: [0, 0, 0.8, 1],
            duration: 3000 / speed,
        },
        zoom: {
            value: 15,
            control: [[0, 13.8], [1, 15]],
            timing: [0, 0.5, 0.8, 1],
            duration: 3000 / speed,
        },
        rotation: {
            value: -20,
            control: [[0, 20], [1, -20]],
            timing: [0, 0, 0.8, 1],
            duration: 2000 / speed,
        },
    }], function () {
        setTimeout(function () {
            pl.show(2000);
        }, 3000);

        loca.viewControl.addAnimates([
            {
                //平移
                center: {
                    value: [120.151423, 30.208532],
                    control: [[120.125, 30.21], [120.139, 30.23]],
                    timing: [0.3, 0, 0.1, 1],
                    duration: 4000 / speed,
                },
                pitch: {
                    value: 50,
                    control: [[0.3, 0], [1, 50]],
                    timing: [0.3, 0, 1, 1],
                    duration: 3000 / speed,
                },
                rotation: {
                    value: -150,
                    control: [[0, -40], [1, -150]],
                    timing: [0, 0, 1, 1],
                    duration: 1000 / speed,
                },
                zoom: {
                    value: 14,
                    control: [[0.3, 13], [1, 14]],
                    timing: [0.3, 0, 0.7, 1],
                    duration: 4000 / speed,
                }
            },
            {
                //平移
                center: {
                    value: [120.163182, 30.260156],
                    control: [[120.141453, 30.25489], [120.146732, 30.258263]],
                    timing: [0.3, 0, 0.1, 1],
                    duration: 6000 / speed,
                },
                zoom: {
                    value: 16,
                    control: [[0.3, 15], [1, 17]],
                    timing: [0.3, 0, 0.7, 1],
                    duration: 8000 / speed,
                },
                pitch: {
                    value: 50,
                    control: [[0.3, 0], [1, 50]],
                    timing: [0.3, 0, 1, 1],
                    duration: 3000 / speed,
                },
                rotation: {
                    value: -80,
                    control: [[0, -20], [1, -80]],
                    timing: [0, 0, 1, 1],
                    duration: 4000 / speed,
                },
            }, {
                // 环绕
                pitch: {
                    value: 50,
                    control: [[0, 40], [1, 50]],
                    timing: [0.3, 0, 1, 1],
                    duration: 5000 / speed,
                },
                rotation: {
                    value: 260,
                    control: [[0, -80], [1, 260]],
                    timing: [0, 0, 0.7, 1],
                    duration: 5000 / speed,
                },
                zoom: {
                    value: 16.5,
                    control: [[0.3, 16], [1, 16.5]],
                    timing: [0.3, 0, 0.9, 1],
                    duration: 4000 / speed,
                },
            }, {
                // 拉起
                center: {
                    value: [120.133038, 30.249067],
                    control: [[120.165998,
                        30.264167], [120.121217,
                        30.253096]],
                    timing: [0.3, 0, 0.7, 1],
                    duration: 2000 / speed,
                },
                pitch: {
                    value: 0,
                    control: [[0, 0], [1, 100]],
                    timing: [0.1, 0, 0.7, 1],
                    duration: 2000 / speed,
                },
                rotation: {
                    value: 361,
                    control: [[0, 260], [1, 361]],
                    timing: [0.3, 0, 0.7, 1],
                    duration: 2000 / speed,
                },
                zoom: {
                    value: 12.5,
                    control: [[0, 17.5], [1, 12.5]],
                    timing: [0.3, 0, 0.7, 1],
                    duration: 2500 / speed,
                },
            }], function () {
                pl.hide(1000);
            });
    });
}
