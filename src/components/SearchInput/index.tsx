import { useState } from "react";
import { useIntl } from "@umijs/max";
import { Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useRequest } from 'ahooks';

export type SimpleSearchInputProps = {
  onChange?: (value: string) => void
  onDoubleClick?: () => void
  placeholder?: string
}

const SearchInput: React.FC<SimpleSearchInputProps> = ({
  onChange: onChange,
  onDoubleClick: onDoubleClick,
  placeholder: placeholder = ''
}) => {
  const [inputWith, setInputWith] = useState<number>(200);
  const intl = useIntl();

  const handleOnChange = function (search?: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof onChange === 'function') {
          onChange(search || '')
        }
        resolve(search || '');
      }, 500);
    });
  }

  const { data, loading, run } = useRequest(handleOnChange, {
    debounceWait: 300,
    manual: true,
  });

  return (
    <Input
      style={{ width: inputWith }}
      onClick={(e) => {
        e.stopPropagation()
        setInputWith(270)
      }}
      placeholder={placeholder || intl.formatMessage({
        id: 'components.searchInput.placeholder',
      })}
      onBlur={() => { setInputWith(200) }}
      onDoubleClick={() => {
        if (typeof onDoubleClick === 'function') {
          onDoubleClick()
        }
      }}
      onChange={(e) => run(e.target.value)}
      suffix={loading ? <LoadingOutlined /> : <SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
    />
  )
}

export default SearchInput;