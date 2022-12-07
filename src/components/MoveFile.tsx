import React, { useState } from "react";
import webdavClient from "../api/api";
const MoveFile: React.FC<{
  selectedFileToMove: string;
  destinationFolder: string;
  getDirectoryContentsHandler: () => Promise<void>;
}> = (props) => {
  // const [desti]=useState<string>('')
  console.log(props.selectedFileToMove, "selectedFileToMove");
  console.log(props.destinationFolder, "destinationFolder");
  const movetotheFolder = async () => {
    try {
      const result1 = await webdavClient.moveFile(
        props.selectedFileToMove,
        props.destinationFolder + "" + props.selectedFileToMove
      );
    } catch (error) {
      window.alert("Some went Worng");
      // console.log(error);
    }
    // props.setForReRender();
    props.getDirectoryContentsHandler();
  };
  return (
    <div>
      <button onClick={movetotheFolder}>Move to this folder</button>
    </div>
  );
};

export default MoveFile;
