declare module 'react-simple-maps' {
    import { ReactNode } from 'react'

    export interface ComposableMapProps {
        width?: number
        height?: number
        projection?: string
        projectionConfig?: any
        children?: ReactNode
    }

    export interface GeographiesProps {
        geography: string
        children: (props: { geographies: any[] }) => ReactNode
    }

    export interface GeographyProps {
        geography: any
        fill?: string
        stroke?: string
        strokeWidth?: number
        style?: {
            default?: any
            hover?: any
            pressed?: any
        }
    }

    export interface MarkerProps {
        coordinates: [number, number]
        children?: ReactNode
    }

    export interface ZoomableGroupProps {
        center?: [number, number]
        zoom?: number
        children?: ReactNode
    }

    export const ComposableMap: React.FC<ComposableMapProps>
    export const Geographies: React.FC<GeographiesProps>
    export const Geography: React.FC<GeographyProps>
    export const Marker: React.FC<MarkerProps>
    export const ZoomableGroup: React.FC<ZoomableGroupProps>
} 