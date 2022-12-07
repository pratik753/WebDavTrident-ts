// class Todo {
//   id: string;
//   text: string;
//   constructor(todoText: string) {
//     this.id = new Date().toISOString();
//     this.text = todoText;
//   }
// }
class FileStr {
  basename: string;
  etag: string | null;
  filename: string;
  type: string;
  //   size: number;

  constructor(basename: string, etag: string, filename: string, type: string) {
    this.basename = basename;
    this.etag = etag;
    this.filename = filename;
    this.type = type;
    // this.size = size;
  }
}
export default FileStr;

//   containingDirectoryPath: standardiseDirectoryPath(directory),
//   depth: item.filename.split("/").length - 2, // minus root, minus filename
//   dummy: false,
//   filePath: item.filename,
//   id: item.filename,
//   isDirectoryOpen: false,
//   isSelected: false,
//   type: item.type,
// basename: "yarn.lock"
// ​​
// etag: "W/2acb42cd6436de8983ea1b1592b8e36c"
// ​​
// filename: "/yarn.lock"
// ​​
// lastmod: "Wed, 09 Feb 2022 14:35:36 UTC"
// ​​
// mime: "application/octet-stream"
// ​​
// size: 557033
// ​​
// type: "file"
