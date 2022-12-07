import React, { useEffect, useState } from "react";
import getDirectoryContentsHandler from "../api/getDirectoryContents";
import { FileTreeEntry } from "../modal/typedefs";
import { saveAs } from "file-saver";
import webdavClient from "../api/api";
import { createClient, AuthType, FileStat, BufferLike } from "webdav/web";
import JSZip from "jszip";
import fs from "fs";
type arrPathData = {
  path: string;
  type: string;
};
let flag: boolean;
const DownloadFolder = () => {
  const [getDirectoryItems, setDirectoryItems] = useState<Array<FileTreeEntry>>(
    []
  );
  useEffect(() => {
    async function getDirectoryFunction() {
      const dirContent = await getDirectoryContentsHandler("/");
      // console.log(dirContent);

      setDirectoryItems(dirContent);
    }
    getDirectoryFunction();
  }, []);
  const [pathData, setPathData] = useState<Array<arrPathData>>([]);
  // const downloadFolderHandler = async (filePath: string, type: string) => {
  //   const directoryItems = await webdavClient.getDirectoryContents(
  //     filePath + "new"
  //   );
  //   const folder = await webdavClient.createDirectory(filePath);
  //   for (const item of directoryItems as Array<FileStat>) {
  //     console.log(item.filename);
  //     //   await webdavClient.putFileContents("/my/file.txt");
  //   }
  //   console.log(directoryItems, "directoryItems");
  // };

  var arr: Array<arrPathData> = [];
  const trvFolderHandler = async (filePath: string, type: string) => {
    try {
      var zip = new JSZip();
      const directoryItems = await webdavClient.getDirectoryContents(filePath);
      for (const item of directoryItems as Array<FileStat>) {
        console.log(item.filename);
        if (item.type === "file") {
          arr.push({
            path: item.filename,
            type: item.type,
          });
        } else {
          arr.push({
            path: item.filename,
            type: item.type,
          });
          trvFolderHandler(item.filename, item.type);
        }
      }
      setPathData(arr);
    } catch (error) {
      window.alert("Some went Worng");
    }
  };
  console.log(pathData, "pathData");
  const downFolder = async (dirpath: string) => {
    var zip: JSZip = new JSZip();

    jszipFolder(zip, dirpath).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, fileNameNew(dirpath) + ".zip");
      });
    });
  };
  const jszipFolder = async (jszip: JSZip, path: string) => {
    // var zip = new JSZip();
    // var zip = new JSZip();
    // var zipFolder = jszip.folder(fileNameNew(path)) as JSZip;
    // const getDir = await webdavClient.getDirectoryContents(path);
    // console.log(getDir, "getdir");
    // for (const item of getDir as Array<FileStat>) {
    //   console.log(item.filename);
    //   if (item.type === "file") {
    //     //  const temp= await webdavClient.getFileContents(item.filename)
    //     //  flag=true;

    //     webdavClient.getFileContents(item.filename).then((buff) => {
    //       const blob: Blob = new Blob([new Uint8Array(buff as BufferLike)]);
    //       let fileName: string;
    //       fileName = fileNameNew(item.filename);
    //       // flag=false;
    //       zipFolder.file(fileName, blob);
    //       // console.log(blob);
    //     });
    //   } else {
    //     await jszipFolder(zipFolder, item.filename);
    //   }
    // }
    var zipFolder = jszip.folder(fileNameNew(path)) as JSZip;
    const getDir = await webdavClient.getDirectoryContents(path);
    for (const item of getDir as Array<FileStat>) {
      console.log(item.filename);
      if (item.type === "file") {
        const temp = await webdavClient.getFileContents(item.filename);
        const blob: Blob = new Blob([new Uint8Array(temp as BufferLike)]);
        let fileName: string;
        fileName = fileNameNew(item.filename);
        zipFolder.file(fileName, blob);
      } else {
        await jszipFolder(zipFolder, item.filename);
      }
    }
  };
  const fileNameNew = (path: string) => {
    let backSlash = 0;
    for (let i = 0; i < path.length - 1; i++) {
      if (path.charAt(i) === "/") {
        console.log(i);
        backSlash = i;
      }
    }
    path = path.substr(backSlash + 1, path.length);
    return path;
    // console.log(s, "2");
  };
  const data = () => {
    return getDirectoryItems?.map((data: FileTreeEntry) => (
      <div>
        <hr />
        <b>
          <p onClick={() => downFolder(data.filePath)}>{data.filePath}</p>
        </b>

        <p>
          {"-->"} {data.type}
        </p>
      </div>
    ));
  };
  return (
    <div>
      <h3>Download Folder</h3>
      <br />
      {data()}
      {/* <button onClick={() => trvFolderHandler("/", "directory")}>
        Store in array
      </button> */}
    </div>
  );
};

export default DownloadFolder;
