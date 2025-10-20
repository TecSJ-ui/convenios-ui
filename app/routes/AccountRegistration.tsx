import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function AccountRegistration() {
  const navigate = useNavigate();

  return (
    <div>
      <Typography
        sx={{
          fontFamily: "madaniArabicMedium",
          fontSize: "2rem",
          color: "#1e1e2f",
          mb: 2,
        }}
      >
        Alta de Cuenta
      </Typography>

      <Typography
        sx={{
          fontFamily: "madaniArabicRegular",
          fontSize: "1.1rem",
          mb: 3,
          color: "#1e1e2f",
        }}
      >
        Aquí se mostraría el formulario de alta de cuenta.
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#4b5563",
          fontFamily: "madaniArabicBold",
          textTransform: "none",
          fontSize: "1.3rem",
          padding: "0.7rem 2rem",
          borderRadius: "12px",
        }}
        onClick={() => navigate("/cuentas")}
      >
        Volver
      </Button>
    </div>
  );
}
