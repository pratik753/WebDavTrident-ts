import React, { useEffect, useState } from "react";
import getDirectoryContentsHandler from "../api/getDirectoryContents";
import { FileTreeEntry } from "../modal/typedefs";
import webdavClient from "../api/api";
const ShowingTheDir: React.FC<{ path: string; render: number }> = (props) => {
  const [getDirectoryItems, setDirectoryItems] = useState<Array<FileTreeEntry>>(
    []
  );
  useEffect(() => {
    async function getDirectoryFunction() {
      let propPath = props.path;
      if (propPath == undefined) {
        propPath = "/";
      }
      const dirContent = await getDirectoryContentsHandler(propPath);
      console.log(dirContent);
      setDirectoryItems(dirContent);
    }
    getDirectoryFunction();
  }, [props.path, props.render]);
  const data = () => {
    return getDirectoryItems?.map((data: FileTreeEntry) => (
      <div>
        <hr />
        <b>{data.filePath}</b>

        <p>
          {"File Type -->"} {data.type}
        </p>
      </div>
    ));
  };
  return <div>{data()}</div>;
};

export default ShowingTheDir;
