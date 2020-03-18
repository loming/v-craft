import kebabCase from 'lodash/kebabCase';
import Indicator from './Indicator';

class Editor {
  constructor(nodes = [], resolverMap = {}) {
    this.nodeMap = {};
    this.selectedNode = null;
    this.draggedNode = null;
    this.indicator = new Indicator();

    this.setTopLevelNodes(nodes);
    this.setResolverMap(resolverMap);
  }

  setResolverMap(resolverMap) {
    this.resolverMap = {};

    Object.entries(resolverMap).forEach(([key, value]) => {
      this.resolverMap[kebabCase(key)] = value;
    });
  }

  initializeNodeMap(nodes) {
    nodes.forEach((node) => {
      this.nodeMap[node.uuid] = node;
      this.initializeNodeMap(node.children);
    });
  }

  setTopLevelNodes(nodes) {
    this.nodes = nodes;
    this.initializeNodeMap(nodes);
  }

  findNode(uuid) {
    return this.nodeMap[uuid];
  }

  selectNode(node) {
    this.selectedNode = node;
  }

  dragNode(node) {
    this.draggedNode = node;
  }

  findResolver(name) {
    return this.resolverMap[kebabCase(name)];
  }
}

export default Editor;
