export type FileTreeEntry = {
  depth: number;
  containingDirectoryPath: string;
  dummy: boolean;
  filePath: string;
  id: string;
  isDirectoryOpen: boolean;
  isSelected: boolean;
  type: string;
};
