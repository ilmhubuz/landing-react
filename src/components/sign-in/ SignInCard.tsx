import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "../custom-icon/CustomIcons";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { useLocations } from "../../hooks/useLocations";
import { useCoursesTypes } from "../../hooks/useCoursesTypes";

// import { useLocations } from "../../hooks/useLocations";
// import { useCoursesTypes } from "../../hooks/useCoursesTypes";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function SignInCard() {
  const { locations, loading: locationsLoading } = useLocations();
  const { courses, loading: coursesLoading } = useCoursesTypes();

  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    age: "",
    location: "",
    course: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    phone: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = { name: "", phone: "", age: "" };

    if (!form.name || form.name.length < 2) {
      newErrors.name = "Ismni kiriting (kamida 2 harf)";
      valid = false;
    }
    if (!form.phone || !/^\d+$/.test(form.phone) || form.phone.length < 6) {
      newErrors.phone = "Faqat raqam kiriting (kamida 6ta raqam)";
      valid = false;
    }
    if (!form.age || !/^\d+$/.test(form.age) || +form.age < 5) {
      newErrors.age = "Yoshni to‘g‘ri kiriting";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Iltimos, to‘g‘ri ma‘lumot kiriting");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      phone: form.phone,
      age: form.age,
      location: form.location || null,
      course: form.course || null,
    };

    console.log("POST uchun tayyor object:", payload);

    toast.success("✅ Ma‘lumotlar tayyor!");

    // Hozircha POST qismi tayyor, faqat API endpoint kiritiladi:
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography component="h1" variant="h4">
        Ro'yxatdan o'tish
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel>Ism *</FormLabel>
          <TextField
            name="name"
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Telefon raqam *</FormLabel>
          <TextField
            name="phone"
            placeholder="Raqamingiz"
            inputMode="numeric"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Yosh *</FormLabel>
          <TextField
            name="age"
            placeholder="Yoshingiz"
            inputMode="numeric"
            value={form.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Eng yaqin filial (ixtiyoriy)</FormLabel>
          <TextField
            name="location"
            select
            value={form.location}
            onChange={handleChange}
            fullWidth
            disabled={locationsLoading}
          >
            <MenuItem value="">Tanlanmagan</MenuItem>
            {locations?.data?.map((loc: any) => (
              <MenuItem key={loc.id} value={loc.id}>
                {loc.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl>
          <FormLabel>Qaysi kursni tanladingiz? (ixtiyoriy)</FormLabel>
          <TextField
            name="course"
            select
            value={form.course}
            onChange={handleChange}
            fullWidth
            disabled={coursesLoading}
          >
            <MenuItem value="">Tanlanmagan</MenuItem>
            {courses?.data?.map((course: any) => (
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
          disabled={loading}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} />
              <Typography>Yuborilmoqda...</Typography>
            </>
          ) : (
            "Yuborish"
          )}
        </Button>
      </Box>
    </Card>
  );
}
