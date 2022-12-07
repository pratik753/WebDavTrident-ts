import React, { useEffect, useState } from "react";
import getDirectoryContentsHandler from "../api/getDirectoryContents";
import { FileTreeEntry } from "../modal/typedefs";
import webdavClient from "../api/api";

const TraversalInFolder = () => {
  const [pathForNavigate, setPathForNavigate] = useState<string>("/");
  const [getDirectoryItems, setDirectoryItems] = useState<Array<FileTreeEntry>>(
    []
  );
  useEffect(() => {
    async function getDirectoryFunction() {
      const dirContent = await getDirectoryContentsHandler(pathForNavigate);
      console.log(dirContent);
      setDirectoryItems(dirContent);
    }
    getDirectoryFunction();
  }, [pathForNavigate]);
  const moveFowrwordHandler = (path: string, type: string) => {
    if (type === "directory") {
      setPathForNavigate(path);
      return;
    }
    window.alert("Select Directory");
  };
  const backToPrevDirHandler = () => {
    let s = pathForNavigate;
    let backSlash = 0;
    for (let i = 0; i < s.length - 1; i++) {
      if (s.charAt(i) === "/") {
        console.log(i);
        backSlash = i;
      }
    }
    // console.log(s, "1");
    s = s.substr(0, backSlash + 1);
    // console.log(s, "2");

    setPathForNavigate(s);
  };
  const data = () => {
    return getDirectoryItems?.map((data: FileTreeEntry) => (
      <div>
        <hr />
        <b onClick={() => moveFowrwordHandler(data.filePath, data.type)}>
          {data.filePath}
        </b>

        <p>
          {"File Type -->"} {data.type}
        </p>
      </div>
    ));
  };
  return (
    <div>
      <h3>Traversal In Folder</h3>
      {pathForNavigate !== "/" && (
        <button onClick={backToPrevDirHandler}>Back to Prev Dir</button>
      )}
      {data()}
      {getDirectoryItems.length === 0 && (
        <h3>
          <i>Empty Directory</i>
        </h3>
      )}
    </div>
  );
};

export default TraversalInFolder;
