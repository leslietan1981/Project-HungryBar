import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { Box, List, ListSubheader, type BoxProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

import ProductListItem from "./ProductListItem.tsx";
import type { CategoryResponse } from "../../types/api/category.types.ts";
import type { ProductResponse } from "../../types/api/product.types.ts";
import { body1Sx } from "../../sx/typographySx.ts";

const ProductListSx = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  list: {
    overflowY: "auto",
    overscrollBehaviorX: "none",
    scrollbarColor: (theme) => theme.palette.scrollbar.main,
    "& ul": {
      p: 0,
    },
    bgcolor: "surface.lighter",
  },
  subheader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    bgcolor: "primary.main",
    color: "primary.contrastText",
    lineHeight: 2,
    py: "0.2rem",
    px: "1.6rem",
    ...body1Sx,
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  subheaderActive: {
    background: (theme) =>
      `linear-gradient(to bottom, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 10,
  },
  listItem: {
    px: "1.6rem",
  },
} satisfies Record<string, SxProps<Theme>>;

export interface ProductListHandle {
  scrollToSection: (idx: number) => void;
}

interface ProductListProps extends BoxProps {
  categoryList: CategoryResponse[];
  categoryIcons?: (iconId: string | undefined) => React.ReactNode;
  productList: ProductResponse[];
  paddingBottom?: string;
  subheaderRefs?: React.RefObject<Record<string, HTMLLIElement | null>>;
  activeIdx?: number | null;
  setActiveIdx?: React.Dispatch<React.SetStateAction<number | null>>;
  setCategory?: (value: string | null) => void;
  onProductClick?: (details: ProductResponse, e?: React.MouseEvent<HTMLButtonElement>) => void;
  disableSticky?: boolean;
}

const ProductList = ({
  ref,
  sx,
  categoryList,
  categoryIcons,
  productList,
  paddingBottom,
  subheaderRefs: externalSubheaderRefs,
  activeIdx: ctrlActiveIdx,
  setActiveIdx: setCtrlActiveIdx,
  setCategory,
  onProductClick,
  disableSticky,
}: ProductListProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const sectionRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const localSubheaderRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const subheaderRefs = externalSubheaderRefs ?? localSubheaderRefs;

  const [localActiveIdx, setLocalActiveIdx] = useState<number | null>(null);
  const [lastMinHeight, setLastMinHeight] = useState<number>(0);

  const isScrollingToSection = useRef<boolean>(false);
  const scrollEndCleanupRef = useRef<(() => void) | null>(null);

  const isControlled = ctrlActiveIdx !== undefined && setCtrlActiveIdx !== undefined;
  const activeIdx = isControlled ? ctrlActiveIdx : localActiveIdx;
  const setActiveIdx = isControlled ? setCtrlActiveIdx : setLocalActiveIdx;

  const setSectionRef = useCallback((el: HTMLLIElement | null, idx: number) => {
    if (el) {
      sectionRefs.current[idx] = el;
    } else {
      delete sectionRefs.current[idx];
    }
  }, []);

  const setSubheaderRef = useCallback((el: HTMLLIElement | null, idx: number) => {
    if (el) {
      subheaderRefs.current[idx] = el;
    } else {
      delete subheaderRefs.current[idx];
    }
  }, []);

  const groupedProducts = Object.groupBy(productList, (product) => product.category);

  const getCategoryFromElementIdx = (idx: number): string | null => {
    if (subheaderRefs.current) {
      const el = subheaderRefs.current[idx];
      if (el) return el.getAttribute("data-category");
    }
    return null;
  };

  useEffect(() => {
    const stickyObserver = new IntersectionObserver(
      (entries) => {
        if (isScrollingToSection.current) return;

        entries.forEach((entry) => {
          if (!entry.rootBounds) return;

          const idx = Number((entry.target as HTMLElement).getAttribute("data-idx"));
          const category = (entry.target as HTMLElement).getAttribute("data-category");
          const entryRect = entry.boundingClientRect;
          const rootRect = entry.rootBounds;
          const isStucked = entryRect.top <= rootRect.top && entryRect.bottom > rootRect.top;
          const isNearerToTop = entryRect.top < rootRect.height / 2 + rootRect.top;

          if (!entry.isIntersecting && isStucked) {
            setActiveIdx(idx);
            if (setCategory !== undefined) setCategory(category);
          } else if (entry.isIntersecting && isNearerToTop) {
            const prevIdx = idx > 0 ? idx - 1 : 0;
            setActiveIdx(prevIdx);
            if (setCategory !== undefined) setCategory(getCategoryFromElementIdx(prevIdx));
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: "-1px 0px 0px 0px",
        threshold: [1],
      },
    );

    Object.values(subheaderRefs.current).forEach((el) => {
      if (el) stickyObserver.observe(el);
    });

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry.target === wrapperRef.current) {
        setLastMinHeight(entry.contentRect.height);
        return;
      }
    });

    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    return () => {
      stickyObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      scrollToSection: (idx: number) => {
        isScrollingToSection.current = true;
        sectionRefs.current[idx]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        const scrollContainer = containerRef.current;
        if (!scrollContainer) return;

        const handleScrollEnd = () => {
          isScrollingToSection.current = false;
          scrollContainer.removeEventListener("scrollend", handleScrollEnd);
          scrollEndCleanupRef.current = null;
        };
        scrollContainer.addEventListener("scrollend", handleScrollEnd);

        scrollEndCleanupRef.current = () => {
          scrollContainer.removeEventListener("scrollend", handleScrollEnd);
        };
      },
    }),
    [],
  );

  return (
    <Box ref={wrapperRef} sx={[ProductListSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <List ref={containerRef} subheader={<li />} sx={[ProductListSx.list, paddingBottom ? { pb: paddingBottom } : {}]}>
        {categoryList?.map(({ category, icon_id }, idx) => {
          const isLastCategory = idx === categoryList.length - 1;
          return (
            <Box
              ref={(el: HTMLLIElement | null) => setSectionRef(el, idx)}
              component="li"
              key={category}
              sx={[isLastCategory && { minHeight: `${lastMinHeight}px` }]}
            >
              <ul>
                <ListSubheader
                  ref={(el: HTMLLIElement | null) => setSubheaderRef(el, idx)}
                  data-idx={idx}
                  data-category={category}
                  sx={[
                    ProductListSx.subheader,
                    disableSticky ? { position: "relative" } : activeIdx === idx && ProductListSx.subheaderActive,
                  ]}
                >
                  {categoryIcons && categoryIcons(icon_id)}
                  {category}
                </ListSubheader>
                {groupedProducts[category]?.map((product, productIdx) => {
                  const isLast = groupedProducts[category] && productIdx === groupedProducts[category].length - 1;
                  return (
                    product.category === category && (
                      <ProductListItem
                        key={productIdx}
                        details={product}
                        sx={ProductListSx.listItem}
                        isLast={isLast}
                        onClick={onProductClick}
                      />
                    )
                  );
                })}
              </ul>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default ProductList;
