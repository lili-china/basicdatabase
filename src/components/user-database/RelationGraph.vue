<template>
  <div style="background:transparent;">
    <div style="height:calc(100vh);background:transparent;">
      <RelationGraph

        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        style="background:transparent;"
      >
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 25px;padding:10px;">
              This layout uses a third-party layout algorithm: Sigma, and you can still use powerful features such as slot support in relation-graph, perfect integration. Sigma force-directed graph layout is a classic layout algorithm.
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph, { RGJsonData } from 'relation-graph/vue3';
import { RelationGraphComponent, RGOptions, RGNode, RGLine, RGLink, RGUserEvent } from 'relation-graph/vue3';
import Graph from "graphology";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";

const graphRef = ref<RelationGraphComponent>();
const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    layout: {
        layoutName: 'fixed'
    },
    defaultNodeShape: 0,
    defaultLineShape: 1,
    defaultJunctionPoint: 'border',
    defaultNodeBorderWidth: 0,
    defaultNodeWidth: 30,
    defaultNodeHeight: 30,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
};

onMounted(async () => {
    await useGraphologyLayout();
    setTimeout(() => {
      document.querySelectorAll('.relation-graph-container canvas').forEach((el) => {
        (el as HTMLCanvasElement).style.background = 'transparent';
      });
    }, 500);
});

const useGraphologyLayout = async () => {
    let __graph_json_data: RGJsonData = {
        rootId: 'root',
        nodes: [
            { id: 'root', text: '节点' },
            { id: 'N2', text: '新节点N2' },
            { id: 'N3', text: '新节点N3' },
            { id: 'N4', text: '新节点N4' },
            { id: 'N5', text: '新节点N5' },
            { id: 'N6', text: '新节点N6' },
            { id: 'N7', text: '新节点N7' },
            { id: 'N8', text: '新节点N8' },
            { id: 'N9', text: '新节点N9' },
            { id: 'N10', text: '新节点N10' },
            { id: 'N11', text: '新节点N11' },
            { id: 'N12', text: '新节点N12' },
            { id: 'N13', text: '新节点N13' },
            { id: 'N14', text: '新节点N14' },
            { id: 'N15', text: '新节点N15' },
            { id: 'N16', text: '新节点N16' },
            { id: 'N17', text: '新节点N17' },
            { id: 'N18', text: '新节点N18' },
            { id: 'N19', text: '新节点N19' },
            { id: 'N20', text: '新节点N20' },
            { id: 'N21', text: '新节点N21' },
            { id: 'N22', text: '新节点N22' },
            { id: 'N23', text: '新节点N23' },
            { id: 'N24', text: '新节点N24' },
            { id: 'N25', text: '新节点N25' },
            { id: 'N26', text: '新节点N26' },
            { id: 'N27', text: 'New-N27' },
            { id: 'N28', text: 'New-N28' },
            { id: 'N29', text: 'New-N29' },
            { id: 'N30', text: 'New-N30' },
            { id: 'N31', text: 'New-N31' },
            { id: 'N32', text: 'New-N32' },
            { id: 'N33', text: 'New-N33' },
            { id: 'N34', text: 'New-N34' },
            { id: 'N35', text: 'New-N35' },
            { id: 'N36', text: 'New-N36' },
            { id: 'N37', text: 'New-N37' },
            { id: 'N38', text: 'New-N38' },
            { id: 'N39', text: 'New-N39' }
        ],
        lines: [
            { from: 'N3', to: 'N2', text: '新连线1' },
            { from: 'N2', to: 'root', text: '新连线1' },
            { from: 'root', to: 'N4', text: '新连线2' },
            { from: 'N4', to: 'N5', text: '新连线3' },
            { from: 'N6', to: 'N7', text: '新连线2' },
            { from: 'N7', to: 'root', text: '新连线3' },
            { from: 'N8', to: 'N9', text: '新连线4' },
            { from: 'N9', to: 'root', text: '新连线5' },
            { from: 'N10', to: 'N11', text: '新连线6' },
            { from: 'N11', to: 'root', text: '新连线7' },
            { from: 'N13', to: 'N12', text: '新连线8' },
            { from: 'N12', to: 'root', text: '新连线9' },
            { from: 'N18', to: 'N17', text: '新连线10' },
            { from: 'N17', to: 'N14', text: '新连线11' },
            { from: 'N15', to: 'N14', text: '新连线12' },
            { from: 'N16', to: 'N15', text: '新连线13' },
            { from: 'N12', to: 'N14', text: '新连线14' },
            { from: 'N20', to: 'N19', text: '新连线15' },
            { from: 'N21', to: 'N19', text: '新连线16' },
            { from: 'N19', to: 'N15', text: '新连线17' },
            { from: 'N26', to: 'N22', text: '新连线18' },
            { from: 'N24', to: 'N25', text: '新连线19' },
            { from: 'N24', to: 'N22', text: '新连线20' },
            { from: 'N22', to: 'N23', text: '新连线21' },
            { from: 'N23', to: 'N14', text: '新连线22' },
            { from: 'root', to: 'N30', text: '新连线1' },
            { from: 'root', to: 'N27', text: '新连线2' },
            { from: 'N30', to: 'N33', text: '新连线3' },
            { from: 'N30', to: 'N29', text: '新连线4' },
            { from: 'N27', to: 'N28', text: '新连线5' },
            { from: 'N27', to: 'N31', text: '新连线6' },
            { from: 'N27', to: 'N32', text: '新连线7' },
            { from: 'N4', to: 'N34', text: '新连线8' },
            { from: 'N28', to: 'N35', text: '新连线9' },
            { from: 'N28', to: 'N36', text: '新连线12' },
            { from: 'N28', to: 'N37', text: '新连线13' },
            { from: 'N36', to: 'N39', text: '新连线14' },
            { from: 'N36', to: 'N38', text: '新连线15' }
        ]
    };

    __graph_json_data.nodes.forEach(node => {
        node.text = 'N';
    });

    const graph = new Graph();
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);

    graphInstance.getNodes().forEach(node => {
        graph.addNode(node.id, {
            text: node.text,
            width: node.el.offsetWidth,
            height: node.el.offsetHeight

        });
    });

    graphInstance.getLinks().forEach(link => {
        link.relations.forEach((line) => {
            graph.addEdge(link.fromNode.id, link.toNode.id, {
                id: line.id,
                weight: 1

            });
        });
    });

    circular.assign(graph);
    forceAtlas2.assign(graph, 50);

    graph.nodes().forEach(nodeId => {
        const node = graph.getNodeAttributes(nodeId);
        const rgNode = graphInstance.getNodeById(nodeId);
        rgNode.x = node.x * 10;
        rgNode.y = node.y * 10;
    });
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-my-panel{
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
  .c-my-options {
    text-align: center;
    .c-my-option-item {
      text-align: left;
      color: #1da9f5;
      cursor: pointer;
      border-radius: 5px;
      padding-left: 10px;
      margin-top: 5px;
      line-height: 25px;
      &:hover{
        background-color: rgba(29, 169, 245, 0.2);
      }
    }
  }
}

:deep(.rg-canvas-wrap), :deep(.rg-canvas), :deep(.relation-graph-container) {
  background: transparent !important;
}

</style>
