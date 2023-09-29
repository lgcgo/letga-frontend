import React, { useEffect, useRef, useState } from 'react';
import { App, Col, Empty, MenuProps, Popconfirm, Row, Button, Dropdown, Space } from 'antd';
import { FormattedMessage, useIntl, useNavigate } from '@umijs/max';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownSquareOutlined,
  FormOutlined,
  MinusSquareOutlined,
  MoreOutlined,
  RightSquareOutlined,
  StopOutlined
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  GridContent,
  PageHeader,
  ProTable,
} from '@ant-design/pro-components';
import AuthService from '@/services/auth';
import { waitTime } from '@/utils/timer';
import GlobalStyle from '@/global.less'
import { TableRowSelection } from 'antd/es/table/interface';
import SearchInput from '@/components/SearchInput';

interface DataType {
  key: React.Key;
  parentKey: React.Key;
  title: string;
  createAt: string;
  updateAt: string;
  status: string;
  children?: DataType[];
}

const Page: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>()
  // const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<DataType[]>([]);
  const { message, notification } = App.useApp();
  const search = useRef<string>('')
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const lockCtxDisabledKeys = useRef<React.Key[]>([])

  /**
   * 处理设置状态
   * @param user 
   * @param value 
   */
  const handleSetStatus = async (record: DataType, value: 'normal' | 'disabled') => {
    await waitTime(200);
    try {
      await AuthService.role.setStatus({ key: record.key, value: value });
      message.success(intl.formatMessage({
        id: 'request.setup.success',
      }));
      fetchDataSource()
      actionRef.current?.reload()
    } catch (error: any) {
      notification.warning({
        message: error?.name || 'BizError',
        description: error?.info.errorMessage || '',
      })
    }
  }

  /**
   * 处理删除
   * @param selectedRows 
   * @returns 
   */
  const handleRemove = async (selectedRows: DataType[]) => {
    await waitTime(200);
    if (!selectedRows) return true;
    try {
      let keys: React.Key[] = selectedRows.map((row) => row.key)
      await AuthService.role.remove(keys);
      message.success(intl.formatMessage({
        id: 'request.delete.success',
      }));
      fetchDataSource()
      actionRef.current?.reload()
    } catch (error: any) {
      console.log(error)
      // notification.warning({
      //   message: error?.name || 'BizError',
      //   description: error?.info.errorMessage || '',
      // })
    }
  };

  const handleSearchChange = (value: string) => {
    search.current = value
    setSelectedRows([])
    fetchDataSource()
  }

  const onRow = (record: DataType) => {
    return {
      onDoubleClick: () => {
        navigate('./update/' + record.key)
      },
    };
  }

  // 深度优先遍历转换
  const loopConvert = (data: API.AuthRoleTreeNode): DataType => {
    const { key, parentKey, title, source } = data;
    const { createAt, updateAt, status } = source;

    const children: DataType[] = data.children.map((child) => loopConvert(child));
    return {
      key: key,
      parentKey: parentKey,
      title: title,
      createAt: createAt,
      updateAt: updateAt,
      status: status,
      children: children,
    };
  }

  /**
   * 递归平铺子集
   * @param data 
   * @returns 
   */
  const tiling = (data: DataType[]): DataType[] => {
    let res: DataType[] = [];
    for (const item of data) {
      res.push(item);
      if (item.children && item.children.length > 0) {
        res = res.concat(tiling(item.children));
      }
    }
    return res;
  }

  const isCheckboxDisable = (record: DataType): boolean => {
    // 后端指定禁用项
    if (lockCtxDisabledKeys.current.indexOf(record.key) > -1) {
      return true
    }

    // 父级已选时，子级不能取消选择
    const selectedKeys = selectedRowsState.map(item => item.key)
    return selectedKeys.indexOf(record.key) > -1 && selectedKeys.indexOf(record.parentKey) > -1
  }

  // 请求表格数据
  const fetchDataSource = () => new Promise((resolve) => {
    AuthService.role.getTree({ 
      search: search.current,
      ctxScene: 'mainTable'
    }).then((res) => {
      const { data, ctxDisabledKeys } = res
      lockCtxDisabledKeys.current = ctxDisabledKeys ?? []
      setDataSource(data ? data.map((item) => {
        return loopConvert(item)
      }) : [])
    })
  })

  useEffect(() => {
    dataSource === undefined && fetchDataSource()
  }, [dataSource])

  // 列表字段
  const columns: ProColumns<DataType>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.title" />,
      dataIndex: 'title',
      render(_, entity) {
        return entity.title
      },
    },
    {
      title: <FormattedMessage id="table.columns.createAt" />,
      dataIndex: 'createAt',
      search: false,
      width: 180,
    },
    {
      title: <FormattedMessage id="table.columns.updateAt" />,
      dataIndex: 'updateAt',
      hideInTable: true,
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
    {
      title: <FormattedMessage id="table.columns.option" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        const items: MenuProps['items'] = [
          {
            label: (<a>
              <Space>
                <FormOutlined /><FormattedMessage id='table.columns.option.edit' />
              </Space>
            </a>),
            key: 'edit',
            onClick: () => {
              navigate('./update/' + record.key)
            },
          },
          {
            label: (
              <a>
                <Space>
                  {record.status === 'normal' && (<><StopOutlined /><FormattedMessage id='table.columns.option.disable' /></>)}
                  {record.status === 'disabled' && (<><CheckCircleOutlined /><FormattedMessage id='table.columns.option.undisable' /></>)}
                </Space>
              </a>),
            key: 'status',
            disabled: lockCtxDisabledKeys.current.indexOf(record.key) > -1,
            onClick: () => {
              if (record.status === 'normal') {
                handleSetStatus(record, 'disabled')
              } else if (record.status === 'disabled') {
                handleSetStatus(record, 'normal')
              }
            }
          },
          {
            type: 'divider',
          },
          {
            label: (<Popconfirm
              title={<FormattedMessage id='table.popconfirm.delete.title' />}
              description={<FormattedMessage id='table.popconfirm.delete.description' />}
              placement='left'
              onConfirm={(e) => {
                handleRemove([record])
                actionRef.current?.reload();
              }}
              open={lockCtxDisabledKeys.current.indexOf(record.key) > -1 ? false : undefined}
              okText="Yes"
              cancelText="No"
              zIndex={9999}
            >
              <Space onClick={(e) => e.stopPropagation()}>
                <DeleteOutlined /><FormattedMessage id='table.columns.option.delete' />
              </Space>
            </Popconfirm>),
            key: 'delete',
            disabled: lockCtxDisabledKeys.current.indexOf(record.key) > -1,
          }
        ];

        return [
          <Dropdown key={'Dropdown-' + record.key} menu={{ items }} trigger={['click']} arrow>
            <a onClick={(e) => {
              e.stopPropagation()
            }}>
              <MoreOutlined style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 4 }} />
            </a>
          </Dropdown>
        ]
      },
      width: 60,
      align: 'center',
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (_, selectedRows) => {
      setSelectedRows(tiling(selectedRows))
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: isCheckboxDisable(record)
    }),
    checkStrictly: true,
    selectedRowKeys: selectedRowsState.map(item => item.key)
  };
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<FormattedMessage id="pages.auth.roles.title" />}
            subTitle={<FormattedMessage id="pages.auth.roles.subTitle" />}
            extra={[
              <SearchInput
                key='ph-search'
                placeholder={
                  intl.formatMessage({
                    id: 'pages.auth.roles.search.placeholder',
                  })
                }
                onChange={handleSearchChange}
              />,
              <Button
                type='primary'
                key='ph-new'
                onClick={() => {
                  navigate('./new')
                }}
              >
                <FormattedMessage id="pages.option.new" defaultMessage="New" />
              </Button>,
              // <Button key='ph-more' icon={<MoreOutlined />}></Button>,
            ]}
          />
        </Col>
        <Col md={{span:24}} lg={{span:20, offset: 1}} xl={{span:16, offset: 3}}>
          {dataSource ?
            <ProTable<DataType, API.PageParams>
              className={GlobalStyle.customProTable787}
              actionRef={actionRef}
              rowKey="key"
              search={false}
              scroll={{ x: true }}
              options={false}
              expandable={
                {
                  defaultExpandAllRows: true,
                  expandRowByClick: true,
                  expandIcon: ({ expanded, onExpand, record }) => {
                    if (!record.children || record.children.length == 0) {
                      return <Space style={{ marginRight: 8 }}><MinusSquareOutlined style={{ color: '#bfbfbf' }} onClick={e => { e.stopPropagation() }} /></Space>
                    }
                    return expanded ? (
                      <Space style={{ marginRight: 8 }}><DownSquareOutlined onClick={e => {
                        e.stopPropagation()
                        return onExpand(record, e)
                      }} /></Space>
                    ) : (
                      <Space style={{ marginRight: 8 }}><RightSquareOutlined onClick={e => {
                        e.stopPropagation()
                        return onExpand(record, e)
                      }} /></Space>
                    )
                  }
                }
              }
              dataSource={dataSource}
              columns={columns}
              onRow={onRow}
              tableAlertRender={false}
              rowSelection={rowSelection}
              pagination={false}
            />
            : <Empty />
          }
        </Col>
      </Row>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" />
            </div>
          }
        >
          <Space>
            <Button
              type="link"
              onClick={() => {
                setSelectedRows([])
                actionRef.current?.reloadAndRest?.();
              }}
            >
              <FormattedMessage id='table.footerToolbar.button.cancel' />
            </Button>
            <Popconfirm
              title={<FormattedMessage id='table.popconfirm.delete.title' />}
              description={<FormattedMessage id='table.popconfirm.delete.description' />}
              placement="topRight"
              onConfirm={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([])
                actionRef.current?.reloadAndRest?.();
              }}
              onCancel={() => {
                setSelectedRows([])
                actionRef.current?.reloadAndRest?.();
              }}
              onOpenChange={() => console.log('open change')}
            >
              <Button danger>
                <FormattedMessage id="table.footerToolbar.button.batchDelete" />
              </Button>
            </Popconfirm>
          </Space>
        </FooterToolbar>
      )}
    </GridContent>
  )
};

const AppPage: React.FC = () => (
  <App>
    <Page />
  </App>
);
export default AppPage;
