import './App.css'
import TestComponent from "./components/TestComponent.tsx";
import NavBar from "./components/NavBar.tsx";


function App() {
  return (
      <div className={ "wrapper" }>
          <NavBar/>
          <TestComponent />
      </div>
  )
}

export default App
