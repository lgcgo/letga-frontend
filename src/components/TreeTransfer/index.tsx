import { isChildrenKey, getChildrenKeys } from "@/utils/tree";
import { Transfer, Tree, theme } from "antd";
import { TransferDirection, TransferItem } from "antd/es/transfer";
import { DataNode } from "antd/es/tree";
import React, { useEffect, useRef, useState } from "react";

/**
 * 树数据结构
 */
export declare type TreeData<T> = {
  key: React.Key
  parentKey: React.Key,
  title: string,
  source: T,
  children?: TreeData<T>[]
} & Record<string, any>;

/**
 * 请求的数据格式
 */
export declare type RequestData<T> = {
  data: Partial<TreeData<T>> | undefined
  selectedKeys?: React.Key[]
  disabledKeys?: React.Key[]
} & Record<string, any>;

export declare type TreeTransferProps<T, U> = {
  /**
   * 默认选中项，仅用于步骤操作中记录已选结果
   * 非步骤操作请通过设置请求上下文参数，由组件自动渲染选中项
   */
  defaultTargetKeys?: React.Key[];
  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params?: U;
  /** @name 一个获得 dataSource 的方法 */
  request?: (params: U) => Promise<Partial<RequestData<T>>>;
  onChange?: (targetKeys: React.Key[], appendKeys: React.Key[], removeKeys: React.Key[]) => void;
};

const TreeTransfer = <T, U,>({
  defaultTargetKeys: defaultTargetKeys,
  params: params = {} as U,
  request: request,
  onChange: onChange,
}: TreeTransferProps<T, U>): JSX.Element => {
  const { token } = theme.useToken();

  const [transferDataSource, setTransferDataSource] = useState<TransferItem[]>()
  const [treeData, setTreeData] = useState<DataNode[]>()

  /**
   * 缓存右侧已选项
   */
  const targetKeysCache = useRef<React.Key[]>([])

  /**
   * 缓存左侧选中项
   */
  const selectedKeysCache = useRef<React.Key[]>([])

  /**
   * 缓存初始化的树节点数据，此数据加载后不会改变
   */
  const lockInitiallyNodesCache = useRef<DataNode[]>([])

  /**
   * 缓存初始的已选项，用于校对新增/修改，此数据加载后不会改变
   */
  const lockInitiallyTargetKeys = useRef<React.Key[]>([])

  /**
   * 缓存后端指定禁用的项，此数据加载后不会改变
   */
  const lockInitiallyDisabledKeys = useRef<React.Key[]>([])

  /**
   * Customize Table Transfer
   * 参考官方案例：https://ant-design.antgroup.com/components/transfer-cn#transfer-demo-tree-transfer
   * @param selectedKeys 
   * @param eventKey 
   * @returns 
   */
  const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) => {
    return selectedKeys.includes(eventKey);
  }

  /**
   * 渲染节点数据
   * @param disabledNodeKeys // 指定的禁用节点Key集
   */
  const fetchNodes = (): void => {
    // 从缓存中获取初始nodes
    const _nodes: DataNode[] = lockInitiallyNodesCache.current ?? []

    /**
     * 设置禁用项
     */
    // step1: 声明禁用项
    let disabledKeys: React.Key[] = []
    // step2: 追加后端禁用项
    disabledKeys = disabledKeys.concat(lockInitiallyDisabledKeys.current)
    // step3: 追加右侧已选项、以及其子集
    disabledKeys = disabledKeys.concat(getChildrenKeys(_nodes, targetKeysCache.current))
    // step3: 追加左侧选中项目下级，不含自身
    disabledKeys = disabledKeys.concat(getChildrenKeys(_nodes, selectedKeysCache.current).filter(item => {
      return selectedKeysCache.current.indexOf(item) === -1
    }))

    const loopFetch = (nodes: DataNode[] = []): DataNode[] => {
      return nodes.map(({ children, ...props }) => ({
        ...props,
        disabled: disabledKeys.includes(props.key),
        children: loopFetch(children),
      }));
    }

    /**
     * 更新渲染后的数据
     */
    setTreeData(loopFetch(_nodes))
  }

  /**
   * 平铺转换为穿梭项集
   * @param nodes 
   * @returns 
   */
  function flatten(nodes: DataNode[] = [], tempItems: TransferItem[] = []): TransferItem[] {
    nodes.forEach((item) => {
      tempItems.push({
        key: item.key,
        title: item.title,
        disabled: lockInitiallyDisabledKeys.current.indexOf(item.key) > -1,
      } as TransferItem);
      if (item.children && item.children.length > 0) {
        flatten(item.children, tempItems);
      }
    });
    return tempItems;
  }

  /**
   * 格式化节点数据
   * @param data 
   * @returns 
   */
  const formatNodes = (data: TreeData<T>): DataNode => {
    const { key, title } = data;
    const children: DataNode[] = data.children ? data.children.map((child: any) => {
      return formatNodes(child)
    }) : [];
    return {
      key: key,
      title: title,
      disabled: false,
      children: children,
    };
  }

  /**
   * 初始化树节点数据
   * @returns 
   */
  const initTransferData = () => {
    if (typeof request !== 'function') {
      return
    }
    request.call(undefined, params).then(res => {
      const { data, ctxSelectedKeys, ctxDisabledKeys } = res

      // 缓存后端指定的已选项
      lockInitiallyTargetKeys.current = ctxSelectedKeys ?? []

      // 设置默认已选项目
      targetKeysCache.current = defaultTargetKeys ?? (ctxSelectedKeys ?? [])

      // 缓存后端指定的禁用项
      lockInitiallyDisabledKeys.current = ctxDisabledKeys ?? []

      /**
       * 缓存格式化的节点数据
       */
      const nodes: DataNode[] = data ? data.map((item: TreeData<T>) => {
        return formatNodes(item)
      }) : []
      // 缓存初始化的树节点数据
      lockInitiallyNodesCache.current = nodes

      // 渲染树数据
      fetchNodes()

      // 设置穿梭数据
      setTransferDataSource(flatten(nodes))
    })
  }

  useEffect(() => {
    console.log("??????")
    initTransferData()
  }, [params])

  /**
   * 处理结果变化
   */
  const handleChange = (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    /**
     * 更新已选缓存并过滤子项
     */
    const newTargetKeys: React.Key[] = targetKeys.filter(key => {
      let isChild: boolean = false
      for (let index = 0; index < targetKeys.length; index++) {
        const element = targetKeys[index];
        if (isChildrenKey(lockInitiallyNodesCache.current, key, element)) {
          isChild = true
          break
        }
      }
      return !isChild
    })
    // 更新缓存
    targetKeysCache.current = newTargetKeys
    // 重新渲染
    fetchNodes()

    /**
     * 计算新增项，结果中非初始项的为新增项
     */
    const appendKeys = newTargetKeys.filter(item => lockInitiallyTargetKeys.current.indexOf(item) === -1)

    /**
     * 计算移除项，初始项不存在结果中为移除项
     */
    const removeKeys = lockInitiallyTargetKeys.current.filter(item => newTargetKeys.indexOf(item) === -1)

    if (typeof onChange === 'function') {
      onChange(newTargetKeys, appendKeys, removeKeys)
    }
  }

  /**
   * 处理选择变化
   */
  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    selectedKeysCache.current = sourceSelectedKeys
    fetchNodes()
  }

  return (
    <>
      {transferDataSource && (
        <Transfer
          targetKeys={targetKeysCache.current as string[]}
          onChange={handleChange}
          dataSource={transferDataSource}
          className="tree-transfer"
          render={(item) => item.title!}
          showSelectAll={false}
          onSelectChange={handleSelectChange}
        >
          {({ direction, onItemSelect, selectedKeys }) => {
            if (direction === 'left') {
              const checkedKeys = [...selectedKeys, ...targetKeysCache.current];
              return (
                <div style={{ padding: token.paddingXS }}>
                  <Tree
                    blockNode
                    checkable
                    checkStrictly
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                    onCheck={(_, { node: { key } }) => {
                      onItemSelect(key as string, !isChecked(checkedKeys, key));
                    }}
                    onSelect={(_, { node: { key } }) => {
                      onItemSelect(key as string, !isChecked(checkedKeys, key));
                    }}
                  />
                </div>
              );
            }
          }}
        </Transfer>
      )}
    </>
  )
};

export default TreeTransfer;