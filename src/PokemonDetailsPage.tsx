import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import PokemonDetails from './PokemonDetails'
import { getPokemonList, POKEMON_COUNT } from './pokemonApi'
import type { Pokemon } from './pokemonApi'

function PokemonDetailsPage() {
  const { name } = useParams()
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadList() {
      try {
        setPokemonList(await getPokemonList())
      } catch {
        setError('Could not load navigation. Please refresh to try again.')
      }
      setLoading(false)
    }

    loadList()
  }, [])

  if (!name) return <p>No Pokemon selected.</p>

  const currentIndex = pokemonList.findIndex(
    (item) => item.name === name,
  )

  let navigation = null

  if (currentIndex !== -1) {
    // Wrap around when we reach either end of the list.
    const previousIndex =
      currentIndex === 0
        ? pokemonList.length - 1
        : currentIndex - 1

    const nextIndex =
      currentIndex === pokemonList.length - 1
        ? 0
        : currentIndex + 1

    const previous = pokemonList[previousIndex]
    const next = pokemonList[nextIndex]

    navigation = (
      <nav className="detail-navigation" aria-label="Pokemon navigation">
        <Link to={`/pokemon/${previous.name}`}>
          ← Previous: {previous.name}
        </Link>
        <Link to={`/pokemon/${next.name}`}>
          Next: {next.name} →
        </Link>
      </nav>
    )
  }

  return (
    <main className="pokemon-app">
      <Link to="/">Back to list</Link>

      {loading && <p role="status">Loading navigation...</p>}
      {error && <p role="alert">{error}</p>}
      {navigation}

      {!loading && !error && currentIndex === -1 && (
        <p>This Pokemon is outside our collection of {POKEMON_COUNT}.</p>
      )}

      <PokemonDetails key={name} name={name} />
    </main>
  )
}

export default PokemonDetailsPage
