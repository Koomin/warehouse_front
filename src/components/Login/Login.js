import React, { useState } from "react";
import { Grid, Typography, Button, TextField, Paper } from "@material-ui/core";
import { login } from "../../services/authenticationService";
import { useHistory } from 'react-router-dom';
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../static/images/logo2016.png";

const useStyles = makeStyles(theme => ({
  loginBackground: {
    background: "#FF6600",
    background: `-webkit-linear-gradient(
      to bottom,
      #FF6600,
      #373b44
    )`,
    background: `linear-gradient(
      to bottom,
      #FF6600,
      white
    )`,
    minHeight: "100vh"
  },
  loginTitle: {
    fontSize: "2em"
  },
  loginContainer: {
    width: "28vw",
    padding: 50,
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      padding: 15
    }
  },
  logo: {
    width: "100%",
    height: "auto",
    maxWidth: 530
  }
}));

function Login() {
  const classes = useStyles();

  const [form, setForm] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleChange = e => {
    const { name, value, keyCode } = e.target;
    if (keyCode === 13) {
      return handleSubmit();
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await login(form);
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.loginBackground}
    >
      <Grid item style={{ maxHeight: 300 }}>
        <img src={Logo} className={classes.logo} alt="Logo image" />
      </Grid>
      <Grid item>
        <form onSubmitCapture={handleFormSubmit}>
          <Paper className={classes.loginContainer} square elevation={10}>
            <Grid item container direction="column" spacing={6}>
              <Grid item>
                <Typography
                  align="center"
                  component="h3"
                  className={classes.loginTitle}
                >
                  LOGIN
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  onChange={handleChange}
                  value={form.login}
                  label="Login"
                  name="username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  value={form.password}
                  label="Hasło"
                  name="password"
                  type="password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  backgroundColor="#FF6600"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
