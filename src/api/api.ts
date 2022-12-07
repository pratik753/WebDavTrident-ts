import { createClient } from "webdav/web";

const connectionstring: string = "http://localhost:8011/zirohlabs/";
const webdavClient = createClient(connectionstring, {
  //username: "username",
  //password: "password"
  headers: {
    "Content-Type": "application/txt",
  },
});
export default webdavClient;
