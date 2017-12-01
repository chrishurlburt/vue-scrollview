// @flow
declare type ScrollviewComponent = { // eslint-disable-line no-undef
  $emit: Function,
  offset: number,
  _uid: number,
  $children: Array<{$vnode: { key: number }, $el: any }>, // eslint-disable-line
  $el: HTMLElement // eslint-disable-line
}
