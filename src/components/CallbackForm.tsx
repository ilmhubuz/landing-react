import React, { useState } from "react";
import { Button, InputLabel, TextField, Stack } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export function CallbackForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const getDigitsOnly = (input: string) => input.replace(/\D/g, '').slice(0, 9);
    const formatPhone = (digits: string) => {
        let result = '';
        if (digits.length > 0) result += digits.slice(0, 2);
        if (digits.length > 2) result += ' ' + digits.slice(2, 5);
        if (digits.length > 5) result += ' ' + digits.slice(5, 7);
        if (digits.length > 7) result += ' ' + digits.slice(7, 9);
        return result;
    };
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setPhoneNumber(formatPhone(getDigitsOnly(e.target.value)));
    
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 4, width: { xs: '100%', sm: '350px' } }}
        >
            <InputLabel htmlFor="qayta-aloqa-telefon" sx={visuallyHidden}>
                telefon raqam
            </InputLabel>
            <TextField
                id="qayta-aloqa-telefon"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="telefon raqam"
                placeholder="93 123 45 67"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneChange}
                slotProps={{
                    htmlInput: {
                        maxLength: 12, 
                        autoComplete: 'tel-local',
                        'aria-label': 'telefon raqam',
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: 'fit-content' }}
            >
                Maslahat oling
            </Button>
        </Stack>
    );
}