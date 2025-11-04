import useEmblaCarousel from 'embla-carousel-react'
import { API_URL_FROM_CONTENT_URL } from '@/config';
import "@/styles/components/ui/carousel.css";

export function Carousel({ photos }) {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    if (!photos || photos.length === 0) return null;

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {photos.map((photo, idx) => (
                    <div className="embla__slide" key={idx}>
                        <img
                            src={API_URL_FROM_CONTENT_URL(photo.url)}
                            alt={photo.alt || `Post image ${idx + 1}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
