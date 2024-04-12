<template>
    <div id="china_map_box">
        <div id="china_map"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import 'echarts/map/js/china.js'
export default {
    data() {
        return {
            //echart 配制option  
            options: {
                tooltip: {
                    triggerOn: "mousemove",   //mousemove、click
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#409eff',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    textStyle: {
                        color: '#000000',
                        fontSize: 13
                    },
                    formatter: function (e, t, n) {
                        let data = e.data;
                        //模拟数据
                        data.specialImportant = Math.random() * 1000 | 0;
                        data.import = Math.random() * 1000 | 0;
                        data.compare = Math.random() * 1000 | 0;
                        data.common = Math.random() * 1000 | 0;
                        data.specail = Math.random() * 1000 | 0;

                        let context = `
               <div>
                   <p><b style="font-size:15px;">${data.name}</b>(2020年第一季度)</p>
                   <p class="tooltip_style"><span class="tooltip_left">事件总数</span><span class="tooltip_right">${data.value}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">特别重大事件</span><span class="tooltip_right">${data.specialImportant}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">重大事件</span><span class="tooltip_right">${data.import}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">较大事件</span><span class="tooltip_right">${data.compare}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">一般事件</span><span class="tooltip_right">${data.common}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">特写事件</span><span class="tooltip_right">${data.specail}</span></p>
               </div>
            `
                        return context;
                    }
                },
                visualMap: {
                    show: true,
                    left: 26,
                    bottom: 40,
                    showLabel: true,
                    pieces: [
                        {
                            gte: 100,
                            label: ">= 1000",
                            color: "#1f307b"
                        },
                        {
                            gte: 500,
                            lt: 999,
                            label: "500 - 999",
                            color: "#3c57ce"
                        },
                        {
                            gte: 100,
                            lt: 499,
                            label: "100 - 499",
                            color: "#6f83db"
                        },
                        {
                            gte: 10,
                            lt: 99,
                            label: "10 - 99",
                            color: "#9face7"
                        },
                        {
                            lt: 10,
                            label: '<10',
                            color: "#bcc5ee"
                        }
                    ]
                },
                geo: {
                    map: "china",
                    scaleLimit: {
                        min: 1,
                        max: 2
                    },
                    zoom: 1,
                    top: 120,
                    label: {
                        normal: {
                            show: true,
                            fontSize: "14",
                            color: "rgba(0,0,0,0.7)"
                        }
                    },
                    itemStyle: {
                        normal: {
                            //shadowBlur: 50,
                            //shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: "#f2d5ad",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderWidth: 0
                        }
                    }
                },
                series: [
                    {
                        name: "突发事件",
                        type: "map",
                        geoIndex: 0,
                        data: []
                    }
                ]
            },
            //echart data
            dataList: [
                {
                    name: "南海诸岛",
                    value: 100,
                    eventTotal: 100,
                    specialImportant: 10,
                    import: 10,
                    compare: 10,
                    common: 40,
                    specail: 20
                },
                {
                    name: "北京",
                    value: 740
                },
                {
                    name: "天津",
                    value: 630
                },
                {
                    name: "上海",
                    value: 800
                },
                {
                    name: "重庆",
                    value: 750
                },
                {
                    name: "河北",
                    value: 270
                },
                {
                    name: "河南",
                    value: 230
                },
                {
                    name: "云南",
                    value: 110
                },
                {
                    name: "辽宁",
                    value: 100
                },
                {
                    name: "黑龙江",
                    value: 200
                },
                {
                    name: "湖南",
                    value: 690
                },
                {
                    name: "安徽",
                    value: 430
                },
                {
                    name: "山东",
                    value: 500
                },
                {
                    name: "新疆",
                    value: 54
                },
                {
                    name: "江苏",
                    value: 689
                },
                {
                    name: "浙江",
                    value: 788
                },
                {
                    name: "江西",
                    value: 210
                },
                {
                    name: "湖北",
                    value: 224
                },
                {
                    name: "广西",
                    value: 50
                },
                {
                    name: "甘肃",
                    value: 47
                },
                {
                    name: "山西",
                    value: 95
                },
                {
                    name: "内蒙古",
                    value: 12
                },
                {
                    name: "陕西",
                    value: 22
                },
                {
                    name: "吉林",
                    value: 4
                },
                {
                    name: "福建",
                    value: 18
                },
                {
                    name: "贵州",
                    value: 5
                },
                {
                    name: "广东",
                    value: 298
                },
                {
                    name: "青海",
                    value: 1
                },
                {
                    name: "西藏",
                    value: 0
                },
                {
                    name: "四川",
                    value: 44
                },
                {
                    name: "宁夏",
                    value: 14
                },
                {
                    name: "海南",
                    value: 22
                },
                {
                    name: "台湾",
                    value: 3
                },
                {
                    name: "香港",
                    value: 5
                },
                {
                    name: "澳门",
                    value: 55
                }
            ]
        };
    },
    methods: {
        //初始化中国地图
        initEchartMap() {
            let mapDiv = document.getElementById('china_map');
            let myChart = echarts.init(mapDiv);
            myChart.setOption(this.options);
        },
        //修改echart配制
        setEchartOption() {
            this.options.series[0]['data'] = this.dataList;
        }
    },
    created() {
        this.setEchartOption();
    },
    mounted() {
        this.$nextTick(() => {
            this.initEchartMap();
        })

    }
};
</script>

<style scoped>
#china_map_box {
    height: 100%;
    position: relative;
}

#china_map_box #china_map {
    height: 100%;
}

#china_map_box .china_map_logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
}
</style>
<style>
#china_map .tooltip_style {
    line-height: 1.7;
    overflow: hidden;
}

#china_map .tooltip_left {
    float: left;
}

#china_map .tooltip_right {
    float: right;
}
</style>
