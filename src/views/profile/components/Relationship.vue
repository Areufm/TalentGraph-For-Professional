<template>
  <div style="height: 400px; width: 700px">
    <div style="margin-top: 0px; height: 100%; width: 100%">
      <RelationGraph ref="graphRef" :options="graphOptions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import RelationGraph, {
  RGJsonData,
  RGOptions,
  RelationGraphComponent,
  JsonLine,
  JsonNode,
} from "relation-graph/vue3";
import { GraphSourceNode } from "@/types/graph";
import { getUserGraph } from "@/api/chart";

const graphData = ref([]); // 个人图谱数据

// 获取用户图谱数据
const getUserGraphData = async () => {
  const res = await getUserGraph();
  graphData.value = res.data;
};

/**
 * 创建一个新的节点
 * @param item 当前项
 * @param position 当前职位
 * @param nodeIdCounter 节点ID计数器
 * @returns 新创建的节点
 */
const createNode = (
  item: GraphSourceNode,
  position: string,
  nodeIdCounter: { count: number }
): JsonNode => {
  const nodeId = `m${nodeIdCounter.count++}`;
  const node: JsonNode = {
    id: nodeId,
    text: item.m.title,
    color: "rgba(0, 206, 209, 1)",
    borderColor: "#6cc0ff",
    type: item["type(r)"],
    data: {
      isGoodMan: false,
      typeCount: [position],
    },
  };
  return node;
};

/**
 * 转换图形数据
 * @param demoData 原始图形数据
 * @returns 转换后的节点和连接线
 */
const transformData = (demoData: GraphSourceNode[][]) => {
  let positionCounter = 1;
  let nodeIdCounter = { count: 1 };
  let rootId = "";
  const nodes: JsonNode[] = [];
  const lines: JsonLine[] = [];
  const nodeMap = new Map<string, JsonNode>();

  demoData.forEach((group) => {
    const position = `职位${positionCounter++}`;
    let isRoot = true;

    group.forEach((item) => {
      if (isRoot) {
        const rootNode: JsonNode = {
          id: item.n.id,
          text: item.n.title,
          data: {
            isGoodMan: true,
            typeCount: [position],
          },
        };
        nodes.push(rootNode);
        nodeMap.set(rootNode.text as string, rootNode);
        rootId = rootNode.id;
        isRoot = false;
      }

      // 查找是否已有相同标题的节点
      let existingNode = nodeMap.get(item.m.title);
      if (existingNode) {
        // 复用现有节点
        if (
          existingNode.data &&
          !existingNode.data.typeCount.includes(position)
        ) {
          existingNode.data.typeCount.push(position);
        }
      } else {
        // 创建新节点
        existingNode = createNode(item, position, nodeIdCounter);
        nodes.push(existingNode);
        nodeMap.set(existingNode.text as string, existingNode);
      }

      // 创建连接线
      if (item.m) {
        lines.push({
          from: item.n.id,
          to: existingNode.id,
          text: item["type(r)"],
          color: "#d2c0a5",
          fontColor: "#d2c0a5",
          data: {
            type: item["type(r)"],
          },
        });
      }
    });
  });

  return {
    rootId,
    nodes,
    lines,
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
  disableDragCanvas: true,
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

// 初始化图谱
const initGraph = async () => {
  await getUserGraphData();
  if (graphData.value.length) {
    await setGraphData();
  }
};

onMounted(() => {
  initGraph();
});

const setGraphData = async () => {
  const transform = transformData(graphData.value);
  console.log(transform);
  const __graph_json_data: RGJsonData = transform;
  const graphInstance = graphRef.value!.getInstance();
  await graphInstance.setJsonData(__graph_json_data);
  await graphInstance.setZoom(50);
};

// 清理工作
onUnmounted(() => {
  if (graphRef.value) {
    graphRef.value.getInstance().clearGraph();
  }
});
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
