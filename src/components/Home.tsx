import React, { useState } from "react";
import CreateADirectory from "./CreateADirectory";
import DownloadFile from "./DownloadFile";
import "./style.css";
import TraversalInFolder from "./TraversalInFolder";
import WebDav from "./Move";
import DeleteFile from "./DeleteFile";
import UploadFile from "./UploadFile";
import RenameMain from "./RenameMain";
import DownloadFolder from "./DownloadFolder";
import UploadFolder from "./UploadFolder";
const Home = () => {
  const [navigate, setNavigate] = useState<number>(0);
  const openTheCertainOperation = (operation: number) => {
    setNavigate(operation);
  };
  return (
    <>
      {navigate !== 0 && (
        <button onClick={() => openTheCertainOperation(0)}>Home</button>
      )}
      {navigate === 0 && (
        <div className="cont">
          <div className="item" onClick={() => openTheCertainOperation(1)}>
            Create The Directory
          </div>
          <div className="item" onClick={() => openTheCertainOperation(2)}>
            Navigate The Directory
          </div>
          <div className="item" onClick={() => openTheCertainOperation(3)}>
            Rename The File
          </div>
          <div className="item" onClick={() => openTheCertainOperation(4)}>
            Delete The File
          </div>
          <div className="item" onClick={() => openTheCertainOperation(5)}>
            Move The File From One Directory to Other Directory
          </div>
          <div className="item" onClick={() => openTheCertainOperation(6)}>
            Upload The File
          </div>
          <div className="item" onClick={() => openTheCertainOperation(7)}>
            Download The File
          </div>
          <div className="item" onClick={() => openTheCertainOperation(8)}>
            Download The Folder
          </div>
          <div className="item" onClick={() => openTheCertainOperation(9)}>
            Upload The Folder
          </div>
        </div>
      )}
      {navigate === 1 && <CreateADirectory />}
      {navigate === 2 && <TraversalInFolder />}
      {navigate === 3 && <RenameMain />}
      {navigate === 4 && <DeleteFile />}
      {navigate === 5 && <WebDav />}
      {navigate === 6 && <UploadFile />}
      {navigate === 7 && <DownloadFile />}
      {navigate === 8 && <DownloadFolder />}
      {navigate === 9 && <UploadFolder />}
    </>
  );
};

export default Home;
