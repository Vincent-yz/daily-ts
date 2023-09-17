import { SelectorOption } from 'antd-mobile'

const MAX_GEN = 5;

const generationSelectorOptions: SelectorOption<string>[] = Array(MAX_GEN).fill(0).map((_, index) => {
  return {
    label: `第${index + 1}世代`,
    value: (index + 1).toString(),
  }
});

export default generationSelectorOptions;
