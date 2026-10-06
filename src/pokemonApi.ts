import axios from 'axios'

// One collection size for list, gallery, and previous/next navigation.
export const POKEMON_COUNT = 151

export type Pokemon = { name: string; url: string }
type PokemonList = { results: Pokemon[] }
export type PokemonDetail = {
  id: number
  name: string
  height: number
  weight: number
  sprites: { front_default: string | null }
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}

// Cache promises as well as results, so simultaneous requests share one call.
// This cache lasts until the browser refreshes; it does not use localStorage.
let listRequest: Promise<Pokemon[]> | null = null
const detailRequests = new Map<string, Promise<PokemonDetail>>()

export function getPokemonList() {
  if (!listRequest) {
    listRequest = axios.get<PokemonList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_COUNT}`,
    ).then((response) => response.data.results).catch((error) => {
      listRequest = null // Allow a failed request to be retried.
      throw error
    })
  }
  return listRequest
}

export function getPokemonDetails(name: string) {
  const cached = detailRequests.get(name)
  if (cached) return cached

  const request = axios.get<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}/`,
  ).then((response) => response.data).catch((error) => {
    detailRequests.delete(name)
    throw error
  })
  detailRequests.set(name, request)
  return request
}

export async function getGalleryPokemon() {
  const list = await getPokemonList()
  const details: PokemonDetail[] = []
  // Promise.all waits for a batch. Only 12 requests are started at a time.
  for (let i = 0; i < list.length; i += 12) {
    const batch = list.slice(i, i + 12)
    const results = await Promise.all(
      batch.map((item) => getPokemonDetails(item.name)),
    )
    details.push(...results)
  }
  return details
}
