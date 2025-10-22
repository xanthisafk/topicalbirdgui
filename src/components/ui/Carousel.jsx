import useEmblaCarousel from 'embla-carousel-react'
import { API_BASE_URL } from '../../../topicalbirdconfig';

export function Carousel({ photos }) {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    if (!photos || photos.length === 0) return null;

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {photos.map((photo, idx) => (
                    <div className="embla__slide" key={idx}>
                        <img
                            src={API_BASE_URL + photo.url}
                            alt={photo.alt || `Post image ${idx + 1}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
