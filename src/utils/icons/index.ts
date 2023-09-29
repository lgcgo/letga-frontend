import { IconsStyleNameType,IconsIconType,IconsStyleType,IconsTypeType } from "./index.d";
import linear from "./styles/linear"
import solid from "./styles/solid"
import twocolor from "./styles/twocolor"

function getStyleNames(): IconsStyleNameType[] {
  return ['linear', 'solid', 'twocolor']
}

function searchTypeIcon(items: IconsIconType[], searchValue: string): IconsIconType[] {
  let icons: IconsIconType[] = [];
  // if (searchValue.length === 0) {
  //   return icons
  // }
  items.forEach(item => {
    if (searchValue.length === 0) {
      icons.push(item)
      return
    }
    if (item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
      icons.push(item)
    }
  })
  return icons
}

function search(styleName: IconsStyleNameType, searchValue: string): IconsStyleType {
  let style: IconsStyleType
  switch (styleName) {
    case 'linear':
      style = linear
      break;
    case 'solid':
      style = solid
      break;
    case 'twocolor':
      style = twocolor
      break;
    default:
      style = linear
      break;
  }

  if (searchValue.length === 0) {
    return style
  }

  const { name, items } = style
  let searchIcons: IconsIconType[] = []
  let newStyle: IconsStyleType = {
    name: name,
    items: items.map(type => {
      let typeIcons = searchTypeIcon(type.items, searchValue)
      let newType: IconsTypeType = {
        name: type.name,
        items: typeIcons
      }
      searchIcons = [...searchIcons, ...typeIcons]
      return newType
    })
  }
  newStyle.items.unshift({
    name: 'search',
    items: searchIcons
  })

  return newStyle
}

export default {
  getStyleNames,
  search,
}