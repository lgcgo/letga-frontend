import { useEffect, useRef, useState } from "react";
import { Col, Row, Drawer, Dropdown, Space, App, MenuProps, Popconfirm, Button } from "antd"
import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
import { 
  FooterToolbar, 
  GridContent, 
  PageHeader, 
  ProCard, 
  ProDescriptions, 
  ProTable 
} from "@ant-design/pro-components"
import type {ActionType, ProColumns, ProDescriptionsItemProps} from "@ant-design/pro-components"
import FliterSidebar from "@/components/FliterSidebar";
import SearchInput from "@/components/SearchInput";
import Style from './style.less'
import AuthService from '@/services/auth'
import { CheckCircleOutlined, DeleteOutlined, MoreOutlined, StopOutlined } from "@ant-design/icons";
import { waitTime } from "@/utils/timer";
import GlobalStyle from '@/global.less'
import { TableRowSelection } from "antd/es/table/interface";

type FliterKeys = {
  dmks?: string[]
  roks?: string[]
}

const Route: React.FC = () => {
  const [sidebarData, setSidebarData] = useState<API.FliterTreeItem[]>()
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.AuthAccess>();
  const [params, setParams] = useState<API.PageParams>({ctxScene: 'mainTable'})
  const [selectedRowsState, setSelectedRows] = useState<API.AuthAccess[]>([]);
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const fliterKeys = useRef<FliterKeys>({ dmks: [], roks: [] })
  const navigate = useNavigate();

  const lockCtxDisabledKeys = useRef<React.Key[]>([])

  // 初始化Sider数据
  const initSiderTree = () => new Promise(() => {
    AuthService.role.getFliterTree({ctxScene: 'accessSidebar'}).then(({ data }) => {
      setSidebarData(data)
    })
  })

  const handleSiderCheckChange = (keys: string[], group: keyof FliterKeys): void => {
    fliterKeys.current[group] = keys
    setParams({ ...params, ...fliterKeys.current })
  }

  const handleSearchChange = (value: string) => {
    setParams({ ...params, search: value })
  }

  useEffect(() => {
    sidebarData === undefined && initSiderTree()
  }, [sidebarData])

  /**
   * 处理表格请求数据
   * 
   * @param params 请求参数，可以通过setParams重新发起请求
   * @returns 
   */
  const handleRequest = async (params: API.PageParams): Promise<API.AuthAccessPage> => {
    return AuthService.access.getPage(params).then(res => {
      const { ctxDisabledKeys, data } = res
      /**
       * 缓存当前页禁用项
       */
      lockCtxDisabledKeys.current = ctxDisabledKeys ?? []
      return res
    })
  }

  /**
   * 处理设置状态
   * @param user 
   * @param value 
   */
  const handleSetStatus = async (user: API.AuthAccess, value: 'normal' | 'disabled') => {
    await waitTime(200);
    try {
      await AuthService.access.setStatus({ key: user.key, value: value });
      message.success(intl.formatMessage({
        id: 'request.setup.success',
      }));
      actionRef.current?.reload()
    } catch (error: any) {
      notification.warning({
        message: error?.name || 'BizError',
        description: error?.info.errorMessage || '',
      })
    }
  }

  // 处理批量删除
  const handleRemove = async (selectedRows: API.AuthRoute[]) => {
    await waitTime(200);
    if (!selectedRows) return true;
    try {
      let keys: string[] = selectedRows.map((row) => row.key)
      await AuthService.access.remove(keys);
      message.success(intl.formatMessage({
        id: 'request.delete.success',
      }));
      actionRef.current?.reload()
    } catch (error: any) {
      console.log(error)
    }
  };

  const onRow = (record: API.AuthRoute) => {
    return {
      onDoubleClick: () => {
        message.warning(<FormattedMessage id="table.message.noupdate" />)
      },
    };
  }

  const rowSelection: TableRowSelection<API.AuthAccess> = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    /** 设置禁用项 */
    getCheckboxProps: (row: API.AuthAccess) => ({
      disabled: lockCtxDisabledKeys.current.indexOf(row.key) > -1,
    }),
  }
  // 列表字段
  const columns: ProColumns<API.AuthAccess>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.nickname" />,
      dataIndex: 'nickname',
      render(_, entity) {
        return <div
          style={{
            width: 100,
            whiteSpace: "nowrap",
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {entity.user?.nickname}
          </a>
        </div>
      },
      width: 100,
      search: false,
    },
    {
      title: <FormattedMessage id="table.access.columns.role" />,
      dataIndex: 'role',
      search: false,
      render: (_, record) => {
        return <>{record.role?.title}</>
      }
    },
    {
      title: <FormattedMessage id="table.columns.remark" />,
      dataIndex: 'remark',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.weight" />,
      dataIndex: 'weight',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.createAt" />,
      dataIndex: 'createAt',
      search: false,
      hideInTable: true,
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
      // align: 'center',
    },
  ];
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<FormattedMessage id="pages.auth.accesses.title" />}
            subTitle={<FormattedMessage id="pages.auth.accesses.subTitle"/>}
            extra={[
              <SearchInput
                key='ph-search'
                placeholder={
                  intl.formatMessage({
                    id: 'pages.auth.accesses.search.placeholder',
                  })
                }
                onDoubleClick={() => setShowSearch(true)}
                onChange={handleSearchChange}
              />,
              <Button
                type='primary'
                key='ph-setup'
                onClick={() => {
                  navigate('./setup')
                }}
              >
                <FormattedMessage id="pages.option.setup" defaultMessage="Setup" />
              </Button>,
              // <Button key='ph-more' icon={<MoreOutlined />}></Button>,
            ]}
          />
        </Col>
        <Col span={8}>
          <ProCard.Group className={Style.fliterSider} direction='column'>
            {sidebarData?.map(item => {
              switch (item.name) {
                case 'role':
                  return <ProCard
                    title={<FormattedMessage id="pages.auth.routes.fliterSider.card.title.role" />}
                    // extra={<Button onClick={() => navigate('/auth/role')} type="link" size="small" icon={<EllipsisOutlined />} />}
                    key='role'
                    headerBordered
                  >
                    <FliterSidebar data={item.data} onCheck={(keys) => handleSiderCheckChange(keys, 'roks')} />
                  </ProCard>
                default:
                  break;
              }
            })}
          </ProCard.Group>
        </Col>
        <Col span={16}>
          <ProTable<API.AuthAccess, API.PageParams>
            // ghost
            className={GlobalStyle.customProTable754}
            actionRef={actionRef}
            rowKey="key"
            search={showSearch ? {
              collapsed: false,
              onCollapse: () => {
                setShowSearch(false)
              },
            } : false}
            scroll={{ x: true }}
            options={false}
            // defaultSize='small'
            params={params}
            request={handleRequest}
            columns={columns}
            onRow={onRow}
            tableAlertRender={false}
            rowSelection={rowSelection}
            pagination={{
              defaultPageSize: 15
            }}
          />
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
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
              onCancel={() => {
                setSelectedRows([]);
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
      <Drawer
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        width={600}
        closable={false}
      >
        {currentRow && (
          <ProDescriptions<API.AuthAccess>
            column={1}
            title={currentRow?.user.nickname}
            colon={true}
            labelStyle={{ display: 'block', width: 84, textAlign: 'right' }}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.key,
            }}
            columns={columns as ProDescriptionsItemProps<API.AuthAccess>[]}
          />
        )}
      </Drawer>
    </GridContent>
  )
}

const AppPage: React.FC = () => (
  <App>
    <Route />
  </App>
);
export default AppPage;