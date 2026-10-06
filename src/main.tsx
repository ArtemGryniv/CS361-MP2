import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import './index.css'
import App from './App.tsx'
import PokemonDetailsPage from './PokemonDetailsPage'
import Gallery from './Gallery'
import Layout from './Layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/pokemon/:name"
          element={<PokemonDetailsPage />}
        />
        <Route
          path="*"
          element={
            <main className="pokemon-app">
              <p>Page not found.</p>
              <Link to="/">Back to list</Link>
            </main>
          }
        />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
