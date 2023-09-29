import { DataNode } from "antd/es/tree";

/**
 * 获取子级Key集
 * @param tree 
 * @param keys 
 * @returns 
 */
export function getChildrenKeys(tree: DataNode[], keys: React.Key[]): React.Key[] {
  const result: React.Key[] = [];
  const visited: Set<React.Key> = new Set();
  function traverse(node: DataNode) {
    if (keys.includes(node.key) && !visited.has(node.key)) {
      collectKeys(node);
    } else if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }
  function collectKeys(node: DataNode) {
    visited.add(node.key);
    result.push(node.key);
    if (node.children) {
      for (const child of node.children) {
        collectKeys(child);
      }
    }
  }
  for (const node of tree) {
    traverse(node);
  }
  return result;
}

/**
 * 获取父级Key集
 * @param tree
 * @param parentKeys
 * @returns
 */
export function getParentKeys(tree: DataNode[], key: React.Key): React.Key[] {
  const result: React.Key[] = [];
  function traverse(node: DataNode, parentKeys: React.Key[]) {
    if (node.key === key) {
      result.push(...parentKeys);
    } else if (node.children) {
      for (const child of node.children) {
        traverse(child, [...parentKeys, node.key]);
      }
    }
  }
  for (const node of tree) {
    traverse(node, []);
  }
  return result;
}

/**
 * 判断子级
 * @param tree 
 * @param key 
 * @param parentKey 
 * @returns 
 */
export function isChildrenKey(tree: DataNode[], key: string, parentKey: string): boolean {
  return getParentKeys(tree, key).indexOf(parentKey) > -1
}