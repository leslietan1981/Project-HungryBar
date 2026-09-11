import { Avatar, Box, Button, Typography, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { profileAvatarSx } from "../../sx/avatarSx.ts";
import { body2Sx } from "../../sx/typographySx.ts";
import { LogoutOutlined } from "@mui/icons-material";

const TabletNavUserMenuSx = {
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  profileName: {
    color: "textColor.title",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface TabletNavUserMenuProps extends BoxProps {
  onLogout?: () => void;
}

const TabletNavUserMenu = ({ sx, onLogout }: TabletNavUserMenuProps) => {
  return (
    <Box sx={[TabletNavUserMenuSx.profileContainer, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Avatar sx={profileAvatarSx}>LT</Avatar>
      <Typography sx={TabletNavUserMenuSx.profileName}>Leslie Tan</Typography>
      <Button variant="outlined" sx={TabletNavUserMenuSx.actionButton} onClick={onLogout}>
        <Typography sx={body2Sx}>Sign Out</Typography>
        <LogoutOutlined fontSize="small" />
      </Button>
    </Box>
  );
};

export default TabletNavUserMenu;
