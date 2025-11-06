import { useState, useEffect, useCallback, useMemo } from "react";
import {
  DataGrid,
  GridPagination,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { Box, Button, Chip, Toolbar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { getData } from "~/utils/apiUtils";
import "./styles/ConveniosTable.css";
import { RowMenu } from "../../common/RowMenu/RowMenu";
import { useAuthContext } from "~/context/AuthContext";
interface Convenio {
    id_Convenio: number;
    numero_Convenio: string;
    id_Organizacion: number;
    id_Unidad_Academica: number;
    id_Creador_Cuneta: number;
    tipo_Convenio: 'Empresa' | 'Dependencia' | 'Persona Física';
    estado: 'Incompleto' | 'Completo' | 'En Revisión' | 'En Corrección' | 'Revisado' | 'En Validación' | 'Requiere Ajuste'| 'Validado' | 'Cancelado';
    fecha_Inicio: string;
    fecha_Fin: string;
    uptimo_paso: number;
    unidad: string;
    nombre_Organizacion: string;
}

interface ConveniosTableProps {
  query: string;
  setModo: (modo: string) => void;
  setSelecccion: (seleccion: any) => void
}

export default function ConveniosTable({ query, setModo, setSelecccion }: ConveniosTableProps) {
    const { user } = useAuthContext();
    const [rows, setRows] = useState<Convenio[]>([]);
    const [filteredRows, setFilteredRows] = useState<Convenio[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    
    const normalizeText = (text: string) =>
        text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .toLowerCase()
        .trim();

    useEffect(() => {
        async function fetchConvenios() {
            setLoading(true);
            const response = await getData({
                endpoint: "/convenios",
                query: `?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`,
            });
            if (response.statusCode === 200 && response.data?.data) {
                setRows(response.data.data);
                setFilteredRows(response.data.data);
                setRowCount(response.data.total);
            } else {
                setRows([]);
                setFilteredRows([]);
                setRowCount(0);
            }
            setLoading(false);
        }
        fetchConvenios();
    }, [paginationModel]);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredRows(rows);
            return;
        }

        const normalizedQuery = normalizeText(query);
        const terms = normalizedQuery
            .split(/\s+/)
            .map((t) => t.trim())
            .filter(Boolean);

        const filtered = rows.filter((row) => {
            const fields = [
                        row.numero_Convenio,
                        row.tipo_Convenio,
                        row.estado,
                        row.unidad,
                        row.nombre_Organizacion,
            ].map((v) => normalizeText(v || ""));

            return terms.every((term) =>
                fields.some((field) => {
                    const tokens = field.split(/\s+/);
                    return tokens.some(
                        (token) =>
                        token.startsWith(term) || token === term 
                    );
                })
            );
        });
        setFilteredRows(filtered);
    }, [query, rows]);

    const handleVer = useCallback((row: Convenio) => {
        // Lógica para ver detalles
    }, []);

    const handleEditar = useCallback((row: Convenio) => {
        setModo("editar");
        setSelecccion(row);
    }, []);

    const handleEnviarRevision = useCallback(async (row: Convenio) => {
    }, []);

    const handleEnviarValidar = useCallback(async (row: Convenio) => {
    }, []);

    const handleCancelar = useCallback(async (row: Convenio) => {
    }, []);

    const getRoleColor = (rol: string):
        | "default"
        | "secondary"
        | "info"
        | "success"
        | "warning" => {
        const colors = {
        'Persona Física': "info",
        Empresa: "warning",
        Dependencia: "secondary",
        } as const;
        return colors[rol as keyof typeof colors] || "default";
    };
  const getStatusColor = (estado: string) :
    | "default"
    | "success"
    | "error"
    | "warning"
    | "info" => {
    const colors = {
      'Incompleto': "warning",
      'Completo': "info",
      'En Revisión': "info",
      'En Corrección': "warning",
      'Revisado': "info",
      'En Validación': "info",
      'Requiere Ajuste': "warning",
      'Validado': "success",
      'Cancelado': "error",
    } as const;
    return colors[estado as keyof typeof colors] || "default";
  }

  const columns: GridColDef<Convenio>[] = useMemo(
    () => [
      { field: "numero_Convenio", headerName: "CONVENIO", flex: 1.3, minWidth: 100 },
      {
        field: "nombre_Organizacion",
        headerName: "NOMBRE O RAZÓN SOCIAL",
        flex: 1.5,
        minWidth: 250,
      },
      {
        field: "tipo_Convenio",
        headerName: "TIPO DE CONVENIO",
        flex: 0.8,
        minWidth: 160,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={getRoleColor(params.value)}
            variant="filled"
            size="small"
            className="chip-role"
          />
        ),
      },
      {
        field: "unidad",
        headerName: "UNIDAD ACADÉMICA",
        flex: 1,
        minWidth: 160,
      },{
        field: "fecha_Inicio",
        headerName: "FECHA INICIO",
        flex: 1,
        minWidth: 160,
      },{
        field: "fecha_Fin",
        headerName: "FECHA TERMINO",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "estado",
        headerName: "ESTADO",
        flex: 0.7,
        minWidth: 120,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={getStatusColor(params.value)}
            variant="filled"
            size="small"
            className="chip-status"
          />
        ),
      },
      {
        field: "acciones",
        headerName: "ACCIONES",
        flex: 0.4,
        minWidth: 100,
        sortable: false,
        renderCell: (params) => {
          const row = params.row;

          let verFn = undefined as ((r: Convenio) => void) | undefined;
          let editarFn = undefined as ((r: Convenio) => void) | undefined;
          let enviarRevisionFn = undefined as ((r: Convenio) => void) | undefined;
          let enviarValidarFn = undefined as ((r: Convenio) => void) | undefined;
          let cancelarFn = undefined as ((r: Convenio) => void) | undefined;
          
          if (user) {
            verFn = handleVer;
          }

          const estadoActual = row.estado;
          
          switch (user?.rol) {
            case 'Organizacion':
            case 'Gestor':
              if (estadoActual === 'Incompleto' || estadoActual === 'Completo' || estadoActual === 'En Corrección') {
                  cancelarFn = handleCancelar;
              }
              if ( estadoActual === 'Completo'  || estadoActual === 'En Corrección') {
                  enviarRevisionFn = handleEnviarRevision;
              }
              if ( estadoActual === 'Incompleto' || estadoActual === 'En Corrección') {
                  editarFn = handleEditar;
              }
              break;
              
            case 'Revisor':
              if (estadoActual !== 'En Validación' && estadoActual !== 'En Revisión' && estadoActual !== 'Validado' && estadoActual !== 'Cancelado') {
                  editarFn = handleEditar;
                  cancelarFn = handleCancelar;
              }
              if (estadoActual === 'Revisado') {
                  enviarValidarFn = handleEnviarValidar;
              }
              break;

            case 'Coordinador':
              if (estadoActual !== 'Revisado' && estadoActual !== 'Validado' && estadoActual !== 'Cancelado' ) {
                  editarFn = handleEditar;
                  cancelarFn = handleCancelar;
                }
               
              if ( estadoActual === 'Completo'  || estadoActual === 'En Corrección') {
                  enviarRevisionFn = handleEnviarRevision;
              }
              if (estadoActual === 'Revisado' || estadoActual === 'Requiere Ajuste') {
                enviarValidarFn = handleEnviarValidar;
              }
              break;
          }
          return (
            <RowMenu<Convenio>
              row={params.row}
              estado={params.row.estado}
              onVer={verFn}
              onEditar={editarFn}
              onEnviarRevision={enviarRevisionFn}
              onEnviarValidar={enviarValidarFn}
              onCancelar={cancelarFn}
            />
          );
        },
      },
    ],
    [handleVer, handleEditar, handleEnviarRevision, handleEnviarValidar, handleCancelar]
  );

  const CustomFooter = () => (
    <Toolbar className="footer-toolbar">
      <Box className="export-section-inline">
        <Button
          startIcon={<DownloadIcon fontSize="small" />}
          variant="text"
          sx={{
            textTransform: "none",
            color: "#333",
            fontWeight: 500,
            fontFamily: "madaniArabicRegular",
          }}
          onClick={() => console.log("Exportar Excel")}
        >
          Exportar Excel
        </Button>
      </Box>
      <GridPagination />
    </Toolbar>
  );

  return (
    <Box className="convenios-table-container">
      <DataGrid
        className="convenios-table"
        disableColumnMenu
        rows={filteredRows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id_Convenio}
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        slots={{ footer: CustomFooter }}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": { fontWeight: 600 },
        }}
      />
    </Box>
  );

}