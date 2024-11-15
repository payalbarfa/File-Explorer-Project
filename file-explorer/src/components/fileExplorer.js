import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertNode,deleteNode,updateNode } from "../store/explorerSlice";
import { faAngleDown, faAngleRight, faFile, faFileCirclePlus, faFolder, faFolderOpen, faFolderPlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
const Folder = ({ explorer }) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [showUpdateField, setShowUpdateField] = useState({
    visible: false,
    isFolder: null,
  });

  // Handle the new folder/file input visibility
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  // Handle adding a new folder/file
  const addNewFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      dispatch(insertNode({ folderId: explorer.id, item: e.target.value, isFolder: showInput.isFolder }));
      setShowInput({ ...showInput, visible: false });
    }
  };

  // Handle delete folder/file
  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    dispatch(deleteNode({ nodeId: explorer.id }));
  };

  // Handle updating folder/file name
  const handleUpdateFolder = (e) => {
    e.stopPropagation();
    setShowUpdateField({
      isFolder: explorer.isFolder,
      visible: true,
    });
  };

  const updateNodeName = (e) => {
    if (e.key === "Enter" && e.target.value) {
      dispatch(updateNode({ nodeId: explorer.id, newName: e.target.value }));
      setShowUpdateField({ ...showUpdateField, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div 
      className="FolderHeader"
    
      >
        {/* Folder Header */}
        {!showUpdateField.visible && (
          <div className="folder" onClick={() => setExpand(!expand)}>
            {expand ? (
              <span>
               <FontAwesomeIcon icon={faAngleDown} />
              </span>
            ) : (
              <span>
               <FontAwesomeIcon icon={faAngleRight} />
              </span>
            )}
            <span>
              {expand ? (
                <FontAwesomeIcon icon={faFolderOpen} style={{ color: "#FFD43B" }}/>
                
              ) : (
                <FontAwesomeIcon icon={faFolder} style={{ color: "#FFD43B" }}/>
               
              )}
              &nbsp;&nbsp;{explorer.name}
            </span>

            {/* Folder Actions */}
            <div>
              <button onClick={(e) => handleNewFolder(e, true)} className="file-Action-Icon">
              <FontAwesomeIcon icon={faFolderPlus} className="icon-color"/>
              </button>
              <button onClick={(e) => handleNewFolder(e, false)} className="file-Action-Icon">
              <FontAwesomeIcon icon={faFileCirclePlus} className="icon-color" />
              </button>
              <button onClick={handleUpdateFolder} className="file-Action-Icon">
              <FontAwesomeIcon icon={faPenToSquare} className="icon-color" />
              </button>
              <button onClick={(e) => handleDeleteFolder(e)} className="file-Action-Icon">
              <FontAwesomeIcon icon={faTrashCan} className="icon-color"/>
              </button>
            </div>
          </div>
        )}

        {/* Input for updating folder/file name */}
        {showUpdateField.visible && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              placeholder="Enter new name"
              onKeyDown={updateNodeName}
              onBlur={() => setShowUpdateField({ ...showUpdateField, visible: false })}
              autoFocus
            />
          </div>
        )}

        {/* Input for adding a new folder/file */}
        {showInput.visible && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              placeholder={`Enter ${showInput.isFolder ? "folder" : "file"} name`}
              onKeyDown={addNewFolder}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              autoFocus
            />
          </div>
        )}

        {/* Render nested items */}
        <div style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}>
          {explorer.items.map((item) => (
            <Folder key={item.id} explorer={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {!showUpdateField.visible && (
          <div>
            <FontAwesomeIcon icon={faFile} />&nbsp;&nbsp;{explorer.name}
          </div>
        )}

        {showUpdateField.visible && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              placeholder="Enter new name"
              onKeyDown={updateNodeName}
              onBlur={() => setShowUpdateField({ ...showUpdateField, visible: false })}
              autoFocus
            />
          </div>
        )}

        {/* File Actions */}
        <div className="file-action">
          <button onClick={handleUpdateFolder}  className="file-Action-Icon">
          <FontAwesomeIcon icon={faPenToSquare} className="icon-color"/>
          </button>
          <button onClick={(e) => handleDeleteFolder(e)} className="file-Action-Icon">
          <FontAwesomeIcon icon={faTrashCan} className="icon-color"/>
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;
