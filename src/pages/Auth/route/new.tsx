import React from 'react';
import { App, Col, Row, Space } from 'antd';
import { FormattedMessage, useIntl, useNavigate } from "@umijs/max";
import { 
  FooterToolbar, 
  GridContent, 
  PageHeader, 
  ProCard, 
  ProForm, 
  ProFormItem, 
  ProFormRadio, 
  ProFormText, 
  ProFormTextArea 
} from "@ant-design/pro-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FormTreeSelect from "@/components/FormTreeSelect";
import AuthService from '@/services/auth';
import MenuService from '@/services/menu';
import { waitTime } from "@/utils/timer";

const NewPage: React.FC = () => {
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const navigate = useNavigate();

  // 处理表单提交
  const handleSubmit = async (fields: API.AuthRoute) => {
    await waitTime(300);
    try {
      await AuthService.route.create(fields);
      message.success(intl.formatMessage({
        id: 'request.create.success',
      }));
      await waitTime(1000);
      navigate(-1)
    } catch (error: any) {
      console.log(error)
      // notification.error({
      //   message: error?.name || 'BizError',
      //   description: error?.info.errorMessage || '',
      // })
    }
  };
  return (
    <GridContent>
      <Row gutter={[24, 12]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.auth.routes.title.new' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <ProCard title={<FormattedMessage id='form.auth.route.card.title' />}>
            <ProForm<API.AuthRoute>
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
                label={<FormattedMessage id="form.label.title" />}
                // extra={<FormattedMessage id="form.auth.route.title.extra" />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.rules.required" />,
                  },
                  {
                    min: 2,
                    message: <FormattedMessage id="form.rules.min2" />,
                  },
                  {
                    max: 12,
                    message: <FormattedMessage id="form.rules.max12" />,
                  },
                  {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                    message: <FormattedMessage id="form.rules.pattern.UAa09_" />,
                  }
                ]}
                width="md"
              />
              <ProFormText
                name="path"
                label={<FormattedMessage id="form.auth.route.path.label" />}
                extra={<FormattedMessage id="form.auth.route.path.extra" />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.rules.required" />,
                  },
                  {
                    min: 1,
                    message: <FormattedMessage id="form.rules.min1" />,
                  },
                  {
                    max: 128,
                    message: <FormattedMessage id="form.rules.max128" />,
                  },
                  {
                    pattern: /^\/[A-Za-z0-9\/]+$/,
                    message: <FormattedMessage id="form.rules.pattern.message" />,
                  }
                ]}
                width="md"
              />
              <ProFormRadio.Group
                name="method"
                label={<FormattedMessage id="form.auth.route.method.label" />}
                layout="vertical"
                options={[
                  {
                    label: 'POST',
                    value: 'POST',
                  },
                  {
                    label: 'PUT',
                    value: 'PUT',
                  },
                  {
                    label: 'GET',
                    value: 'GET',
                  },
                  {
                    label: 'DELETE',
                    value: 'DELETE',
                  },
                ]}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.rules.required" />,
                  },
                ]}
              />
              <ProFormItem
                name="menuKey"
                label={<FormattedMessage id="form.label.menu" />}
              >
                <FormTreeSelect<API.Menu, API.TreeParams>
                  request={() => MenuService.api.getTree({})}
                />
              </ProFormItem>
              <ProFormTextArea
                label={<FormattedMessage id="form.label.remark" />}
                wrapperCol={{ span: 12 }}
                name="remark"
                rules={[
                  {
                    max: 256,
                    message: <FormattedMessage id="form.rules.max256" />,
                  },
                ]}
              />
            </ProForm>
          </ProCard>
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