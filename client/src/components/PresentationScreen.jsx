
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
                            RequestHandler.axios.post("presentation/create", newRow)
                            .then(resp => {
                                const presentation = resp.data;
                                setData([...data, {
                                    id: presentation.id,
                                    title: presentation.title,
                                    presenters: JSON.stringify((presentation.Participants || []).map(p => p.id)).slice(1, -1),
                                }]);
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                reject();
                            });
                        }).then(() => {
                            showToast("Apresentação adicionada!")
                        }).catch(err => {
                            console.error(err);
                            showToast("Ocorreu um erro durante a sua requisição.");
                        }),

                        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("/presentation/update", newData)
                            .then(resp => {
                                const presentation = resp.data;

                                const dataUpdate = [...data];
                                const targetIndex = dataUpdate.findIndex(el => el.id === newData.id);
                                dataUpdate[targetIndex] = {
                                    id: presentation.id,
                                    title: presentation.title,
                                    presenters: JSON.stringify((presentation.Participants || []).map(p => p.id)).slice(1, -1),
                                };

                                setData(dataUpdate);
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                showToast("Ocorreu um erro durante a sua requisição.");
                            });
                        }).then(() => {
                            showToast("Dados atualizados!")
                        }).catch(err => {
                            console.error(err);
                            showToast("Ocorreu um erro durante a sua requisição.");
                        }),

                        onRowDelete: oldData => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("/presentation/delete", oldData)
                            .then(resp => {
                                setData(data.filter(el => el.id !== oldData.id));
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                showToast("Ocorreu um erro durante a sua requisição.");
                            });
                        }).then(() => {
                            showToast("Apresentação removida!")
                        }).catch(err => {
                            console.error(err);
                            showToast("Ocorreu um erro durante a sua requisição.");
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
