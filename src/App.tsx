import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getPokemonList, POKEMON_COUNT } from './pokemonApi'
import type { Pokemon } from './pokemonApi'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('ascending')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true)
      setError('')
      try {
        setPokemon(await getPokemonList())
      } catch {
        setError('Could not load Pokemon. Please refresh to try again.')
      }
      setLoading(false)
    }

    loadPokemon()
  }, [attempt])

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  const sortedPokemon = filteredPokemon.sort((a, b) => {
    let comparison = 0

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else {
      const aNumber = Number(a.url.split('/')[6])
      const bNumber = Number(b.url.split('/')[6])
      comparison = aNumber - bNumber
    }

    if (sortOrder === 'descending') {
      return -comparison
    }

    return comparison
  })

  return (
    <main className="pokemon-app">
      <p className="eyebrow">The original collection</p>
      <h1>Find your Pokemon</h1>
      <p className="intro">Explore {POKEMON_COUNT} Pokemon. Search by name or browse the gallery by type.</p>

      <div className="controls">
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name">Name</option>
          <option value="number">Number</option>
        </select>
      </label>

      <label>
        Order:
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </label>

      <label className="search-control">
      Search by name
      <input
        type="search"
        placeholder="Search Pokemon"
        aria-label="Search Pokemon"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      </label>
      </div>

      {loading && <p role="status">Loading Pokemon...</p>}
      {error && <div role="alert"><p>{error}</p><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && <p className="result-count" role="status">{sortedPokemon.length} Pokemon found</p>}
      {!loading && !error && sortedPokemon.length === 0 && <p>No matches.</p>}

      <ul className="pokemon-list">
        {sortedPokemon.map((item) => (
          <li key={item.name}>
            <h2>
              <Link className="pokemon-select" to={`/pokemon/${item.name}`}>
                <span className="pokemon-number">#{item.url.split('/')[6].padStart(3, '0')}</span>
                <span>{item.name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </h2>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
