import type { ProductOptionResponse } from "../types/api/product.types.ts";

export const getCheckedOptions = (
  optionsList: ProductOptionResponse[],
  checkedOptions: Record<string, boolean>,
): ProductOptionResponse[] => {
  const options: ProductOptionResponse[] = [];
  Object.entries(checkedOptions).map(([optId, value]) => {
    if (value === true && optionsList) {
      const foundOption = optionsList.find((option) => String(option.option_id) === optId);
      if (foundOption) options.push(foundOption);
    }
  });
  return options;
};
