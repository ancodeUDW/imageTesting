import { handleActions }        from 'redux-actions';
import u                        from 'updeep';
import * as R                   from 'ramda';
import fs from "fs";

const readFiles = (myFolder) => fs.readdirSync(myFolder);

let initialStore = {
  currentFolder: '', // the folder we are checking right now
  folderElements: [], // the elements inside the folder
  imageGalleryStack: [], // stores several images from different folders to be shown as gallery
};


const setCurrentFolder = (state, action) => {
  let {payload} = action;

  const resultFiles = readFiles(payload);

  const modification = {
    currentFolder: R.always(payload),
    folderElements: R.always(resultFiles),
  };

  return u(modification, state);
};

const setImageGalleryStack = (state, action) => {
  let {payload} = action;

  const modification = {
    imageGalleryStack: R.always(payload)
  };

  return u(modification, state);
};

const setFolderElements = (state, action) => {
  let {payload} = action;

  const modification = {
    folderElements: R.always(payload)
  };

  return u(modification, state);
};


export default handleActions({
  'SET_CURRENT_FOLDER':       setCurrentFolder,
  'SET_FOLDER_ELEMENTS':      setFolderElements,
  'SET_IMAGE_GALLERY_STACK':  setImageGalleryStack,
}, initialStore);



