import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import AppTheme from "../theme/AppTheme";
import ColorModeSelect from "../theme/ColorModeSelect";
import SignInCard from "../components/sign-in/ SignInCard";
import Content from "../components/content/ Content";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function SignInSide(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      {/* Bosh sahifaga qaytish havolasi */}
      <Box
        sx={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          underline="hover"
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "primary.main",
          }}
        >
          ⬅ Bosh sahifaga qaytish
        </Link>
      </Box>

      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <Stack
        direction="column"
        component="main"
        sx={[
          {
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            height: "100%",
            overflow: "hidden",
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundRepeat: "no-repeat",
              ...theme.applyStyles("dark", {
                backgroundImage:
                  "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 6, sm: 12 },
            p: { xs: 2, sm: 4 },
            maxWidth: "lg",
          }}
        >
          <Content />
          <SignInCard />
        </Stack>
      </Stack>
    </AppTheme>
  );
}
