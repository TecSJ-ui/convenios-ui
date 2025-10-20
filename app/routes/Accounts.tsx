import { Outlet, useNavigate, useLocation } from "react-router";
import Breadcrumbs from "~/common/Breadcrumbs/Breadcrumbs";
import { Typography, Button } from "@mui/material";
import "./styles/Accounts.css";

export default function Accounts() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = location.pathname === "/cuentas";

  return (
    <div>
      {!isRoot && (
        <Breadcrumbs
          items={[
            { label: "Gestión de Cuentas", path: "/cuentas" },
            { label: "Alta de Cuenta" },
          ]}
        />
      )}

      {isRoot ? (
        <>
          <Typography className="title-page">Gestión de Cuentas</Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#2563eb",
              fontFamily: "madaniArabicRegular",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/cuentas/crear")}
          >
            Ir a Alta de Cuenta
          </Button>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
