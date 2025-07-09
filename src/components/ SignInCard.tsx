import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';

// Ikonka va hook'larni import qilamiz (yo'llarni to'g'rilang)
import { SitemarkIcon } from './ CustomIcons';
import { useLocations } from '../hooks/useLocations';
import { useCoursesTypes } from '../hooks/useCoursesTypes';
import { useSubmitLead } from '../hooks/useSubmitLead';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function RegistrationCard() {
  // Ma'lumotlarni yuklash uchun hook'lar
  const { locations, loading: locationsLoading } = useLocations();
  const { courses, loading: coursesLoading } = useCoursesTypes();

  // API'ga jo'natish uchun custom hook
  const { submitLead, isSubmitting } = useSubmitLead();

  // Sahifaga yo'naltirish uchun hook
  const navigate = useNavigate();

  // Forma ma'lumotlari uchun state
  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    age: '',
    location: '',
    course: '',
  });

  // Validatsiya xatoliklari uchun state
  const [errors, setErrors] = React.useState({
    name: '',
    phone: '',
    age: '',
  });

  // Maydonlar o'zgarganda form state'ini yangilash
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Kiritilgan ma'lumotlarni tekshirish (validatsiya)
  const validateInputs = () => {
    const newErrors = { name: '', phone: '', age: '' };
    let isValid = true;

    if (form.name.length < 2) {
      newErrors.name = "Ismni to'liq kiriting.";
      isValid = false;
    }

    if (!/^\d{7,}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone =
        'Telefon raqam kamida 7 ta raqamdan iborat bo‘lishi kerak.';
      isValid = false;
    }

    if (!form.age || +form.age < 5 || +form.age > 99) {
      newErrors.age = "Yoshni to'g'ri kiriting.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Formani jo'natish funksiyasi
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) {
      toast.error("Iltimos, maydonlarni to'g'ri to'ldiring.");
      return;
    }

    const locationName =
      locations.find((loc: any) => loc.id === form.location)?.name || null;
    const courseTypeName =
      courses.find((c: any) => c.id === form.course)?.name || null;

    const payload = {
      name: form.name,
      age: Number(form.age),
      phone: form.phone,
      location: locationName,
      courseType: courseTypeName,
    };

    toast.promise(submitLead(payload), {
      loading: 'Yuborilmoqda...',
      success: (data) => {
        // Forma maydonlarini tozalash
        setForm({ name: '', phone: '', age: '', location: '', course: '' });

        // Muvaffaqiyatli ro'yxatdan o'tgach, asosiy sahifaga o'tkazish
        setTimeout(() => {
          navigate('/');
        }, 1500);

        return <b>Ma'lumotlaringiz qabul qilindi!</b>;
      },
      error: <b>Xatolik yuz berdi. Qaytadan urunib ko'ring.</b>,
    });
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Ro'yxatdan o'tish
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Ism *</FormLabel>
          <TextField
            id="name"
            name="name"
            placeholder="Ismingizni kiriting"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone">Telefon raqam *</FormLabel>
          <TextField
            id="phone"
            name="phone"
            type="tel"
            placeholder="+998 99 123 45 67"
            autoComplete="tel"
            required
            fullWidth
            variant="outlined"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="age">Yosh *</FormLabel>
          <TextField
            id="age"
            name="age"
            type="number"
            placeholder="Yoshingizni kiriting"
            required
            fullWidth
            variant="outlined"
            value={form.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location">Eng yaqin filial</FormLabel>
          <TextField
            id="location"
            name="location"
            select
            fullWidth
            variant="outlined"
            value={form.location}
            onChange={handleChange}
            disabled={locationsLoading}
          >
            <MenuItem value="">
              <em>Tanlanmagan</em>
            </MenuItem>
            {locations?.map((loc: any) => (
              <MenuItem key={loc.id} value={loc.id}>
                {loc.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="course">Qaysi kurs?</FormLabel>
          <TextField
            id="course"
            name="course"
            select
            fullWidth
            variant="outlined"
            value={form.course}
            onChange={handleChange}
            disabled={coursesLoading}
          >
            <MenuItem value="">
              <em>Tanlanmagan</em>
            </MenuItem>
            {courses?.map((course: any) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
        </Button>
      </Box>
    </Card>
  );
}
