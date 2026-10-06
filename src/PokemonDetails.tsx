import { useEffect, useState } from 'react'
import { getPokemonDetails } from './pokemonApi'
import type { PokemonDetail } from './pokemonApi'

type PokemonDetailsProps = {
  name: string
}

// The route passes the selected Pokemon's name as a prop.
function PokemonDetails({ name }: PokemonDetailsProps) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    async function loadDetails() {
      setLoading(true)
      setError('')
      try {
        setPokemon(await getPokemonDetails(name))
      } catch {
        setError('Could not find or load this Pokemon. Check the name or try again.')
      }
      setLoading(false)
    }

    loadDetails()
  }, [name, attempt])

  if (loading) return <p role="status">Loading Pokemon details...</p>
  if (error) return <div role="alert"><p>{error}</p><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>
  if (pokemon === null) return null

  return (
    <section className="pokemon-card detail-card" aria-label="Pokemon details">
      <h1>{pokemon.name}</h1>
      <p>Pokédex number: {pokemon.id}</p>
      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="192"
          height="192"
        />
      )}

      <p>Height: {pokemon.height / 10} m</p>
      <p>Weight: {pokemon.weight / 10} kg</p>

      <h3>Types</h3>
      <div className="type-list">{pokemon.types.map((entry) => (
        <span className="type-badge" key={entry.type.name}>{entry.type.name}</span>
      ))}</div>

      <h3>Base stats</h3>
      <dl className="stats">{pokemon.stats.map((entry) => (
        <div key={entry.stat.name}>
          <dt>{entry.stat.name}</dt><dd>{entry.base_stat}</dd>
        </div>
      ))}</dl>
    </section>
  )
}

export default PokemonDetails
