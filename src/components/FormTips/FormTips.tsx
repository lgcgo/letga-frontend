import { FormattedMessage } from '@umijs/max';
import { Typography, Space } from 'antd';
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import React, { useState } from 'react';
const { Text } = Typography;

export type FormTipsProps = {
  children?: JSX.Element | string
}

const FormTips: React.FC<FormTipsProps> = ({
  children: children
}) => {
  return (
    <Space direction="vertical">
      <Space style={{marginBlock: 8}}>
        <ExclamationCircleTwoTone /><Text type='secondary'><FormattedMessage id="components.formTips.title" /></Text>
      </Space>
      {children}
    </Space>
  )
}

export default FormTips;