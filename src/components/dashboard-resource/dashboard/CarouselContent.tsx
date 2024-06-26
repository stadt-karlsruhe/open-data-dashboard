'use client';

import { Carousel } from 'react-bootstrap';
import { DashboardCarouselContent } from '@/schemas/configuration/configurationSchema';
import { sizeClassToHeight } from '@/utils/mapUtils';

export default function CarouselContent({ content }: { content: DashboardCarouselContent }) {
  return (
    <Carousel pause="hover" interval={10_000} data-cy="dashboard-carousel">
      {content.slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div
            className="d-flex flex-column align-items-center justify-content-center text-white"
            style={{
              height: sizeClassToHeight(content.size),
              backgroundColor: slide.backgroundColor ?? content.backgroundColor,
            }}
          >
            <h1>{slide.title}</h1>
            <div className="w-75 text-center">
              <h5>{slide.text}</h5>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
