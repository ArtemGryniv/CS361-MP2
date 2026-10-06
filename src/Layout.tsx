import { NavLink, Outlet } from 'react-router'

function Layout() {
  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/">Pokemon <span>01—151</span></NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">Data is from <a href="https://pokeapi.co/">PokemonAPI</a></footer>
    </>
  )
}

export default Layout
