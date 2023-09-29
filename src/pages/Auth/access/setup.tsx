import React, { useEffect, useRef, useState } from 'react';
import { App, Button, Col, Descriptions, DescriptionsProps, Divider, Form, Row, Space, Typography, theme } from 'antd';
import { TablePaginationConfig, TableRowSelection } from "antd/es/table/interface";
import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
import { 
  FooterToolbar, 
  GridContent, 
  PageHeader, 
  ProCard, 
  ProFormText, 
  ProTable, 
  StepsForm 
} from "@ant-design/pro-components";
import type {ActionType, ProColumns, ProFormInstance} from "@ant-design/pro-components";
import SearchInput from "@/components/SearchInput";
import TreeTransfer from "@/components/TreeTransfer";
import FormTips from "@/components/FormTips/FormTips";
import AuthService from '@/services/auth';
import UserService from '@/services/user';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { waitTime } from "@/utils/timer";
import "./style.less"

const { Paragraph, Text } = Typography;

type UserSelectTableProps = {
  onChange?: (pagination: TablePaginationConfig) => void
  onSelect?: (record: API.User) => void
}

const UserSelectTable: React.FC<UserSelectTableProps> = ({
  onChange: onChange,
  onSelect: onSelect
}) => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<API.PageParams>({ctxScene: 'accessSetupTable'})

  const intl = useIntl();

  const lockCtxDisabledKeys = useRef<React.Key[]>([])

  // 列表字段
  const columns: ProColumns<API.User>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      width: 140,
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
        >{entity.nickname}</div>
      },
      width: 100,
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

  const rowSelection: TableRowSelection<API.User> = {
    onSelect: onSelect,
    type: 'radio',
    /** 设置禁用项 */
    getCheckboxProps: (row: API.User) => ({
      disabled: lockCtxDisabledKeys.current.indexOf(row.key) > -1,
    }),
  }
  const onRow = (record: API.User) => {
    return {
      onClick: () => {
        // setCurrentRow(record)
      },
    };
  }

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
   * 处理表格搜索
   * @param value 搜索内容
   */
  const handleSearchChange = (value: string) => {
    setParams({ search: value })
  }

  return (
    <ProTable<API.User, API.PageParams>
      tableClassName='auth-access-usertable'
      headerTitle={intl.formatMessage({id: "form.auth.access.title.targetUser"})}
      toolBarRender={() => [
        <SearchInput
          placeholder={intl.formatMessage({id: "form.auth.access.searchUser.placeholder"})}
          onChange={handleSearchChange}
        />,
      ]}
      tableAlertRender={false}
      actionRef={actionRef}
      rowKey="key"
      search={false}
      scroll={{ x: true }}
      options={false}
      defaultSize='small'
      params={params}
      request={handleRequest}
      columns={columns}
      rowSelection={rowSelection}
      onChange={onChange}
      onRow={onRow}
      pagination={{
        hideOnSinglePage: true,
        defaultPageSize: 10
      }}
    />
  )
}

/**
 * 设置确认信息展示板
 */
type SetupDescriptionsProps = {
  userInfo?: SetupUserInfo;
  rolesInfo?: SetupRolesInfo;
}
const SetupDescriptions: React.FC<SetupDescriptionsProps> = ({
  userInfo: userInfo,
  rolesInfo: rolesInfo,
}) => {
  const [appendRoles, setAppendRoles] = useState<API.AuthRole[]>([])
  const [removeRoles, setRemoveRoles] = useState<API.AuthRole[]>([])

  useEffect(() => {
    if (rolesInfo?.appendKeys) {
      Promise.all(rolesInfo.appendKeys.map(item => {
        return AuthService.role.get({ params: { key: item } })
      })).then(res => {
        setAppendRoles(res)
      })
    } else {
      setAppendRoles([])
    }
    if (rolesInfo?.removeKeys) {
      Promise.all(rolesInfo.removeKeys.map(item => {
        return AuthService.role.get({ params: { key: item } })
      })).then(res => {
        setRemoveRoles(res)
      })
    } else {
      setRemoveRoles([])
    }
  }, [rolesInfo])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '授权用户',
      children: userInfo?.nickname,
    },
    {
      key: '2',
      label: '添加角色',
      children: appendRoles.length > 0 ? appendRoles.map(item => item.title).join(',') : '未设置',
    },
    {
      key: '2',
      label: '移除角色',
      children: removeRoles.length > 0 ? removeRoles.map(item => item.title).join(',') : '未设置',
    },
  ];

  return (
    <Descriptions column={1} size='small' items={items} bordered />
  )
}

type SetupUserInfo = {
  key: React.Key
  account: string
  nickname: string
}
type SetupRolesInfo = {
  setupKeys: React.Key[]
  appendKeys: React.Key[]
  removeKeys: React.Key[]
}
type StepFormValue = {
  userInfo: SetupUserInfo;
  rolesInfo: SetupRolesInfo;
  setupInfo: {}
};

const SetupPage: React.FC = () => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const { useToken } = theme;
  const { token } = useToken();
  const [current, setCurrent] = useState<number>(0)

  const navigate = useNavigate();

  /**
   * 设置目标用户信息
   */
  // const [setupUserInfo, setSetupUserInfo] = useState<SetupUserInfo>()
  const setupUserInfo = useRef<SetupUserInfo>()

  /**
   * 设置授权角色信息
   */
  // const [setupRolesInfo, setSetupRolesInfo] = useState<SetupRolesInfo>()
  const setupRolesInfo = useRef<SetupRolesInfo>()

  /**
   * 处理步骤完成
   * @param values 
   * @returns 
   */
  const handleFinish = async (values: StepFormValue) => {
    const { userInfo, rolesInfo } = values
    try {
      await AuthService.access.setup({
        userKey: userInfo.key as string,
        appendRoleKeys: rolesInfo.appendKeys as string[],
        removeRoleKeys: rolesInfo.removeKeys as string[],
      })
      message.success(intl.formatMessage({
        id: 'request.setup.success',
      }));
      await waitTime(1000);
      navigate(-1)
    } catch (error: any) {
      console.log(error)
    }
  };

  /**
   * 处理用户选择回调
   * @param user
   */
  const handleUserSelect = (user: API.User) => {
    const { key, account, nickname } = user
    formMapRef.current[0].current?.setFieldsValue({
      'userInfo': {
        key: key,
        account: account,
        nickname: nickname
      }
    })
  }

  /**
   * 处理角色选择回调
   */
  const handleRoleTransferChange = (keys: React.Key[], appendKeys: React.Key[], removeKeys: React.Key[]) => {
    formMapRef.current[1].current?.setFieldsValue({
      'rolesInfo': {
        setupKeys: keys,
        appendKeys: appendKeys,
        removeKeys: removeKeys,
      }
    })
  }

  /**
   * 处理用户选择完成
   * @param values 
   * @returns 
   */
  const handleSelectUserFinish = (values: StepFormValue): Promise<boolean | void> => {
    const { userInfo } = values

    // 缓存目标用户
    setupUserInfo.current = userInfo
    // setSetupUserInfo(userInfo)
    return Promise.resolve(true)
  }

  /**
   * 处理角色设置完成
   * @param values 
   * @returns 
   */
  const handleRoleSetupFinish = (values: StepFormValue): Promise<boolean | void> => {
    const { rolesInfo } = values
    /**
     * 验证字段，必须存在新增或者移除才能下一步
     */
    if (!rolesInfo || (rolesInfo.appendKeys.length === 0 && rolesInfo.removeKeys.length === 0)) {
      message.error("请新增或者移除角色")
      return Promise.resolve(false)
    }
    setupRolesInfo.current = rolesInfo
    return Promise.resolve(true)
  }

  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.auth.accesses.title.setup' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <StepsForm<StepFormValue>
            stepsRender={(_, dom) => {
              return <ProCard>{dom}</ProCard>
            }}
            onCurrentChange={(current: number) => {
              setCurrent(current)
            }}
            formMapRef={formMapRef}
            onFinish={handleFinish}
            containerStyle={{ minWidth: '100%' }}
            submitter={{
              render: (props, dom) => {
                return (
                  <FooterToolbar>
                    {props.step > 0 && (
                      <Button style={{ margin: '0 8px' }} onClick={() => props.onPre?.()}>
                        {intl.formatMessage({
                          id: 'form.button.prev',
                        })}
                      </Button>
                    )}
                    {props.step < 2 && (
                      <Button type="primary" onClick={() => props.onSubmit?.()}>
                        {intl.formatMessage({
                          id: 'form.button.next',
                        })}
                      </Button>
                    )}
                    {props.step === 2 && (
                      <Button type="primary" onClick={() => props.onSubmit?.()}>
                        {intl.formatMessage({
                          id: 'form.button.submit',
                        })}
                      </Button>
                    )}
                  </FooterToolbar>
                )
              },
            }}
          >
            <StepsForm.StepForm
              name="userInfo"
              title={intl.formatMessage({id: "form.auth.access.title.step1"})}
              onFinishFailed={({ errorFields }) => {
                message.error(errorFields[0].errors)
              }}
              onFinish={handleSelectUserFinish}
            >
              <ProFormText
                label="key"
                name={['userInfo', 'key']}
                rules={[{ required: true, message: intl.formatMessage({
                  id: 'form.auth.access.rules.userInfo.required',
                })}]}
                hidden
              />
              <ProFormText
                label="account"
                name={['userInfo', 'account']}
                hidden
              />
              <ProFormText
                label="nickname"
                name={['userInfo', 'nickname']}
                hidden
              />
              <UserSelectTable onSelect={handleUserSelect} />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="rolesInfo"
              title={intl.formatMessage({id: "form.auth.access.title.step2"})}
              onFinish={handleRoleSetupFinish}
            >
              <ProFormText
                label="keys"
                name={['rolesInfo', 'setupKeys']}
                rules={[]}
                hidden
              />
              <ProFormText
                label="appendKeys"
                name={['rolesInfo', 'appendKeys']}
                rules={[]}
                hidden
              />
              <ProFormText
                label="removeKeys"
                name={['rolesInfo', 'removeKeys']}
                rules={[]}
                hidden
              />
              {current === 1 && (
                <ProCard title={<FormattedMessage id="form.auth.access.title.userRoles" />} headerBordered>
                  <TreeTransfer<API.AuthRole, API.TreeParams>
                    defaultTargetKeys={setupRolesInfo.current?.setupKeys}
                    params={{
                      ctxScene: 'roleAccessTransfer',
                      ctxUserKey: setupUserInfo.current?.key
                    }}
                    request={AuthService.role.getTree}
                    onChange={handleRoleTransferChange}
                  />
                  <Divider type='horizontal' />
                  <FormTips>
                    <Typography>
                      <Paragraph>
                        <ul style={{ marginBlockEnd: 0 }}>
                          <li style={{ marginBottom: token.marginXXS }}>
                            <Text type='secondary'><FormattedMessage id="form.auth.role.tips.1" /></Text>
                          </li>
                          <li style={{ marginBottom: token.marginXXS }}>
                          <Text type='secondary'><FormattedMessage id="form.auth.role.tips.2" /></Text>
                          </li>
                          <li style={{ marginBottom: token.marginXXS }}>
                            <Text type='secondary'><FormattedMessage id="form.auth.role.tips.3" /></Text>
                          </li>
                        </ul>
                      </Paragraph>
                    </Typography>
                  </FormTips>
                </ProCard>
              )}
            </StepsForm.StepForm>
            <StepsForm.StepForm name="setupInfo" title={intl.formatMessage({id: "form.auth.access.title.step3"})}>
              {current === 2 && (
                <ProCard title={intl.formatMessage({id: "form.auth.access.title.confirmInfo"})} headerBordered>
                  <SetupDescriptions
                    userInfo={setupUserInfo.current}
                    rolesInfo={setupRolesInfo.current}
                  />
                </ProCard>
              )}
            </StepsForm.StepForm>
          </StepsForm>
        </Col>
      </Row>
    </GridContent>
  )
}

const AppPage: React.FC = () => (
  <App>
    <SetupPage />
  </App>
);
export default AppPage;