export type MediaType = 'movie' | 'tv' | 'anime';

export interface Genre {
  id: number;
  name: string;
  uzName?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface VideoTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface StreamingProvider {
  id: string;
  name: string;
  logo_path: string;
  url: string;
  quality?: string;
  isOfficial: boolean;
  country?: string; // e.g. 'uz' or 'global'
}

export interface Movie {
  id: string | number;
  title: string;
  original_title?: string;
  overview: string;
  uz_overview?: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  runtime?: number; // minutes
  genres: (Genre | string)[];
  media_type: MediaType;
  tagline?: string;
  trailer_key?: string;
  cast?: CastMember[];
  crew?: CrewMember[];
  production_companies?: { id: number; name: string; logo_path?: string | null }[];
  where_to_watch?: StreamingProvider[];
  seasons?: Season[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isTopRated?: boolean;
  isPopular?: boolean;
  isRecent?: boolean;
  isUzbek?: boolean;
  isTarjima?: boolean;
}

export interface Season {
  season_number: number;
  name: string;
  episode_count: number;
  overview?: string;
  poster_path?: string;
  episodes?: Episode[];
}

export interface Episode {
  episode_number: number;
  name: string;
  overview: string;
  still_path?: string;
  runtime?: number;
  vote_average?: number;
}

export interface Review {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  movie_id: string | number;
  rating: number; // 1-10
  comment: string;
  created_at: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  role: 'user' | 'moderator' | 'admin';
  created_at: string;
  favorite_genres?: string[];
}

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  recommended_movies?: Movie[];
  explanation?: string;
  query_tags?: string[];
}

export interface AdminStats {
  totalUsers: number;
  activeUsersToday: number;
  totalMovies: number;
  totalViews: number;
  totalReviews: number;
  aiQueriesCount: number;
  trendingCount: number;
}
