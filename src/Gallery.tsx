import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getGalleryPokemon, POKEMON_COUNT } from './pokemonApi'
import type { PokemonDetail } from './pokemonApi'

function Gallery() {
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([])
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    async function loadGallery() {
      setLoading(true)
      setError('')
      try {
        setPokemon(await getGalleryPokemon())
      } catch {
        setError('Could not load the gallery.')
      }
      setLoading(false)
    }
    loadGallery()
  }, [attempt])

  // Build the options from the types actually present in our collection.
  const types: string[] = []
  pokemon.forEach((item) => {
    item.types.forEach((entry) => {
      if (!types.includes(entry.type.name)) types.push(entry.type.name)
    })
  })
  types.sort()

  const filteredPokemon = pokemon.filter((item) =>
    selectedType === 'all' || item.types.some((entry) => entry.type.name === selectedType),
  )

  return (
    <main className="pokemon-app">
      <p className="eyebrow">Explore by type</p>
      <h1>Pokemon gallery</h1>

      <div className="controls">
        <label>
          Pokemon type
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} disabled={loading || !!error}>
            <option value="all">All types</option>
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
      </div>

      {loading && <p role="status">Loading images and types for {POKEMON_COUNT} Pokemon…</p>}
      {error && <div role="alert"><p>{error}</p><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && (
        <>
          <p className="result-count" role="status">{filteredPokemon.length} Pokemon · {selectedType === 'all' ? 'All types' : selectedType}</p>
          {filteredPokemon.length === 0 && <p>No Pokemon match this type.</p>}
          <ul className="pokemon-grid">
            {filteredPokemon.map((item) => (
              <li key={item.id}>
                <Link className="pokemon-card gallery-card" to={`/pokemon/${item.name}`}>
                  <span className="pokemon-number">#{String(item.id).padStart(3, '0')}</span>
                  {item.sprites.front_default ? (
                    <img src={item.sprites.front_default} alt={item.name} width="144" height="144" loading="lazy" />
                  ) : <span className="image-placeholder">Image unavailable</span>}
                  <h2>{item.name}</h2>
                  <div className="type-list">
                    {item.types.map((entry) => <span className="type-badge" key={entry.type.name}>{entry.type.name}</span>)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}

export default Gallery
