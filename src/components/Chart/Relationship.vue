<template>
  <div style="height: 100%; width: 100%">
    <!-- <div style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh);"> -->
    <div style="margin-top: 0px; height: 100%; width: 100%">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <!-- <template #node="{ node }">
                    <div class="my-node-style" :style="{ 'background-image': 'url(' + node.data.icon + ')' }">
                    </div>
                    <div class="c-node-name" :style="{ color: node.color }">{{ node.text }}</div>
                </template> -->
        <template #graph-plug>
          <div
            style="
              position: absolute;
              z-index: 700;
              left: 20px;
              top: 20px;
              padding: 15px 10px;
              border: #efefef solid 1px;
              color: #555555;
              border-radius: 10px;
              background-color: rgba(255, 255, 255, 0.3);
              font-size: 12px;
              font-weight: bold;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            "
          >
            <div style="">
              <div style="line-height: 20px">Node Filter:</div>
              <el-radio-group
                v-model="checked_type"
                size="small"
                @change="doFilter"
              >
                <el-radio-button label="">All</el-radio-button>
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="3"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
              </el-radio-group>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio-group
                v-model="checked_isgoodman"
                size="small"
                style="margin-left: 50px"
                @change="doFilter"
              >
                <el-radio-button label="">All</el-radio-button>
                <el-radio-button :label="true">Positive</el-radio-button>
                <el-radio-button :label="false">Negative</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <div style="line-height: 20px">条件筛选:</div>
              <el-checkbox-group v-model="rel_checkList" @change="doFilter">
                <el-checkbox
                  v-for="thisItem in all_rel_type"
                  :key="thisItem"
                  :label="thisItem"
                />
              </el-checkbox-group>
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch } from "vue";

const props = defineProps({
  checked_type: { type: Number, required: false, default: 2 }, // 接收来自父组件的checked_type
});

import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
} from "relation-graph/vue3";

// 官方数据
// const demoData = {
//     "rootId": "N13",
//     "nodes": [
//         {
//             "id": "N1",
//             "text": "侯亮平",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014&n=侯亮平"
//             }
//         },
//         {
//             "id": "N2",
//             "text": "李达康",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062&n=李达康"
//             }
//         },
//         {
//             "id": "N3",
//             "text": "祁同伟",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092&n=祁同伟"
//             }
//         },
//         {
//             "id": "N4",
//             "text": "陈岩石",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021&n=陈岩石"
//             }
//         },
//         {
//             "id": "N5",
//             "text": "陆亦可",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "female",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060&n=陆亦可"
//             }
//         },
//         {
//             "id": "N6",
//             "text": "高育良",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1&n=高育良"
//             }
//         },
//         {
//             "id": "N7",
//             "text": "沙瑞金",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1&n=沙瑞金"
//             }
//         },
//         {
//             "id": "N8",
//             "text": "高小琴",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "female",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011&n=高小琴"
//             }
//         },
//         {
//             "id": "N9",
//             "text": "高小凤",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "female",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012&n=高小凤"
//             }
//         },
//         {
//             "id": "N10",
//             "text": "赵东来",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013&n=赵东来"
//             }
//         },
//         {
//             "id": "N11",
//             "text": "程度",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3&n=程度"
//             }
//         },
//         {
//             "id": "N12",
//             "text": "吴惠芬",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "female",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081&n=吴惠芬"
//             }
//         },
//         {
//             "id": "N13",
//             "text": "赵瑞龙",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080&n=赵瑞龙"
//             }
//         },
//         {
//             "id": "N14",
//             "text": "赵立春",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=赵立春"
//             }
//         },
//         {
//             "id": "N15",
//             "text": "陈海",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "male",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0&n=陈海"
//             }
//         },
//         {
//             "id": "N16",
//             "text": "梁璐",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "female",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2&n=梁璐"
//             }
//         },
//         {
//             "id": "N17",
//             "text": "刘新建",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082&n=刘新建"
//             }
//         },
//         {
//             "id": "N18",
//             "text": "欧阳菁",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "female",
//                 "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091&n=欧阳菁"
//             }
//         },
//         {
//             "id": "N19",
//             "text": "吴心怡",
//             "color": "#ec6941",
//             "borderColor": "#ff875e",
//             "data": {
//                 "isGoodMan": true,
//                 "sexType": "female",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=吴心怡"
//             }
//         },
//         {
//             "id": "N20",
//             "text": "蔡成功",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1&n=蔡成功"
//             }
//         },
//         {
//             "id": "N21",
//             "text": "丁义珍",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093&n=丁义珍"
//             }
//         }
//     ],
//     "lines": [
//         {
//             "from": "N6",
//             "to": "N1",
//             "text": "师生",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "师生"
//             }
//         },
//         {
//             "from": "N6",
//             "to": "N3",
//             "text": "师生",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "师生"
//             }
//         },
//         {
//             "from": "N14",
//             "to": "N6",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N14",
//             "to": "N13",
//             "text": "亲戚",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "亲戚"
//             }
//         },
//         {
//             "from": "N14",
//             "to": "N17",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N2",
//             "to": "N14",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N8",
//             "text": "情人",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "情人"
//             }
//         },
//         {
//             "from": "N4",
//             "to": "N15",
//             "text": "亲戚",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "亲戚"
//             }
//         },
//         {
//             "from": "N5",
//             "to": "N15",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N7",
//             "to": "N4",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N15",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N1",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N1",
//             "to": "N15",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N1",
//             "to": "N15",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N6",
//             "to": "N12",
//             "text": "夫妻",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "夫妻"
//             }
//         },
//         {
//             "from": "N15",
//             "to": "N10",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N8",
//             "to": "N9",
//             "text": "亲戚",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "亲戚"
//             }
//         },
//         {
//             "from": "N10",
//             "to": "N5",
//             "text": "情人",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "情人"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N11",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N6",
//             "to": "N9",
//             "text": "情人",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "情人"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N3",
//             "text": "勾结",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "勾结"
//             }
//         },
//         {
//             "from": "N2",
//             "to": "N10",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N11",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N7",
//             "to": "N2",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N7",
//             "to": "N6",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N16",
//             "text": "夫妻",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "夫妻"
//             }
//         },
//         {
//             "from": "N12",
//             "to": "N16",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N2",
//             "to": "N18",
//             "text": "夫妻",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "夫妻"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N17",
//             "text": "腐化",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "腐化"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N8",
//             "text": "勾结",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "勾结"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N8",
//             "text": "腐化",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "腐化"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N9",
//             "text": "腐化",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "腐化"
//             }
//         },
//         {
//             "from": "N19",
//             "to": "N5",
//             "text": "亲戚",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "亲戚"
//             }
//         },
//         {
//             "from": "N19",
//             "to": "N12",
//             "text": "亲戚",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "亲戚"
//             }
//         },
//         {
//             "from": "N20",
//             "to": "N1",
//             "text": "朋友",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "朋友"
//             }
//         },
//         {
//             "from": "N20",
//             "to": "N18",
//             "text": "举报",
//             "color": "#ed724d",
//             "fontColor": "#ed724d",
//             "data": {
//                 "type": "举报"
//             }
//         },
//         {
//             "from": "N18",
//             "to": "N17",
//             "text": "举报",
//             "color": "#ed724d",
//             "fontColor": "#ed724d",
//             "data": {
//                 "type": "举报"
//             }
//         },
//         {
//             "from": "N17",
//             "to": "N13",
//             "text": "举报",
//             "color": "#ed724d",
//             "fontColor": "#ed724d",
//             "data": {
//                 "type": "举报"
//             }
//         },
//         {
//             "from": "N2",
//             "to": "N21",
//             "text": "上下级",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "上下级"
//             }
//         },
//         {
//             "from": "N8",
//             "to": "N21",
//             "text": "勾结",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "勾结"
//             }
//         },
//         {
//             "from": "N3",
//             "to": "N21",
//             "text": "勾结",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "勾结"
//             }
//         },
//         {
//             "from": "N13",
//             "to": "N21",
//             "text": "勾结",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "勾结"
//             }
//         }
//     ]
// }

//一个推荐图
// const demoData = {
//     "rootId": "1532",
//     "nodes": [
//         {
//             "id": "1532",
//             "text": "前端工程师",
//             "data": {}
//         },
//         {
//             "id": "m1",
//             "text": "weex",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m2",
//             "text": "react",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m3",
//             "text": "web",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m4",
//             "text": "angular",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m5",
//             "text": "hybrid",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m6",
//             "text": "c++",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m7",
//             "text": "前端",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m8",
//             "text": "ruby",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m9",
//             "text": "python",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m10",
//             "text": "php",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m11",
//             "text": "node.js",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m12",
//             "text": "java",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m13",
//             "text": "pc+mobile",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m14",
//             "text": "app",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-star-on"
//             },
//             "type": "技能需求"
//         },
//         {
//             "id": "m15",
//             "text": "德力西大厦10",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-setting"
//             },
//             "type": "详细地址"
//         },
//         {
//             "id": "m16",
//             "text": "西湖区",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "包含职位"
//         },
//         {
//             "id": "m17",
//             "text": "西湖区",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "所属区/县"
//         },
//         {
//             "id": "m18",
//             "text": "15-25K",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "薪水"
//         },
//         {
//             "id": "m19",
//             "text": "杭州天阙科技有限公司",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "公司职位"
//         },
//         {
//             "id": "m20",
//             "text": "杭州天阙科技有限公司",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "所属公司"
//         },
//         {
//             "id": "m21",
//             "text": "大专",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "存在职位"
//         },
//         {
//             "id": "m22",
//             "text": "大专",
//             "color": "rgba(0, 206, 209, 1)",
//             "borderColor": "#6cc0ff",
//             "data": {
//                 "isGoodMan": false,
//                 "sexType": "male",
//                 "icon": "el-icon-sunny"
//             },
//             "type": "学历要求"
//         }
//     ],
//     "lines": [
//         {
//             "from": "1532",
//             "to": "m1",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m2",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m3",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m4",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m5",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m6",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m7",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m8",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m9",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m10",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m11",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m12",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m13",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m14",
//             "text": "技能需求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "技能需求"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m15",
//             "text": "详细地址",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "详细地址"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m16",
//             "text": "包含职位",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "包含职位"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m17",
//             "text": "所属区/县",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "所属区/县"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m18",
//             "text": "薪水",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "薪水"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m19",
//             "text": "公司职位",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "公司职位"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m20",
//             "text": "所属公司",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "所属公司"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m21",
//             "text": "存在职位",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "存在职位"
//             }
//         },
//         {
//             "from": "1532",
//             "to": "m22",
//             "text": "学历要求",
//             "color": "#d2c0a5",
//             "fontColor": "#d2c0a5",
//             "data": {
//                 "type": "学历要求"
//             }
//         }
//     ]
// }

//四个推荐图一起

const demoData = [
  [
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "web",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "javascript",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html5",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "vue",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "js",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "jquery",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "css",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u8be6\u7ec6\u5730\u5740",
      m: {
        title: "\u6d2a\u57ce\u5e7f\u573aB\u5ea71005",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u5305\u542b\u804c\u4f4d",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6240\u5c5e\u533a/\u53bf",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u85aa\u6c34",
      m: {
        title: "1-2K",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u516c\u53f8\u804c\u4f4d",
      m: {
        title:
          "\u5357\u660c\u8c61\u7259\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u6240\u5c5e\u516c\u53f8",
      m: {
        title:
          "\u5357\u660c\u8c61\u7259\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u5b58\u5728\u804c\u4f4d",
      m: {
        title: "\u5927\u4e13",
      },
    },
    {
      n: {
        id: "48",
        title: "\u524d\u7aef\u5b9e\u4e60\u751f",
      },
      "type(r)": "\u5b66\u5386\u8981\u6c42",
      m: {
        title: "\u5927\u4e13",
      },
    },
  ],
  [
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u65b9\u5411",
      m: {
        title: "\u8ba1\u7b97\u673a",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "react",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "javascript",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "git",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "vue",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "css",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u8be6\u7ec6\u5730\u5740",
      m: {
        title: "\u897f\u6eaa\u79d1\u521b\u56ed9\u5e629\u697c",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u5305\u542b\u804c\u4f4d",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6240\u5c5e\u533a/\u53bf",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u85aa\u6c34",
      m: {
        title: "2-3K",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u516c\u53f8\u804c\u4f4d",
      m: {
        title:
          "\u5148\u4e4b\uff08\u676d\u5dde\uff09\u6559\u80b2\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u6240\u5c5e\u516c\u53f8",
      m: {
        title:
          "\u5148\u4e4b\uff08\u676d\u5dde\uff09\u6559\u80b2\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u5b58\u5728\u804c\u4f4d",
      m: {
        title: "\u5927\u4e13",
      },
    },
    {
      n: {
        id: "55",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08(\u5b9e\u4e60\u751f)",
      },
      "type(r)": "\u5b66\u5386\u8981\u6c42",
      m: {
        title: "\u5927\u4e13",
      },
    },
  ],
  [
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "web",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "uniapp",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "javascript",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "\u5c0f\u7a0b\u5e8f",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html5",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "vue",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "\u516c\u4f17\u53f7",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "js",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "jquery",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "css",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u8be6\u7ec6\u5730\u5740",
      m: {
        title: "\u6d2a\u57ce\u5e7f\u573aB\u5ea71005",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5305\u542b\u804c\u4f4d",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6240\u5c5e\u533a/\u53bf",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u85aa\u6c34",
      m: {
        title: "2-5K",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u516c\u53f8\u804c\u4f4d",
      m: {
        title:
          "\u5357\u660c\u8c61\u7259\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6240\u5c5e\u516c\u53f8",
      m: {
        title:
          "\u5357\u660c\u8c61\u7259\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5b58\u5728\u804c\u4f4d",
      m: {
        title: "\u5927\u4e13",
      },
    },
    {
      n: {
        id: "739",
        title: "\u524d\u7aef\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5b66\u5386\u8981\u6c42",
      m: {
        title: "\u5927\u4e13",
      },
    },
  ],
  [
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "node",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "axios",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "npm",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "element-ui",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "html",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "pc",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "git",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "http",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "vue",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "js2",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6280\u80fd\u9700\u6c42",
      m: {
        title: "css",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u8be6\u7ec6\u5730\u5740",
      m: {
        title: "\u4e1c\u90e8\u8f6f\u4ef6\u56ed7\u53f7\u697c616",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5305\u542b\u804c\u4f4d",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6240\u5c5e\u533a/\u53bf",
      m: {
        title: "\u897f\u6e56\u533a",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u85aa\u6c34",
      m: {
        title: "8-10K",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u516c\u53f8\u804c\u4f4d",
      m: {
        title:
          "\u676d\u5dde\u76d8\u4e1d\u6d1e\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u6240\u5c5e\u516c\u53f8",
      m: {
        title:
          "\u676d\u5dde\u76d8\u4e1d\u6d1e\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5b58\u5728\u804c\u4f4d",
      m: {
        title: "\u5927\u4e13",
      },
    },
    {
      n: {
        id: "909",
        title: "\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",
      },
      "type(r)": "\u5b66\u5386\u8981\u6c42",
      m: {
        title: "\u5927\u4e13",
      },
    },
  ],
];

//数据转换
const transformData = (demoData) => {
  let typeCounter = 1;
  let idCounter = 1;
  let rootId = "";
  const nodes = [];
  const lines = {};

  demoData.forEach((jsonDataGroup) => {
    let flag = 1;
    jsonDataGroup.forEach((item) => {
      if (flag) {
        const root = {
          id: item.n.id,
          text: item.n.title,
          data: {
            isGoodMan: true,
            typeCount: [typeCounter],
            // sexType: "female",
          },
          //   typeCount: [typeCounter],
        };
        flag = 0;
        rootId = root.id;
        nodes.push(root);
      }

      // 检查已有节点中是否有相同 m.title 的节点
      let existingNodeWithSameTitle = nodes.find(
        (node) => node.text === item.m.title
      );
      let mId;

      if (existingNodeWithSameTitle) {
        // 如果存在，复用其 mId
        mId = existingNodeWithSameTitle.id;
        if (!existingNodeWithSameTitle.data.typeCount.includes(typeCounter)) {
          existingNodeWithSameTitle.data["typeCount"].push(typeCounter);
        }
      } else {
        // 否则创建新的 mId
        mId = `m${idCounter++}`;
        const node = {
          id: mId,
          text: item.m.title,
          color: "rgba(0, 206, 209, 1)",
          borderColor: "#6cc0ff",
          data: {
            isGoodMan: false,
            typeCount: [typeCounter],
            // sexType: "male",
          },
          //   typeCount: [typeCounter],
          type: item["type(r)"],
        };
        switch (item["type(r)"]) {
          case "\u85aa\u6c34": //薪资
            node.color = "#FF0000";
            break;
          case "\u516c\u53f8\u804c\u4f4d": //所属公司
            node.color = "royalblue";
            break;
          case "\u8be6\u7ec6\u5730\u5740": //详细地址
            node.color = "#8B7D6B";
            break;
          case "\u5305\u542b\u804c\u4f4d": //所属区县
            node.color = "#FF1493";
            break;
        }
        nodes.push(node);
      }

      if (item.m) {
        // 存储每一对连接关系，避免重复
        lines[`${item.n.id}-${mId}`] = {
          from: item.n.id,
          to: mId,
          text: item["type(r)"],
          color: "#d2c0a5",
          fontColor: "#d2c0a5",
          data: {
            type: item["type(r)"],
          },
        };
      }
    });
    typeCounter++;
  });

  return {
    rootId,
    nodes: nodes,
    lines: Object.values(lines), // 转换为数组形式返回
  };
};

const graphOptions: RGOptions = {
  debug: false,
  defaultNodeBorderWidth: 5,
  defaultNodeColor: "rgba(238, 178, 94, 1)",
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineShape: 1,
  isMoveByParentNode: true,
  moveToCenterWhenRefresh: true,
  useAnimationWhenRefresh: true,
  backgroundColor: "transparent",
  layouts: [
    {
      label: "Auto Layout",
      layoutName: "force",
      maxLayoutTimes: 10000,
      layoutClassName: "seeks-layout-force",
    },
  ],
  defaultJunctionPoint: "border",
};

const graphRef = ref<RelationGraphComponent>();
const checked_type = ref("");

const checked_isgoodman = ref("");
const rel_checkList = ref([
  "技能需求",
  "详细地址",
  "包含职位",
  "所属区/县",
  "薪水",
  "公司职位",
  "所属公司",
  "存在职位",
  "学历要求",
]);
const all_rel_type = ref([
  "技能需求",
  "详细地址",
  "包含职位",
  "所属区/县",
  "薪水",
  "公司职位",
  "所属公司",
  "存在职位",
  "学历要求",
]);

onMounted(() => {
  setGraphData();
});

const setGraphData = async () => {
  const transform = transformData(demoData);
  console.log(transform);
  const __graph_json_data: RGJsonData = transform;
  const graphInstance = graphRef.value!.getInstance();
  await graphInstance.setJsonData(__graph_json_data);
  //   await graphInstance.setZoom(80);
};

const doFilter = () => {
  const graphInstance = graphRef.value!.getInstance();
  const _all_nodes = graphInstance.getNodes();
  const _all_links = graphInstance.getLinks();
  _all_nodes.forEach((thisNode) => {
    let _isHideThisLine = false;
    if (checked_type.value !== "") {
      //   console.log(checked_type.value);
      //   console.log(thisNode.data["typeCount"]);

      let typeCount = Object.values(thisNode.data["typeCount"]);
      //   console.log(typeCount);

      //   console.log(typeCount.includes(Number(checked_type.value)));
      //   console.log("---");

      if (!typeCount.includes(Number(checked_type.value))) {
        _isHideThisLine = true;
      }
    }
    if (checked_isgoodman.value !== "") {
      if (thisNode.data["isGoodMan"] !== checked_isgoodman.value) {
        _isHideThisLine = true;
      }
    }
    thisNode.opacity = _isHideThisLine ? 0.1 : 1;
  });
  _all_links.forEach((thisLink) => {
    thisLink.relations.forEach((thisLine) => {
      if (rel_checkList.value.indexOf(thisLine.data["type"]) === -1) {
        if (!thisLine.isHide) {
          thisLine.isHide = true;
          console.log("Hide line:", thisLine);
        }
      } else {
        if (thisLine.isHide) {
          thisLine.isHide = false;
          console.log("Show line:", thisLine);
        }
      }
    });
  });
  graphInstance.dataUpdated();
};

// 监听checked_type变化
watch(
  () => props.checked_type,
  (newValue) => {
    // 当 props.checked_type 发生变化时，更新本地响应式引用
    checked_type.value = newValue.toString();
    console.log(checked_type.value);
    
    // 调用 doFilter 函数
    // doFilter();
  },
  {
    immediate: true, // 如果你希望在初始化时也运行一次doFilter，可以设置immediate为true
  }
);
</script>

<style lang="scss" scoped>
.my-node-style {
  background-position: center center;
  background-size: 100%;
  height: 100%;
  width: 100%;
  border-radius: 40px;
  overflow: visible;
}

.c-node-name {
  width: 80px;
  text-align: center;
  color: #2e74b5;
  margin-top: 10px;
}
</style>
