export const getElDistanceTop = (el) => {
  let location = 0
  if (el.offsetParent) {
    do {
      location += el.offsetTop
      el = el.offsetParent
    } while (el)
  }
  return location >= 0 ? location : 0
}

export const keysAreUnique = (state, children) => {
  const exists = children.find(({ $vnode: { key }}) => {
    const match = state.locations.find(({ component }) => {
      return component === key
    })
    return !!(match)
  })
  return !(exists)
}

export const fetchComponentByKey = (key, locations) =>
  locations.find(location => location.component === key)
