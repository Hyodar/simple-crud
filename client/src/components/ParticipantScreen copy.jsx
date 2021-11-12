
import React, { useState } from "react";

// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import { DataGrid, GridColDef, GridToolbar, GridCellValue, GridApi, ptBR, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridRowParams } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function getRowFromParams(params: GridRenderCellParams): Record<string, GridCellValue> {
    const api: GridApi = params.api;
    const row: Record<string, GridCellValue> = {};

    api
        .getAllColumns()
        .filter(c => c.field !== "__check__" && !!c)
        .forEach(c => {
            row[c.field] = params.getValue(params.id, c.field);
        });

    return row;
}

export default function ParticipantScreen(props) {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [ocupacao, setOcupacao] = useState("");
    const [organizacao, setOrganizacao] = useState("");
    const [adicionadoPor, setAdicionadoPor] = useState("");
    const [apresentacoes, setApresentacoes] = useState([]);

    
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function updateRecord(params: GridRenderCellParams) {
        const api: GridApi = params.api;
        const row: Record<string, GridCellValue> = {};

        api
            .getAllColumns()
            .filter(c => c.field !== "__check__" && !!c)
            .forEach(c => { row[c.field] = params.getValue(params.id, c.field) });
        
        setId(row.id);
        setNome(row.nome);
        setSobrenome(row.sobrenome);
        setOcupacao(row.ocupacao);
        setOrganizacao(row.organizacao);
        setAdicionadoPor(row.adicionadoPor);
        setApresentacoes(row.apresentacoes);
    }

    function addRow() {
        setCurrentRecord({});
        setAddDialogOpen(true);
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nome", headerName: "Nome", width: 200 },
        { field: "sobrenome", headerName: "Sobrenome", width: 200 },
        { field: "ocupacao", headerName: "Ocupação", width: 150 },
        { field: "organizacao", headerName: "Organização", width: 200 },
        { field: "adicionadoPor", headerName: "Adicionado Por", width: 250 },
        { field: "apresentacoes", headerName: "Apresentações", width: 300 },
        { field: "acoes", headerName: "Ações", width: 200, renderCell: (params) => {
            return (
                <ButtonGroup>
                    <IconButton aria-label="edit" onClick={() => { updateRecord(params); setEditDialogOpen(true); } }>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { updateRecord(params); setDeleteDialogOpen(true); } }>
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            );
        } },
    ];

    const rows = [
        { id: 1, nome: "Laudelino", sobrenome: "Bastos", ocupacao: "Professor", organizacao: "UTFPR", adicionadoPor: "Hermes Irineu", apresentacoes: ['a', 'b'] },
        { id: 2, nome: "Laudelino", sobrenome: "Bastos", ocupacao: "Professor", organizacao: "UTFPR", adicionadoPor: "Hermes Irineu", apresentacoes: ['a', 'b'] },
        { id: 3, nome: "Laudelino", sobrenome: "Bastos", ocupacao: "Professor", organizacao: "UTFPR", adicionadoPor: "Hermes Irineu", apresentacoes: ['a', 'b'] },
        { id: 4, nome: "Laudelino", sobrenome: "Bastos", ocupacao: "Professor", organizacao: "UTFPR", adicionadoPor: "Hermes Irineu", apresentacoes: ['a', 'b'] },
        { id: 5, nome: "Laudelino", sobrenome: "Bastos", ocupacao: "Professor", organizacao: "UTFPR", adicionadoPor: "Hermes Irineu", apresentacoes: ['a', 'b'] },
    ];

    function CustomGridToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    function deleteParticipant() {
        alert('a')
        setDeleteDialogOpen(false);
    }

    function editParticipant() {
        alert('a')
        setEditDialogOpen(false);
    }

    return (
        <div>
            
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} style={{ padding: 20 }}>
                <DialogTitle>Editar participante</DialogTitle>
                <DialogContent>
                    <TextField label="ID" disabled value={id} />
                    <TextField label="Nome" value={nome} onChange={ev => setNome(ev.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={editParticipant}>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} style={{ padding: 20 }}>
                <DialogTitle>Excluir participante {nome}?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={deleteParticipant}>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <div style={{ width: "90vw", height: "70vh" }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} components={{ Toolbar: CustomGridToolbar }} localeText={ptBR.props.MuiDataGrid.localeText} />
            </div>
            <div className="row jc-center" style={{ marginTop: "20px" }}>
                <Button variant="outlined" startIcon={<div>+</div>}>Adicionar</Button>
            </div>
        </div>
    );
}
