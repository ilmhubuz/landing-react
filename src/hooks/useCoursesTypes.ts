import { useEffect, useState } from "react";
import axios from "axios";

export interface Course {
  id: number;
  name: string;
}

interface CoursesResponse {
  data: Course[];
}

export const useCoursesTypes = () => {
  const [courses, setCourses] = useState<CoursesResponse>({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      // Proxy ishlatsa faqat shu yetadi:
      const url = "/api/courses";
      console.log("🌍 AXIOS URL:", url);

      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("✅ STATUS:", res.status);
        console.log("✅ DATA:", res.data);

        setCourses(res.data);
      } catch (err) {
        console.error("❌ Courses yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
