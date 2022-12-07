import React, { useState } from "react";
import webdavClient from "../api/api";
import ShowingTheDir from "./ShowingTheDir";
const CreateADirectory = () => {
  const [dirName, setDirName] = useState<string>("");
  const [render, setRender] = useState(0);
  const directoryNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setDirName(e.currentTarget.value);
  };
  const CreateDirHandler = async () => {
    try {
      const res = await webdavClient.createDirectory(`/${dirName}`);
      window.alert("Created SuccessFul !!");
      setRender(render + 1);
      setDirName("");
    } catch (error) {
      window.alert("Created UnsuccessFul !!");
    }
  };
  return (
    <div>
      <h3>Create A Directory</h3>
      <br />
      <input onChange={directoryNameHandler} value={dirName} />
      <br />
      <br />
      <button onClick={CreateDirHandler}>Create Directory</button>
      <ShowingTheDir path={"/"} render={render} />
    </div>
  );
};

export default CreateADirectory;
