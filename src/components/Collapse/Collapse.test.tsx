import { beforeAll, describe, expect, test ,vi } from "vitest";
import { mount } from "@vue/test-utils";
import type { VueWrapper,DOMWrapper } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { icon } from "@fortawesome/fontawesome-svg-core";
const onChange = vi.fn()
let wrapper:VueWrapper 
let header:DOMWrapper<Element>[],content:DOMWrapper<Element>[]
let firstHeader:DOMWrapper<Element>,secondHeader:DOMWrapper<Element>,disabledHeader:DOMWrapper<Element>,
    first:DOMWrapper<Element>,second:DOMWrapper<Element>,disabledContent:DOMWrapper<Element>

describe('Collapse',()=>{
    beforeAll(()=>{
        wrapper = mount(()=>
            <Collapse modelValue={['a']} onChange={onChange}>
                <CollapseItem name="a" title="title a">
                    content a
                </CollapseItem>
                <CollapseItem name="b" title="title b">
                    content b
                </CollapseItem>
                <CollapseItem name="c" title="title c" disabled>
                    content c
                </CollapseItem>
            </Collapse>
        ,{
            global:{
                stubs:['icon']
            },
            
        }
        )
        header = wrapper.findAll('.au-collapse-item__header')
        content = wrapper.findAll('.au-collapse-wrapper')
        firstHeader = header[0]
        secondHeader = header[1]
        disabledHeader = header[2]
        first = content[0]
        second = content[1]
        disabledContent = content[2]
    })
    test('测试基础结构以及对应文本',()=>{
        //长度
        expect(header.length).toBe(3)
        expect(content.length).toBe(3)
        console.log(wrapper.html())
        //文本
       
        expect(firstHeader.text()).toBe('title a')
        //内容
        
        expect(first.isVisible()).toBeTruthy
        expect(second.isVisible()).toBeFalsy
        expect(first.text()).toBe('content a')
    })
    test('点击标题展开/关闭内容',async()=>{
        await firstHeader.trigger('click')
        expect(first.isVisible()).toBeFalsy
    })
    test('发送正确时间',async()=>{
        //onChange回调
        expect(onChange).toHaveBeenCalledWith([])
        await secondHeader.trigger('click')
        expect(onChange).toHaveBeenLastCalledWith(['b'])
    })
    test('disabled的内容应该没有反应',async()=>{
        //disabled
        expect(disabledHeader.classes()).toContain('is-disabled')
        await disabledHeader.trigger('click')
        expect(disabledContent.isVisible()).toBeFalsy
    })
    
    
})