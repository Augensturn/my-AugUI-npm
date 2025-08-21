import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe('Input',()=>{
    it('基本展示',()=>{
        //动态class、v-if渲染、slot渲染 是否正确
        const wrapper = mount(Input,{
            props:{
                size: 'small',
                type: 'text',
                modelValue:''
            },
            slots:{
                prepend:'prepend',
                prefix: 'prefix'
            }
        })
        // class
        expect(wrapper.classes()).toContain('au-input--small')
        expect(wrapper.classes()).toContain('is-prepend')
        
        //should render input
        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.get('input').attributes('type')).toBe('text')

        //slot
        expect(wrapper.find('.au-input__prepend').exists()).toBeTruthy
        expect(wrapper.get('.au-input__prepend').text()).toBe('prepend')
        expect(wrapper.find('.au-input__prefix').exists()).toBeTruthy
        expect(wrapper.get('.au-input__prefix').text()).toBe('prefix')

        //testarea
        const wrapper2 = mount(Input,{
            props:{
                type:'textarea',
                modelValue:''
            }
        })
        expect(wrapper2.find('textarea').exists()).toBeTruthy()
    })

    it('支持v-model',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'text',
                'onUpdate:modelValue':(e:any) => wrapper.setProps({modelValue:e})
            }
        })
        //初始值
        const input = wrapper.get('input')
        expect(input.element.value).toBe('text')
        //更新值
        //setValue 会同时出发input和change
        await input.setValue('update')
        expect(wrapper.props('modelValue')).toBe('update')
        expect(input.element.value).toBe('update')

        expect(wrapper.emitted()).toHaveProperty('input')
        expect(wrapper.emitted()).toHaveProperty('change')
        const inputEvent = wrapper.emitted('input')
        const changeEvent = wrapper.emitted('change')
        expect(inputEvent![0]).toEqual(['update'])
        expect(changeEvent![0]).toEqual(['update'])
        //v-model的异步更新
        await wrapper.setProps({ modelValue: 'prop update' })
        expect(input.element.value).toBe('prop update')
    })

    it('支持点击清空',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'test',
                type:'text',
                clearable:true
            },
            global:{
                stubs:['Icon']
            }
        })
        //不出现icon区域
        expect(wrapper.find('.au-input__clear').exists()).toBeFalsy()
        const input = wrapper.get('input')
        await input.trigger('focus')
        expect(wrapper.emitted()).toHaveProperty('focus')
        //出现icon区域
        expect(wrapper.find('.au-input__clear').exists()).toBeTruthy()
        //点击清空
        await wrapper.get('.au-input__clear').trigger('click')
        expect(input.element.value).toBe('')

        expect(wrapper.emitted()).toHaveProperty('clear')
        expect(wrapper.emitted()).toHaveProperty('input')
        expect(wrapper.emitted()).toHaveProperty('change')
        const inputEvent = wrapper.emitted('input')
        const changeEvent = wrapper.emitted('change')
        expect(inputEvent![0]).toEqual([''])
        expect(changeEvent![0]).toEqual([''])

        await input.trigger('blur')
        expect(wrapper.emitted()).toHaveProperty('blur')
    })

    it('支持切换密码显示',async ()=>{
        const wrapper = mount(Input, {
            props: {
                modelValue: '',
                showPassword: true,
                type: 'password',
            },
            global: {
                stubs: ['Icon'],
            },
        })
        //不出现Icon 值为空
        expect(wrapper.find('.au-input__password').exists()).toBeFalsy()
        const input = wrapper.get('input')
        expect(input.element.type).toBe('password')
        //出现icon区域
        await input.setValue('123')
        const eyeIcon = wrapper.find('.au-input__password')
        expect(eyeIcon.exists()).toBeTruthy()
        expect(eyeIcon.attributes('icon')).toBe('eye-slash')
        //点击切换input类型 icon切换
        await eyeIcon.trigger('click')
        expect(input.element.type).toBe('text')
        expect(wrapper.find('.au-input__password').attributes('icon')).toBe('eye')
    })
})