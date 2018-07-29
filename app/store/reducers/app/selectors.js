import { createSelector } from 'reselect'
import * as R from "ramda";

// currentFolder,
// folderElements,
// imageGalleryStack,

const currentStore = R.prop('app');

const currentFolder = createSelector(
  currentStore,
  R.prop('currentFolder'),
);

const folderElements = createSelector(
  currentStore,
  R.prop('folderElements'),
);

const imageGalleryStack = createSelector(
  currentStore,
  R.prop('imageGalleryStack'),
);

export default {
  currentFolder,
  folderElements,
  imageGalleryStack,
};
