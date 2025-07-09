import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Sitemark from './SitemarkIcon';

import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

const items = [
  {
    icon: <ForumRoundedIcon />,
    title: 'Qiziqarli ingliz tili',
    description:
      '6 yoshdan boshlab bolalar uchun interaktiv darslar — asosiy urg‘u speaking va listening ko‘nikmalarida.',
  },
  {
    icon: <PsychologyRoundedIcon />,
    title: 'Zamonaviy IT ko‘nikmalari',
    description:
      'Scratch, Robotics, App Inventor va AI prompting orqali bolalarda tafakkur va texnologiyaga qiziqish shakllantiramiz.',
  },
  {
    icon: <WorkspacePremiumRoundedIcon />,
    title: 'Tajribali o‘qituvchilar',
    description:
      'Yoshlar bilan ishlash ko‘nikmasiga ega mehribon ustozlar har bir o‘quvchiga alohida yondashadi.',
  },
  {
    icon: <SecurityRoundedIcon />,
    title: 'Xavfsiz va qulay muhit',
    description:
      'Qulay joylashuv, himoyalangan bino, har faslga mos xona va kerakli barcha texnik jihozlar mavjud.',
  },
];

export default function RegisterFeatures() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Sitemark />
      </Box>

      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          <Box
          sx={{
              color: 'secondary.main',
            }}
          >
            {item.icon}
          </Box>
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
