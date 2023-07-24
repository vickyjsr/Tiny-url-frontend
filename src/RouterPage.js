import { Route, Routes } from 'react-router-dom'
import OpenPage from './OpenPage'
import App from './App'

const RouterPage = () => {
  return <>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/:id' element={<OpenPage/>}/>
      </Routes>
    </>
}
export default RouterPage
