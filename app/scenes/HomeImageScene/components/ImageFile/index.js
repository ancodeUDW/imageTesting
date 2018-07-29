// @flow
import React, { PureComponent } from "react";
import * as R from 'ramda';
import styled from 'styled-components';

let MyImg = styled.img`
  height: 100%;
  transition: transform 0.3s ease;
  &:hover{
    transform: scale(2);
  }
`;


class ImageFile extends PureComponent {

  constructor(props) {
    super(props);
    // this.initImageGallery = this.initImageGallery.bind(this);
    // this.initImageGallery();
  }

  componentDidMount() {
  }

  render() {
    const {href} = this.props;

    return (
      <MyImg src={href} alt={href} />
    );
  }

}

export default ImageFile;
