import React, { useState, useEffect } from "react";
import FileStr from "../modal/FilesStr";
import webdavClient from "../api/api";

const Renamef: React.FC<{
  fileRenameText: string;
  getDirectoryContentsHandler: () => void;
}> = (props) => {
  const [prevFileName, setPrevFileName] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  useEffect(() => {
    setPrevFileName(props.fileRenameText); //
    setNewFileName(props.fileRenameText);
  }, [props.fileRenameText]);

  const submitHandler = async () => {
    // const pd= setprevdata();
    const directoryItems = await webdavClient.moveFile(
      prevFileName,
      newFileName
    );
    console.log(directoryItems);
    props.getDirectoryContentsHandler();
    setNewFileName("");
  };
  const dataHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNewFileName(e.currentTarget.value);
  };
  // const curentdataHandler=([])=>{
  // }
  return (
    <div>
      <h1>RENAME</h1>
      <h3>Write the folder </h3>
      <input type="text" value={newFileName} onChange={dataHandler} />
      {/* <input type="text" ></input> */}
      <button onClick={submitHandler}>Rename</button>
    </div>
  );
};
export default Renamef;
