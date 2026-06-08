// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks.ts";

const PageTitle = ({ title }: { title?: string }) => {
  const location = useLocation();
  const siteTitle = useAppSelector((state) => state.siteConfig.basic.config.title);
  const displaySiteTitle = !siteTitle || siteTitle.toLowerCase() === "cloudreve" ? "糖果盘" : siteTitle;

  useEffect(() => {
    const titles: string[] = [];
    if (title) {
      titles.push(title);
    }

    if (displaySiteTitle) {
      titles.push(displaySiteTitle);
    }

    document.title = titles.join(" - ");
  }, [location, title, displaySiteTitle]);

  return null;
};

export default PageTitle;
