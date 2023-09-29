import { useEffect, useRef, useState } from "react";
import { Col, Row, Drawer, Dropdown, Space, App, MenuProps, Popconfirm, Button, Tag } from "antd"
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
import Style from './style.less'
import AuthService from '@/services/auth'
import MenuService from '@/services/menu'
import FliterSidebar from "@/components/FliterSidebar";
import { CheckCircleOutlined, DeleteOutlined, FormOutlined, MoreOutlined, StopOutlined } from "@ant-design/icons";
import { waitTime } from "@/utils/timer";
import GlobalStyle from '@/global.less'
import SearchInput from "@/components/SearchInput";

type FliterKeys = {
  dmks?: string[]
  mnks?: string[]
}

const Route: React.FC = () => {
  const [sidebarData, setSidebarData] = useState<API.FliterTreeItem[]>()
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.AuthRoute>();
  const [params, setParams] = useState<API.PageParams>({ctxScene: 'mainTable'})
  const [selectedRowsState, setSelectedRows] = useState<API.AuthRoute[]>([]);
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const fliterKeys = useRef<FliterKeys>({ dmks: [], mnks: [] })
  const navigate = useNavigate();

  const lockCtxDisabledKeys = useRef<React.Key[]>([])

  // 初始化Sider数据
  const initSiderTree = () => new Promise(() => {
    MenuService.api.getFliterTree({ctxScene: 'routeSidebar'}).then(({ data }) => {
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
  const handleRequest = async (params: API.PageParams): Promise<API.AuthRoutePage> => {
    return AuthService.route.getPage(params).then(res => {
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
  const handleSetStatus = async (record: API.AuthRoute, value: 'normal' | 'disabled') => {
    await waitTime(200);
    try {
      await AuthService.route.setStatus({ key: record.key, value: value });
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
      await AuthService.route.remove(keys);
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
        navigate('./update/' + record.key)
      },
    };
  }

  // 列表字段
  const columns: ProColumns<API.AuthRoute>[] = [
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
            {entity.title}
          </a>
        </div>
      },
      width: 100,
      search: false,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.menuKey" />,
      dataIndex: 'menuKey',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.menu" />,
      dataIndex: 'menu',
      // hideInTable: true,
      search: false,
      render: (_, record) => {
        return <>{record.menu?.title}</>
      }
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
      // align: 'center',
    },
  ];
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<FormattedMessage id="pages.auth.routes.title" />}
            subTitle={<FormattedMessage id="pages.auth.routes.subTitle" />}
            extra={[
              <SearchInput
                key='ph-search'
                placeholder={
                  intl.formatMessage({
                    id: 'pages.auth.routes.search.placeholder',
                  })
                }
                onDoubleClick={() => setShowSearch(true)}
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
        <Col span={8}>
          <ProCard.Group className={Style.fliterSider} direction='column'>
            {sidebarData?.map(item => {
              switch (item.name) {
                case 'menu':
                  return <ProCard
                    title={<FormattedMessage id="pages.auth.routes.fliterSider.card.title.menu" />}
                    // extra={<Button onClick={() => navigate('/auth/menu')} type="link" size="small" icon={<EllipsisOutlined />} />}
                    key='menu'
                    headerBordered
                  >
                    <FliterSidebar data={item.data} onCheck={(keys) => handleSiderCheckChange(keys, 'mnks')} />
                  </ProCard>
                default:
                  break;
              }
            })}
          </ProCard.Group>
        </Col>
        <Col span={16}>
          <ProTable<API.AuthRoute, API.PageParams>
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
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
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
        {currentRow?.title && (
          <ProDescriptions<API.User>
            column={1}
            title={currentRow?.title}
            colon={true}
            labelStyle={{ display: 'block', width: 84, textAlign: 'right' }}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.title,
            }}
            columns={columns as ProDescriptionsItemProps<API.User>[]}
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