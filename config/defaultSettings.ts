import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'side',
  contentWidth: 'Fixed', // Fixed | Fluid
  siderMenuType: "group",
  siderWidth: 190.37,
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'LetgaAdmin',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  footerRender: false,
  token: {
    sider:{
      colorMenuBackground: '#fafafa'
    },
    bgLayout: '#f0f2f5',
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
