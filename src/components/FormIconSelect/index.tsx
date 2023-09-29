import { useIntl } from '@umijs/max';
import { Typography, Space, Input, Modal, InputProps, Tabs, TabsProps, Radio, Col, Row, Form } from 'antd';
import { CloseOutlined, ImportOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import icons from '@/utils/icons';
import  { IconsIconType, IconsStyleNameType } from '@/utils/icons/index.d';
import Style from './style.less'

const { Text } = Typography;

type IconContentProps = {
  onClick?: (name: string) => void
  items?: IconsIconType[]
}

const IconContent: React.FC<IconContentProps> = ({
  onClick: onClick,
  items: items = []
}) => {
  return (
    <div className={Style.iconContentWrap}>
      {items.map((item) => {
        const { name, value } = item
        return (
          <div key={name}>
            <div onClick={() => typeof onClick === 'function' && onClick(name)}>
              <div>{value}<Text style={{ fontSize: 10 }} ellipsis>{name}</Text></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type FormIconSelectProps = {
  modalTitle?: string
  placeholder?: string
} & InputProps

const FormIconSelect: React.FC<FormIconSelectProps> = ({
  id: inputId = '',
  value: inputValue = '',
  modalTitle: modalTitle,
  placeholder: placeholder
}) => {
  const [styleName, setStyleName] = useState<IconsStyleNameType>('linear')
  const [searchValue, setSearchValue] = useState<string>('')
  const [activeKey, setActiveKey] = useState<string>('direction')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = Form.useFormInstance();
  const intl = useIntl();

  const transStyleNameIntl = (name: string): JSX.Element => {
    return <>{intl.formatMessage({id: 'components.iconSelectInput.style.' + name})}</>
  }

  const transItemsTypeNameIntl = (name: string): JSX.Element => {
    return <>{intl.formatMessage({id: 'components.iconSelectInput.type.' + name})}</>
  }

  const handleClick = (name: string) => {
    form.setFieldValue(inputId, name)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    form.setFieldValue(inputId, '')
  }

  const initItemData = (): TabsProps['items'] => {
    let typeItems: TabsProps['items'] = []
    icons.search(styleName, searchValue).items.map(iconType => {
      const { name, items } = iconType
      typeItems !== undefined && typeItems.push(
        {
          key: name,
          label: transItemsTypeNameIntl(name),
          children: <IconContent onClick={handleClick} items={items} />
        }
      )
    })
    return typeItems
  }

  const tabsItems: TabsProps['items'] = initItemData()

  return (
    <>
      <div
        className={Style.iconSelect}
      >
        <div className={Style.iconSelectSelector} onClick={() => setIsModalOpen(true)}>
          <div className={Style.iconSelectSelectionOverflow}>
            {inputValue.toString().length > 0 &&
              <div className={Style.iconSelectSelectionOverflowItem}>
                <span className={Style.iconSelectSelectionItem}>
                  <span className={Style.iconSelectSelectionItemContent}>
                    {inputValue}
                  </span>
                  <span className={Style.iconSelectSelectionItemRemove}>
                    <CloseOutlined onClick={(e)=> {
                      e.stopPropagation()
                      handleRemove()
                    }} />
                  </span>
                </span>
              </div>
            }
          </div>
          {inputValue.toString().length === 0 &&
            <div className={Style.iconSelectSelectionPlaceholder}>
              {placeholder || intl.formatMessage({
                id: 'components.select.placeholder',
              })}
            </div>
          }
        </div>
        <div className={Style.iconSelectImport}>
          <ImportOutlined />
        </div>
      </div>
      <Modal
        title={modalTitle || intl.formatMessage({
          id: 'components.iconSelectInput.modal.title',
        })}
        width={750}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Row gutter={[0, 16]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space style={{ marginTop: '4px', width: '100%', justifyContent: 'space-between' }}>
              <Radio.Group defaultValue={styleName} buttonStyle="solid">
                {icons.getStyleNames().map(value => {
                  return <Radio.Button
                    onClick={() => setStyleName(value)}
                    key={value}
                    value={value}
                  >
                    {transStyleNameIntl(value)}
                  </Radio.Button>
                })}
              </Radio.Group>
              <Input
                placeholder={intl.formatMessage({id: 'components.iconSelectInput.type.search'})}
                suffix={<SearchOutlined style={{ color: '#d9d9d9' }} />}
                onChange={e => {
                  setSearchValue(e.currentTarget.value)
                  if (e.currentTarget.value.length > 0) {
                    setActiveKey('search')
                  } else {
                    setActiveKey('direction')
                  }
                }}
              />
            </Space>
          </Col>
          <Col span={24}>
            <Tabs
              size='small'
              activeKey={activeKey}
              onTabClick={(key, e) => {
                e.stopPropagation()
                setActiveKey(key)
              }}
              className={Style.IconSeletTabs}
              items={tabsItems}
              tabPosition='top'
            />
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default FormIconSelect;