
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SavedPassword } from "./pages/SavedPassword";
import { SavedArrayProvider } from "./context/SavedArrayContext";
function App() {
  

  
  return (
    <SavedArrayProvider>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/savedPassword" element={<SavedPassword/>}></Route>
</Routes>
</BrowserRouter>
</SavedArrayProvider>
      
  );
}

export default App;
