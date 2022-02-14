import Carousel from "react-bootstrap/Carousel";

import { useState } from "react";
import styled from "styled-components";
const StyledDiv = styled("div")`
  background-image: url(./static/media/${(props) => props.img});
`;

export const ControlledCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      controls={images.length === 1 ? false : true}
      indicators={images.length === 1 ? false : true}
      interval="2000000"
      activeIndex={index}
      onSelect={handleSelect}
    >
      {/* <Carousel fade> */}
      {/* <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        /> */}

      {images.map((img) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${"./static/media/" + img.name}`}
              alt=""
            />
          </Carousel.Item>
        );
      })}

      {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${"./static/media/" + images[0].name}`}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${"./static/media/" + images[1].name}`}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};
