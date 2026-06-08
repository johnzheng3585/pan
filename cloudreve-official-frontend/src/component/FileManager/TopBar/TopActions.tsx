// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Button, ButtonGroup, styled, useMediaQuery, useTheme } from "@mui/material";
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
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  borderRadius: "8px!important",
  minWidth: 40,
  backgroundColor: theme.palette.background.paper,
  marginLeft: "4px!important",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === "light" ? "#f3f7ff" : theme.palette.action.hover,
  },
}));

export const ActionButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButtonGroup-firstButton, .MuiButtonGroup-middleButton, .MuiButtonGroup-lastButton": {
    "&:hover": {
      "border-color": theme.palette.primary.main,
    },
  },
  height: "100%",
  gap: 0,
  boxShadow: "none",
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
