// @flow
export type State = {
    callbacks: Array<?(State) => void>,
    throttle: number,
    scrollviews: {
        [number | string]: ScrollviewComponent
    },
    locations: LocationsList,
    tracking: {
        [number | string]: ComponentVisibility
    },
    bottom: number,
    scrollListener?: () => void,
    recacheEl?: HTMLSpanElement // eslint-disable-line
}

export type ScrollviewPrivateAPI = {
    _track(ScrollviewComponent): ComponentVisibility,
    _untrack({ _uid: number }): void,
    _initVueScrollview(): void,
}

export type ScrollviewPublicAPI = {
    scrollToComponent: (ComponentKey, number) => void,
    forceRefresh: () => void,
    refresh: () => void,
    getComponentLocation: (ComponentKey) => ComponentPosition | void,
}

export type ScrollviewComponent = {
    $emit: Function,
    offset: number,
    _uid: number,
    $children: Array<{$vnode: { key: number }, $el: any }>, // eslint-disable-line
    $el: HTMLElement, // eslint-disable-line
}

export type ComponentKey = string | number

export type LocationsList = Array<ComponentLocation>

export type ComponentLocation = {
    component: ComponentKey,
    position: ComponentPosition,
    scrollview: number
}

export type ComponentPosition = {
    top: number,
    bottom: number
}

export type ComponentVisibility = {
    [ComponentKey]: boolean
}
