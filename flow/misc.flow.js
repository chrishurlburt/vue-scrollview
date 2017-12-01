// @flow
declare type ComponentKey = string | number

declare type LocationsList = Array<ComponentLocation> // eslint-disable-line no-undef

declare type ComponentLocation = {
    component: ComponentKey,
    position: ComponentPosition,
    scrollview: number
}

declare type ComponentPosition = {
    top: number,
    bottom: number
}

declare type ComponentVisibility = { // eslint-disable-line no-undef
    [ComponentKey]: boolean
}

declare type ScrollDirection = "UP" | "DOWN" // eslint-disable-line no-undef
