import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {HomePage, DriverPage, TeamPage, RacePage} from './pages'
import { DriverProvider } from './contexts/DriverContext'
import { TeamProvider } from './contexts/TeamContext'
import { RaceProvider } from './contexts/RaceContext'
import Navigation from './components/shared/Navigation'
import background3 from "../src/images/background3.jpg";



function App() {
  return (
    <div style={{backgroundImage: `url(${background3})`}}>
      <BrowserRouter>
        <Navigation/>
      
        <main className='container'>
          <DriverProvider>
            <TeamProvider>
              <RaceProvider>
                <Routes>
                  <Route path='/' element={<HomePage/>}></Route>
                  <Route path='drivers' element={<DriverPage/>}></Route>
                  <Route path='teams' element={<TeamPage/>}></Route>
                  <Route path='races' element={<RacePage/>}></Route>
                </Routes>
              </RaceProvider>
            </TeamProvider>
          </DriverProvider> 
        </main>   

        <footer></footer>     
        
      </BrowserRouter>           
      </div>
  )
}

export default App;