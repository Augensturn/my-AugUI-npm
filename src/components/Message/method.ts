import { render, h, shallowReactive } from "vue"
import type { CreateMessageProps,MessageContext } from "./type"
import MessageConstructor from "./Message.vue"
import useZIndex from "../../hooks/useZIndex"

let seed = 1
const instances :MessageContext[] = shallowReactive([])
export const createMessage = (props:CreateMessageProps) =>{
    const { nextZIndex } = useZIndex()
    const id = `message_${seed++}`
    const container = document.createElement('div')
    const destory = () =>{
        //可以清空这个节点
        const idx = instances.findIndex(instances => instances.id === id)
        if(idx === -1) return
        instances.splice(idx,1)
        render(null,container) 

    }
    // 手动调用删除，即手动调整visible的值，visible的值是通过expose传出来的
    const manuDestory = () => {
        const instance = instances.find(instance => instance.id === id)
        if(instance){
            instance.vm.exposed!.visible.value = false
        }
    }
    const newProps = {
        ...props,
        id,
        onDestory:destory,
        zIndex:nextZIndex()
    }
    const vnode = h(MessageConstructor, newProps)
    render(vnode, container)
    
    //!表示一个变量不为null或者undefined
    document.body.appendChild(container.firstElementChild!)
    const vm = vnode.component!
    const instance = {
        id,
        vnode,
        vm,
        props:newProps,
        destory:manuDestory
    }
    instances.push(instance)
    return instance
}

export const getLastInstance = () => {
    return instances.at(-1)
}

export const getLastBottomOffset = (id:string) => {
    const idx = instances.findIndex(instance => instance.id === id)
    if(idx<=0){
        return 0
    }else{
        const prev = instances[idx - 1]
        return prev.vm.exposed!.bottomOffset.value
    }
}

export const closeAll = () =>{
    instances.forEach(instance => {
        instance.destory()
    })
}