
import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";

import tableIcons from "./tableIcons";
import tableLocalization from "./tableLocalization";

import RequestHandler from "../utils/request_handler";

export default function CompanyScreen(props) {

    const { showToast } = props;

    const [data, setData] = useState([]);

    const columns = [
        { title: "ID", field: "id", editable: "never", type: "numeric" },
        { title: "Nome", field: "name" },
    ];

    useEffect(() => {
        RequestHandler.axios.post("/company/get-all")
            .then(resp => {
                console.log(resp);
                const companies = resp.data.map(el => ({
                    id: el.id,
                    name: el.name,
                    participantCount: 99999,
                }));

                setData(companies);
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
                    title="Empresas"
                    data={data}
                    columns={columns}
                    localization={tableLocalization}
                    editable={{
                        onRowAdd: newRow => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("company/create", newRow)
                            .then(resp => {
                                const company = resp.data;
                                setData([...data, {
                                    id: company.id,
                                    name: company.name,
                                }]);
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                reject();
                            });
                        }).then(() => {
                            showToast("Empresa adicionada!")
                        }).catch(err => {
                            console.error(err);
                            showToast("Ocorreu um erro durante a sua requisição.");
                        }),

                        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            RequestHandler.axios.post("/company/update", newData)
                            .then(resp => {
                                const company = resp.data;

                                const dataUpdate = [...data];
                                const targetIndex = dataUpdate.findIndex(el => el.id === newData.id);
                                dataUpdate[targetIndex] = {
                                    id: company.id,
                                    name: company.name,
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
                            RequestHandler.axios.post("/company/delete", oldData)
                            .then(resp => {
                                setData(data.filter(el => el.id !== oldData.id));
                                resolve();
                            })
                            .catch(err => {
                                console.error(err);
                                showToast("Ocorreu um erro durante a sua requisição.");
                            });
                        }).then(() => {
                            showToast("Empresa removida!")
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
