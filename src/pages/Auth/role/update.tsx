import React, { useRef, useState } from 'react';
import { App, Col, Row, Space } from 'antd';
import { FormattedMessage, useIntl, useNavigate, useParams } from "@umijs/max";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { 
  FooterToolbar, 
  GridContent, 
  PageHeader, 
  ProCard, 
  ProForm, 
  ProFormInstance, 
  ProFormItem, 
  ProFormText 
} from "@ant-design/pro-components";
import FormTreeSelect from "@/components/FormTreeSelect";
import RoleAccessTable from "../components/RoleAccessTable";
import AuthService from '@/services/auth';
import { waitTime } from "@/utils/timer";

const NewPage: React.FC = () => {
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const params = useParams()
  const formRef = useRef<ProFormInstance>();
  const navigate = useNavigate();

  const [ctxRoleName, setCtxRoleName] = useState<string>('')

  const appendRouteKeys = useRef<React.Key[]>([])
  const removeRouteKeys = useRef<React.Key[]>([])

  /**
   * 处理表单请求数据
   * 
   * @param params 请求参数，可以通过setParams重新发起请求
   * @returns 
   */
  const handleRequest = async (): Promise<API.AuthRole> => {
    return AuthService.role.get({ params: { key: params.id } }).then(data => {
      const { name } = data
      setCtxRoleName(name)
      return data
    })
  }

  /**
   * @en-US Update Role
   * @zh-CN 修改角色
   * @param fields
   */
  const handleSubmit = async (fields: API.AuthRole) => {
    const newFields: API.AuthRoleUpdate = fields
    newFields.appendRouteKeys = appendRouteKeys.current
    newFields.removeRouteKeys = removeRouteKeys.current

    await waitTime(300);
    try {
      await AuthService.role.update(fields);
      message.success(intl.formatMessage({
        id: 'request.update.success',
      }));
      await waitTime(1000);
      navigate(-1)
    } catch (error: any) {
      console.log(error)
      // notification.warning({
      //   message: error?.name || 'BizError',
      //   description: error?.info.errorMessage || '',
      // })
    }
  };

  /**
   * 处理路由变动
   * @param appendKeys 
   * @param removeKeys 
   */
  const handelRouteOnchange = (appendKeys: React.Key[], removeKeys: React.Key[]) => {
    appendRouteKeys.current = appendKeys
    removeRouteKeys.current = removeKeys
  }
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.auth.roles.title.update' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <ProCard title={<FormattedMessage id='form.title.baseInfo' />}>
            <ProForm<API.AuthRole>
              request={handleRequest}
              formRef={formRef}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 11 }}
              layout="horizontal"
              colon={true}
              submitter={{
                render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              }}
              onFinish={async (values) => handleSubmit(values)}
            >
              <ProFormText name="key" hidden />
              {/* <AntDivider orientation="left" plain>{<FormattedMessage id='form.subTitle.baseInfo' />}</AntDivider> */}
              <ProFormText
                name="title"
                label={<FormattedMessage id="form.auth.role.label.title" />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.auth.role.rules.title.required" />,
                  },
                  {
                    min: 2,
                    message: <FormattedMessage id="form.auth.role.rules.title.min" />,
                  },
                  {
                    max: 32,
                    message: <FormattedMessage id="form.auth.role.rules.title.max" />,
                  },
                  {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                    message: <FormattedMessage id="form.auth.role.rules.title.pattern" />,
                  }
                ]}
                width="md"
              />
              <ProFormItem
                name="parentKey"
                label={<FormattedMessage id="form.auth.role.label.parentKey" />}
                rules={ctxRoleName !== 'root' ? [
                  {
                    required: true,
                    message: <FormattedMessage id="form.auth.role.rules.parentKey.required" />,
                  },
                ] : undefined}
              >
                <FormTreeSelect<API.AuthRole, API.TreeParams>
                  disabled={['root', 'default'].indexOf(ctxRoleName) > -1}
                  params={{
                    ctxScene: 'roleForm',
                    ctxRoleKey: params.id
                  }}
                  request={AuthService.role.getTree}
                />
              </ProFormItem>
              <ProFormText
                name="name"
                label={<FormattedMessage id="form.auth.role.label.name" />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.auth.role.rules.name.required" />,
                  },
                  {
                    min: 2,
                    message: <FormattedMessage id="form.auth.role.rules.name.min" />,
                  },
                  {
                    max: 32,
                    message: <FormattedMessage id="form.auth.role.rules.name.max" />,
                  },
                  {
                    pattern: /^[A-Za-z0-9_]+$/,
                    message: <FormattedMessage id="form.auth.role.rules.name.pattern" />,
                  }
                ]}
                extra={<FormattedMessage id="form.auth.role.name.extra" />}
                width="md"
                disabled={['root', 'default'].indexOf(ctxRoleName) > -1}
              />
              <ProFormText name="userKeys" hidden />
            </ProForm>
          </ProCard>
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <RoleAccessTable
            disabled={ctxRoleName === 'root'}
            headerTitle={<FormattedMessage id="form.auth.role.title.route" />}
            bizCtx={{ ctxRoleKey: params.id as string }}
            onChange={handelRouteOnchange}
          />
        </Col>
      </Row>
    </GridContent>
  )
}

const AppPage: React.FC = () => (
  <App>
    <NewPage />
  </App>
);
export default AppPage;