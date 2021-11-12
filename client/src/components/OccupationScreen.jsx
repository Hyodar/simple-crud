
import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";

import tableIcons from "./tableIcons";
import tableLocalization from "./tableLocalization";

import RequestHandler from "../utils/request_handler";

export default function OccupationScreen(props) {

    const { showToast } = props;

    const [data, setData] = useState([]);

    const columns = [
        { title: "ID", field: "id", editable: "never", type: "numeric" },
        { title: "Nome", field: "name" },
        { title: "#Participantes", field: "participantCount", editable: "never" },
    ];

    useEffect(() => {
        RequestHandler.axios.post("/occupation/get-all")
            .then(resp => {
                console.log(resp);
                const occupations = resp.data.map(el => ({
                    id: el.id,
                    name: el.name,
                    participantCount: 99999,
                }));

                setData(occupations);
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
                        }),
                        onRowDelete: (oldData) => new Promise((resolve, reject) => {
                            const rows = data.filter(el => el !== oldData);
                            
                            setData(rows);
                            resolve();
                        }),
                    }}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                />
            </div>
        </div>
    );
}
