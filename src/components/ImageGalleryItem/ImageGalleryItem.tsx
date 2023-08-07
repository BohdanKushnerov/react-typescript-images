import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImgGalleryItem, Image } from './ImageGalleryItem.styled';

type ImageGalleryItemProps = {
  image: {
    webformatURL: string;
    largeImageURL: string;
    tags: string;
  };
};

export function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags },
}: ImageGalleryItemProps) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ImgGalleryItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal img={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </ImgGalleryItem>
  );
}
