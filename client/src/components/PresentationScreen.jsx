
import MaterialTable from "@material-table/core";
import React, { useState } from "react";

import tableIcons from "./tableIcons";
import tableLocalization from "./tableLocalization";

export default function PresentationScreen(props) {

    const { showToast } = props;

    const [data, setData] = useState([]);

    const columns = [
        { title: "ID", field: "id", editable: "never", type: "numeric" },
        { title: "Nome", field: "nome" },
        { title: "Apresentadores", field: "apresentadores" },
    ];

    return (
        <div style={{ padding: 20 }}>
            <div style={{ minWidth: "70vw", minHeight: "70vh" }}>
                <MaterialTable
                    icons={tableIcons}
                    title="Ocupações"
                    data={data}
                    columns={columns}
                    localization={tableLocalization}
                    editable={{
                        onRowAdd: newRow => new Promise((resolve, reject) => {
                            const updatedRows = [...data, newRow];

                            setData(updatedRows);
                            resolve();
                        }).then(() => showToast("Participante adicionado!")),
                        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            const rows = data.map(el => {
                                if (el === oldData) {
                                    return newData;
                                }
                                return el;
                            });

                            setData(rows);
                            resolve();
                          }).then(() => showToast("Informações atualizadas!")),
                        onRowDelete: (oldData) => new Promise((resolve, reject) => {
                            const rows = data.filter(el => el !== oldData);
                            
                            setData(rows);
                            resolve();
                          }).then(() => showToast("Participante removido!")),
                    }}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                />
            </div>
        </div>
    );
}
