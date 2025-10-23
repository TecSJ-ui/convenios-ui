import * as React from "react";
import {
  IconButton, Menu, MenuItem, ListItemIcon, ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileDownloadIcon from "@mui/icons-material/FileDownloadOutlined";

export interface RowMenuProps<T> {
  row: T;
  onVer?: (r: T) => void;
  onEditar?: (r: T) => void;
  onToggleEstado?: (r: T) => void;
  estado?: "Activo" | "Inactivo";
}

export function RowMenu<T>({
  row,
  onVer,
  onEditar,
  onToggleEstado,
  estado,
}: RowMenuProps<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {onVer && (
          <MenuItem onClick={() => { onVer(row); close(); }}>
            <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Ver</ListItemText>
          </MenuItem>
        )}

        {onEditar && (
          <MenuItem onClick={() => { onEditar(row); close(); }}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
        )}

        {onToggleEstado && (
          <MenuItem onClick={() => { onToggleEstado(row) }}>
            <ListItemIcon>
              {estado === "Activo"
                ? <BlockIcon fontSize="small" />
                : <CheckCircleIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText>{estado === "Activo" ? "Desactivar" : "Activar"}</ListItemText>
          </MenuItem>
        )}

      </Menu>
    </>
  );
}
