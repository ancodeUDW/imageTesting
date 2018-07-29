import { createAction } from 'redux-actions';

const setCurrentFolder      = createAction('SET_CURRENT_FOLDER');
const setFolderElements     = createAction('SET_FOLDER_ELEMENTS');
const setImageGalleryStack  = createAction('SET_IMAGE_GALLERY_STACK');


export default {
  setCurrentFolder,
  setFolderElements,
  setImageGalleryStack,
}

export {
  setCurrentFolder,
  setFolderElements,
  setImageGalleryStack,
}
