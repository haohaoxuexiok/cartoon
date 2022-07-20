export function authorityMapLeafKeys(authorityList: any[]) {
    const leftKeys: number[] = []
  
    const _recurseGetLeaf = (authorityList: any[]) => {
      for (const authority of authorityList) {
        if (authority.children.length > 0) {
          _recurseGetLeaf(authority.children)
        } else {
          leftKeys.push(authority.id)
        }
      }
    }
    _recurseGetLeaf(authorityList)
  
    return leftKeys
  }

  export function result(authorityList: any[]) {
    const leftKeys: number[] = []
  
    const _recurseGetLeaf = (authorityList: any[]) => {
      for (const authority of authorityList) {
        if (authority.type < 3) {
          _recurseGetLeaf(authority.children)
        } else {
          leftKeys.push(authority.id)
        }
      }
    }
    _recurseGetLeaf(authorityList)
  
    return leftKeys
  }