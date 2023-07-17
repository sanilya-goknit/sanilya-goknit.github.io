import logo from "./logo.svg";
import "./App.scss";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EditFrame from "./Components/EditFrame";
import RemotionDemo from "./RemotionTest/RemotionDemo";
import EtroDemo from "./EtroTest/EtroDemo";

function App() {
  const navigate = useNavigate();
  const [authRes, setAuthRes] = useState({});

  useEffect(() => {
    // Auth.currentSession()
    //   .then((res) => {
    //     setAuthRes(res);
    //   })
    //   .catch(() => {
    //     navigate("login");
    //   });
  }, []);

  const logout = () => {
    Auth.signOut().then((res) => {
      navigate("/login");
    });
  };

  return (
    <div className="">
      <div className={"header"}></div>
      {/* <EditFrame /> */}
      <div className={"container-fluid pt-4"}>
        <RemotionDemo />
      </div>
    </div>
  );
}

export default App;
