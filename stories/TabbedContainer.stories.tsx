import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { TabbedContainer } from '../components/TabbedContainer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/TabbedContainer',
  component: TabbedContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TabbedContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TabbedContainer> = (args) => (
  <TabbedContainer {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
  children: [
    <div key="tab-1">Tab 1 content</div>,
    <div key="tab-2">Tab 2 content</div>,
    <div key="tab-3">Tab 3 content</div>,
  ],
};
