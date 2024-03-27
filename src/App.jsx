import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import HomePage from './components/HomePage'
import EmployeePage from './components/EmployeePage'
import InventoryPage from './components/InventoryPage'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import AddItem from './components/AddItem'
import UpdateItem from './components/UpdateItem'
import SortedItems from './components/SortedItems'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/dashboard' element={<DashboardPage />}>
        <Route path='' element={<HomePage />}></Route>
        <Route path='/dashboard/employee' element={<EmployeePage />}></Route>
        <Route path='/dashboard/inventory' element={<InventoryPage />}></Route>
        <Route path='/dashboard/logout' element={<HomePage />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/update_item/:id' element={<UpdateItem />}></Route>
        <Route path='/dashboard/add_item' element={<AddItem />}></Route>
        <Route path='/dashboard/sort_item' element={<SortedItems />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
