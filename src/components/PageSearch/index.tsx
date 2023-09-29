import { useState } from "react";
import { useIntl } from "@umijs/max";
import { Popover, Space } from "antd";
import {hasGuide, setGuide } from '@/utils/guide'
import SearchInput from "../SearchInput";

type PageSearchProps = {
  onDoubleClick?: () => void
  onChange?: (value: string) => void
  placeholder?: string
}

const PageSearch: React.FC<PageSearchProps> = ({
  onDoubleClick: onDoubleClick,
  onChange: onChange,
  placeholder: placeholder
}) => {
  const [open, setOpen] = useState(false);
  const intl = useIntl();

  const hide = () => {
    setGuide('ComponentSearchInput')
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  console.log("ComponentSearchInput: ", hasGuide('ComponentSearchInput'))
  return (
    <Popover
      content={
        <Space align="end" direction="vertical">
          {intl.formatMessage({id: 'components.searchInput.popover'})}
          <a onClick={hide}>{intl.formatMessage({id: 'components.searchInput.popover.close'})}</a>
        </Space>
      }
      title=""
      trigger="click"
      placement="bottomRight"
      open={hasGuide('ComponentSearchInput') ? false : open}
      onOpenChange={handleOpenChange}
    >
      <SearchInput 
        placeholder={placeholder}
        onChange={onChange}
        onDoubleClick={onDoubleClick}
      />
    </Popover>
  )
}

export default PageSearch;