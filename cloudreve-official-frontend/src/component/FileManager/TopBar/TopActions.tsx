// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { alpha, Button, ButtonGroup, styled, useMediaQuery, useTheme } from "@mui/material";
import { bindPopover } from "material-ui-popup-state";
import { bindMenu, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks.ts";
import ArrowSort from "../../Icons/ArrowSort.tsx";
import TableSettingsOutlined from "../../Icons/TableSettings.tsx";
import SortMethodMenu from "./SortMethodMenu.tsx";
import ViewOptionPopover from "./ViewOptionPopover.tsx";

import MoreHorizontal from "../../Icons/MoreHorizontal.tsx";
import { FmIndexContext } from "../FmIndexContext.tsx";
import MoreActionMenu from "./MoreActionMenu.tsx";

export const ActionButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === "light" ? 0.82 : 0.9)}`,
  color: theme.palette.text.secondary,
  borderRadius: "11px!important",
  minWidth: 38,
  minHeight: 38,
  paddingInline: theme.spacing(1.25),
  backgroundColor: "transparent",
  marginLeft: "0!important",
  boxShadow: "none",
  fontWeight: 600,
  transition: theme.transitions.create(["background-color", "border-color", "box-shadow", "color", "transform"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.3 : 0.42),
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.07 : 0.16),
    boxShadow: theme.palette.mode === "light" ? "0 8px 20px rgba(63, 111, 185, 0.08)" : "none",
    transform: "translateY(-1px)",
  },
  "&.Mui-disabled": {
    borderColor: alpha(theme.palette.divider, 0.5),
    color: theme.palette.text.disabled,
    backgroundColor: "transparent",
  },
}));

export const ActionButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  padding: 3,
  gap: 4,
  minHeight: 44,
  borderRadius: 14,
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === "light" ? 0.72 : 0.9)}`,
  backgroundColor:
    theme.palette.mode === "light" ? alpha(theme.palette.background.paper, 0.72) : alpha(theme.palette.background.paper, 0.18),
  boxShadow: theme.palette.mode === "light" ? "0 1px 2px rgba(15, 23, 42, 0.03)" : "none",
  "& .MuiButtonGroup-firstButton, .MuiButtonGroup-middleButton, .MuiButtonGroup-lastButton": {
    border: "0!important",
    "&:hover": {
      borderColor: "transparent",
    },
  },
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    borderRight: "0!important",
  },
}));

const TopActions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fmIndex = useContext(FmIndexContext);
  const sortOptions = useAppSelector((state) => state.fileManager[fmIndex].list?.props.order_by_options);
  const isSingleFileView = useAppSelector((state) => state.fileManager[fmIndex].list?.single_file_view);
  const viewPopupState = usePopupState({
    variant: "popover",
    popupId: "viewOption",
  });
  const sortPopupState = usePopupState({
    variant: "popover",
    popupId: "sortOption",
  });
  const morePopupState = usePopupState({
    variant: "popover",
    popupId: "moreActions",
  });
  return (
    <>
      <ActionButtonGroup variant="outlined">
        <ActionButton
          disabled={isSingleFileView}
          {...bindTrigger(viewPopupState)}
          startIcon={!isMobile && <TableSettingsOutlined />}
        >
          {isMobile ? <TableSettingsOutlined fontSize={"small"} /> : t("application:fileManager.view")}
        </ActionButton>
        {(!(!sortOptions || isSingleFileView) || !isMobile) && (
          <ActionButton
            disabled={!sortOptions || isSingleFileView}
            startIcon={!isMobile && <ArrowSort />}
            {...bindTrigger(sortPopupState)}
          >
            {isMobile ? <ArrowSort fontSize={"small"} /> : t("application:fileManager.sortMethod")}
          </ActionButton>
        )}
        {isMobile && (
          <ActionButton {...bindTrigger(morePopupState)}>
            <MoreHorizontal fontSize={"small"} />
          </ActionButton>
        )}
      </ActionButtonGroup>
      {isMobile && <MoreActionMenu {...bindMenu(morePopupState)} />}
      <ViewOptionPopover {...bindPopover(viewPopupState)} />
      <SortMethodMenu {...bindMenu(sortPopupState)} />
    </>
  );
};

export default TopActions;
