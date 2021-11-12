
import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";

import tableIcons from "./tableIcons";
import tableLocalization from "./tableLocalization";

import RequestHandler from "../utils/request_handler";

export default function PresentationScreen(props) {

    const { showToast } = props;

    const [data, setData] = useState([]);

    const columns = [
        { title: "ID", field: "id", editable: "never", type: "numeric" },
        { title: "Título", field: "title" },
        { title: "Apresentadores", field: "presenters" },
    ];

    useEffect(() => {
        RequestHandler.axios.post("/presentation/get-all")
            .then(resp => {
                console.log(resp);
                const presentations = resp.data.map(el => ({
                    id: el.id,
                    title: el.title,
                    presenters: JSON.stringify((el.Participants || []).map(p => p.id)).slice(1, -1),
                }));

                setData(presentations);
            })
            .catch(err => {
                console.error(err);
                showToast("Ocorreu um erro durante a sua requisição.");
            });
    }, [showToast]);

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
