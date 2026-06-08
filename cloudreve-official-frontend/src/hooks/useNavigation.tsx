// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { useEffect } from "react";
import { FileManagerIndex } from "../component/FileManager/FileManager.tsx";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import {
  alertStoragePolicyChange,
  beforePathChange,
  checkOpenViewerQuery,
  checkReadMeEnabled,
  navigateReconcile,
  setTargetPath,
} from "../redux/thunks/filemanager.ts";
import { useQuery } from "../util";
import CrUri, { Filesystem } from "../util/uri.ts";

const pathQueryKey = "path";
export const defaultPath = "cloudreve://my";
export const defaultTrashPath = "cloudreve://trash";
export const defaultSharedWithMePath = "cloudreve://" + Filesystem.shared_with_me;

const isDefaultHomePath = (path: string) => {
  try {
    const crUri = new CrUri(path);
    return crUri.fs() == Filesystem.my && crUri.is_root() && !crUri.id() && !crUri.password() && !crUri.is_search();
  } catch (e) {
    return false;
  }
};

const useNavigation = (index: number, initialPath?: string) => {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const path = useAppSelector((s) => s.fileManager[index].path);

  // Update path in redux when path in query changes
  if (index === FileManagerIndex.main) {
    useEffect(() => {
      const path = query.get(pathQueryKey) ? (query.get(pathQueryKey) as string) : defaultPath;
      if (query.get(pathQueryKey) && isDefaultHomePath(path) && window.location.pathname == "/home") {
        window.history.replaceState(window.history.state, "", "/home");
      }
      dispatch(setTargetPath(index, path));
    }, [query]);
  } else {
    useEffect(() => {
      dispatch(setTargetPath(index, initialPath ?? defaultPath));
    }, []);
  }

  // When path state changed, dispatch to load file list
  useEffect(() => {
    if (path) {
      dispatch(navigateReconcile(index)).then(() => {
        dispatch(checkReadMeEnabled(index));
        dispatch(checkOpenViewerQuery(index));
        if (index === FileManagerIndex.main) {
          dispatch(alertStoragePolicyChange(index));
        }
      });
      dispatch(beforePathChange(index));
    }
  }, [path]);
};

export default useNavigation;
