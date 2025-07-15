import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// 1. MA'LUMOTLAR: Siz bergan ma'lumotlar o'zgarishsiz qoldirildi
const cards = [
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/80965c00-cb33-4aca-a513-f3f40d78a24d_main.mp4',
    isVideo: true,
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/3c96e15d-5a00-46fb-b933-adb3ddaf242c_main.jpg',
    title: 'FAIR',
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/e9f23d74-18bf-4857-8310-dfc09f08c8a6_main.jpg',
    title: 'CHESS CHAMP',
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/550480dc-469c-4c3a-b4f3-099f8015e274_main.mp4',
    isVideo: true,
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/2c2230f0-9d8f-4bea-a810-468ad9f0efa2_main.jpg',
    title: 'ORIGAMI',
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/9654339a-3322-48fb-8dd8-aee9be805221_main.jpg',
    title: 'GRANT YUTISH',
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/61c8fbc0-2a8b-4e3d-aa43-4cfde6f81ac5_main.mp4',
    isVideo: true,
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/48db245f-0b5a-40f5-b563-d2e2e9aec389_main.jpg',
    title: 'Millionaire',
  },
  {
    image:
      'https://app.cambridgeonline.uz/storage/site/cb378b76-bc44-464e-846b-eb33f6b440fa_main.jpg',
    title: 'Millionaire',
  },
  {
    image: 'https://app.cambridgeonline.uz/storage/site/tugad.mp4',
    isVideo: true,
  },
];

interface CardData {
  title?: string;
  image: string;
  isVideo?: boolean;
}

// Karta komponenti (o'zgarishsiz)
const GalleryCard = ({ card }: { card: CardData }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (card.isVideo && videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (card.isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      {card.isVideo ? (
        <Box
          component="video"
          ref={videoRef}
          src={card.image}
          muted
          loop
          playsInline
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box
          component="img"
          src={card.image}
          alt={card.title || 'Gallery image'}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </Box>
  );
};

const GalleryCarousel = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // 1. Ikkitalik rasm guruhlash mantiqi tiklandi
  const groupedItems = React.useMemo(() => {
    // MUAMMO SHU YERDA EDI: JSX.Element o'rniga React.ReactElement ishlatildi
    const items: React.ReactElement[] = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardWrapper = (children: React.ReactNode, key: string) => (
        <Box
          key={key}
          sx={{
            width: { xs: '80vw', sm: '400px' },
            height: { xs: '70vh', sm: '550px' },
            flexShrink: 0,
            scrollSnapAlign: 'center',
          }}
        >
          {children}
        </Box>
      );

      if (card.isVideo) {
        items.push(cardWrapper(<GalleryCard card={card} />, `video-${i}`));
      } else {
        const photo1 = card;
        const photo2 =
          i + 1 < cards.length && !cards[i + 1].isVideo ? cards[i + 1] : null;
        items.push(
          cardWrapper(
            <Stack spacing={2} sx={{ height: '100%' }}>
              <Box sx={{ flex: 1, height: '50%' }}>
                <GalleryCard card={photo1} />
              </Box>
              {photo2 && (
                <Box sx={{ flex: 1, height: '50%' }}>
                  <GalleryCard card={photo2} />
                </Box>
              )}
            </Stack>,
            `photos-${i}`
          )
        );
        if (photo2) i++;
      }
    }
    return items;
  }, []);

  // 2. Avtomatik aylanish mantiqi
  React.useEffect(() => {
    // Mobil qurilmalarda avtomatik aylanishni o'chiramiz
    if (window.innerWidth < 768) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % groupedItems.length);
      }
    }, 3000); // Tezlikni shu yerdan boshqarasiz

    return () => clearInterval(interval);
  }, [isHovering, groupedItems.length]);

  // 3. "Sakrash" muammosini hal qiluvchi yangi scroll mantiqi
  React.useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const targetSlide = container.children[0].children[
        activeIndex
      ] as HTMLElement;
      if (targetSlide) {
        const containerWidth = container.offsetWidth;
        const slideWidth = targetSlide.offsetWidth;
        const slideLeft = targetSlide.offsetLeft;

        // Elementni markazga keltirish uchun kerakli pozitsiyani hisoblash
        const scrollPosition = slideLeft - containerWidth / 2 + slideWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newIndex =
      direction === 'left'
        ? (activeIndex - 1 + groupedItems.length) % groupedItems.length
        : (activeIndex + 1) % groupedItems.length;
    setActiveIndex(newIndex);
  };

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 6 },
        backgroundColor: 'inherit',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ px: { xs: 2, md: 4 } }}>
          {groupedItems}
        </Stack>
      </Box>

      {/* Mobil uchun navigatsiya tugmalari */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          left: '0.5rem',
          right: '0.5rem',
          transform: 'translateY(-50%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <IconButton
          onClick={() => handleArrowClick('left')}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            pointerEvents: 'auto',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => handleArrowClick('right')}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            pointerEvents: 'auto',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }}
        >
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GalleryCarousel;
