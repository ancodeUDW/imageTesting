// @flow
import React, { PureComponent } from "react";
import * as R from 'ramda';
import styled from 'styled-components';
import ImageFile from './components/ImageFile';
import fs from 'fs';

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
    max-height: 200px;
    margin: 10px;
  }
`;

const readFiles = (myFolder) => fs.readdirSync(myFolder);



class ImageGallery extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      address: "F:\\imagenes\\por ordenar",
      files: []
    };

    // this.initImageGallery = this.initImageGallery.bind(this);
    // this.initImageGallery();
  }

  componentDidMount() {
    const {address} = this.state;
    const resultImages = readFiles(address);
    console.log("read files", resultImages)
    this.setState({files: resultImages});
  }

  processImages(){
    const {files, address} = this.state;
    const myImages = R.filter(R.test(/\.jpg$/), files);
    return R.map( el => (<ImageFile href={`${address}\\${el}`} />), myImages )
  }

  render() {
    const {files} = this.state;
    console.log("lets render", files, this.state);
    return (
      <MyGalery>{this.processImages()}</MyGalery>
    );
  }

}

export default ImageGallery;
