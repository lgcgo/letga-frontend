import React, { useRef, useState } from 'react';
import { App, Col, MenuProps, Popconfirm, Row, Image, Button, Drawer, Dropdown, Space} from 'antd';
import { FormattedMessage, useIntl, useNavigate } from '@umijs/max';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  GridContent,
  PageHeader,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined, FormOutlined, MoreOutlined, StopOutlined } from '@ant-design/icons';
import MediaService from '@/services/media';
import SearchInput from '@/components/SearchInput';
import { waitTime } from '@/utils/timer';
import GlobalStyle from '@/global.less'
import { TableRowSelection } from 'antd/es/table/interface';

const Page: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Media>();
  const [params, setParams] = useState<API.PageParams>({})
  const [selectedRowsState, setSelectedRows] = useState<API.Media[]>([]);
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
  const handleRequest = async (params: API.PageParams): Promise<API.MediaPage> => {
    return MediaService.api.getPage(params).then(res => {
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
  const handleSetStatus = async (user: API.Media, value: 'normal' | 'disabled') => {
    await waitTime(200);
    try {
      await MediaService.api.setStatus({ key: user.key, value: value });
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
  const handleRemove = async (selectedRows: API.Media[]) => {
    await waitTime(200);
    if (!selectedRows) return true;
    try {
      let keys: string[] = selectedRows.map((row) => row.key)
      await MediaService.api.remove(keys);
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

  const onRow = (record: API.Media) => {
    return {
      onDoubleClick: () => {
        message.warning(<FormattedMessage id="table.message.noupdate" />)
      },
    };
  }

  // 列表字段
  const columns: ProColumns<API.Media>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.Mediakey" />,
      dataIndex: 'userKey',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.media.columns.cover" />,
      dataIndex: 'path',
      render: (_, entity) => {
        return (<Image preview={{ mask: <EyeOutlined /> }} width={32} src={entity.path} fallback='../icons/icon-128x128.png' />)
      },
      search: false,
      width: 64,
    },
    {
      title: <FormattedMessage id="table.media.columns.name" />,
      dataIndex: 'name',
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
            {entity.name}
          </a>
        </div>
      },
      width: 140,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="table.media.columns.size" />,
      dataIndex: 'size',
      search: false,
      renderText(text, record, index, action) {
        return (Math.ceil(record.size / 1024)) + 'kb'
      },
    },
    {
      title: <FormattedMessage id="table.media.columns.hash" />,
      dataIndex: 'hash',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.media.columns.fileType" />,
      dataIndex: 'fileType',
      align: 'center',
      render(_, entity) {
        return <div style={{ minWidth: 80 }}>{entity.fileType}</div>
      },
    },
    {
      title: <FormattedMessage id="table.media.columns.mimeType" />,
      dataIndex: 'mimeType',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.media.columns.extparam" />,
      dataIndex: 'extparam',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.media.columns.storage" />,
      dataIndex: 'storage',
      align: 'center',
      render(_, entity) {
        return <div style={{ minWidth: 80 }}>{entity.storage}</div>
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

  const rowSelection: TableRowSelection<API.Media> = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    /** 设置禁用项 */
    getCheckboxProps: (row: API.Media) => ({
      disabled: lockCtxDisabledKeys.current.indexOf(row.key) > -1,
    }),
  }
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<FormattedMessage id="pages.medias.title" />}
            subTitle={<FormattedMessage id="pages.medias.subTitle" />}
            extra={[
              <SearchInput
                key='ph-search'
                placeholder={
                  intl.formatMessage({
                    id: 'pages.medias.search.placeholder',
                  })
                }
                onDoubleClick={() => setShowSearch(true)}
                onChange={handleSearchChange}
              />,
              // <Button key='ph-more' icon={<MoreOutlined />}></Button>,
            ]}
          />
        </Col>
        <Col span={24}>
          <ProTable<API.Media, API.PageParams>
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
        {currentRow?.name && (
          <ProDescriptions<API.Media>
            column={1}
            title={currentRow?.name}
            colon={true}
            labelStyle={{ display: 'block', width: 84, textAlign: 'right' }}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Media>[]}
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
