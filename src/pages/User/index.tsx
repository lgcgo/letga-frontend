import React, { useRef, useState } from 'react';
import { App, Col, MenuProps, Popconfirm, Row, Image, Button, Drawer, Dropdown, Space } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { FormattedMessage, useIntl, useNavigate } from '@umijs/max';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { GridContent, PageHeader, FooterToolbar, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined, FormOutlined, MoreOutlined, StopOutlined } from '@ant-design/icons';
import UserService from '@/services/user';
import SearchInput from '@/components/SearchInput';
import { waitTime } from '@/utils/timer';
import GlobalStyle from '@/global.less'

const Page: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.User>();
  const [params, setParams] = useState<API.PageParams>({ctxScene: 'mainTable'})
  const [selectedRowsState, setSelectedRows] = useState<API.User[]>([]);
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const lockCtxDisabledKeys = useRef<React.Key[]>([])

  /**
   * 处理表格请求数据
   * 
   * @param params 请求参数，可以通过setParams重新发起请求
   * @returns 
   */
  const handleRequest = async (params: API.PageParams): Promise<API.UserPage> => {
    return UserService.api.getPage(params).then(res => {
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
  const handleSetStatus = async (user: API.User, value: 'normal' | 'disabled') => {
    await waitTime(200);
    try {
      await UserService.api.setStatus({ key: user.key, value: value });
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

  /**
   * 处理删除
   * @param selectedRows 
   * @returns 
   */
  const handleRemove = async (selectedRows: API.User[]) => {
    await waitTime(200);
    if (!selectedRows) return true;
    try {
      let keys: string[] = selectedRows.map((row) => row.key)
      await UserService.api.remove(keys);
      message.success(intl.formatMessage({
        id: 'request.delete.success',
      }));
      actionRef.current?.reload()
    } catch (error: any) {
      console.log(error)
    }
  };

  /**
   * 处理搜索
   * @param value 搜索内容
   */
  const handleSearchChange = (value: string) => {
    setParams({ search: value })
  }

  const onRow = (record: API.User) => {
    return {
      onDoubleClick: () => {
        navigate('./update/' + record.key)
      },
    };
  }

  // 列表字段
  const columns: ProColumns<API.User>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.avatar" />,
      dataIndex: 'avatar',
      render: (dom, entity) => {
        return (
          <Image preview={{ mask: <EyeOutlined /> }} width={32} height={32} src={entity.avatar} fallback='../icons/icon-128x128.png'></Image>
        )
      },
      search: false,
      width: 64,
    },
    {
      title: <FormattedMessage id="table.user.columns.uuid" />,
      dataIndex: 'uuid',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.nickname" />,
      dataIndex: 'nickname',
      render(_, entity) {
        return <div
          style={{
            width: 140,
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
            {entity.nickname}
          </a>
        </div>
      },
      width: 140,
    },
    {
      title: <FormattedMessage id="table.user.columns.account" />,
      dataIndex: 'account',
    },
    {
      title: <FormattedMessage id="table.user.columns.mobile" />,
      dataIndex: 'mobile',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.email" />,
      dataIndex: 'email',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.signinFailure" />,
      dataIndex: 'signinFailure',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.user.columns.signinRole" />,
      dataIndex: 'signinRole',
      search: false,
    },
    {
      title: <FormattedMessage id="table.user.columns.signinIp" />,
      dataIndex: 'signinIp',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.user.columns.signinAt" />,
      dataIndex: 'signinAt',
      search: false,
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

  const rowSelection: TableRowSelection<API.User> = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    /** 设置禁用项 */
    getCheckboxProps: (row: API.User) => ({
      disabled: lockCtxDisabledKeys.current.indexOf(row.key) > -1,
    }),
  }
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<FormattedMessage id="pages.users.title" />}
            subTitle={<FormattedMessage id="pages.users.subTitle" />}
            extra={[
              <SearchInput
                key='ph-search'
                placeholder={
                  intl.formatMessage({
                    id: 'pages.users.search.placeholder',
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
        <Col span={24}>
          <ProTable<API.User, API.PageParams>
            className={GlobalStyle.customProTable754}
            actionRef={actionRef}
            rowKey="key"
            search={showSearch ? {
              collapsed: false,
              onCollapse: () => {
                setShowSearch(false)
              },
            } : false}
            defaultSize='middle'
            scroll={{ x: true }}
            options={false}
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
        {currentRow?.nickname && (
          <ProDescriptions<API.User>
            column={1}
            title={currentRow?.nickname}
            colon={true}
            labelStyle={{ display: 'block', width: 84, textAlign: 'right' }}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.nickname,
            }}
            columns={columns as ProDescriptionsItemProps<API.User>[]}
          />
        )}
      </Drawer>
    </GridContent>
  )
};

const AppPage: React.FC = () => (
  <App>
    <Page />
  </App>
);
export default AppPage;
