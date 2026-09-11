import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

const CustomImg = styled("img", {
  shouldForwardProp: (prop) => prop !== "sx",
})({
  display: "block",
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

interface StyledImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  sx?: SxProps<Theme>;
}

const StyledImg = ({ sx, ...props }: StyledImgProps) => {
  return <CustomImg {...props} sx={sx} />;
};

export default StyledImg;
