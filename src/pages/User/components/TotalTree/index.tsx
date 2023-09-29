import { useEffect, useState } from 'react';
import { Typography, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import Style from './style.less'
const {Text } = Typography;

type TotalTreeProps = {
  groupName?: string
  data?: API.TotalTreeNode[]
  onCheck?: (keys: string[]) => void
}
const TotalTree: React.FC<TotalTreeProps> = ({
  data: data,
  onCheck: onCheck
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>()

  // 深度优先遍历转换
  const loopConvert = (data: API.TotalTreeNode): DataNode => {
    const { key, source } = data;
    const { title, count } = source;

    const children: DataNode[] = data.children.map((child) => loopConvert(child));
    return {
      key: key,
      title: <>{title}<Text type="secondary">{count}</Text></>,
      children: children
    };
  }

  useEffect(() => {
      treeData == undefined && setTreeData(data?.map((item) => {
        return loopConvert(item)
      }))
  }, [treeData])

  return (
    treeData ?
      <Tree
        rootClassName={Style.totalTree}
        treeData={treeData}
        blockNode={true}
        onCheck={(keys)=>{
          if (typeof onCheck == 'function') {
            onCheck(keys as string[])
          }
        }}
        checkable
        // showIcon
        // draggable
        // showLine
      />
      :
      <></>
  )
}

export default TotalTree;