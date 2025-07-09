import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export interface Course {
  id: number;
  name: string;
}

export const useCoursesTypes = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  // Xatolikni saqlash uchun yangi state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const url = 'https://api.crm.ilmhub.uz/api/courses/types';
      try {
        setLoading(true);
        setError(null); // Har so'rov oldidan xatolikni tozalaymiz

        const res = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
        });

        const responseData = res.data;

        // API javobi to'g'ridan-to'g'ri massivmi yoki obyekt ichidami, shuni tekshiramiz
        if (Array.isArray(responseData)) {
          setCourses(responseData); // Agar massiv bo'lsa
        } else if (responseData && Array.isArray(responseData.data)) {
          setCourses(responseData.data); // Agar { data: [...] } bo'lsa
        } else {
          // Agar kutilmagan formatda bo'lsa, xatolik beramiz
          throw new Error("API'dan kelgan ma'lumotlar formati noto'g'ri");
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error('❌ Courses yuklashda xatolik:', error);
        setError("Kurslarni yuklab bo'lmadi. Qaytadan urunib ko'ring.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Komponentga endi xatolik haqida ham ma'lumot beramiz
  return { courses, loading, error };
};
