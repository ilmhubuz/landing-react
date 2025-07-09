import { useState } from 'react';
import axios from 'axios';

// API'ga jo'natiladigan ma'lumotlar tipi
interface LeadPayload {
  name: string;
  age: number;
  phone: string;
  location: string | null;
  courseType: string | null;
}

export const useSubmitLead = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitLead = async (payload: LeadPayload) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        'https://api.crm.ilmhub.uz/api/leads/from-landing',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsSubmitting(false);
      setSuccess(true);
      console.log('API Response:', response.data);
      return response.data; // Muvaffaqiyatli javobni qaytaramiz
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage = "Ma'lumotlarni yuborishda xatolik yuz berdi.";
      setError(errorMessage);
      console.error(err);
      throw new Error(errorMessage); // Xatolikni tashqariga uzatamiz
    }
  };

  return { submitLead, isSubmitting, error, success };
};
