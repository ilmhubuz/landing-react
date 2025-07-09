import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

// Hook'imizni import qilamiz
import { useFilteredCourses } from '../hooks/useFilteredCourses';
import { SitemarkIcon } from './ CustomIcons';

// Kurslarga mos keladigan ikonkalarni import qilamiz
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import DeveloperModeRoundedIcon from '@mui/icons-material/DeveloperModeRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

// Kurs nomi va unga mos ikonkani bog'laydigan funksiya
const getIconForCourse = (courseName: string) => {
  const iconProps = { sx: { color: 'text.secondary' } };
  switch (courseName) {
    case 'Pre IELTS':
      return <SchoolRoundedIcon {...iconProps} />;
    case 'IELTS':
      return <VerifiedRoundedIcon {...iconProps} />;
    case 'Frontend':
      return <CodeRoundedIcon {...iconProps} />;
    case 'Backend':
      return <StorageRoundedIcon {...iconProps} />;
    case '.NET Bootcamp':
      return <DeveloperModeRoundedIcon {...iconProps} />;
    default:
      return null;
  }
};

export default function Features() {
  // 1. Hook'dan ma'lumotlarni olamiz
  const { courses, loading, error } = useFilteredCourses();

  // 2. Ma'lumotlarni komponent shabloniga moslaymiz
  const items = React.useMemo(
    () =>
      courses.map((course) => ({
        icon: getIconForCourse(course.name),
        title: course.name,
        description: course.description,
      })),
    [courses]
  );

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>

      {/* 3. Yuklanish (loading) holatini ko'rsatish */}
      {loading &&
        Array.from(new Array(4)).map((_, index) => (
          <Stack key={index} direction="row" sx={{ gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="90%" />
            </Box>
          </Stack>
        ))}

      {/* 4. Xatolik holatini ko'rsatish */}
      {error && <Typography color="error">{error}</Typography>}

      {/* 5. Ma'lumotlar tayyor bo'lganda ko'rsatish */}
      {!loading &&
        !error &&
        items.map((item, index) => (
          <Stack key={index} direction="row" sx={{ gap: 2 }}>
            {item.icon}
            <div>
              <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </div>
          </Stack>
        ))}
    </Stack>
  );
}
