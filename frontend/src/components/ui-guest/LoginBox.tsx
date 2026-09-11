import { Box, Button, Paper, TextField, Typography, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { body1Sx, title2CSx } from "../../sx/typographySx.ts";
import { TextFieldSlotProps } from "../../sx/guestUI/TextFieldSlotProps.ts";
import { useState } from "react";
import { isDisabledSx } from "../../sx/disabledSx.ts";

const LoginBaseSx = {
  wrapper: {
    width: "100%",
  },
  base: {
    bgcolor: "surface.darkTranslucent",
    border: "1px solid",
    borderColor: "border.dark",
    backdropFilter: "blur(10px) opacity(100%)",
    WebkitBackdropFilter: "blur(10px) opacity(100%)",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    p: "1rem 1.5rem",
  },
  dividerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    mt: "1rem",
  },
  dividerLine: {
    height: "1px",
    bgcolor: "border.dark",
    width: "100%",
  },
  dividerText: {
    color: "border.light",
    letterSpacing: ".1rem",
    textIndent: ".1rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface LoginBoxProps extends BoxProps {
  onClose?: () => void;
}

const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginBox = ({ ref, onClose }: LoginBoxProps) => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const newValue = e.target.value;

    switch (e.target.id) {
      case "login-email":
        setEmailValue(newValue);
        break;
      case "login-password":
        setPasswordValue(newValue);
        break;
      default:
        return;
    }
  };

  const isValidInputs = simpleEmailRegex.test(emailValue) && passwordValue.length > 0;

  return (
    <Box ref={ref} sx={LoginBaseSx.wrapper}>
      <Paper elevation={2} sx={LoginBaseSx.base}>
        <Box sx={LoginBaseSx.layout}>
          <Typography sx={title2CSx}>Sign In</Typography>
          <TextField
            id="login-email"
            label="Email"
            value={emailValue}
            helperText=" "
            slotProps={TextFieldSlotProps.primaryAlt}
            onChange={handleChange}
          />
          <TextField
            id="login-password"
            label="Password"
            value={passwordValue}
            type="password"
            helperText=" "
            slotProps={TextFieldSlotProps.primaryAlt}
            onChange={handleChange}
          />
          <Button color="primaryAlt" variant="contained" sx={[body1Sx, !isValidInputs && isDisabledSx]}>
            Sign In
          </Button>
          <Box sx={LoginBaseSx.dividerLayout}>
            <Box sx={LoginBaseSx.dividerLine} />
            <Typography variant="body1" sx={LoginBaseSx.dividerText}>
              or
            </Typography>
            <Box sx={LoginBaseSx.dividerLine} />
          </Box>
          <Button color="primaryAlt" sx={body1Sx} onClick={onClose}>
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginBox;
