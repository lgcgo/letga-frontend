import React from 'react';
import { App, Col, Row, Space } from 'antd';
import { FormattedMessage, useIntl, useNavigate, useParams } from "@umijs/max";
import { FooterToolbar, GridContent, PageHeader, ProCard, ProForm, ProFormItem, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UserService from '@/services/user';
import FormUpload from "@/components/FormUpload";
import { waitTime } from "@/utils/timer";

const { Divider } = ProCard;

const Page: React.FC = () => {
  const { message, notification } = App.useApp();
  
  const navigate = useNavigate();
  const intl = useIntl();
  const params = useParams()

  // 处理表单提交
  const handleSubmit = async (fields: API.User) => {
    await waitTime(300);
    try {
      await UserService.api.update(fields);
      message.success(intl.formatMessage({
        id: 'request.update.success',
      }));
      await waitTime(1000);
      navigate(-1)
    } catch (error: any) {
      console.log(error)
    }
  };
  return (
    <GridContent>
      <Row gutter={[24, 12]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.users.title.update' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <ProForm<API.User>
            request={() => UserService.api.get({ params: { key: params.id } })}
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
            <ProCard.Group direction="column">
              <ProCard title={<FormattedMessage id="form.user.title.loginInfo" />}>
                <ProFormText
                  name="account"
                  label={<FormattedMessage id="form.user.label.account" />}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="form.user.rules.account.required" />,
                    },
                    {
                      min: 4,
                      message: <FormattedMessage id="form.user.rules.account.min" />,
                    },
                    {
                      max: 20,
                      message: <FormattedMessage id="form.user.rules.account.max" />,
                    },
                    {
                      pattern: /^[a-zA-Z][a-zA-Z0-9_]+$/,
                      message: <FormattedMessage id="form.user.rules.account.pattern" />,
                    },
                  ]}
                  width="md"
                />
                <ProFormText
                  name="password"
                  label={<FormattedMessage id="form.user.label.password" />}
                  extra={<FormattedMessage id="form.user.extra.password" />}
                  rules={[
                    {
                      min: 6,
                      message: <FormattedMessage id="form.user.rules.password.min" />,
                    },
                    {
                      max: 18,
                      message: <FormattedMessage id="form.user.rules.password.max" />,
                    },
                    {
                      pattern: /^[\w\S]+$/,
                      message: <FormattedMessage id="form.user.rules.password.pattern" />,
                    },
                  ]}
                  width="md"
                />
                <ProFormText
                  name="mobile"
                  label={<FormattedMessage id="form.user.label.mobile" />}
                  extra={<FormattedMessage id="form.user.extra.mobile" />}
                  rules={[
                    {
                      pattern: /^[1][3,4,5,6.7,8,9][0-9]{9}$/,
                      message: <FormattedMessage id="form.user.rules.mobile.format" />,
                    },
                  ]}
                  width="md"
                />
                <ProFormText
                  name="email"
                  label={<FormattedMessage id="form.user.label.email" />}
                  extra={<FormattedMessage id="form.user.extra.email" />}
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/,
                      message: <FormattedMessage id="form.user.rules.email.format" />
                    },
                  ]}
                  width="md"
                />
              </ProCard>
              <Divider type='horizontal' />
              <ProCard title={<FormattedMessage id="form.user.title.socialInfo" />}>
                <ProFormItem
                  name="avatar"
                  label={<FormattedMessage id="form.user.label.avatar" />}
                  extra={<FormattedMessage id="form.extra.extension" />}
                >
                  <FormUpload />
                </ProFormItem>
                <ProFormText
                  name="nickname"
                  label={<FormattedMessage id="form.user.label.nickname" />}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="form.user.rules.nickname.required" />,
                    },
                    {
                      min: 2,
                      message: <FormattedMessage id="form.user.rules.nickname.min" />,
                    },
                    {
                      max: 12,
                      message: <FormattedMessage id="form.user.rules.nickname.max" />,
                    },
                    {
                      pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                      message: <FormattedMessage id="form.user.rules.nickname.pattern" />,
                    }
                  ]}
                  width="md"
                />
                <ProFormTextArea
                  label={<FormattedMessage id="form.user.label.signature" />}
                  wrapperCol={{ span: 12 }}
                  name="signature"
                />
              </ProCard>
            </ProCard.Group>
            <ProCard.Divider />
          </ProForm>
        </Col>
      </Row>
    </GridContent>
  )
}

const AppPage: React.FC = () => (
  <App>
    <Page />
  </App>
);
export default AppPage;