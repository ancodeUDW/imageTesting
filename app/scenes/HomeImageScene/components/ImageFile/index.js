/* eslint-disable react/prop-types,no-useless-constructor,prefer-const */
// @flow
// reference for the cube: https://3dtransforms.desandro.com/cube
import React, { PureComponent } from "react";
import * as R from 'ramda';
import styled from 'styled-components';

const transformAddress = addr => R.replace(/[\\]/g, '/', addr); //=> 'bar bar bar'

const cubeWidth = 200;
const cubeHeight = 200;
const cubeDeep   = 50;

const Scene = styled.div`
  width: ${cubeWidth}px;
  height: ${cubeHeight}px;
  perspective: 600px;
  margin: 20px !important;
`;

const Cube = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  transform: translateZ(${-cubeDeep/2}px);
  &:hover{
    transform: rotate3d(0,1,0, 30deg) translateZ(${-cubeDeep/2}px);
  }
  
  &.clicked{
    transform: rotate3d(0,1,0, 180deg) translateZ(${-cubeDeep/2}px);
  }
`;

const CubeFace = styled.div`
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: none;
  white-space: nowrap;
  font-size: 30px;
`;

const FaceFront = CubeFace.extend`
  background-color: black;
  width: ${cubeWidth}px;
  height: ${cubeHeight}px;
  transform: rotateY(  0deg) translateZ(${cubeDeep/2}px);
`;

const FaceRight = CubeFace.extend`
  background-color: black;
  width: ${cubeDeep}px;
  height: ${cubeHeight}px;
  writing-mode: vertical-lr;
  font-size: 41px;
  transform: rotateY( 90deg) translateZ(${cubeWidth-cubeDeep/2}px);
`;

const FaceBack = CubeFace.extend`
  background-color: rgba(0,0,0,0.51);
  color: white;
  width: ${cubeWidth}px;
  height: ${cubeHeight}px;
  transform: rotateY(180deg) translateZ(${cubeDeep / 2}px);
`;

const FaceLeft = CubeFace.extend`
  background-color: black;
  width: ${cubeDeep}px;
  height: ${cubeHeight}px;
  writing-mode: vertical-lr;
  transform: rotateY(-90deg) translateZ(${cubeDeep/2}px);
`;

const FaceTop = CubeFace.extend`
  background-color: black;
  width: ${cubeWidth}px;
  height: ${cubeDeep}px;
  transform: rotateX(90deg) translateZ(${cubeDeep/2}px);
`;

const FaceBottom = CubeFace.extend`
  background-color: black;
  width: ${cubeWidth}px;
  height: ${cubeDeep}px;
  transform: rotateX(-90deg) translateZ(${cubeHeight-cubeDeep/2}px);
`;




const MyTitle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -11px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:  nowrap;
  background-color: black;
  color: white;
  font-size: 17px;
  transform-origin: top left;
  transform: rotate3d(1,0,0,-90deg);
  transition: transform 0.5s ease;

`;

let MyImgDiv = styled.div`
  background-image: ${props => 'url("' + transformAddress(props.src) + '")'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 0.5s ease;

`;


let ImageFileWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  cursor: pointer;
  perspective: 600px;
  
  &:hover ${MyTitle}{
    transform: rotateX(-45deg);
  }
    
  &:hover ${MyImgDiv}{
    transform: rotateX(45deg);
  }
`;


// let ImageFileWrapper = styled.div`
//   background-color: rgba(255, 255, 255, 0.55);
//   height: 250px;
//   width: 210px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-content: flex-end;
//   flex-wrap: wrap;
//   overflow: hidden;
//
//   &:hover{
//     transform: scale(1.3);
//   }
// `;
//
// let MyTitle = styled.div`
//   text-overflow: ellipsis;
//   text-align: center;
//   white-space: nowrap;
//   padding: 10px 5px;
//   display: block;
//   width: 100%;
//   overflow: hidden;
// `;
//
// let MyImgDiv = styled.div`
//   background-image: ${props => 'url("' + transformAddress(props.src) + '")'};
//   display: block;
//   width: 100%;
//   background-position: bottom center;
//   background-size: contain;
//   background-repeat: no-repeat;
//   /* height: 100px; */
//   flex: 1;
// `;
//
// let MyImg = styled.img`
//   display: block;
//   max-height: 200px;
//   max-width: 200px;
//   width: auto;
//   height: auto;
//   transition: transform 0.3s ease;
//   cursor: pointer;
// `;


class ImageFile extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.onclickHandler = this.onclickHandler.bind(this);

    // this.initImageGallery = this.initImageGallery.bind(this);
    // this.initImageGallery();
  }

  onclickHandler(event) {
    const { selected } = this.state;
    this.setState({selected: !selected});
  }


  render() {
    const { selected } = this.state;
    const {src, name} = this.props;

    return (
      <Scene>
        <Cube onClick={this.onclickHandler} className = {selected ? 'clicked' : ''}>
          <FaceFront><MyImgDiv src = {src}/></FaceFront>
          <FaceTop>top</FaceTop>
          <FaceBottom>bottom</FaceBottom>
          <FaceLeft>{name}</FaceLeft>
          <FaceRight>right</FaceRight>
          <FaceBack>
              SELECTED
          </FaceBack>
        </Cube>
      </Scene>

    );
    //
    // return (
    //   <ImageFileWrapper>
    // {/*<MyImg src={src} alt={src} />*/}
    // <MyImgDiv src = {src}/>
    // <MyTitle>{name}</MyTitle>
    // </ImageFileWrapper>
    // )
    //
  }

}

export default ImageFile;
