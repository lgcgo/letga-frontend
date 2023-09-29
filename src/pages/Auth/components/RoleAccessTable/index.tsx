import { useRef, useState } from "react";
import { Button, Tag } from "antd";
import { FormattedMessage } from "@umijs/max";
import { 
  ProCard, 
  ProTable 
} from "@ant-design/pro-components";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import RouteTableModal, { RouteTableModalActionType as ModalActionType } from "../RouteTableModal"
import AuthService from '@/services/auth';
import './style.less'

type RoleAccessTableProps = {
  disabled?: boolean;

  headerTitle?: React.ReactNode;
  /**
   * 业务上下文
   * 
   * bizCtx会随parms传到后端，后端根据bizCtx返回列表数据
   * 
   * @param ctxName 标识
   * @param ctxKey  索引
   */
  bizCtx?: {
    ctxRoleKey?: string,
  };

  /**
   * 从Model选入与Table中移除数据后，对比上下文结算的结果
   * 
   * @param appendKeys 对比初始化时，是校对初始数据新增的索引集
   * @param removeKeys 对比初始化时，是校对初始数据移除的索引集
   */
  onChange?: (appendKeys: React.Key[], removeKeys: React.Key[]) => void;
}

const RoleAccessTable: React.FC<RoleAccessTableProps> = ({
  disabled: disabled,
  headerTitle: headerTitle,
  bizCtx: bizCtx,
  onChange: onChange
}) => {
  const [modelOpen, setModelOpen] = useState(false);

  const modelRef = useRef<ModalActionType>(null)

  /**
   * 请求后端的索引集参数
   * 
   * @param apks appendKeys缩写, GET参数：&apks[]=key1&apks[]=key2...
   * @param rmks removeKeys缩写, GET参数：&rmks[]=rmks&rmks[]=key2...
   */
  const [params, setParams] = useState<API.PageParams>({
    ctxScene: 'roleAccessTable',
    ctxRoleKey: bizCtx?.ctxRoleKey,
    apks: [],
    rmks: [],
  })

  const actionRef = useRef<ActionType>();
  //const intl = useIntl();

  /**
   * 锁定的当前页上下文来的直属项
   * 作用1：用于标记来源
   * 作用2：校对新增或删除
   */
  const lockCtxDirectKeys = useRef<React.Key[]>([]);

  /** 新增集缓存 */
  const appendKeys = useRef<React.Key[]>([])
  /** 移除集缓存 */
  const removeKeys = useRef<React.Key[]>([])

  /**
   * 处理表格请求数据
   * @param params 请求参数，可以通过setParams重新发起请求
   * @returns 
   */
  const handleRequest = async (requestParams: API.PageParams): Promise<API.AuthRoutePage> => {
    return AuthService.route.getPage(requestParams).then(res => {
      const {ctxDirectKeys, data } = res

      /**
       * 锁定缓存当前页上下文来自子级的项，在当页的操作中不会被更改
       */
      lockCtxDirectKeys.current = ctxDirectKeys ?? []

      return res
    })
  }

  const handelModelShowChange = (openState: boolean) => {
    setModelOpen(openState)
  }

  const handelChange = () => {
    const apks = appendKeys.current
    const rmks = removeKeys.current
    // 更新请求参数，表格会自动跟新
    console.log("params: ", params)
    setParams({ ...params, rmks: removeKeys.current as string[], apks: appendKeys.current as string[] })
    if (typeof onChange === 'function') {
      onChange(apks, rmks)
    }
  }

  /**
   * 处理移除
   * 
   * @param key 被移除的项
   */
  const handelRemove = (key: React.Key) => {
    // 提取直属项
    const drks = lockCtxDirectKeys.current
    // 提取移除项
    const rmks = removeKeys.current
    // 提取添加项
    const apks = appendKeys.current

    if (apks.indexOf(key) > -1) { // 存在于新增集中
      // 在新增集中移除
      const newApks = apks.filter(item => item !== key)
      // 更新缓存
      appendKeys.current = newApks
      // 更新选择器中的缓存
      modelRef.current?.updateAppendKeys(newApks)
    } else if (drks.indexOf(key) > -1) { // 存在直属项中
      // 添加到移除项中
      const newRmks = removeKeys.current = rmks.concat(key)
      // 更新选择器中的缓存
      modelRef.current?.updateRemoveKeys(newRmks)
    }

    // 处理更新
    handelChange()
  }

  // 处理选择结果
  const handelSelectOk = (apks: React.Key[], rmks: React.Key[]) => {
    appendKeys.current = apks
    removeKeys.current = rmks

    // 关闭弹窗
    setModelOpen(false)
    // 处理更新
    handelChange()
  }

  // 操作是否可用
  const isOptionDisable = (key: React.Key): boolean => {
    // 非直属而且非新增项，即是子级项不能直接操作
    return lockCtxDirectKeys.current.indexOf(key) === -1 && appendKeys.current.indexOf(key) === -1
  }

  // 列表字段
  const columns: ProColumns<API.AuthRoute>[] = [
    {
      title: <FormattedMessage id="table.columns.key" />,
      dataIndex: 'key',
      fixed: 'left',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.title" />,
      dataIndex: 'title',
      search: false,
      width: 120,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.menuKey" />,
      dataIndex: 'menuKey',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.menu" />,
      dataIndex: 'menu',
      hideInTable: true,
      search: false,
      render: (_, record) => {
        return <>{record.menu?.title}</>
      },
      width: 120,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.method" />,
      dataIndex: 'method',
      hideInTable: true,
      search: false,
    },
    {
      title: <FormattedMessage id="table.auth.route.columns.path" />,
      dataIndex: 'path',
      render: (_, entity) => {
        let tagElm
        switch (entity.method) {
          case 'POST':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="blue">POST</Tag>
            break;
          case 'GET':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="green">GET</Tag>
            break;
          case 'PUT':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="purple">PUT</Tag>
            break;
          case 'DELETE':
            tagElm = <Tag style={{ width: 54, textAlign: 'center' }} color="red">DELETE</Tag>
            break;
          default:
            break;
        }
        return <>{tagElm}{entity.path}</>
      },
      search: false,
    },
    {
      title: <FormattedMessage id="table.columns.remark" />,
      dataIndex: 'remark',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.weight" />,
      dataIndex: 'weight',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.createAt" />,
      dataIndex: 'createAt',
      search: false,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="table.columns.updateAt" />,
      dataIndex: 'updateAt',
      hideInTable: true,
      search: false,
    },
    {
      title: "直属",
      dataIndex: 'belongSelft',
      search: false,
      render: (_, entity) => {
        return <>{lockCtxDirectKeys.current.indexOf(entity.key) > -1 ? '是' : '否'}</>
      }
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
    {
      title: <FormattedMessage id="table.columns.option" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return <Button type="link" onClick={() => handelRemove(record.key)} disabled={isOptionDisable(record.key)}>
          <FormattedMessage id="components.auth.roleAccessTable.option.remove" defaultMessage="Select" />
        </Button>
      },
      width: 60,
    },
  ];

  return (
    <ProCard
      className={disabled ? "disabled-area" : ""}
      title={headerTitle ?? <FormattedMessage id="components.auth.roleAccessTable.table" defaultMessage="Routes" />}
      extra={
        <Button
          type='primary'
          key="select-route"
          onClick={() => setModelOpen(true)}
        >
          <FormattedMessage id="components.auth.roleAccessTable.button.select" defaultMessage="Select" />
        </Button>
      }
    >
      <ProTable<API.AuthRoute, API.PageParams>
        ghost
        tableClassName="role-access-table"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        scroll={{ x: true }}
        options={false}
        defaultSize='small'
        params={params}
        request={handleRequest}
        columns={columns}
        tableAlertRender={false}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 5
        }}
      />
      <RouteTableModal
        ref={modelRef}
        bizParams={{ ctxRoleKey: bizCtx?.ctxRoleKey }}
        onOk={handelSelectOk}
        onShowChange={handelModelShowChange}
        open={modelOpen}
      />
    </ProCard>
  )
}

export default RoleAccessTable