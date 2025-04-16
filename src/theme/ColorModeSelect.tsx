import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      SelectDisplayProps={{
        // @ts-ignore
        'data-screenshot': 'toggle-mode',
      }}
      {...props}
    >
      <MenuItem value="light">
        <LightModeIcon sx={{ mr: 2 }} /> Kun
      </MenuItem>
      <MenuItem value="dark">
        <DarkModeIcon sx={{ mr: 2 }} /> Tun
      </MenuItem>
      <MenuItem value="system">
        <AutoAwesomeRoundedIcon sx={{ mr: 2 }} /> Tizim
      </MenuItem>
    </Select>
  );
}
