import { DropEvent, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import webdavClient from "../api/api";
import { BufferLike } from "webdav";
import ShowingTheDir from "./ShowingTheDir";

type MyState = {
  uploadfiles: FileList | null;
  dirs: string[];
  msg: string;
  dcrq: number;
  dcre: number;
};
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

const DownloadFolder = () => {
  const [render, setRender] = useState(0);

  const [uploadfilesState, setUploadfilesState] = useState<MyState>({
    uploadfiles: null,
    dirs: [],
    msg: "msg",
    dcrq: 0,
    dcre: 0,
  });

  const uploadFolderHandler = async () => {
    // try {
    Array.from(uploadfilesState.uploadfiles as FileList).forEach(
      async (file) => {
        // for (const file of uploadfiles as MyState[] ) {

        console.log(file.webkitRelativePath);

        await webdavClient.createDirectory(
          getFolderPath(file.webkitRelativePath),
          { recursive: true }
        );
        file.arrayBuffer().then((fb: BufferLike) => {
          webdavClient
            .putFileContents(file.webkitRelativePath, fb)
            .then((complete: Boolean) => {
              uploadfilesState.msg =
                uploadfilesState.msg + " " + file.name + " Uploaded<br/>";
            });
        });
      }
    );
    setRender(render + 1);
    window.alert("Upload Successful");
  };

  const getFolderPath = (path: string) => {
    let backSlash = 0;
    for (let i = 0; i < path.length - 1; i++) {
      if (path.charAt(i) === "/") {
        // console.log(i);
        backSlash = i;
      }
    }
    path = path.substr(0, backSlash + 1);
    //console.log(path);
    return path;
  };
  const handleFolderSelected = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUploadfilesState({
      uploadfiles: e.target.files,
      dirs: [],
      msg: "msg",
      dcrq: 0,
      dcre: 0,
    });
    //console.log("Files:",this.state.uploadfiles);
  };
  return (
    <>
      Select Folders
      <br />
      <input
        type="file"
        name="ufolder"
        directory=""
        mozdirectory=""
        webkitdirectory=""
        multiple
        onChange={handleFolderSelected}
      />
      <br />
      <button onClick={uploadFolderHandler}>upload</button>
      <ShowingTheDir path={"/"} render={render} />
    </>
  );
};

export default DownloadFolder;
