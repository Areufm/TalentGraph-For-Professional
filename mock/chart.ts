export default [
  // 模拟获取个人知识图谱信息
  {
    url: "/api/chart/getUserGraph",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          [
            {
              m: {
                title: "PHP",
              },
              n: {
                id: "[p]1",
                title: "[P]1",
              },
              "type(r)": "技能",
            },
            {
              m: {
                title: "Java",
              },
              n: {
                id: "[p]1",
                title: "[P]1",
              },
              "type(r)": "技能",
            },
            {
              m: {
                title: "JS",
              },
              n: {
                id: "[p]1",
                title: "[P]1",
              },
              "type(r)": "技能",
            },
            {
              m: {
                title: "HTML",
              },
              n: {
                id: "[p]1",
                title: "[P]1",
              },
              "type(r)": "技能",
            },
            {
              m: {
                title: "CSS",
              },
              n: {
                id: "[p]1",
                title: "[P]1",
              },
              "type(r)": "技能",
            },
          ],
          [
            {
              m: {
                title: "vue",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "Javascript",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "web",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "CSS",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "HTML",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "HTML5",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "React",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "JS",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "小程序",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
            {
              m: {
                title: "JQuery",
              },
              n: {
                id: "c4e55fa3-5819-44eb-9694-882a9aa5bce0",
                title: "前端开发工程师",
              },
              "type(r)": "热门技能",
            },
          ],
        ],
        message: "Get User Graph successfully",
      };
    },
  },
  // 模拟获取雷达能力图信息
  {
    url: "/api/chart/getRadar",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            value: [0.7, 0.8, 0.6],
            name: "个人值",
          },
          {
            value: [0.65, 0.5, 0.4],
            name: "平均值",
          },
        ],
        message: "Get Radar Info successfully",
      };
    },
  },
  // 模拟获取中国地图岗位数量信息
  {
    url: "/api/chart/getChina",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          { name: "北京", value: 290 },
          { name: "天津", value: 320 },
          { name: "河北", value: 240 },
          { name: "山西", value: 520 },
          { name: "内蒙古", value: 120 },
          { name: "辽宁", value: 210 },
          { name: "吉林", value: 620 },
          { name: "黑龙江", value: 20 },
          { name: "上海", value: 220 },
          { name: "江苏", value: 820 },
          { name: "浙江", value: 320 },
          { name: "安徽", value: 520 },
          { name: "福建", value: 120 },
          { name: "江西", value: 620 },
          { name: "山东", value: 920 },
          { name: "河南", value: 220 },
          { name: "湖北", value: 720 },
          { name: "湖南", value: 210 },
          { name: "广东", value: 20 },
          { name: "广西", value: 20 },
          { name: "海南", value: 240 },
          { name: "重庆", value: 20 },
          { name: "四川", value: 240 },
          { name: "贵州", value: 420 },
          { name: "云南", value: 320 },
          { name: "西藏", value: 20 },
          { name: "陕西", value: 240 },
          { name: "甘肃", value: 920 },
          { name: "青海", value: 720 },
          { name: "宁夏", value: 120 },
          { name: "新疆", value: 130 },
          { name: "台湾", value: 230 },
          { name: "香港", value: 420 },
          { name: "澳门", value: 210 },
          {
            name: "南海诸岛",
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: false,
                },
              },
            },
          },
        ],
        message: "Get China Info successfully",
      };
    },
  },
];
