import "./App.css";
import FluidTable from "./components/FluidTable";
import AddEmailButton from "./components/AddEmailButton";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <div className="App">
      <MainContainer />
      <FluidTable />
      <AddEmailButton />
    </div>
  );
}

export default App;
