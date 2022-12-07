import React, { useEffect, useState } from "react";
import getDirectoryContentsHandler from "../api/getDirectoryContents";
import { FileTreeEntry } from "../modal/typedefs";
import { saveAs } from "file-saver";
import webdavClient from "../api/api";
const DownloadFile = () => {
  const [getDirectoryItems, setDirectoryItems] = useState<Array<FileTreeEntry>>(
    []
  );
  useEffect(() => {
    async function getDirectoryFunction() {
      const dirContent = await getDirectoryContentsHandler("/");
      console.log(dirContent);
      setDirectoryItems(dirContent);
    }
    getDirectoryFunction();
  }, []);

  const saveFileHandler = (
    davfilelink: string,
    destfilelink: string,
    type: string
  ) => {
    if (type === "directory") {
      window.alert("Select File");
      return;
    }
    saveAs(davfilelink, destfilelink);
  };
  const data = () => {
    return getDirectoryItems?.map((data: FileTreeEntry) => (
      <div>
        <hr />
        <b>
          <p
            // target="_blank"
            // rel="noreferrer"
            // href={webdavClient.getFileDownloadLink(data.filePath)}
            onClick={() =>
              saveFileHandler(
                webdavClient.getFileDownloadLink(data.filePath),
                data.filePath,
                data.type
              )
            }
            // download
          >
            {data.filePath}
          </p>
        </b>

        <p>
          {"-->"} {data.type}
        </p>
      </div>
    ));
  };
  return (
    <div>
      <h3>Download File</h3>
      <br />
      {data()}
    </div>
  );
};

export default DownloadFile;
