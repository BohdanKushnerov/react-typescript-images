import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'services/Api';
import PropTypes from 'prop-types';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

type ImageGalleryProps = {
  imgTheme: string;
};

type Image = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};

export function ImageGallery({ imgTheme }: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!imgTheme) {
      return;
    }

    setSearch(imgTheme);
    setImages([]);
    setPage(1);
  }, [imgTheme]);

  useEffect(() => {
    if (!search) {
      return;
    }

    async function loadImg() {
      setStatus(Status.PENDING);

      try {
        const { hits, totalHits } = await fetchImg(search, page);

        const normalizedImages: Image[] = hits.map(
          ({ id, webformatURL, largeImageURL, tags }: Image) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          }
        );

        setImages(prevState => [...prevState, ...normalizedImages]);
        setError(null);
        setStatus(Status.RESOLVED);
        setTotalHits(totalHits);
      } catch (error) {
        setError('error');
        setStatus(Status.REJECTED);
      }
    }
    loadImg();
  }, [search, page]);

  useEffect(() => {
    if (totalHits <= 0 || images.length !== totalHits) return;
    toast.warn('Sorry, there are no images matching your search query.');
  }, [images.length, totalHits]);

  return (
    <>
      {images.length > 0 && (
        <ImageGalleryList>
          {images.map(({ id, ...restProps }) => {
            return <ImageGalleryItem key={id} image={restProps} />;
          })}
        </ImageGalleryList>
      )}
      {!(images.length >= totalHits) && status === Status.RESOLVED && (
        <ButtonLoadMore
          type="button"
          onClick={() => setPage(prevState => prevState + 1)}
        >
          Load More
        </ButtonLoadMore>
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && error && (
        <h2>
          An error occurred, we could not upload the photo, please try reloading
          the page and try again :)
        </h2>
      )}
      {images.length === 0 && status === Status.RESOLVED && totalHits === 0 && (
        <h2>We didn't find anything according to your request</h2>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imgTheme: PropTypes.string.isRequired,
};
