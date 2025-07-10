import { ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib";

import { Button } from "./button";

interface ICarouselContext {
  currentSlide: number;
  totalSlides: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

const CarouselContext = createContext<ICarouselContext | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel context does not exist");
  }

  return context;
};

interface ICarouselProps extends React.ComponentProps<"div"> {
  totalSlides: number;
}

const Carousel = ({ className, totalSlides, ...props }: ICarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === totalSlides - 1) {
      return;
    }
    setCurrentSlide((prev) => ++prev);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide((prev) => --prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <CarouselContext.Provider value={{ currentSlide, totalSlides, nextSlide, prevSlide }}>
      <div
        data-slot='carousel'
        className={cn("group relative size-full rounded-2xl", className)}
        {...props}
      />
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { currentSlide } = useCarousel();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <div data-slot='carousel-content' className='overflow-hidden'>
      <div
        ref={contentRef}
        className={cn(
          "relative flex rounded-2xl transition-transform duration-300 ease-in-out",
          className
        )}
        {...props}
      />
    </div>
  );
};

const CarouselItem = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='carousel-item'
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
);

interface ICarouselButtonProps {
  className?: string;
  direction: "prev" | "next";
}

const CarouselButton = ({ direction, className }: ICarouselButtonProps) => {
  const { prevSlide, nextSlide, currentSlide, totalSlides } = useCarousel();

  const isDisabled = direction === "prev" ? currentSlide === 0 : currentSlide === totalSlides - 1;

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className={cn(
        "!absolute top-1/2 z-10 !hidden -translate-y-1/2 group-hover:!inline-flex",
        direction === "prev" ? "left-4" : "right-4",
        className
      )}
      onClick={direction === "prev" ? prevSlide : nextSlide}
      disabled={isDisabled}
      aria-label={direction === "prev" ? "previous-slide" : "next-slide"}
    >
      {direction === "prev" ? (
        <ChevronLeft className='text-brand-primary' />
      ) : (
        <ChevronRight className='text-brand-primary' />
      )}
    </Button>
  );
};

export { Carousel, CarouselButton, CarouselContent, CarouselItem };
