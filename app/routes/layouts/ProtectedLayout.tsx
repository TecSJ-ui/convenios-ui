import { Outlet } from "react-router";
import Sidebar from "~/common/Sidebar/Sidebar";

export default function ProtectedLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
