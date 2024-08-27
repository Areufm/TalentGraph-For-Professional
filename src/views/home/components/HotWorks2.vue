<template>
  <div class="cards-container">
    <div class="card" v-for="(job, index) in jobsData" :key="index" :class="{ 'last-in-row': (index + 1) % 3 === 0 }">
      <div class="card-details">
        <div style="display: flex">
          <p class="work_name">{{ job.title }}</p>
          <p class="work_salary">{{ job.salary }}</p>
        </div>
        <div style="display: flex">
          <p v-for="(keyword, i) in job.skill.slice(0, 3)" :key="i" style="margin: 10px">
            {{ keyword }}
          </p>
        </div>
        <div style="display: flex">
          <img :src="job.logo" alt="" style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            " />
          <p class="text-body">{{ job.company }}</p>
          <p class="text-body" style="margin-left: auto">{{ job.kind2 }}</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const { jobs } = defineProps(['jobsData']);
const router = useRouter();

const getMore = () => {
  const href = router.resolve({
    name: "WorkInfo",
    path: "/workInfo",
  });
  window.open(href.href, "_blank");
};

const jobsData = [
  {
    "title": "嵌入式软件工程师",
    "salary": "15-25K",
    "education": "大专",
    "skill": [
      "C++",
      "PCB",
      "Uart",
      "数字",
      "芯片",
      "4G",
      "I2C",
      "IoT",
      "TCP/IP",
      "STM32",
      "嵌入式",
      "Linux",
      "模拟",
      "C",
      "udp",
      "HTTP",
      "NB-IoT",
      "ip",
      "USB",
      "WiFi",
      "SPI"
    ],
    "info": "定期体检，餐补，零食下午茶，五险一金，通讯补贴",
    "kind1": "电子",
    "kind2": "电子/硬件开发",
    "kind3": "嵌入式软件工程师",
    "description": "岗位职责：1、能熟练进行WiFi芯片和4G/5G模块应用开发，并连接云平台。2、负责嵌入式STM32、 Linux等软件研发、协议研发，与公司IOT系统对接。3、使用C/C++语言进行嵌入式产品开发，参与嵌入式软件需求开发、设计、修改工作；3、负责产品芯片选型。4、负责产品的质量检测以及撰写相关评估报告。任职要求：1、本科以上学历，计算机、自动化或相关专业，有物联网、2年工作经验以上；2、熟悉ModBus-RTU、MQTT，Tcp/ip、Udp、Http可定制开发通信协议；3、精通STM32等ARM单片机，有较强的数字、模拟、电气电路设计能力。4、熟练使用PCB设计软件，可4层以上PCB板布线；5、精通TCP/IP、4G、NB-IoT、SPI、I2C、UART、USB等通信协议。6、熟悉产品硬件调试、测试、验证相关标准、熟悉基本仪器设备使用；7、有DTU设计开发工作经验优先。8、责任心强，善于沟通。备注：1、公司地址：广州市越秀区东华东路光东前街7号之一建东大厦7楼（即东华东路3路/215路车公交总站旁的楼上）。2、乘车路线：A、地铁1号线或6号线东山口站E或F出口，沿署前路、龟岗大马路方向直走8分钟即到。  B、公交3路/215路车东山总站（龟岗）旁。",
    "province": "广东省",
    "city": "广州市",
    "district": "越秀区",
    "address": "广州越秀区建东大厦光东前街7号",
    "major": [
      "计算机",
      "自动化"
    ],
    "neo4j": 5336,
    "company": "广东新邦智联科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "硬件工程师(人形机器人)",
    "salary": "20-40K",
    "education": "硕士",
    "skill": [
      "CAN",
      "rs485",
      "IMU",
      "Pads",
      "PCB",
      "TCP/IP",
      "机器人行业",
      "rs232",
      "Modbus"
    ],
    "info": "餐补，节日福利，定期体检，带薪年假，交通补助，五险一金",
    "kind1": "电子",
    "kind2": "电子/硬件开发",
    "kind3": "硬件工程师",
    "description": "岗位职责：\n1、负责人形机器人的控制系统硬件设计和开发；\n2、负责人形机器人控制系统硬件设计，调试，验证以及文档输出；\n3、负责人形机器人控制系统硬件缺陷整改与维护.\n岗位要求：\n1、硕士及以上学历，电子工程、计算机等相关专业性；\n2、5 年以上工作经验；\n3、精通模拟电路和数字电路设计、熟练掌握常用电子器件的电气特性；\n4、熟练掌握 Altium Designer 或 PADS 进行原理图和 PCB 设计；\n5、熟悉 RS232、RS485、CAN、TCP/IP 等通信方式；\n6、熟悉 EtherCAT 和 MODBUS 现场总线；\n7、了解 IMU、激光雷达等传感器，熟悉电池管理系统;\n8、有机器人控制系统硬件开发经验者优先.",
    "province": "江苏省",
    "city": "南京市",
    "district": "江宁区",
    "address": "南京江宁区南京埃斯顿智能系统工程有限公司吉印大道1888号",
    "major": [
      "计算机",
      "电子工程"
    ],
    "neo4j": 11617,
    "company": "埃斯顿自动化",
    "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20180409/a2adbc2d6cbcb6b0700877411e6cb47ecfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "汽车软件工程师",
    "salary": "8-11K",
    "education": "本科",
    "skill": [
      "CAN",
      "LIN",
      "C++",
      "STM32开发",
      "嵌入式软件开发",
      "STM32",
      "计算机相关专业",
      "单片机",
      "C",
      "单片机设计经验"
    ],
    "info": "补充医疗保险，年终奖，全勤奖，员工旅游，加班补助，住房補貼，带薪年假",
    "kind1": "电子",
    "kind2": "电子/硬件开发",
    "kind3": "单片机",
    "description": "1.有2年车载单片机开发的工作经验。\n2.熟悉stm32单片机的软件平台的搭建及开发经验。\n3.对汽车上的can,lin,iebus,非常熟悉，且有能力读取can,lin，iebus相关有用信息，并重新二次开发.\n4.能看懂电路图，熟悉电子技术原理，并有一定动手能力，分析及解决问题能力。\n盼望有志之士，加入我司一起创业",
    "province": "广东省",
    "city": "深圳市",
    "district": "龙岗区",
    "address": "深圳龙岗区龙信工业园A栋501",
    "major": [],
    "neo4j": 11093,
    "company": "VSHAUto",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/logo/20201205/6f3c58eec273606d544fba71c33a0b7b3db66663b0f79e3ed2d55d1a402a3a00.jpg?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "高级DFT工程师",
    "salary": "40-70K·15薪",
    "education": "硕士",
    "skill": [
      "Spyglass",
      "tessent",
      "VHDL",
      "Shell",
      "Python",
      "PT",
      "DFT",
      "ATPG",
      "shell",
      "ASIC",
      "MBIST",
      "Perl",
      "芯片设计",
      "Scan",
      "FCT",
      "TOP",
      "makefile",
      "STA",
      "RTL",
      "Verilog",
      "dc"
    ],
    "info": "五险一金，生日福利，零食下午茶，带薪年假，补充医疗保险，员工旅游，股票期权，节日福利，年终奖，通讯补贴，团建聚餐，定期体检，意外险",
    "kind1": "电子",
    "kind2": "半导体/芯片",
    "kind3": "DFT工程师",
    "description": "岗位职责：\n1. 参与复杂芯片DFT/DFD/DFR的测试方案和架构定义；\n2. 实现Physical Block/tile级别的DFT功能，包括Scan、Boundary Scan、MBIST、MBISR, Scandump等功能；\n3. 产生DFT模式的时序约束，并配合PR和FCT团队完成时序收敛；\n4. 负责R2R，R2G的formal 约束和formal检查；\n5. 负责Block和top level各种测试模式，包括Scan、Boundary Scan、MBIST、MBISR, Scandump测试向量的产生和验证，最终交付ATE量产测试向量和HTOL/Burn-in测试向量；\n6. 评估和建立先进的DFT/DFD/DFR工具链和流程。\n任职要求：\n1. 本科5年以上或硕士3年以上DFT设计、验证和量产测试经验；\n2. 熟悉Scan/ATPG、MBIST、MBISR、Boundary Scan、Scandump等DFT技术；\n3. 熟悉Tessent工具链、SMS、DFT compiler、Spyglass DFT、Conformal、Formality、DC、PT等工具；\n4. 良好的数字ASIC设计基础，包括STA、验证和RTL编码；\n5. 精通verilog、system verilog，并能完成DFT定制模块的RTL编写；\n6. 良好的脚本语言知识，如TCL，Python，Perl，shell，Makefile；\n7. 良好的英语听说读写能力；\n8. 对日程安排和工作质量有强烈的承诺，良好的团队合作精神。",
    "province": "上海市",
    "city": "市辖区",
    "district": "闵行区",
    "address": "上海闵行区上海爱登堡科技产业园(孵化器)一楼",
    "major": [],
    "neo4j": 12082,
    "company": "鸿钧微电子",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/workfeel/20220318/7bf6f160950405e97660ec9ccf9aae899bb434e6ef2bc2d77de3ad8647a682528dd5f7a931577828.jpg?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "资深DFT工程师（经理）",
    "salary": "15-30K·14薪",
    "education": "本科",
    "skill": [
      "Shell",
      "Python",
      "电路设计",
      "芯片",
      "DFT",
      "shell",
      "PCIE",
      "Perl",
      "Linux",
      "FPGA开发",
      "Scan",
      "ddr",
      "FT",
      "PLL",
      "CP",
      "RTL",
      "TCL",
      "USB",
      "Verilog"
    ],
    "info": "带薪年假，节日福利，绩效奖金，员工旅游，团建聚餐，定期体检，绩效奖金，年终奖，零食下午茶，五险一金",
    "kind1": "电子",
    "kind2": "半导体/芯片",
    "kind3": "DFT工程师",
    "description": "职责描述：\n1. 负责全芯片或者模板的DFT执行方案设计和实现，包括SCAN 插入，MBIST设计，ATPG测试向量生成，边界扫描，功能性测试向量生成等； 2. 负责IP的测试方案设计和实现，例如 DDR, PCIE, PLL, USB 等 3. 负责DFT相关的仿真验证，时序约束及收敛 4. 负责芯片的CP/FT 测试提供方案或执行支持\n任职要求：\n1. 熟悉Linux 开发环境及常用Linux 下文本编辑工具，熟悉Tcl/Perl 等脚本语言； 2. 熟练掌握主流的DFT工具，有多个芯片流片的成功经验； 3. 熟练掌握Verilog语言，并能够编写RTL代码与仿真 4. 熟练掌握脚本语言 (Tcl, Perl, Shell, Python等) 5. 熟悉综合，静态时序分析与形式验证 具备团队精神，自我管理能力强，能积极主动解决问题",
    "province": "广东省",
    "city": "珠海市",
    "district": "香洲区",
    "address": "珠海香洲区珠海中心大厦1604",
    "major": [],
    "neo4j": 12072,
    "company": "珠海凌烟阁芯片科技",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/workfeel/20210610/fb30d220c01c92ffefcdc973795aed2e89ea23cfc8fc3554d2f60b3ced24853a.jpg?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "变流器软件高级工程师",
    "salary": "15-25K·13薪",
    "education": "硕士",
    "skill": [
      "嵌入式软件开发",
      "仿真调试",
      "驱动开发",
      "单片机开发",
      "DSP",
      "C语言",
      "ti"
    ],
    "info": "股票期权，员工旅游，团建聚餐，节日福利，有无线网，餐补，年终奖，意外险，零食下午茶，节假日加班费，带薪年假，绩效奖金，定期体检，五险一金，补充医疗保险，加班补助",
    "kind1": "电子",
    "kind2": "电子/硬件开发",
    "kind3": "DSP开发",
    "description": "岗位职责：\n1.负责储能变流器、风电变流器软件设计；\n2.产品开发相关文档的撰写；\n3.负责所开发的产品调试和测试；\n4.负责现场调试，与客户沟通等工作。\n职位要求：\n1.全日制硕士及以上学历，电气及自动化相关专业，专业基础扎实；\n2.2年以上电力电子变流器软件开发经验，具有独立开发变流器软件能力；\n3.熟悉TI DSP软件开发，熟悉光伏逆变器、风电变流器或储能变流器硬件结构和原理；\n4.工作积极主动，责任心强，具有较强的团队合作精神；\n5.认真、细致、负责的职业态度，善于沟通，适应阶段性的出差。",
    "province": "北京市",
    "city": "市辖区",
    "district": "海淀区",
    "address": "北京海淀区中关村东升科技园北领地D3",
    "major": [
      "电子",
      "自动化"
    ],
    "neo4j": 10822,
    "company": "雷动智创",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/logo/20220308/7b5b554d84f9729c5a77c2f8917f8832f742c59a94f1df17ad1ed3186def843a72fedaab9430e626.png?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "嵌入式工程师",
    "salary": "2-3K",
    "education": "本科",
    "skill": [
      "ARM",
      "ADC",
      "C",
      "gcc",
      "IAR",
      "Uart",
      "SPI",
      "mcu",
      "I2C",
      "嵌入式"
    ],
    "info": "员工旅游，全勤奖，工龄奖，加班补助，餐补，带薪年假，年终奖，交通补助，五险一金，节日福利，零食下午茶，生日福利，定期体检，团建聚餐",
    "kind1": "电子",
    "kind2": "电子/硬件开发",
    "kind3": "嵌入式软件工程师",
    "description": "岗位职责：1. 负责嵌入式产品软件平台设计开发、关键技术的研究；2. 负责产品与项目的软件总体方案设计，设计文档、测试文档等技术文件编写；3. 负责嵌入式软件的程序设计与代码编写，软件的调试、测试与维护；4. 负责与硬件工程师协作完成产品整机调试和测试；5. 负责配合内外部人员完成系统联调，针对调试出现的问题快速定位并解决；6. 负责已有产品的不断优化迭代工作。7. 因工作需要，公司所做的其他工作安排.任职要求：1. 有良好的软件开发习惯，能够撰写相关的技术文档；2. 能看懂基本的电路原理图；3. 熟悉ARM Cortex-M3/Cortex-M4硬件体系结构，具有STM32系列MCU开发经验者优先；4. 熟练使用C语言进行嵌入式软件开发，熟悉uCOS-II或uCOS-III，有相关开发经验者优先；5. 熟悉SourceInsight、MDK或IAR等编程及调试工具的使用，具有ARM GCC使用经验者优先；6. 精通外围设备/器件应用（UART/SPI/I2C/ADC等）及相关中英文datasheet阅读理解；7. 具有2年以上嵌入式软件开发工作经验；8. 良好的沟通表达能力；有理想和热情，紧跟行业技术发展趋势。9. 为人踏实、责任心强，有较强的钻研精神和团队合作意识。",
    "province": "北京市",
    "city": "市辖区",
    "district": "海淀区",
    "address": "北京海淀区民营科技创业园E座3层301室",
    "major": [],
    "neo4j": 5369,
    "company": "北京国华世纪电子科技有限公司",
    "logo": "https://img.bosszhipin.com/beijin/icon/894ce6fa7e58d64d57e7f22d2f3a9d18afa7fcceaa24b8ea28f56f1bb14732c0.png?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "数字验证工程师",
    "salary": "20-40K",
    "education": "硕士",
    "skill": [
      "芯片设计",
      "数字IC",
      "TCL",
      "UVM",
      "systemverilog",
      "Verilog",
      "芯片",
      "Perl"
    ],
    "info": "定期体检，五险一金，节日福利，餐补，高温假",
    "kind1": "电子",
    "kind2": "半导体/芯片",
    "kind3": "数字IC验证工程师",
    "description": "岗位职责：\n1、理解模块及芯片设计规格，负责制定验证计划；\n2、根据芯片验证计划完成IP验证和系统级验证；\n3、构建验证环境及验证平台；\n4、负责生成和维护验证过程相关文档及报告；\n5、负责验证技术跟进及流程优化。\n任职要求：\n1、微电子/计算机/电子/自动化等相关专业，硕士研究生以上学历；\n2、熟悉芯片设计流程、数字IC验证流程，有流片经验者优先；\n3、精通Verilog、SystemVerilog、UVM验证方法学；\n4、熟悉Perl、Tcl等脚本语言；\n5、具有较强的分析解决问题能力和良好的团队合作精神;\n6、具有强烈自我驱动意识和奋斗精神。",
    "province": "湖北省",
    "city": "武汉市",
    "district": "洪山区",
    "address": "武汉洪山区709所电子楼17层",
    "major": [
      "电子",
      "计算机",
      "微电子",
      "自动化"
    ],
    "neo4j": 12528,
    "company": "凌久微",
    "logo": "https://img.bosszhipin.com/beijin/upload/com/logo/20220210/7b5b554d84f9729c515ae3577217bfdff6e76dacf78d9d10e33c0014ec01b7f5d21c065e18dfdccb.png?x-oss-process=image/resize,w_100,limit_0"
  },
  {
    "title": "定制电路设计工程师",
    "salary": "15-25K·15薪",
    "education": "硕士",
    "skill": [
      "芯片设计",
      "PCB设计",
      "半导体技术",
      "Hspice",
      "Cadence",
      "电路设计",
      "ip",
      "数字",
      "Verilog"
    ],
    "info": "节日福利，五险一金，加班补助，全勤奖，带薪年假，年终奖，定期体检，员工旅游",
    "kind1": "电子",
    "kind2": "半导体/芯片",
    "kind3": "数字前端设计师",
    "description": "岗位职责：\n1.负责模拟IP和存储IP的定制电路设计、仿真验证和测试工作；\n2.参与芯片需求分析、规格定义以及系统架构设计\n3.技术资料和文档的编写、维护、归档等工作。\n岗位要求：\n1.微电子/半导体/集成电路/电子/通信/自动化等相关专业，硕士及以上学历；\n2.掌握数字电路的基本结构以及半导体器件特性相关知识，\n3.熟练掌握Verilog/Spice等语言；\n4.熟练使用Virtusuo等电路设计工具以及Hspice/XA等仿真工具；\n5.具备良好的沟通能力、协作能力以及独立解决问题能力，工作主动性强。",
    "province": "湖南省",
    "city": "长沙市",
    "district": "岳麓区",
    "address": "长沙岳麓区中电软件园二期A5栋",
    "major": [
      "电子",
      "自动化",
      "通信"
    ],
    "neo4j": 12723,
    "company": "湖南融创微电子有...",
    "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20200603/a4ed1e5779ce9d8497c5c90a9f2b7ca06ac8e5a891c5ed8cd445f42c353c9848_s.jpg?x-oss-process=image/resize,w_100,limit_0"
  }
]
</script>
<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.card {
  width: 80%;
  height: 154px;
  border-radius: 20px;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card-details {
  color: black;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.card-button {
  width: 100%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: auto;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 1.5em;
  font-weight: bold;
  overflow: hidden;
  /* 隐藏超出内容 */
  text-overflow: ellipsis;
  /* 显示省略号 */
  white-space: nowrap;
  /* 禁止换行 */
  width: 60%;
  /* 设置合适的宽度，根据实际情况调整 */
}

.work_salary {
  margin-left: auto;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  opacity: 1;
}
</style>


<!-- <template>
  
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    
    <div class="card">
      <div class="card-details">
        <div style="display: flex">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <img
            src="../../../assets/xue.jpg"
            alt=""
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            "
          />
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    <div class="card">
      <div class="card-details">
        <div style="display: flex; top: 0">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; margin: 0 100px">
    <div class="card">
      <div class="card-details">
        <div style="display: flex; top: 0">
          <p class="work_name">工作名称</p>
          <p class="work_salary">薪资</p>
        </div>
        <div style="display: flex">
          <p style="margin: 10px">关键词1</p>
          <p style="margin: 10px">关键词2</p>
          <p style="margin: 10px">关键词3</p>
        </div>
        <div style="display: flex">
          <p class="text-body">企业名</p>
          <p class="text-body" style="margin-left: auto">职业类型</p>
        </div>
      </div>
      <button class="card-button" @click="getMore">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
    <div class="card">
      <div class="card-details">
        <p class="text-title">Card title</p>
        <p class="text-body">Here are the details of the card</p>
      </div>
      <button class="card-button">More info</button>
    </div>
  </div>
</template> -->

<!-- <style scoped>
.card {
  /* width: 350px; */
  width: 30%;
  height: 154px;
  border-radius: 20px;
  /* background: #f5f5f5; */
  position: relative;
  padding: 1.8rem;
  /* padding: 1.8rem; */
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  /* place-content: center; */
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Text*/
.work_name {
  font-size: 1.5em;
  font-weight: bold;
}

.work_salary {
  margin-left: auto;
  font-size: 1.5em;
  font-weight: bold;
  color: red;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style> -->
