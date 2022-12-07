import React, { useEffect, useState } from "react";
// import { createClient } from "webdav/web";
import FileStr from "../modal/FilesStr";
import { createClient, FileStat } from "webdav/web";
import Renamef from "./Renamef";
import webdavClient from "../api/api";
const RenameMain = () => {
  const [FileData, setFileData] = useState<FileStr[]>();
  const [fileRenameText, setFileRenameText] = useState<string>("");

  useEffect(() => {
    getDirectoryContentsHandler();
  }, []);
  // Get directory contents
  const getDirectoryContentsHandler = async () => {
    try {
      const directoryItems = await webdavClient.getDirectoryContents("/"); // view files
      let rv: Array<FileStr> = [];
      for (const item of directoryItems as Array<FileStat>) {
        rv.push({
          basename: item.basename,
          etag: item.etag,
          filename: item.filename,
          type: item.type,
        });
      }
      setFileData(rv);
    } catch (error) {
      window.alert("Some went Worng");
      // console.log(error);
    }
  };
  // console.log(FileData);

  const renamePrevData = (data: string, type: string) => {
    if (type === "file") {
      setFileRenameText(data);
      return;
    }
    window.alert("Select File");
    setFileRenameText("");
  };
  const data = () => {
    return FileData?.map((data: FileStr) => (
      <div>
        <hr />
        <b>
          <p onClick={() => renamePrevData(data.filename, data.type)}>
            {data.filename}
          </p>
        </b>
      </div>
    ));
  };
  console.log(fileRenameText);

  return (
    <div>
      <h3>Rename</h3>
      {/* {FileData} */}
      {data()}

      <Renamef
        fileRenameText={fileRenameText}
        getDirectoryContentsHandler={getDirectoryContentsHandler}
      />
    </div>
  );
};

export default RenameMain;
