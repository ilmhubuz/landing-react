import { useState, useEffect } from 'react';
import axios from 'axios';

// Bitta kurs uchun ma'lumotlar tipi
export interface Course {
  id: number;
  name: string;
  description: string;
  // ... qolgan maydonlar
}

// Bizga kerakli kurslar ro'yxati
const TARGET_COURSES = [
  'Pre IELTS',
  'IELTS',
  'Frontend',
  'Backend',
  '.NET Bootcamp',
];

export const useFilteredCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Course[]>(
          'https://api.crm.ilmhub.uz/api/courses'
        );

        // Faqat bizga kerakli kurslarni nomlari bo'yicha filtrlash
        const filtered = response.data.filter((course) =>
          TARGET_COURSES.includes(course.name)
        );

        setCourses(filtered);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Bu hook faqat bir marta ishga tushadi

  return { courses, loading, error };
};
