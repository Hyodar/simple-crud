
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import { Button } from "@mui/material";

export default function LoginScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {
        onLogin,
        showToast
    } = props;

    const handleLogin = () => {
        showToast(`Olá ${username}!`);
        onLogin();
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
