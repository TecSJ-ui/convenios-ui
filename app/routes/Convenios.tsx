import Breadcrumbs from "~/common/Breadcrumbs/Breadcrumbs";
import { Outlet, useLocation } from "react-router";
import "./styles/Accounts.css";
import { Box, Stack, Typography, Button, IconButton, Badge } from "@mui/material";
import { useNavigate } from "react-router";

export default function Convenios() {
  const location = useLocation();
  const isRoot = location.pathname === "/convenios";
  const navigate = useNavigate();


  return (
    <div>
      {!isRoot && (
        <Breadcrumbs
          items={[
            { label: "Gestión de Convenios", path: "/convenios" },
            { label: "Asistente para nuevos Convenios", path: "/crear" },
          ]}
        />
      )}

      {isRoot ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "madaniArabicMedium",
                fontSize: "1.8rem",
                color: "#1e1e2f",
              }}
            >
              Gestión de Cuentas
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(51, 23, 156, 0.9)",
                textTransform: "none",
                fontFamily: "madaniArabicRegular",
                borderRadius: "8px",
                fontSize: "1rem",
                padding: "0.6rem 1.4rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "rgb(51, 23, 156)",
                },
              }}
              onClick={() => navigate("/convenios/crear")}
            >
              Nuevo Convenio
            </Button>
          </Stack>

        </>

      ) : (
        <Outlet />
      )}

    </div>
  )
}
