import { Form, TreeSelect } from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useIntl } from "@umijs/max";
import { DataNode } from "antd/es/tree";

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

export declare type FromTreeSelectProps<T, U> = {
  // 表单ID
  id?: string;
  value?: string;
  disabled?: boolean;
  /**
   * request 的参数，修改之后会触发更新
   *
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params?: U;
  /** @name 一个获得 dataSource 的方法 */
  request?: (params: U) => Promise<Partial<RequestData<T>>>;
  placeholder?: string;
  onValueChange?: (value: string) => void
}

const FormTreeSelect = <T, U,>({
  params: params = {} as U,
  request: request,
  id: inputId = '',
  value: inputValue = '',
  disabled: disabled = false,
  placeholder: placeholder,
  onValueChange: onValueChange,
}: FromTreeSelectProps<T, U>): JSX.Element => {
  const [treeData, setTreeData] = useState<DataNode[]>()
  const form = Form.useFormInstance();
  const intl = useIntl();

  const hasLoad = useRef<boolean>(false)

  /**
   * 获取渲染后的节点数据
   * @param disabledNodeKeys // 指定的禁用节点Key集
   */
  const getFetchNodes = (_nodes: DataNode[], disabledKeys: React.Key[]): DataNode[] => {
    disabledKeys = disabledKeys ?? []
    const loopFetch = (nodes: DataNode[] = []): DataNode[] => {
      return nodes.map(({ children, ...props }) => ({
        ...props,
        disabled: disabledKeys.includes(props.key),
        children: loopFetch(children),
      }));
    }
    return loopFetch(_nodes)
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

  // 深度优先遍历转换
  // const loopConvert = (data: RequestData<T>, disabledKeys?: string[]): DataNode => {
  //   const { key, parentKey, title } = data;
  //   // 禁用上下文的自身及子级
  //   disabledKeys = disabledKeys ?? []
  //   let isDisabled: boolean = false
  //   if (contextValue.length > 0) {
  //     if (key === contextValue || parentKey === contextValue) {
  //       disabledKeys.push(key)
  //     }
  //     if (parentKey.length > 0 && disabledKeys.indexOf(parentKey) > -1) {
  //       disabledKeys.push(key)
  //     }
  //     if (disabledKeys.indexOf(key) > -1) {
  //       isDisabled = true
  //     }
  //   }

  //   const disabled: boolean = isDisabled
  //   const children: TreeData[] = data.children ? data.children.map((child: any) => loopConvert(child, disabledKeys)) : [];

  //   return {
  //     value: key,
  //     title: title,
  //     disabled: disabled,
  //     children: children,
  //   };
  // }

  // 初始化树数据
  const initTreeData = () => {
    if (typeof request !== 'function') {
      return
    }
    request.call(undefined, params).then(res => {
      const { data, ctxSelectedKeys, ctxDisabledKeys } = res

      /**
       * 缓存格式化的节点数据
       */
      const nodes: DataNode[] = data ? data.map((item: TreeData<T>) => {
        return formatNodes(item)
      }) : []

      // 渲染树数据
      const fetchNodes = getFetchNodes(nodes, ctxDisabledKeys as React.Key[])
      setTreeData(fetchNodes)
      // 标记已加载
      hasLoad.current = true
    })
  }

  useEffect(() => {
    !hasLoad.current && initTreeData()
  }, [params])

  return (
    <>
      <TreeSelect
        id="tree-select"
        defaultValue={inputValue.length > 0 ? inputValue : null}
        onSelect={(value) => {
          form.setFieldValue(inputId, value)
          if (typeof onValueChange == 'function') {
            onValueChange(value as string)
          }
        }}
        fieldNames={{ label: 'title', value: 'key', children: 'children' }}
        treeNodeFilterProp="title"
        onClear={() => form.setFieldValue(inputId, '')}
        treeData={treeData}
        placeholder={placeholder ?? intl.formatMessage({ id: 'components.select.placeholder' })}
        allowClear
        disabled={disabled}
        treeDefaultExpandAll
        showSearch
        treeLine
      />
      <input
        id={inputId}
        type="text"
        value={inputValue}
        onChange={(e) => { }}
        hidden
      />
    </>
  )
};

export default FormTreeSelect;