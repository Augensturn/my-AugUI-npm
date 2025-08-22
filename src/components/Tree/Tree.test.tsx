import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";

const onVisibleChange = vi.fn()

describe('Tooltip',() =>{
    beforeEach(()=>{
        vi.useFakeTimers()
        // onVisibleChange.mockClear()
    })
    test('basic tooltip',async()=>{
        const wrapper = mount(()=>
            <div>
                <div id="outside"></div>
                <Tooltip content="hello world" trigger="click" onVisible-change={onVisibleChange}>
                <button id="trigger">trigger</button>
                </Tooltip>
            </div>
            ,{
                attachTo:document.body
            }
        )
        //静态测试
        const triggerArea = wrapper.find('#trigger')
        expect(triggerArea.exists()).toBeTruthy()
        expect(wrapper.find('.au-tooltip__popper').exists()).toBeFalsy()
        //测试点击
        await triggerArea.trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.au-tooltip__popper').exists()).toBeTruthy()
        expect(wrapper.get('.au-tooltip__popper').text()).toBe('hello world')
        expect(onVisibleChange).toHaveBeenCalledWith(true)
        //点击外侧关闭
        wrapper.get('#outside').trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.au-tooltip__popper').exists()).toBeFalsy()
        expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    })
})