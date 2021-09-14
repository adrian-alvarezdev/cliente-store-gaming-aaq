import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  swipeToSlider: true,
};

export default function CarouselScreenshots(props) {
  const { title, galeria } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImagen = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settings}>
        {map(galeria, (galeri) => (
          <Image
            key={galeri.id}
            src={galeri.url}
            alt={galeri.name}
            onClick={() => openImagen(galeri.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
