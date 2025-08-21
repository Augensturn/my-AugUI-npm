import type { FontAwesomeIconProps as OriginalProps } from "@fortawesome/vue-fontawesome";
export interface ExtendFontAwesomeIconProps extends OriginalProps {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    color?: string
}