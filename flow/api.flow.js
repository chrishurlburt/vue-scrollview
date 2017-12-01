// @flow
declare type ScrollviewPrivateAPI = {| // eslint-disable-line no-undef
  _track(ScrollviewComponent): ComponentVisibility,
  _untrack({ _uid: number }): void,
  _initVueScrollview(): void
|}

declare type ScrollviewPublicAPI = {| // eslint-disable-line no-undef
  scrollToComponent(ComponentKey, number): void,
  refresh(): void,
  getComponentLocation(ComponentKey): ComponentPosition | void,
  getScrollDirection(): ScrollDirection
|}
