import { useState } from "react";
import type { ImagePreviewEntry } from "../app/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';


export function ImagePreviewModal(props: {
  entry: ImagePreviewEntry;
  onClose: () => void;
}) {
  const { entry, onClose } = props;
  const images = entry.images ?? [];
  const hasMultiple = images.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <p className="subtitle">Previewing images from</p>
          <h3>
            {entry.title}
          </h3>
        </header>

        {/* CONTENT */}
        {images.length === 0 ? (
          <p className="muted">No visual records available.</p>
        ) : hasMultiple ? (
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            navigation={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
            }}
            modules={[EffectCoverflow, Navigation]}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <figure className="modal-figure">
                  <img src={img.src} alt={img.alt} />
                  <figcaption className="muted">{img.alt}</figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="modal-wrapper">
            <figure className="modal-figure">
              <img src={images[0].src} alt={images[0].alt} />
              <figcaption className="muted">{images[0].alt}</figcaption>
            </figure>
          </div>
        )}

        <footer className="actions">
          {entry.url ? (
            <a
              className="primary"
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW PROJECT LIVE
            </a>
          ) : (
            <span />
          )}

          <span>
            {images.length > 0
              ? `${activeIndex + 1} OF ${images.length}`
              : ""}
          </span>

          <button type="button" onClick={onClose}>
            CLOSE [ESC]
          </button>
        </footer>
      </div>
    </div>
  );
}
