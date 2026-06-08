// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { alpha, Box, ButtonBase, styled } from "@mui/material";
import * as React from "react";
import { NoWrapTypography } from "../../Common/StyledComponents.tsx";

const StyledButtonBase = styled(ButtonBase)<{
  active?: boolean;
}>(({ theme, active }) => ({
  borderRadius: "10px",
  display: "flex",
  justifyContent: "left",
  alignItems: "initial",
  width: "100%",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active
    ? `${theme.palette.mode === "light" ? "#e8f0fc" : alpha(theme.palette.primary.main, 0.18)}!important`
    : "transparent",
  border: `1px solid ${active ? alpha(theme.palette.primary.main, 0.18) : "transparent"}`,
  transition:
    "background-color 180ms ease,color 180ms ease,box-shadow 180ms ease,border 180ms ease,transform 180ms ease",
  boxShadow: active && theme.palette.mode === "light" ? "0 1px 2px rgba(63, 111, 185, 0.10)" : "none",
  "& .MuiTypography-root": {
    fontWeight: active ? 700 : 500,
  },
}));

export interface SideNavItemBaseProps {
  active?: boolean;
  [key: string]: any;
}
export const SideNavItemBase = React.forwardRef<HTMLButtonElement, SideNavItemBaseProps>(
  ({ active, ...rest }, ref) => {
    return <StyledButtonBase active={active} {...rest} ref={ref} />;
  },
);

const StyledSideNavItem = styled(SideNavItemBase)<{ level?: number }>(({ theme, level }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#edf3fb" : alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    transform: "translateX(2px)",
  },
  padding: "8px 10px",
  paddingLeft: `${14 + (level ?? 0) * 16}px`,
  minHeight: "36px",
  display: "flex",
  alignItems: "center",
  marginBottom: 4,
}));

export interface SideNavItemProps extends SideNavItemBaseProps {
  icon?: React.ReactNode;
  label?: string;
  level?: number;
  [key: string]: any;
}

const SideNavItem = React.forwardRef<HTMLButtonElement, SideNavItemProps>(
  ({ icon, label, level, sx, ...rest }, ref) => {
    return (
      <StyledSideNavItem
        level={level}
        sx={{
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        <Box
          sx={{
            width: 20,
            minWidth: 20,
            mr: "9px",
            display: "flex",
            alignItems: "center",
            opacity: 0.9,
          }}
        >
          {icon}
        </Box>
        <NoWrapTypography variant={"body2"}>{label}</NoWrapTypography>
      </StyledSideNavItem>
    );
  },
);

export default SideNavItem;
