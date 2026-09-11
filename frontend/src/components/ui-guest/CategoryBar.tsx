import { Box, Chip, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  KebabDiningOutlined,
  LocalBarOutlined,
  LocalDiningOutlined,
  RamenDiningOutlined,
  TapasOutlined,
  WhatshotRounded,
} from "@mui/icons-material";
import BxBowlRice from "../../assets/BxBowlRice.svg";
import BxVeg from "../custom-svgicons/BxVeg.tsx";
import TblFish from "../custom-svgicons/TblFish.tsx";
import TblMeat from "../custom-svgicons/TblMeat.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CategoryResponse } from "../../types/api/category.types.ts";
import { svgLabelSx } from "../../sx/typographySx.ts";

const CategoryBarSx = {
  wrapper: {
    flexShrink: 0,
    display: "flex",
    gap: ".5rem",
    overflowX: "auto",
    overscrollBehaviorY: "none",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
    "&::-webkit-scrollbar": {
      display: "none", // Chrome/Safari
    },
  },
} satisfies Record<string, SxProps<Theme>>;

const categoryIcons = {
  hot: <WhatshotRounded />,
  sides: <KebabDiningOutlined />,
  mains: <LocalDiningOutlined />,
  rice: <BxBowlRice />,
  noodles: <RamenDiningOutlined />,
  veg: <BxVeg />,
  fish: <TblFish />,
  meat: <TblMeat />,
  beverage: <LocalBarOutlined />,
  default: <TapasOutlined />,
} satisfies Record<string, React.ReactNode>;

export const getIcon = (iconId: string | undefined) => {
  if (iconId && iconId in categoryIcons) {
    return categoryIcons[iconId as keyof typeof categoryIcons];
  }
  return categoryIcons.default;
};

interface CategoryBarProps extends BoxProps {
  list: CategoryResponse[];
  value?: string | null;
  setValue?: (value: string | null) => void;
}

const CategoryBar = ({ sx, list, value: ctrlValue, setValue: setCtrlValue }: CategoryBarProps) => {
  const [localValue, setLocalValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isControlled = ctrlValue !== undefined && setCtrlValue !== undefined;
  const value = isControlled ? ctrlValue : localValue;
  const setValue = isControlled ? setCtrlValue : setLocalValue;

  const setChipRef = useCallback((el: HTMLDivElement | null, category: string) => {
    if (el) {
      chipRefs.current[category] = el;
    } else {
      delete chipRefs.current[category];
    }
  }, []);

  const handleClick = (category: string | null) => {
    if (!setValue) return;

    setValue(category);
  };

  useEffect(() => {
    if (value === null) return;

    const container = containerRef.current;
    const chip = chipRefs.current[value];
    if (!container || !chip) return;

    const targetLeft = chip.offsetLeft - chip.clientWidth / 2;

    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [value]);

  return (
    <Box ref={containerRef} sx={[CategoryBarSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      {list?.map((item: CategoryResponse) => (
        <Chip
          key={`cat-id-${item.category}`}
          ref={(el: HTMLDivElement | null) => setChipRef(el, item.category)}
          label={item.category}
          icon={getIcon(item.icon_id || "default")}
          color={item.category === value ? "primary" : "secondary"}
          clickable
          sx={svgLabelSx}
          onClick={() => handleClick(item.category)}
        />
      ))}
    </Box>
  );
};

export default CategoryBar;
