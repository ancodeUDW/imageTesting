// @flow
import React, { PureComponent } from "react";
import * as R from 'ramda';
import {connect} from 'react-redux';
import { bindActionCreators }           from 'redux';
import styled from 'styled-components';
import fs from 'fs';
import appActions from 'store/actions';
import appSelectors from 'store/reducers/app/selectors.js'
import ImageFile from './components/ImageFile';

const MyGalery = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  
  > *{
    margin: 10px;
  }
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    dispatchSetCurrentFolder: appActions.app.setCurrentFolder,
    dispatchSetFolderElements: appActions.app.setFolderElements,
    dispatchSetImageGalleryStack: appActions.app.setImageGalleryStack,
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => {
  console.log("state", state, appSelectors.folderElements(state));
  return {
    currentFolder: appSelectors.currentFolder(state),
    folderElements: appSelectors.folderElements(state),
    imageGalleryStack: appSelectors.imageGalleryStack(state),
  }
};


class ImageGallery extends PureComponent {

  constructor(props) {
    super(props);

    this.initImageGallery = this.initImageGallery.bind(this);
    this.initImageGallery();
  }

  initImageGallery(){
    const {dispatchSetCurrentFolder, dispatchSetFolderElements, dispatchSetImageGalleryStack } = this.props;
    let originalFolder = "F:\\imagenes\\por ordenar";
    dispatchSetCurrentFolder(originalFolder);
  }

  processImages(){
    const {folderElements, currentFolder} = this.props;
    const myImages = R.filter(R.test(/\.jpg$/), folderElements);
    return R.map( el => (<ImageFile key={`${currentFolder}\\${el}`} src={`${currentFolder}\\${el}`} name={el} />), myImages )
  }

  render() {
    return (<MyGalery>{this.processImages()}</MyGalery>);
  }

}

export default R.pipe(
  connect(mapStateToProps, mapDispatchToProps),
)(ImageGallery);
