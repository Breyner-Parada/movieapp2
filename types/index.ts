export interface Results {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface SliderProps {
    page: number
    results: Results[]
    total_pages: number
    total_results: number
}

export interface Genre {
    id: number
    name: string
}

export interface CategoriesProps {
    genres: Genre[]
}

export interface MovieDetails {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: null
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: Array<ProductionCompanies>
    production_countries: Array<ProductionCountries>
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: Array<SpokenLanguages>
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface ProductionCompanies {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCountries {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguages {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieVideos {
    id: number
    results: Array<ResultsVideos>
}

export interface ResultsVideos {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    site: string
    size: number
    type: string
}