import React from 'react';
import type { RunTimeLayoutConfig } from '@umijs/max';
import Footer from '@/components/Footer';
import { SelectLang } from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import AccountService from './services/account';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/signin';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  accountInfo?: API.AccountInfo;
  loading?: boolean;
  fetchAccountInfo?: () => Promise<API.AccountInfo | undefined>;
}> {
  const fetchAccountInfo = async () => {
    try {
      const data = await AccountService.api.currentUser({
        skipErrorHandler: true,
      });
      return data;
    } catch (error) {
      console.log(error)
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const accountInfo = await fetchAccountInfo();
    return {
      fetchAccountInfo,
      accountInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchAccountInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.accountInfo?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.accountInfo?.nickname,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.accountInfo && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      // {
      //   src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
      //   left: 85,
      //   bottom: 100,
      //   height: '303px',
      // },
      // {
      //   src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
      //   bottom: -68,
      //   right: -45,
      //   height: '303px',
      // },
      // {
      //   src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
      //   bottom: 0,
      //   left: 0,
      //   width: '331px',
      // },
    ],
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
