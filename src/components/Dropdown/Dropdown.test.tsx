import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import AUDropdown from "./Dropdown.vue";

const menuOptions = [
  { label: 'Option 1', key: 1 },
  { label: 'Option 2', key: 2, disabled: true },
  { label: 'Option 3', key: 3, divided: true }
];

const onVisibleChange = vi.fn();
const onSelect = vi.fn();

describe('AUDropdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    onVisibleChange.mockClear();
    onSelect.mockClear();
  });

  test('renders menu items correctly and handles click', async () => {
    const wrapper = mount(() => 
      <div>
        <div id="outside"></div>
        <AUDropdown
          menuOptions={menuOptions}
          trigger="click"
          onVisible-change={onVisibleChange}
          onSelect={onSelect}
        >
          <button id="trigger">Toggle</button>
        </AUDropdown>
      </div>,
      { attachTo: document.body }
    );

    const triggerArea = wrapper.find('#trigger');
    expect(triggerArea.exists()).toBeTruthy();

    // 初始菜单未显示
    expect(wrapper.find('.au-dropdown__item').exists()).toBeFalsy();

    // 点击触发 Dropdown
    await triggerArea.trigger('click');
    await vi.runAllTimers();

    const items = wrapper.findAll('.au-dropdown__item');
    expect(items.length).toBe(3);
    expect(items[1].classes()).toContain('is-disabled');
    expect(wrapper.find('.divided-placeholder').exists()).toBe(true);

    // 点击第一项（可用）
    await items[0].trigger('click');
    expect(onSelect).toHaveBeenCalledWith(menuOptions[0]);

    // 点击第二项（禁用）
    await items[1].trigger('click');
    expect(onSelect).toHaveBeenCalledTimes(1); // 不增加

    // visible-change 事件
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    // 点击外部关闭 Dropdown
    wrapper.get('#outside').trigger('click');
    await vi.runAllTimers();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  });

  test('hides tooltip if hideAfterClick is true', async () => {
    const wrapper = mount(AUDropdown, {
      props: { menuOptions, hideAfterClick: true, trigger: 'click', onVisibleChange },
      attachTo: document.body
    });

    await wrapper.vm.$nextTick();

    const tooltip = wrapper.findComponent({ name: 'Tooltip' });
    tooltip.vm.hide = vi.fn();

    const items = wrapper.findAll('.au-dropdown__item');
    
  });

  test('does not hide tooltip if hideAfterClick is false', async () => {
    const wrapper = mount(AUDropdown, {
      props: { menuOptions, hideAfterClick: false, trigger: 'click', onVisibleChange },
      attachTo: document.body
    });

    await wrapper.vm.$nextTick();

    const tooltip = wrapper.findComponent({ name: 'Tooltip' });
    tooltip.vm.hide = vi.fn();

    const items = wrapper.findAll('.au-dropdown__item');
    
  });
});
