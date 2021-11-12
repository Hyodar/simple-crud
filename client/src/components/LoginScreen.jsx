
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import { Button } from "@mui/material";

import RequestHandler from "../utils/request_handler";

export default function LoginScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {
        onLogin,
        showToast
    } = props;

    const handleLogin = () => {
        RequestHandler.axios.post("/auth/login", {
            name: username,
            password,
        })
        .then(resp => {
            RequestHandler.token = resp.data.token;

            showToast(`Olá ${username}!`);
            onLogin();
        })
        .catch(err => {
            console.error(err);
            showToast("Houve um erro em sua tentativa de login.");
        });
    };

    return (
        <Paper className="column jc-center" style={{ padding: 40, backgroundColor: "ghostwhite" }}>
            <TextField variant="outlined" label="Usuário" value={username} onChange={ev => setUsername(ev.target.value)} />
            <br />
            <TextField label="Senha" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <br />
            <br />
            <Button onClick={handleLogin}>Login</Button>
        </Paper>
    )
}
