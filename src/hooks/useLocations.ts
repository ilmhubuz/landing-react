// src/hooks/useLocations.ts
import { useEffect, useState } from "react";
import axios from "axios";

export interface Location {
  id: number;
  name: string;
  address?: string;
}

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const url = "https://api.crm.ilmhub.uz/api/locations"; // TO'G'RI REAL API URL!

      console.log("🌍 AXIOS URL:", url);

      try {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("✅ STATUS:", res.status);
        console.log("✅ DATA:", res.data);

        setLocations(res.data);
      } catch (err) {
        console.error("❌ Locations yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading };
};

