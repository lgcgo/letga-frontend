import React from 'react';
import { App, Col, Row, Space } from 'antd';
import { FormattedMessage, useIntl, useNavigate, useParams } from "@umijs/max";
import { 
  FooterToolbar, 
  GridContent, 
  PageHeader, 
  ProCard, 
  ProForm, 
  ProFormItem, 
  ProFormText, 
  ProFormTextArea 
} from "@ant-design/pro-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MenuService from '@/services/menu';
import FormUpload from "@/components/FormUpload";
import FormTreeSelect from "@/components/FormTreeSelect";
import FormIconSelect from "@/components/FormIconSelect";
import { waitTime } from '@/utils/timer'

const Page: React.FC = () => {
  const navigate = useNavigate();
  const { message, notification } = App.useApp();
  const intl = useIntl();
  const params = useParams()

  /**
   * @en-US Update Menu
   * @zh-CN 修改菜单
   * @param fields
   */
  const handleSubmit = async (fields: API.Menu) => {
    await waitTime(300);
    try {
      await MenuService.api.update(fields);
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
  return (
    <GridContent>
      <Row gutter={[24, 12]}>
        <Col span={24}>
          <PageHeader
            style={{ paddingInline: 0 }}
            title={<Space><ArrowLeftOutlined onClick={() => navigate(-1)} /><FormattedMessage id='pages.menus.title.update' /></Space>}
          />
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 20, offset: 1 }} xl={{ span: 16, offset: 3 }}>
          <ProCard title={<FormattedMessage id='form.menu.card.title' />}>
            <ProForm<API.Menu>
              request={() => MenuService.api.get({ params: { key: params.id } })}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
              layout="horizontal"
              colon={true}
              submitter={{
                render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              }}
              onFinish={async (values) => handleSubmit(values)}
            >
              <ProFormText name="key" hidden />
              <ProFormItem
                name="parentKey"
                label={<FormattedMessage id="form.label.parentKey" />}
                extra={<FormattedMessage id="form.extra.parentKey" />}
              >
                <FormTreeSelect<API.Menu, API.TreeParams>
                  params={{
                    ctxScene: 'menuForm',
                    ctxMenuKey: params.id
                  }}
                  request={MenuService.api.getTree}
                />
              </ProFormItem>
              <ProFormText
                name="title"
                label={<FormattedMessage id="form.label.title" />}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="form.rules.required" />,
                  },
                  {
                    max: 12,
                    message: <FormattedMessage id="form.rules.title.max12" />,
                  },
                  {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                    message: <FormattedMessage id="form.rules.pattern.UAa09_" />,
                  }
                ]}
                width="md"
              />
              <ProFormItem
                name="icon"
                label={<FormattedMessage id="form.label.icon" />}
                rules={[
                ]}
              >
                <FormIconSelect />
              </ProFormItem>
              <ProFormItem
                label={<FormattedMessage id="form.label.coverUrl" />}
                name="coverUrl"
                extra={<FormattedMessage id="form.extra.extension" />}
              >
                <FormUpload />
              </ProFormItem>
              <ProFormTextArea
                wrapperCol={{ span: 12 }}
                label={<FormattedMessage id="form.label.remark" />}
                name="remark"
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
    <Page />
  </App>
);
export default AppPage;