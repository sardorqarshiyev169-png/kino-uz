import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_MOVIES, searchLocalMovies, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  const genre = searchParams.get('genre') || 'all';
  const sort = searchParams.get('sort') || 'popularity';

  try {
    let movies = searchLocalMovies(query, type, genre);

    // If query was supplied and few results found locally, search TMDB live!
    if (query && movies.length < 5) {
      const tmdbData = await fetchFromTMDB('/search/multi', { query });
      if (tmdbData && tmdbData.results) {
        const liveMovies = tmdbData.results
          .filter((item: any) => item.poster_path && (item.title || item.name))
          .map((item: any) => formatTmdbItem(item));

        // Merge without duplicates
        const existingIds = new Set(movies.map((m) => String(m.id)));
        for (const lm of liveMovies) {
          if (!existingIds.has(String(lm.id))) {
            movies.push(lm);
          }
        }
      }
    }

    // Apply sorting
    if (sort === 'rating') {
      movies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    } else if (sort === 'newest') {
      movies = [...movies].sort(
        (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    } else if (sort === 'title') {
      movies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    }

    return NextResponse.json({
      results: movies,
      total: movies.length,
      page: 1,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
