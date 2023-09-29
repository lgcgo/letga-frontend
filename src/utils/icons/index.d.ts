export declare type IconsIconType = {
  name: string,
  value: React.ReactNode
}

export declare type IconsTypeName = 'direction' | 'tips' | 'edit' | 'chart' | 'brand' | 'brand' | 'web' | 'search';
export declare type IconsTypeType = {
  name: IconsTypeName,
  items: IconsIconType[]
}

export declare type IconsStyleNameType = 'linear' | 'solid' | 'twocolor';
export declare type IconsStyleType = {
  name: IconsStyleNameType,
  items: IconsTypeType[]
}