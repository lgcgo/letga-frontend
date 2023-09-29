import React, { useRef } from 'react';
import { App, Col, Row, Space, theme } from 'antd';
import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
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
  const formRef = useRef<ProFormInstance>();
  const navigate = useNavigate();

  const appendRouteKeys = useRef<React.Key[]>([])

  /**
   * @en-US Create Role
   * @zh-CN 新建角色
   * @param fields
   */
  const handleSubmit = async (fields: API.AuthRole) => {
    const newFields: API.AuthRoleCreate = fields
    newFields.appendRouteKeys = appendRouteKeys.current

    await waitTime(300);
    try {
      await AuthService.role.create(fields);
      message.success(intl.formatMessage({
        id: 'request.create.success',
      }));
      await waitTime(1000);
      navigate(-1)
    } catch (error: any) {
      notification.warning({
        message: error?.name || 'BizError',
        description: error?.info.errorMessage || '',
      })
    }
  };

  const handelRouteOnchange = (appendKeys: React.Key[]) => {
    appendRouteKeys.current = appendKeys
  }
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.auth.roles.title.new' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <ProCard title={<FormattedMessage id='form.title.baseInfo' />}>
            <ProForm<API.AuthRole>
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
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.auth.role.rules.parentKey.required" />,
                  },
                ]}
              >
                <FormTreeSelect<API.AuthRole, API.TreeParams>
                  params={{
                    ctxScene: 'roleForm',
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
              />
              <ProFormText name="userKeys" hidden />
            </ProForm>
          </ProCard>
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <RoleAccessTable
            headerTitle={<FormattedMessage id="form.auth.role.title.route" />}
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