/**
 * h-demi - h function for Vue 2 and 3
 *
 * @see {@link https://github.com/vueuse/vue-demi/issues/65}
 */

import {
  h as hDemi,
  type Slots,
  type VNode,
  type VNodeProps,
} from 'vue';

interface Options extends VNodeProps {
  class?: string;
  domProps?: VNodeProps;
  on?: Record<string, () => void>;
  props?: VNodeProps;
  style?: string;
  'aria-hidden'?: string;
}

const adaptOnsV3 = (
  ons: Record<string, () => void>
): Record<string, () => void> => {
  if (!ons) return {};
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
};

/**
 * hDemi function.
 */
export default function h(
  type: string | Record<any, any>,
  options: Options = {},
  chidren?: any
): VNode {
  // Makeshift support :(
  // Since Vue2.7 includes the Composition API, the functions in vue-demi are not used.
  return hDemi(type, options, chidren);
}

export const slot = (defaultSlots: any): Slots =>
  typeof defaultSlots === 'function' ? defaultSlots() : defaultSlots;
