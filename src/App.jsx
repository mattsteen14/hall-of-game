import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Header } from './features/Header/Header'
import { GamesList } from './features/Games/GamesList/GamesList'
import { GameDetails } from './features/Games/GameDetails/GameDetails'
import { Footer } from './features/Footer/Footer'

function App() {

  return (
    <Router>
      <Header />
      <main>
        <section className='game-view'>
          <Routes>
            <Route path='/' element={<GamesList />} />
            <Route path='/games/:id' element={<GameDetails />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
