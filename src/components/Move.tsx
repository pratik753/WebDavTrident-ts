import React, { useEffect, useState } from "react";
// import { createClient } from "webdav/web";
import FileStr from "../modal/FilesStr";
import { createClient, FileStat } from "webdav/web";
import { FileTreeEntry } from "../modal/typedefs";
// import MoveAFile from "./MoveAFile";
import MoveFile from "./MoveFile";
import "../components/style.css";
import webdavClient from "../api/api";
const Move = () => {
  const [selectedFileToMove, setSelectedFileToMove] = useState<string>("");
  const [destinationFolder, setDestinationFolder] = useState<string>("");
  const [pathForNavigate, setPathForNavigate] = useState<string>("/");
  const [moveOn, setMoveOn] = useState<boolean>();
  // const [forReRender, setForReRender] = useState<number>();
  const [getDirectoryItems, setDirectoryItems] = useState<Array<FileTreeEntry>>(
    []
  );
  // Get directory contents
  useEffect(() => {
    getDirectoryContentsHandler();
  }, []);

  const getDirectoryContentsHandler = async () => {
    const result = await webdavClient.getDirectoryContents("/");

    let rv: Array<FileTreeEntry> = [];
    for (const item of result as Array<FileStat>) {
      rv.push({
        containingDirectoryPath: "/",
        depth: item.filename.split("/").length - 2, // minus root, minus filename
        dummy: false,
        filePath: item.filename,
        id: item.filename,
        isDirectoryOpen: false,
        isSelected: false,
        type: item.type,
      });
    }
    setDirectoryItems(rv);
  };
  // console.log(getDirectoryItems);
  const selectTomove = (filePath: string, type: string) => {
    setSelectedFileToMove(filePath);
    console.log(filePath, "ff");
    if (type === "directory") {
      setPathForNavigate(filePath);
    }
    // setPathForNavigate(getDirectoryItems[0]?.containingDirectoryPath);
  };
  const data = () => {
    return getDirectoryItems?.map((data: FileTreeEntry) => (
      <div>
        <hr />
        {moveOn && (
          <b
            className={data.filePath === destinationFolder ? "selected" : ""}
            // className={
            //   data.filePath === selectedFileToMove
            //     ? "selected"
            //     : "" || data.type === "directory"
            //     ? "folderColor"
            //     : "fileColor"
            // }
          >
            <p onClick={() => selectToDestination(data.filePath, data.type)}>
              {data.filePath}
            </p>
          </b>
        )}

        {!moveOn && (
          <b className={data.filePath === selectedFileToMove ? "selected" : ""}>
            <p onClick={() => selectTomove(data.filePath, data.type)}>
              {data.filePath}
            </p>
          </b>
        )}

        <p>{data.type}</p>
      </div>
    ));
  };

  const selectToDestination = (filePath: string, type: string) => {
    setDestinationFolder(filePath);
  };
  const moveOnHandler = () => {
    setMoveOn(true);
  };
  return (
    <div>
      {/* <BackButton currentPath={pathForNavigate} /> */}
      <h3>Move Folder</h3>

      {data()}

      <MoveFile
        selectedFileToMove={selectedFileToMove}
        destinationFolder={destinationFolder}
        getDirectoryContentsHandler={getDirectoryContentsHandler}
      />
      <button onClick={moveOnHandler}>Move</button>
    </div>
  );
};

export default Move;
