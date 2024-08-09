import './App.css'
import {Route, Routes} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import Cipher from "./ciphers/Cipher";

const App = () => {

  return (
    <>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Cipher/>}/>
          <Route path="*" element={<Typography variant="h1">Not found!</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
