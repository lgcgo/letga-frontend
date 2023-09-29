/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { accountInfo?: API.AccountInfo } | undefined) {
  const { accountInfo } = initialState ?? {};

  return {
    canAdmin: accountInfo && accountInfo.signinRole === 'root'
  };
}
