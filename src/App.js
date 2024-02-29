import './style/style.dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// IMPPORTING COMPONENTS:
import SideMenuBar from './Components/sidemenu.component.js';
import { Dashboard } from './Pages/dashboard.page.jsx';
import { NewRiskOwner } from './Pages/addNew.page.jsx';
import { UpdateOwnerInfo } from './Pages/updateOwner.page.jsx';

function App() {
  return (
    
    <Router>
      {/* <Navbar /> */}
      <SideMenuBar>
        <Routes>
          <Route path='/' element= {<Dashboard />} /> 
          <Route path='/add' element= {<NewRiskOwner />} /> 
          <Route path='/update/:id' element= {<UpdateOwnerInfo />} /> 
        </Routes>
      </SideMenuBar>
    </Router>
  );
}

export default App;
