import transfer from '@/utils/i18n';
import { SelectorOption } from 'antd-mobile'

const MAX_GEN = 5;

const generationSelectorOptions: SelectorOption<string>[] = Array(MAX_GEN).fill(0).map((_, index) => {
  return {
    label: transfer(`Gen${index + 1}`),
    value: (index + 1).toString(),
  }
});

export default generationSelectorOptions;
