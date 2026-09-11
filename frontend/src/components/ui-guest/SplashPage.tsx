import { useRef, useState } from "react";
import { Transition, type TransitionStatus } from "react-transition-group";

import { Box, Button, CircularProgress, Collapse, Fade, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { ArrowForwardRounded } from "@mui/icons-material";

import LoginBox from "./LoginBox.tsx";
import { animFadeAndSlideIn, createExitFadeStyles } from "../../transitions/transitionStyles.ts";

import bgHeroImage from "../../assets/hero-reduced.jpeg";
import { NAV_ROUTES } from "../../constants/navigationRoutes.ts";
import { useGuestNavigation } from "../../hooks/useGuestNavigation.ts";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";
import { body1Sx } from "../../sx/typographySx.ts";
import TableNumberBox from "./TableNumberBox.tsx";
import { useSession } from "../../hooks/useSession.ts";
import { CircularProgressSx } from "../../sx/circularProgressSx.ts";

const SplashPageSx = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    bgcolor: "surface.main",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    background: `linear-gradient(to top, #3a120ce6, #3a120c66), url(${bgHeroImage}) center center / cover no-repeat;`,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3rem",
    color: "primaryAlt.main",
    px: "1.6rem",
    maxWidth: "24rem",
    position: "relative",
    height: "100%",
  },
  brandContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5rem",
  },
  brandLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brandText: {
    fontFamily: "Playfair Display, serif",
    fontWeight: "400",
    fontSize: "4.5rem",
    color: "common.white",
  },
  brandTextRight: {
    color: "primaryAlt.light",
  },
  sloganText: {
    textTransform: "uppercase",
    letterSpacing: ".3rem",
    textIndent: ".3rem",
  },
  divider: {
    height: "1px",
    bgcolor: "primaryAlt.dark",
    width: "4rem",
  },
  dividerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    mt: "2rem",
  },
  dividerDot: {
    bgcolor: "primaryAlt.dark",
    width: ".375rem",
    height: ".375rem",
    borderRadius: "999px",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
    alignItems: "center",
    justifyContent: "center",
  },
  flavourText: {
    lineHeight: "1.625rem",
    letterSpacing: ".08rem",
    textIndent: ".08rem",
  },
  ctaContainer: {
    minHeight: "4rem",
    width: "100%",
  },
  ctaSpinner: {
    color: "primaryAlt.main",
  },
  cta: {
    ...body1Sx,
    letterSpacing: ".1rem",
    textIndent: ".1rem",
    p: ".875rem",
    width: "90%",
  },
  footerContainer: {
    display: "flex",
    position: "absolute",
    bottom: "2.5rem",
  },
  footerText: {
    letterSpacing: ".2rem",
    textIndent: ".2rem",
    fontWeight: 200,
    color: "primaryAlt.dark",
  },
} satisfies Record<string, SxProps<Theme>>;

type ViewState = "idle" | "table-input" | "login-input";

const SplashPage = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [isEntryCompleted, setIsEntryCompleted] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [isCheckingTable, setIsCheckingTable] = useState(true);
  const [isExit, setIsExit] = useState(false);
  const { navigateTo } = useGuestNavigation();
  const { session, checkSession } = useSession();
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();

  const transitionTimeoutBase = 400;
  const styles = createExitFadeStyles(transitionTimeoutBase);

  const isIdle = viewState === "idle";
  const isTableInput = viewState === "table-input";
  const isLoginInput = viewState === "login-input";

  const handleSessionCheck = (tableNumber: string) => {
    checkSession(tableNumber);
    setIsCheckingTable(false);
    setIsEntryCompleted(true);
    setViewState("idle");
  };

  const handleEntryAnimationComplete = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    const tableNumber = searchQuery.get("tn");
    if (!tableNumber) {
      setViewState("table-input");
      return;
    }

    handleSessionCheck(tableNumber);
  };

  const handleTableNumberSubmit = (tableNumber: string) => {
    handleSessionCheck(tableNumber);
  };

  const handleEnterClick = () => {
    if (!isEntryCompleted) return;

    setViewState("login-input");
  };

  const handleLoginBoxClose = () => {
    setIsExit(true);
  };

  const handleRestart = () => {
    navigate({ pathname: NAV_ROUTES.index, search: `${createSearchParams({ tn: session.table })}` });
  };

  return (
    <Box sx={[SplashPageSx.wrapper, animFadeAndSlideIn("down", "2px", 400)]}>
      <Transition
        nodeRef={nodeRef}
        in={!isExit}
        timeout={transitionTimeoutBase}
        onExited={() => navigateTo(NAV_ROUTES.guest.full.home)}
      >
        {(state: TransitionStatus) => (
          <Box sx={[SplashPageSx.container, styles[state]]}>
            <Box
              ref={nodeRef}
              sx={[SplashPageSx.layout, ...[isExit && animFadeAndSlideIn("down", 20, transitionTimeoutBase)]]}
            >
              <Box sx={[SplashPageSx.brandContainer, animFadeAndSlideIn("up", 20, 750, { delay: 200 })]}>
                <Box sx={[SplashPageSx.divider, { mb: "2rem" }]} />
                <Box sx={SplashPageSx.brandLayout} onClick={handleRestart}>
                  <Typography variant="h1" sx={SplashPageSx.brandText}>
                    餓了
                  </Typography>
                  <Typography variant="h1" sx={[SplashPageSx.brandText, SplashPageSx.brandTextRight]}>
                    Bar
                  </Typography>
                </Box>
                <Typography variant="body1" sx={SplashPageSx.sloganText}>
                  Taiwanese Inspired Cuisine
                </Typography>
                <Box sx={SplashPageSx.dividerLayout}>
                  <Box sx={[SplashPageSx.divider, { width: "3rem" }]} />
                  <Box sx={SplashPageSx.dividerDot} />
                  <Box sx={[SplashPageSx.divider, { width: "3rem" }]} />
                </Box>
              </Box>
              <Box sx={{ position: "relative", width: "100%" }}>
                <Collapse in={isIdle} timeout={transitionTimeoutBase}>
                  <Fade in={isIdle} timeout={transitionTimeoutBase}>
                    <Box sx={SplashPageSx.bodyContainer}>
                      <Typography
                        variant="body1"
                        sx={[SplashPageSx.flavourText, animFadeAndSlideIn("up", 20, 750, { delay: 1000 })]}
                      >
                        Enjoy handcrafted flavours inspired by Taiwanese culture.
                      </Typography>
                      <Box
                        sx={[SplashPageSx.ctaContainer, animFadeAndSlideIn("up", 20, 750, { delay: 1300 })]}
                        onAnimationEnd={handleEntryAnimationComplete}
                      >
                        {isCheckingTable && <CircularProgress sx={CircularProgressSx} />}
                        {!isCheckingTable && (
                          <Button
                            variant="contained"
                            color="primaryAlt"
                            endIcon={<ArrowForwardRounded />}
                            sx={SplashPageSx.cta}
                            onClick={handleEnterClick}
                          >
                            Enter
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Fade>
                </Collapse>
                <Collapse in={isLoginInput} timeout={transitionTimeoutBase}>
                  <LoginBox onClose={handleLoginBoxClose} />
                </Collapse>
                <Collapse in={isTableInput} timeout={transitionTimeoutBase}>
                  <TableNumberBox onSubmit={handleTableNumberSubmit} />
                </Collapse>
              </Box>
              <Box sx={SplashPageSx.footerContainer}>
                <Typography variant="caption" sx={SplashPageSx.footerText}>
                  EST. 2026
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Transition>
    </Box>
  );
};

export default SplashPage;
