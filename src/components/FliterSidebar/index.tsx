import { useEffect, useState } from 'react';
import { Typography, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { DownOutlined } from '@ant-design/icons';
import  './style.less'
const { Text } = Typography;

type FliterSidebarProps = {
  groupName?: string
  data?: API.FliterNode[]
  onCheck?: (keys: string[]) => void
}
const FliterSidebar: React.FC<FliterSidebarProps> = ({
  data: data,
  onCheck: onCheck
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>()

  /**
   * 深度转换
   * @param data 
   * @returns 
   */
  const loopConvert = (data: API.FliterNode): DataNode => {
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
        rootClassName='total-tree'
        treeData={treeData}
        blockNode={true}
        onCheck={(keys) => {
          if (typeof onCheck == 'function') {
            onCheck(keys as string[])
          }
        }}
        checkable
        defaultExpandAll
        showLine
        switcherIcon={<DownOutlined />}
      />
      :
      <></>
  )
}

export default FliterSidebar;