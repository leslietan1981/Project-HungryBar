import { Box, Button, Paper, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { NAV_ROUTES } from "../../constants/navigationRoutes.ts";
import { useGuestNavigation } from "../../hooks/useGuestNavigation.ts";

const CartEmptyBlurbSx = {
  wrapper: {
    px: "1.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.6rem",
    height: "100%",
  },
  blurbContainer: {
    bgcolor: "surface.lighter",
    maxWidth: "25em",
  },
  blurbLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    m: "2.4rem 1.6rem",
  },
  blurbTitle: {
    fontFamily: "Playfair Display, serif",
    fontWeight: "400",
    fontSize: "2.6rem",
    letterSpacing: "0.5rem",
    textIndent: "0.5rem",
    color: "textColor.title",
  },
  blurbPronounceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    color: "textColor.body2",
  },
  blurbTranslateContainer: {
    display: "flex",
    gap: "0.2rem",
    alignItems: "baseline",
    mb: "2rem",
  },
  blurbTranslate: {
    fontFamily: "Playfair Display, serif",
    fontWeight: "400",
    fontSize: "1.5rem",
    color: "textColor.title",
  },
  blurbTranslateType: {
    fontSize: "0.8rem",
    fontStyle: "italic",
    color: "textColor.subtitle",
  },
  blurbDefinition: {
    fontSize: "0.8rem",
    color: "textColor.body1",
    mx: "1.6rem",
    mb: "1rem",
  },
  blurbExample: {
    fontSize: "0.8rem",
    color: "textColor.body2",
    mx: "1.6rem",
    fontStyle: "italic",
    mb: "2rem",
  },
  ctaContainer: {
    px: "1.6rem",
    py: ".8rem",
    alignSelf: "center",
    gap: "1rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface CartEmptyBlurbProps extends BoxProps {
  paddingBottom?: string;
}

const CartEmptyBlurb = ({ sx, paddingBottom }: CartEmptyBlurbProps) => {
  const { navigateTo } = useGuestNavigation();

  return (
    <Box
      sx={[CartEmptyBlurbSx.wrapper, ...(Array.isArray(sx) ? sx : [sx]), paddingBottom ? { pb: paddingBottom } : {}]}
    >
      <Paper elevation={0} sx={CartEmptyBlurbSx.blurbContainer}>
        <Box sx={CartEmptyBlurbSx.blurbLayout}>
          <Typography sx={CartEmptyBlurbSx.blurbTitle}>餓了吧</Typography>
          <Box sx={CartEmptyBlurbSx.blurbPronounceContainer}>
            <Typography>ㄜˋ · ㄌㄜ˙ · ㄅㄚ</Typography>
            <Box sx={{ width: "1px", height: "0.8em", bgcolor: "textColor.body2" }} />
            <Typography sx={{ fontStyle: "italic" }}>è · le · ba</Typography>
          </Box>
          <Box sx={CartEmptyBlurbSx.blurbTranslateContainer}>
            <Typography sx={CartEmptyBlurbSx.blurbTranslate}>You must be hungry</Typography>
            <Typography sx={CartEmptyBlurbSx.blurbTranslateType}>(phr.)</Typography>
          </Box>
          <Box sx={{ width: "100%", height: "1px", bgcolor: "border.main", mb: "2rem" }} />
          <Typography sx={CartEmptyBlurbSx.blurbDefinition}>
            A caring phrase to offer a friend or family member food when they come home.
          </Typography>
          <Typography sx={CartEmptyBlurbSx.blurbExample}>
            "You must be hungry, let me make you a comforting meal."
          </Typography>
        </Box>
      </Paper>
      <Button
        color="primary"
        variant="contained"
        sx={CartEmptyBlurbSx.ctaContainer}
        onClick={() => navigateTo(NAV_ROUTES.guest.full.home)}
      >
        Start browsing here
      </Button>
    </Box>
  );
};

export default CartEmptyBlurb;
