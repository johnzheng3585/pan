// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { useEffect, useLayoutEffect } from "react";

const isSSR = typeof window === "undefined" || /ServerSideRendering/.test(navigator && navigator.userAgent);

export default isSSR ? useEffect : useLayoutEffect;
