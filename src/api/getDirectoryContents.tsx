import webdavClient from "./api";
import { createClient, FileStat } from "webdav/web";
import { FileTreeEntry } from "../modal/typedefs";

const standardiseDirectoryPath = (directory: string) => {
  // returns a cleaned up directory path including top slash and tail slash
  let directoryArray: string[] = directory.split("/");
  // double slashes in the source string with result in the array containing items that are empty strings
  // remove them via filter
  directoryArray = directoryArray.filter((item) => item !== "");
  // stick it back together into a nicely cleaned up string, wiuthout a trailing slash
  let directoryString = directoryArray.join("/");
  if (!directoryString.startsWith("/")) {
    directoryString = "/" + directoryString;
  }
  if (!directoryString.endsWith("/")) {
    directoryString += "/";
  }
  return directoryString;
};
const getDirectoryContentsHandler = async (path: string) => {
  const result = await webdavClient.getDirectoryContents(
    standardiseDirectoryPath(path)
  );

  let rv: Array<FileTreeEntry> = [];
  for (const item of result as Array<FileStat>) {
    rv.push({
      containingDirectoryPath: standardiseDirectoryPath(path),
      depth: item.filename.split("/").length - 2, // minus root, minus filename
      dummy: false,
      filePath: item.filename,
      id: item.filename,
      isDirectoryOpen: false,
      isSelected: false,
      type: item.type,
    });
  }
  // setDirectoryItems(rv);
  return rv;
  // setPathForNavigate(getDirectoryItems[0]?.containingDirectoryPath);
};
export default getDirectoryContentsHandler;
