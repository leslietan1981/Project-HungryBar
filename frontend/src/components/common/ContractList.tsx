import { Box, List } from "@mui/material";
import type { BoxProps, ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const ContractListSx = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
  },
  list: {
    overflowY: "auto",
    overscrollBehaviorX: "none",
    scrollbarColor: (theme) => theme.palette.scrollbar.main,
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    flex: 1,
  },
} satisfies Record<string, SxProps<Theme>>;

export interface TemplateProps<TData> extends ListItemProps {
  data: TData;
}

interface ContractListProps<T, TData> extends BoxProps {
  Template: React.ComponentType<TemplateProps<TData>>;
  data: T[];
  contract: (item: T) => TData;
  sxList?: SxProps<Theme>;
  header?: React.ReactNode;
  emptyDefault?: React.ReactNode;
}

const ContractList = <T, TData>({
  sx,
  Template,
  data,
  contract,
  sxList,
  header,
  emptyDefault,
}: ContractListProps<T, TData>) => {
  return (
    <Box sx={[ContractListSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      {header && <Box sx={ContractListSx.headerContainer}>{header}</Box>}
      <List disablePadding sx={[ContractListSx.list, ...(Array.isArray(sxList) ? sxList : [sxList])]}>
        {emptyDefault && data.length === 0 && emptyDefault}
        {data.map((item, idx) => (
          <Template key={idx} data={contract(item)} />
        ))}
      </List>
    </Box>
  );
};

export default ContractList;
