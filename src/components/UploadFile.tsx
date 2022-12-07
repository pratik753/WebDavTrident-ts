import React, { useState } from "react";
import { BufferLike } from "webdav";
import webdavClient from "../api/api";
import ShowingTheDir from "./ShowingTheDir";
import TraversalInFolder from "./TraversalInFolder";
import WebDav from "./Move";
// import "./UploadFileFun.css";
type MyProps = {
  msg: string;
};
type MyState = {
  uploadfiles: FileList | null;
  msg: string;
};
const UploadFileFun = () => {
  const [render, setRender] = useState(0);
  const [state, setState] = useState<MyState>();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ uploadfiles: e.target.files, msg: " " });
    console.log("files:", state);
  };
  const uploadFilesHandler = async () => {
    const f: File = state?.uploadfiles?.item(0) as File;
    f.arrayBuffer().then((fb: BufferLike) => {
      webdavClient.putFileContents(f.name, fb).then((complete: Boolean) => {
        // setState({ msg: "File Uploaded" });
        console.log("upload successFul");
        window.alert("upload successFul");
        setRender(render + 1);
      });
    });
  };
  return (
    <div className="box">
      <h1>Upload files</h1>
      <input
        type="file"
        id="ufile"
        name="ufile"
        onChange={handleFileSelected}
      ></input>
      <button className="btn" onClick={uploadFilesHandler}>
        Upload File
      </button>

      <h3 id="msg">{state?.msg}</h3>
      <ShowingTheDir path={"/"} render={render} />
    </div>
  );
};

export default UploadFileFun;
