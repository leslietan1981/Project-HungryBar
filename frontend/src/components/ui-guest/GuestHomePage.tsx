import { useEffect, useRef, useState } from "react";

import type { BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import CategoryBar, { getIcon } from "./CategoryBar.tsx";
import ProductList, { type ProductListHandle } from "./ProductList.tsx";
import GuestPageWrapper from "./GuestPageWrapper.tsx";

import { dev_categories, dev_products } from "../../dev-helpers/devData.ts";
import type { ProductResponse } from "../../types/api/product.types.ts";

const GuestHomePageSx = {
  categoryBar: {
    px: "1.6rem",
    scrollPaddingLeft: "1.6rem",
    mb: "1rem",
  },
  content: {
    flexGrow: 1,
    minHeight: 0,
  },
} satisfies Record<string, SxProps<Theme>>;

interface GuestHomePageProps extends BoxProps {
  navHeight?: number;
  setDetails?: React.Dispatch<React.SetStateAction<ProductResponse | null>>;
}

const GuestHomePage = ({ sx, navHeight, setDetails }: GuestHomePageProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const subheaderRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const productListRef = useRef<ProductListHandle>(null);

  const handleCategoryChange = (category: string | null) => {
    setCategory(category);

    const refObject = subheaderRefs.current;
    const foundKey = Object.keys(refObject).find((key) => refObject[key]?.getAttribute("data-category") === category);
    if (foundKey !== undefined) {
      setActiveCategoryIdx(+foundKey);
      productListRef.current?.scrollToSection(+foundKey);
    }
  };

  const handleListSubheaderChange = (category: string | null) => {
    setCategory(category);
  };

  const handleProductClick = (item: ProductResponse, _e?: React.MouseEvent<HTMLButtonElement>) => {
    setDetails?.(item);
  };

  useEffect(() => {
    // To be replaced when loading actual data
    setCategory(dev_categories[0].category);
    setActiveCategoryIdx(0);
    // ------
  }, []);

  return (
    <GuestPageWrapper sx={sx} greeting="Hello Leslie!" sub="Hungry? Let's get that fixed.">
      <CategoryBar
        sx={GuestHomePageSx.categoryBar}
        list={dev_categories}
        value={category}
        setValue={handleCategoryChange}
      />
      <ProductList
        disableSticky
        ref={productListRef}
        sx={[GuestHomePageSx.content]}
        categoryList={dev_categories}
        categoryIcons={getIcon}
        productList={dev_products}
        paddingBottom={`calc(${navHeight}px + 1rem)`}
        subheaderRefs={subheaderRefs}
        activeIdx={activeCategoryIdx}
        setActiveIdx={setActiveCategoryIdx}
        setCategory={handleListSubheaderChange}
        onProductClick={handleProductClick}
      />
    </GuestPageWrapper>
  );
};

export default GuestHomePage;
