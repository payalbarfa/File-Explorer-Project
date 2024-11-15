import { createSlice } from "@reduxjs/toolkit";
import explorerData from "../data/exploreData.json"

const initialState = {
  explorerData,
};

const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    //insert file reducer 
    insertNode: (state, action) => {
      const { folderId, item, isFolder } = action.payload;
      const insertNodeRecursively = (tree) => {
        if (tree.id === folderId && tree.isFolder) {
          tree.items.unshift({
            id: new Date().getTime().toString(),
            name: item,
            isFolder,
            items: [],
          });
          return tree;
        }
        tree.items = tree.items.map((child) => insertNodeRecursively(child));
        return tree;
      };
      state.explorerData = insertNodeRecursively(state.explorerData);
    },
    //delete file reducer 
    deleteNode: (state, action) => {
      const { nodeId } = action.payload;
      const deleteNodeRecursively = (tree, parent) => {
        if (tree.id === nodeId) {
          const index = parent.items.findIndex((item) => item.id === nodeId);
          parent.items.splice(index, 1);
          return;
        }
        tree.items.forEach((child) => deleteNodeRecursively(child, tree));
      };
      deleteNodeRecursively(state.explorerData, { items: [state.explorerData] });
    },
    //update file reducer 
    updateNode: (state, action) => {
      const { nodeId, newName } = action.payload;
      const updateNodeRecursively = (tree) => {
        if (tree.id === nodeId) {
          tree.name = newName;
          return tree;
        }
        tree.items = tree.items.map((child) => updateNodeRecursively(child));
        return tree;
      };
      state.explorerData = updateNodeRecursively(state.explorerData);
    },
  },
});

export const { insertNode, deleteNode, updateNode } = explorerSlice.actions;
export default explorerSlice.reducer;
