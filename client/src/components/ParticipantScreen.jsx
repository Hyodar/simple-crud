
import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";

import tableIcons from "./tableIcons";
import tableLocalization from "./tableLocalization";

import RequestHandler from "../utils/request_handler";

export default function ParticipantScreen(props) {

    const { showToast } = props;

    const [data, setData] = useState([]);

    const columns = [
        { title: "ID", field: "id", editable: "never", type: "numeric" },
        { title: "Nome", field: "firstName" },
        { title: "Sobrenome", field: "lastName" },
        { title: "Ocupação", field: "occupation" },
        { title: "Empresa", field: "company" },
    ];

    useEffect(() => {
        RequestHandler.axios.post("/participant/get-all")
            .then(resp => {
                console.log(resp);
                const participants = resp.data.map(el => ({
                    id: el.id,
                    firstName: el.firstName,
                    lastName: el.lastName,
                    occupation: (el.Occupation || {}).name,
                    company: (el.Company || {}).name,
                }));

                setData(participants);
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
                    title="Participantes"
                    data={data}
                    columns={columns}
                    localization={tableLocalization}
                    editable={{
                        onRowAdd: newRow => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("participant/create", newRow)
                            .then(resp => {
                                const participant = resp.data;
                                setData([...data, {
                                    id: participant.id,
                                    firstName: participant.firstName,
                                    lastName: participant.lastName,
                                    occupation: (participant.Occupation || {}).name,
                                    company: (participant.Company || {}).name,
                                }]);
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                reject();
                            });
                        }).then(() => {
                            showToast("Participante adicionado!")
                        }).catch(err => {
                            console.error(err);
                            showToast("Ocorreu um erro durante a sua requisição.");
                        }),

                        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("/participant/update", newData)
                            .then(resp => {
                                const participant = resp.data;

                                const dataUpdate = [...data];
                                const targetIndex = dataUpdate.findIndex(el => el.id === newData.id);
                                dataUpdate[targetIndex] = {
                                    id: participant.id,
                                    firstName: participant.firstName,
                                    lastName: participant.lastName,
                                    occupation: (participant.Occupation || {}).name,
                                    company: (participant.Company || {}).name,
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
                            RequestHandler.axios.post("/participant/delete", oldData)
                            .then(resp => {
                                setData(data.filter(el => el.id !== oldData.id));
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                showToast("Ocorreu um erro durante a sua requisição.");
                            });
                        }).then(() => {
                            showToast("Participante removido!")
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
