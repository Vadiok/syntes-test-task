import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import UITable from '@/components/UI/UITable/UITable.vue';

describe('UITable.vue', () => {
  it('renders table header', () => {
    const title = 'Header Title';
    const wrapper = shallowMount(UITable, {
      propsData: {
        columns: [
          { key: 'key', title },
        ],
      },
    });
    expect(wrapper.find('thead').text()).to.include(title);
  });
  it('renders table content', () => {
    const visibleContent = 'Visible content';
    const hiddenContent = 'Hidden content';
    const wrapper = shallowMount(UITable, {
      propsData: {
        columns: [
          { key: 'key', title: 'Title' },
        ],
        tableData: [
          { key: visibleContent, notKey: hiddenContent },
        ],
      },
    });
    expect(wrapper.find('tbody').text())
      .to.include(visibleContent)
      .not.to.include(hiddenContent);
  });
  it('adds suffix to values', () => {
    const content = 'Content';
    const suffix = 'Suffix';
    const wrapper = shallowMount(UITable, {
      propsData: {
        columns: [
          { key: 'withoutSuffix', title: 'Title' },
          { key: 'withSuffix', title: 'Title', valueSuffix: suffix },
        ],
        tableData: [
          { withoutSuffix: content, withSuffix: content },
        ],
      },
    });
    const tbody = wrapper.find('tbody');
    const tr = tbody.find('tr');
    const cell1Text = wrapper.findAll('tbody tr td').at(0).text();
    const cell2Text = tr.findAll('td').at(1).text();
    expect(cell1Text).not.to.include(suffix);
    expect(cell2Text).to.include(suffix);
  });
});
