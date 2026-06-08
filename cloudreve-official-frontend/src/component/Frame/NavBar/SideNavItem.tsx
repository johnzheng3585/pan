// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { alpha, Box, ButtonBase, styled } from "@mui/material";
import * as React from "react";
import { NoWrapTypography } from "../../Common/StyledComponents.tsx";

const StyledButtonBase = styled(ButtonBase)<{
  active?: boolean;
}>(({ theme, active }) => ({
  borderRadius: "12px",
  display: "flex",
  justifyContent: "left",
  alignItems: "initial",
  width: "100%",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active
    ? `${theme.palette.mode === "light" ? "#ffffff" : alpha(theme.palette.primary.main, 0.2)}!important`
    : "transparent",
  border: `1px solid ${active ? alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.18 : 0.28) : "transparent"}`,
  transition:
    "background-color 180ms ease,color 180ms ease,box-shadow 180ms ease,border 180ms ease,transform 180ms ease",
  boxShadow: active && theme.palette.mode === "light" ? "0 6px 18px rgba(63, 111, 185, 0.10)" : "none",
  "& .MuiTypography-root": {
    fontWeight: active ? 760 : 560,
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
    backgroundColor: theme.palette.mode === "light" ? alpha(theme.palette.common.white, 0.72) : alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    transform: "translateX(3px)",
    boxShadow: theme.palette.mode === "light" ? "0 5px 14px rgba(15, 23, 42, 0.05)" : "none",
  },
  padding: "9px 11px",
  paddingLeft: `${15 + (level ?? 0) * 16}px`,
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  marginBottom: 5,
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
            mr: "10px",
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
