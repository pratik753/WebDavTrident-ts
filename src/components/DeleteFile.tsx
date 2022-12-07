import React, { useEffect, useState } from "react";
import webdavClient from "../api/api";
import FileStr from "../modal/FilesStr";
import { FileStat } from "webdav/web";
import "./style.css";
const WebDav = () => {
  const [FileData, setFileData] = useState<FileStr[]>();
  const [selectedDeleteText, setSelectedDeleteText] = useState<string>("");

  useEffect(() => {
    getDirectoryContentsHandler();
  }, []);
  const getDirectoryContentsHandler = async () => {
    const directoryItems = await webdavClient.getDirectoryContents("/");
    console.log(directoryItems, "directoryItems");

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
  };
  const DirectoryFileDeleter = async () => {
    try {
      const res = await webdavClient.deleteFile(selectedDeleteText);
      getDirectoryContentsHandler();
      setSelectedDeleteText("");
      window.alert("delete Successful");
    } catch (error) {
      window.alert("delete Unsuccessful");
    }
  };
  // console.log(FileData);
  const selectDeleteHandler = (deleteFilePath: string, type: string) => {
    if (type === "file") {
      setSelectedDeleteText(deleteFilePath);
      return;
    }
    window.alert("Select File");
  };

  const data = () => {
    return FileData?.map((data: FileStr) => (
      <div>
        <b>
          <p
            className={
              selectedDeleteText === data.filename
                ? "fileSelectColor"
                : "fileColor"
            }
            onClick={() => selectDeleteHandler(data.filename, data.type)}
          >
            {data.filename}
          </p>
        </b>
      </div>
    ));
  };
  return (
    <div>
      <h3>Delete File</h3>

      {data()}

      {selectedDeleteText.length !== 0 && (
        <button onClick={DirectoryFileDeleter}>delete</button>
      )}
    </div>
  );
};

export default WebDav;
