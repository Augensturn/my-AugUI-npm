import type { VNode,ComponentInternalInstance } from "vue"
export interface MessageProps {
    message?: string | VNode;
    //多久后关闭
    duration?: number;
    //是否显示关闭按钮
    showClose?: boolean;
    type?: 'success' | 'info' | 'warning' | 'error'
    onDestory:() => void;
    offset?: number;
    id:string,
    zIndex: number;
    transitionName?: string
}
export interface MessageContext {
    id: string;
    vnode: VNode;
    props: MessageProps;
    vm:ComponentInternalInstance;
    destory :() => void
}
export type CreateMessageProps = Omit<MessageProps,'onDestory' | 'id' | 'zIndex'>