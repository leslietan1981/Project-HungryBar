import { SvgIcon, type SvgIconProps } from "@mui/material";

const TblReceiptTax = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="m9 14l6-6"></path>
        <path fill="currentColor" d="M9 8.5a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0m5 5a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0"></path>
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2l-2 2l-2-2l-2 2l-2-2z"></path>
      </g>
    </SvgIcon>
  );
};

export default TblReceiptTax;
