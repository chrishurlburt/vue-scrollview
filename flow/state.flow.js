// @flow
declare type State = {| // eslint-disable-line no-undef
  callbacks: Array<?(State) => void>,
  throttle: number,
  scrollviews: {
      [number | string]: ScrollviewComponent
  },
  locations: LocationsList,
  tracking: {
      [number | string]: ComponentVisibility
  },
  documentHeight: number,
  previousScrollLocation: number,
  scrollDirection: ScrollDirection,
  scrollListener?: () => void,
  recacheEl?: HTMLSpanElement, // eslint-disable-line
  lastComponent: { key?: ComponentKey, position?: ComponentPosition },
  onLastEntered: Function,
  firedOnLastEntered: boolean
|}
