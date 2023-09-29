import React, { useImperativeHandle, useRef, useState } from 'react';
import { Col, Modal, Row, Space, Tag } from "antd";
import { FormattedMessage, useIntl } from '@umijs/max';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import AuthService from '@/services/auth';
import Style from './style.less'
import { TableRowSelection } from 'antd/es/table/interface';
import SearchInput from '@/components/SearchInput';
import './style.less'

export declare type RouteTableModalActionType = {
  updateAppendKeys: (key: React.Key[]) => void;
  updateRemoveKeys: (key: React.Key[]) => void;
  close: () => void
}

export declare type RouteTableModalProps = {
  /** 是否多选 */
  // multiple?: boolean

  /**
   * 业务上下文
   * 
   * bizParams会随parms传到后端，后端根据bizParams返回列表数据
   * 
   */
  bizParams?: Record<string, any>

  /** 所有页已选中的索引集 */
  // selectedKeys?: React.Key[]

  /** 指定允许选择的索引集 */
  allowKeys?: React.Key[]

  modalTitle?: string
  open?: boolean
  onOk?: (appendKeys: React.Key[], removeKeys: React.Key[]) => void
  onShowChange?: (isShow: boolean) => void
}

const RefRender: React.ForwardRefRenderFunction<RouteTableModalActionType, RouteTableModalProps> = ({
  // multiple: multiple = true, // 默认多选
  bizParams: bizParams,
  // selectedKeys: selectedKeys = [],
  allowKeys: allowKeys,
  modalTitle: modalTitle,
  open: open = false,
  onShowChange: onShowChange,
  onOk: onOk,
}, ref) => {

  const intl = useIntl();

  // const [searchValue, setSearchValue] = useState<string>('')
  const [params, setParams] = useState<API.PageParams>({ctxScene: "roleAccessModel", ...bizParams})

  /**
   * 当前页的选中项
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])


  // const { message, notification } = App.useApp();
  const actionRef = useRef<ActionType>();

  /**
   * 锁定的当前页上下文已选项
   */
  const lockCtxSelectedKeys = useRef<React.Key[]>([]);

  /**
   * 锁定的当前页上下文禁用项目
   */
  const lockCtxDisabledKeys = useRef<React.Key[]>([]);

  /**
   * 锁定的当前页所有选项
   */
  const lockCurrentKeys = useRef<React.Key[]>([]);

  /** 新增选中集缓存 */
  const appendKeys = useRef<React.Key[]>([])
  /** 移除选中集缓存 */
  const removeKeys = useRef<React.Key[]>([])

  useImperativeHandle(ref, () => {
    return {
      updateAppendKeys(keys: React.Key[]) {
        // 更新缓存
        appendKeys.current = keys
        // 刷新表格
        actionRef.current?.reload()
      },
      updateRemoveKeys(keys: React.Key[]) {
        // 更新缓存
        removeKeys.current = keys
        // 刷新表格
        actionRef.current?.reload()
      },
      close() {

      },
    };
  }, []);

  /**
   * 处理表格请求数据
   * 
   * @param params 请求参数，可以通过setParams重新发起请求
   * @returns 
   */
  const handleRequest = async (params: API.PageParams): Promise<API.AuthRoutePage> => {
    return AuthService.route.getPage(params).then(res => {
      const { ctxSelectedKeys, ctxDisabledKeys, data } = res

      /**
       * 锁定缓存当前页上下文已选项，在当页的操作中不会被更改
       */
      lockCtxSelectedKeys.current = ctxSelectedKeys ?? []

      /**
       * 锁定缓存当前页上下文禁用项，在当页的操作中不会被更改
       */
      lockCtxDisabledKeys.current = ctxDisabledKeys ?? []

      /**
       * 锁定缓存当前页所有选项，在当页的操作中不会被更改
       */
      lockCurrentKeys.current = data ? data.map(item => item.key) : []

      return res
    })
  }

  /**
   * 处理加载后的当页已选项
   * 
   * @param dataSource 当前已加载的数据
   */
  const handelOnload = (dataSource: API.AuthRoute[]) => {
    /**
     * 上下文选项默认为当前页选中项，已经在移除项中的除外
     */
    const ctxKeys = lockCtxSelectedKeys.current
    const newCtxSelectedKeys = ctxKeys ? ctxKeys.filter(key => removeKeys.current.indexOf(key) === -1) : []

    /**
     * 在历史已选项，过滤找出当前页已选项
     */
    const historySelectedKeys = lockCurrentKeys.current.filter(key => appendKeys.current.indexOf(key) > -1)

    /**
     * 整合更新当页选中项
     */
    setSelectedRowKeys(newCtxSelectedKeys.concat(historySelectedKeys))
  }

  const handleCancel = () => {
    handleShowChange()
  };

  const handleShowChange = () => {
    if (typeof onShowChange === 'function') {
      onShowChange(!open)
    }
    // actionRef.current?.reload()
  }

  const handleOk = () => {
    if (typeof onOk === 'function') {
      onOk(appendKeys.current, removeKeys.current)
    }
    handleShowChange()
  }

  // 列表字段
  const columns: ProColumns<API.AuthRoute>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      width: 140,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.title" />,
      dataIndex: 'title',
      render(_, entity) {
        return <div
          style={{
            width: 100,
            whiteSpace: "nowrap",
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >{entity.title}</div>
      },
      width: 100,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.method" />,
      dataIndex: 'method',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.path" />,
      dataIndex: 'path',
      render: (_, entity) => {
        let tagElm
        switch (entity.method) {
          case 'POST':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="blue">POST</Tag>
            break;
          case 'GET':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="green">GET</Tag>
            break;
          case 'PUT':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="purple">PUT</Tag>
            break;
          case 'DELETE':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="red">DELETE</Tag>
            break;
          default:
            break;
        }
        return <>{tagElm}{entity.path}</>
      },
      search: false,
    },
    {
      title: <FormattedMessage id="table.columns.status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        'normal': {
          text: (<FormattedMessage id="table.columns.status.normal" />),
          status: 'Success',
        },
        'disabled': {
          text: (<FormattedMessage id="table.columns.status.disabled" />),
          status: 'Error',
        },
      },
      render(dom) {
        return <div style={{ whiteSpace: 'nowrap' }}>{dom}</div>
      },
      width: 80,
    },
  ];

  const rowSelection: TableRowSelection<API.AuthRoute> = {
    onChange: (keys: React.Key[], rows: API.AuthRoute[]) => {
      // 获取当页上下文项
      const cxks = lockCtxSelectedKeys.current
      // 获取当页所有项
      const crks = lockCurrentKeys.current
      // 获取添加项
      const apks = appendKeys.current
      // 获取移除项
      const rmks = removeKeys.current

      /**
       * 获取添加项
       */
      // step1: 对比上下文项找出添加项
      const apCtxKeys = keys.filter(key => cxks.indexOf(key) === -1)
      // step2：对比添加项记录，找出新增的添加项
      const addApks = apCtxKeys.filter(key => apks.indexOf(key) === -1)

      /**
       * 获取移除项
       */
      // step1: 在当页所有项中找出未选项
      const unSelectedKeys = crks.filter(key => keys.indexOf(key) === -1)
      // step2: 对比上下文项，在未选项中找出移除项
      const rmCtxKeys = unSelectedKeys.filter(key => cxks.indexOf(key) > -1)
      // step3：对比移除项，找出新增的移除项
      const addRmks = rmCtxKeys.filter(key => rmks.indexOf(key) === -1)

      /**
       * 更新添加项：添加新增添加项，并过滤当页非选中项
       */
      appendKeys.current = apks.concat(addApks).filter(key => unSelectedKeys.indexOf(key) === -1)
      /**
       * 更新移除项：添加新增移除项，并过滤当页选中项
       */
      removeKeys.current = rmks.concat(addRmks).filter(key => keys.indexOf(key) === -1)

      // 更新选中状态
      setSelectedRowKeys(keys)
    },
    /** 设置禁用项 */
    getCheckboxProps: (row: API.AuthRoute) => ({
      disabled: lockCtxDisabledKeys.current.indexOf(row.key) > -1,
    }),
    selectedRowKeys: selectedRowKeys,
    type: 'checkbox',
    // type: multiple ? "checkbox" : 'radio',
  }

  /**
   * 处理表格搜索
   * @param value 搜索内容
   */
  const handleSearchChange = (value: string) => {
    setParams({...params, search: value})
  }

  return (
    <Modal
      title={modalTitle || <FormattedMessage id="components.auth.routeTableModal.title" />}
      className={Style.userLibraryModal}
      width={800}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row gutter={[0, 16]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space style={{ marginTop: '4px', width: '100%', justifyContent: 'space-between' }}>
            <div></div>
            <SearchInput
              placeholder={intl.formatMessage({
                id: 'components.auth.routeTableModal.searchInput.placeholder',
              })}
              onChange={handleSearchChange}
            />
          </Space>
        </Col>
        <Col span={24}>
          <ProTable<API.AuthRoute, API.PageParams>
            ghost
            tableClassName='model-route-table'
            actionRef={actionRef}
            rowKey="key"
            search={false}
            scroll={{ x: true }}
            options={false}
            params={params}
            request={handleRequest}
            onLoad={handelOnload}
            columns={columns}
            tableAlertRender={false}
            rowSelection={rowSelection}
            size="small"
            pagination={{
              defaultPageSize: 10,
            }}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default React.forwardRef(RefRender)