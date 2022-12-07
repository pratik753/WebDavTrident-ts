# Get Started

In the project directory, you can run:

```bash
  npm start
```

Run the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

Start the apache server Getting Started with WebDavTrident

# How to setup webDAV server using apache

1. Download xmapp using
   https://www.apachefriends.org/xampp-files/8.1.2/xampp-windows-x64-8.1.2-0-VS16-installer.exe

2. Apache HTTP Server 2.4.x is installed and correctly configured in windows machine

Configuration steps-

load webDAV module in apache srever configuration.
webDAV module is installed with apache server 2.4.x by default. Backup"%APACHE_PATH%/conf/http.conf" and then edit it, un-comment the follwing load and include statements to load webDAV module as shown below.

```
LoadModule alias_module modules/mod_alias.so
LoadModule auth_digest_module modules/mod_auth_digest.so
LoadModule authn_file_module modules/mod_authn_file.so
LoadModule dav_module modules/mod_dav.so
LoadModule dav_fs_module modules/mod_dav_fs.so
LoadModule dav_lock_module modules/mod_dav_lock.so
LoadModule setenvif_module modules/mod_setenvif.so

#Distributed authoring and versioning (WebDAV)
Include conf/extra/httpd-dav.conf
```

4. Configure e folder
   Created a “sites” folder under “%APACHE_PATH%/sites“. Edit “%APACHE_PATH%/extra/httpd-dav.conf”, add following content :

```bash
Alias /zirohlabs "C:/xampp/webdav/zirohlabs"


<Directory "C:/xampp/webdav/zirohlabs">
 Dav On

Order Allow,Deny

Allow from all

Options Indexes
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Headers "origin, content-type, cache-control, accept, authorization, if-match, destination, overwrite, depth"
  Header always set Access-Control-Expose-Headers "ETag"
  Header always set Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, MOVE, DELETE, COPY, LOCK, UNLOCK, PROPFIND,MKCOL"

</Directory>
```

5. Restart Apache Server Restart Apache server service. Now, WebDAV service is enabled in your server’s “sites” folder.

6. Visit URL of sites folder in Web browser to validate if the configuration is correct. The URL should be like "http://[IP of Server]:[Port]/zirohlabs". For example, "http://127.0.0.1:8000/zirohlabs" as shown below:

# How to setup react ts ?

1. Install node.js and npm - node.js intallation steps depend on your system- just proceed to this link ("https://nodejs.org/en/download/)

2. Create the project -

```bash
npx create-react-app  webdavtrident --template typescript
```

ts file created.

# CORS error

Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

# How to fix course error-

In xampp we have to configured webDAV httpd-dav.conf with

```bash
Alias /zirohlabs "C:/xampp/webdav/zirohlabs"
<Directory "C:/xampp/webdav/zirohlabs">
 Dav On

Order Allow,Deny

Allow from all

Options Indexes
Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Headers "origin, content-type, cache-control, accept, authorization, if-match, destination, overwrite, depth"
  Header always set Access-Control-Expose-Headers "ETag"
  Header always set Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, MOVE, DELETE, COPY, LOCK, UNLOCK, PROPFIND,MKCOL"

</Directory>
```

Using this we can fix the cors error

## Features

- Create Directory
- Traversal in Folder
- Delete File
- Rename File
- Move File
- Upload File
- Download File
- Download folder
- Upload Folder

# Create Directory

- We have to input the filename in the text field .
- Thereafter we have to click the Directory button.
- After we clicked the button, Our Directory is Created in webDAV server `("http://localhost:8011/zirohlabs/")`

```bas
 const CreateDirHandler = async () => {
    try {
      const res = await webdavClient.createDirectory(`/${dirName}`);
      window.alert("Created SuccessFul !!");
    } catch (error) {
      window.alert("Created UnsuccessFul !!");
    }
  };
```

# Traversal in Folder

- When we click the folder the folder will open.
- When we click the back button then the back button will redirected to the previous directory.
- For back button we are using given method

```
const backToPrevDirHandler = () => {
    let s = pathForNavigate;
    let backSlash = 0;
    for (let i = 0; i < s.length - 1; i++) {
      if (s.charAt(i) === "/") {
        console.log(i);
        backSlash = i;
      }
    }
    s = s.substr(0, backSlash + 1);
    setPathForNavigate(s);
  };
```

- And For forward we use following method
  ```
  const moveFowrwordHandler = (path: string, type: string) => {
  if (type === "directory") {
    setPathForNavigate(path);
    return;
  }
  window.alert("Select Directory");
  };
  ```
  - When the pathForNavigate is change then this useEffect will call
  ```
  useEffect(() => {
  async function getDirectoryFunction() {
    const dirContent = await getDirectoryContentsHandler(pathForNavigate);
    console.log(dirContent);
    setDirectoryItems(dirContent);
  }
  getDirectoryFunction();
  }, [pathForNavigate]);
  ```

# Rename File

- For renaming the file we have to click the Rename button.
- Then we will be able to rename the file name.
- Rename button wiil be redirected to the rename page .
- In rename page we have to enter those filename which we want to give.
- After clicking the rename button and filename will be change.
- For renaming we are using given method.

```
const directoryItems = await webdavClient.moveFile(
      prevFileName,
      newFileName
    );
```

# Delete file

- For deleting we have to select the file.
- After the selection of file we can see delete button.
- If we click that delete button, file will be deleted from the directory.
- For deletion we are using given method

```
const res = await webdavClient.deleteFile(selectedDeleteText);
```

# Move file

- For moving first we have to select the file.
- Then we have to click on move button and select the folder.
- Then we have to click on move button to folder button then file will move from current directory to selected directory.
- For moving we are using given method:-

```
 const movetotheFolder = async () => {
    try {
      const result1 = await webdavClient.moveFile(
        props.selectedFileToMove,
        props.destinationFolder + "" + props.selectedFileToMove
      );
    } catch (error) {
      window.alert("Some went Worng");
      console.log(error);
    }
    props.getDirectoryContentsHandler();
  };
```

# Upload file

- For uploading we have to select the file .
- After selecting the file we have to select the directory where we want to upload the file.
- After selecting the directory we have to click on upload button
- Then the file will be uploaded to selected directory.
- For uploading we are using given method :-

```
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
```

# Download File

- For downloading we have to select the file
- Then saveFileHandler will automatically call.

```
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
```

# Download folder

- For downloading folder we have to select the folder
- Then downFolder will automatically call.

```
const downFolder = async (dirpath: string) => {
    var zip: JSZip = new JSZip();

    jszipFolder(zip, dirpath).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, fileNameNew(dirpath) + ".zip");
      });
    });
  };

```

- In downFolder JSZip will create new instance.
- Then jszipfolder method call.

```
const jszipFolder = async (jszip: JSZip, path: string) => {
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
```

- this download the file like tree file structure in the given path.
- After the completion of this method the zip file will downloaded in the download Folder of your PC.

# Upload Folder

- For Uploading the folder, we are using `webkitdirectory` to upload the Folder
- When we select the folder then click the upload button, on clicking the button then `uploadFolderHandler ` is call.
- Note:- Add `BrowserMatch " Chrome" redirect-carefully` on httpd-dav.conf file.

```
const uploadFolderHandler = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
```

- After the method execute then the folder is save to the `WebDav Server` .

## Tech Stack

**Client:** React TS

**Server:** Apache WebDav Server
