import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Breadcrumbs from "~/common/Breadcrumbs/Breadcrumbs";
import AccountsHeader from "~/components/Accounts/AccountsHeader";
import AccountsTable from "~/components/Accounts/AccountsTable";
import "./styles/Accounts.css";
import { useState } from "react";

export default function Accounts() {
  const location = useLocation();
  const isRoot = location.pathname === "/cuentas";
  const [searchQuery, setSearchQuery] = useState("");

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
          <AccountsHeader onSearch={setSearchQuery} />
          <AccountsTable query={searchQuery} />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
