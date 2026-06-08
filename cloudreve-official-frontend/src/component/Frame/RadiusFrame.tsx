// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Box, styled } from "@mui/material";

export const RadiusFrame = styled(Box)<{
  withBorder?: boolean;
  square?: boolean;
}>(({ theme, withBorder, square }) => ({
  borderRadius: square ? 0 : theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: withBorder ? `1px solid ${theme.palette.divider}` : "initial",
  boxShadow: withBorder && !square ? "0 1px 2px rgba(15, 23, 42, 0.04)" : "none",
}));
