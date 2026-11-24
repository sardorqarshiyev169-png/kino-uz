import { Movie, Genre, StreamingProvider } from './types';
import { UZBEK_MOVIES, KNOWN_UZBEK_VIDEO_KEYS } from './uzbek-movies';

export const GENRES: Genre[] = [
  { id: 28, name: 'Action', uzName: 'Jangari' },
  { id: 12, name: 'Adventure', uzName: 'Sarguzasht' },
  { id: 16, name: 'Animation', uzName: 'Animatsiya' },
  { id: 35, name: 'Comedy', uzName: 'Komediya' },
  { id: 80, name: 'Crime', uzName: 'Kriminal' },
  { id: 99, name: 'Documentary', uzName: 'Hujjatli' },
  { id: 18, name: 'Drama', uzName: 'Drama' },
  { id: 10751, name: 'Family', uzName: 'Oilaviy' },
  { id: 14, name: 'Fantasy', uzName: 'Fantastika' },
  { id: 36, name: 'History', uzName: 'Tarixiy' },
  { id: 27, name: 'Horror', uzName: 'Dahshat' },
  { id: 10402, name: 'Music', uzName: 'Musiqiy' },
  { id: 9648, name: 'Mystery', uzName: 'Detektiv' },
  { id: 10749, name: 'Romance', uzName: 'Melodrama' },
  { id: 878, name: 'Sci-Fi', uzName: 'Ilmiy-fantastika' },
  { id: 53, name: 'Thriller', uzName: 'Triller' },
  { id: 10752, name: 'War', uzName: 'Harbiy' },
  { id: 37, name: 'Western', uzName: 'Vestern' },
];

export const OFFICIAL_PROVIDERS: StreamingProvider[] = [
  {
    id: 'allplay',
    name: 'Allplay (O\'zbekiston)',
    logo_path: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=128&q=80',
    url: 'https://allplay.uz',
    quality: 'Full HD / 4K',
    isOfficial: true,
    country: 'uz',
  },
  {
    id: 'itv',
    name: 'ITV.UZ',
    logo_path: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=128&q=80',
    url: 'https://itv.uz',
    quality: '1080p',
    isOfficial: true,
    country: 'uz',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo_path: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=128&q=80',
    url: 'https://www.netflix.com',
    quality: '4K Ultra HD',
    isOfficial: true,
  },
  {
    id: 'appletv',
    name: 'Apple TV+',
    logo_path: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=128&q=80',
    url: 'https://tv.apple.com',
    quality: '4K HDR',
    isOfficial: true,
  },
  {
    id: 'kinopoisk',
    name: 'Kinopoisk HD',
    logo_path: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=128&q=80',
    url: 'https://hd.kinopoisk.ru',
    quality: 'Full HD',
    isOfficial: true,
  },
];

// Rich verified initial seed catalog
export const INITIAL_MOVIES: Movie[] = [
  {
    id: '157336',
    title: 'Interstellar',
    original_title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival as Earth faces catastrophic famine.',
    uz_overview: 'Yer yuzida ocharchilik va global halokat xavfi tug\'ilganda, bir guruh fazogirlar insoniyatni qutqarish uchun koinotdagi qora tuynuk orqali yangi sayyoralarni izlashga yo\'l oladilar.',
    poster_path: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/rAiYTsqBk79vo58derbf2CV7C9E.jpg',
    release_date: '2014-11-05',
    vote_average: 8.7,
    vote_count: 34500,
    runtime: 169,
    genres: ['Ilmiy-fantastika', 'Drama', 'Sarguzasht'],
    media_type: 'movie',
    tagline: 'Insoniyatning oxiri bizning oxirimiz bo\'lishi shart emas.',
    trailer_key: 'zSWdZVtXT7E',
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    where_to_watch: OFFICIAL_PROVIDERS,
    cast: [
      { id: 10297, name: 'Matthew McConaughey', character: 'Joseph Cooper', profile_path: 'https://image.tmdb.org/t/p/w185/wDeL50a6WwR6y5oA3s9vM647rB7.jpg' },
      { id: 1813, name: 'Anne Hathaway', character: 'Dr. Amelia Brand', profile_path: 'https://image.tmdb.org/t/p/w185/tLelKoPNiyJCSEtQT81FGZ47e1l.jpg' },
      { id: 3895, name: 'Michael Caine', character: 'Professor John Brand', profile_path: 'https://image.tmdb.org/t/p/w185/bVNVydlKjj3aK9Vq5Zc0fR91J5h.jpg' },
      { id: 83002, name: 'Jessica Chastain', character: 'Murphy Cooper', profile_path: 'https://image.tmdb.org/t/p/w185/lodMzLiycKssH0mFp3Y6w3v1Q3h.jpg' },
    ],
  },
  {
    id: '693134',
    title: 'Dune: Part Two',
    original_title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    uz_overview: 'Pol Atreydes Chani va fremenlar bilan birlashib, oilasini halok qilgan fitnachilardan qasos olish va butun koinot taqdirini o\'zgartirish uchun qat\'iy jangga kirishadi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg',
    release_date: '2024-03-01',
    vote_average: 8.6,
    vote_count: 5200,
    runtime: 166,
    genres: ['Ilmiy-fantastika', 'Sarguzasht', 'Jangari'],
    media_type: 'movie',
    tagline: 'Qumlar ostidagi imperiya qayta uyg\'onadi.',
    trailer_key: 'Way9Dexny3w',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isRecent: true,
    where_to_watch: OFFICIAL_PROVIDERS,
    cast: [
      { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: 'https://image.tmdb.org/t/p/w185/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
      { id: 505710, name: 'Zendaya', character: 'Chani', profile_path: 'https://image.tmdb.org/t/p/w185/r3A7ev8QkjOG4Q8zpZ0Ue8q0Q7t.jpg' },
    ],
  },
  {
    id: '27205',
    title: 'Inception',
    original_title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    uz_overview: 'Tushlar ichiga kirib boshqalarning maxfiy sirlarini o\'g\'irlaydigan mahoratli josusga yangi va eng xavfli vazifa — inson ongiga yangi g\'oyani singdirish topshiriladi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    release_date: '2010-07-15',
    vote_average: 8.8,
    vote_count: 36000,
    runtime: 148,
    genres: ['Jangari', 'Ilmiy-fantastika', 'Sarguzasht'],
    media_type: 'movie',
    tagline: 'Sizning ongingiz — eng himoyasiz sahna.',
    trailer_key: 'YoHD9XEInc0',
    isTopRated: true,
    isPopular: true,
    where_to_watch: OFFICIAL_PROVIDERS,
    cast: [
      { id: 6193, name: 'Leonardo DiCaprio', character: 'Dom Cobb', profile_path: 'https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
    ],
  },
  {
    id: '872585',
    title: 'Oppenheimer',
    original_title: 'Oppenheimer',
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    uz_overview: 'Buyuk fizik Robert Oppengeymerning atom bombasini yaratishdagi hal qiluvchi roli va uning oqibatida butun insoniyat taqdiri qanday o\'zgarganligi haqidagi hayratomuz epopeya.',
    poster_path: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    release_date: '2023-07-19',
    vote_average: 8.5,
    vote_count: 9200,
    runtime: 180,
    genres: ['Drama', 'Tarixiy'],
    media_type: 'movie',
    tagline: 'Dunyoni butunlay o\'zgartirgan lahza.',
    trailer_key: 'uYPbbksJxIg',
    isTrending: true,
    isTopRated: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '155',
    title: 'The Dark Knight',
    original_title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    uz_overview: 'Betmen Gotem ko\'chalarini jinoyatchilikdan tozalashga harakat qilar ekan, shaharga betartiblik va xaos olib kelgan dahshatli Joker bilan to\'qnashadi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
    release_date: '2008-07-16',
    vote_average: 8.9,
    vote_count: 32000,
    runtime: 152,
    genres: ['Drama', 'Jangari', 'Kriminal', 'Triller'],
    media_type: 'movie',
    tagline: 'Zulmatdan yorug\'likka, faqat qasos orqali.',
    trailer_key: 'EXeTwQWrcwY',
    isTopRated: true,
    isPopular: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '533535',
    title: 'Deadpool & Wolverine',
    original_title: 'Deadpool & Wolverine',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    uz_overview: 'Oddiy hayotga qaytgan Ueyd Uilson o\'z olamining yo\'q bo\'lib ketish xavfiga qarshi turish uchun yana Dedpul libosini kiyadi va qaysar Rosomaxa bilan g\'ayrioddiy ittifoq tuzadi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1jv8v9l.jpg',
    release_date: '2024-07-24',
    vote_average: 7.8,
    vote_count: 4800,
    runtime: 128,
    genres: ['Jangari', 'Komediya', 'Ilmiy-fantastika'],
    media_type: 'movie',
    tagline: 'Hamma narsa o\'zgaradi, faqat ularning hazillari emas.',
    trailer_key: '73_1biulkYk',
    isTrending: true,
    isPopular: true,
    isRecent: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '1399',
    title: 'Game of Thrones',
    original_title: 'Game of Thrones',
    overview: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    uz_overview: 'Vesterosning to\'qqizta zodagon xonadonlari Temir Taxt uchun ayovsiz kurash olib boradilar, ayni paytda Shimoldan qadimiy muzli dahshat yaqinlashib kelmoqda.',
    poster_path: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    release_date: '2011-04-17',
    vote_average: 8.4,
    vote_count: 23000,
    runtime: 57,
    genres: ['Fantastika', 'Drama', 'Jangari'],
    media_type: 'tv',
    tagline: 'Qish yaqinlashmoqda.',
    trailer_key: 'KPLWWIOCOOQ',
    isPopular: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '94605',
    title: 'Arcane',
    original_title: 'Arcane: League of Legends',
    overview: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.',
    uz_overview: 'Boy Piltover va qashshoq Zaun shaharlari o\'rtasidagi mojaro markazida, ikki opa-singil Vi va Jinks taqdirning ziddiyatli tomonlarida qoladilar.',
    poster_path: 'https://image.tmdb.org/t/p/w500/fqldrq26laLRx9b4IOJJcTaSwdu.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    release_date: '2021-11-06',
    vote_average: 9.0,
    vote_count: 8900,
    runtime: 42,
    genres: ['Animatsiya', 'Ilmiy-fantastika', 'Jangari'],
    media_type: 'tv',
    tagline: 'Sehr va fan to\'qnashuvi.',
    trailer_key: 'fXmAurh012s',
    isTopRated: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '1429',
    title: 'Attack on Titan',
    original_title: 'Shingeki no Kyojin',
    overview: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    uz_overview: 'O\'z shahrining devorlari qulab, onasi bahaybat Titan tomonidan o\'ldirilgach, Eren Yeger insoniyatni qutqarish va barcha titanlarni yo\'q qilishga qasamyod qiladi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/8hL6eJjAeVWp38G1F2YV5m4Ua.jpg',
    release_date: '2013-04-07',
    vote_average: 9.1,
    vote_count: 14500,
    runtime: 24,
    genres: ['Animatsiya', 'Jangari', 'Fantastika'],
    media_type: 'anime',
    tagline: 'Biz bu dunyoda tug\'ilganimiz uchungina ozodmiz.',
    trailer_key: 'MGRm4IzK1SQ',
    isTopRated: true,
    isPopular: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
  {
    id: '85937',
    title: 'Demon Slayer',
    original_title: 'Kimetsu no Yaiba',
    overview: 'It is the Taisho Period in Japan. Tanjiro finds his family slaughtered by a demon.',
    uz_overview: 'Tanjironing oilasi iblislar tomonidan qirib tashlanadi. U iblisga aylangan singlisini qutqarish uchun jangga kirishadi.',
    poster_path: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/nTvM4mhqZlHIvUkI1gq29Q6g.jpg',
    release_date: '2019-04-06',
    vote_average: 8.8,
    vote_count: 8200,
    runtime: 24,
    genres: ['Animatsiya', 'Jangari'],
    media_type: 'anime',
    trailer_key: 'VQGCKyvzIM4',
    isTrending: true,
    where_to_watch: OFFICIAL_PROVIDERS,
  },
];

// Helper to convert raw TMDB item to our Movie type
export function formatTmdbItem(item: any, defaultType: 'movie' | 'tv' | 'anime' = 'movie'): Movie {
  const isTV = item.media_type === 'tv' || defaultType === 'tv' || Boolean(item.first_air_date);
  const title = item.title || item.name || 'Nomsiz film';
  const originalTitle = item.original_title || item.original_name || title;
  const releaseDate = item.release_date || item.first_air_date || '2024-01-01';

  // Map genre IDs
  const genres = (item.genre_ids || item.genres || []).map((g: any) => {
    const id = typeof g === 'number' ? g : g.id;
    const found = GENRES.find((x) => x.id === id);
    return found ? (found.uzName || found.name) : 'Kino';
  });

  return {
    id: String(item.id),
    title,
    original_title: originalTitle,
    overview: item.overview || 'Tavsif mavjud emas.',
    uz_overview: item.overview,
    poster_path: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80',
    backdrop_path: item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : (item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80'),
    release_date: releaseDate,
    vote_average: Number(item.vote_average || 7.5),
    vote_count: item.vote_count || 120,
    runtime: item.runtime || 115,
    genres: genres.length > 0 ? genres : ['Kino'],
    media_type: defaultType === 'anime' ? 'anime' : (isTV ? 'tv' : 'movie'),
    isUzbek:
      item.original_language === 'uz' ||
      (Array.isArray(item.origin_country) && item.origin_country.includes('UZ')),
    where_to_watch: OFFICIAL_PROVIDERS,
    trailer_key: KNOWN_UZBEK_VIDEO_KEYS[String(item.id)] || undefined,
  };
}

// In-memory cache for API requests
const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || 'c1efa7c793177690f73f07f30cc507fd';

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    language: 'en-US',
    ...params,
  });

  const url = `https://api.themoviedb.org/3${endpoint}?${queryParams.toString()}`;

  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn(`TMDB request failed: ${res.status}`);
      return null;
    }
    const data = await res.json();
    cache.set(url, { timestamp: Date.now(), data });
    return data;
  } catch (error) {
    console.warn('TMDB fetch error:', error);
    return null;
  }
}

export function getAllMovies(): Movie[] {
  return INITIAL_MOVIES;
}

export function getMovieById(id: string | number): Movie | undefined {
  return (
    INITIAL_MOVIES.find((m) => String(m.id) === String(id)) ||
    UZBEK_MOVIES.find((m) => String(m.id) === String(id))
  );
}

export function getTrendingMovies(): Movie[] {
  return INITIAL_MOVIES.filter((m) => m.isTrending);
}

export function getPopularMovies(): Movie[] {
  return INITIAL_MOVIES.filter((m) => m.isPopular || m.vote_average >= 8.0);
}

export function getTopRatedMovies(): Movie[] {
  return [...INITIAL_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
}

export function getRecentMovies(): Movie[] {
  return INITIAL_MOVIES.filter((m) => m.isRecent || m.release_date.startsWith('2024') || m.release_date.startsWith('2023'));
}

export function getTVSeries(): Movie[] {
  return INITIAL_MOVIES.filter((m) => m.media_type === 'tv');
}

export function getAnimeList(): Movie[] {
  return INITIAL_MOVIES.filter((m) => m.media_type === 'anime');
}

export function searchLocalMovies(query: string, type?: string, genre?: string): Movie[] {
  const q = query.toLowerCase().trim();
  const allLocal = [...INITIAL_MOVIES, ...UZBEK_MOVIES];
  return allLocal.filter((m) => {
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q) ||
      (m.original_title && m.original_title.toLowerCase().includes(q)) ||
      m.overview.toLowerCase().includes(q) ||
      (m.uz_overview && m.uz_overview.toLowerCase().includes(q)) ||
      (m.cast && m.cast.some((c) => c.name.toLowerCase().includes(q)));

    const matchesType = !type || type === 'all' || m.media_type === type;

    const matchesGenre =
      !genre ||
      genre === 'all' ||
      m.genres.some((g) => {
        const gName = typeof g === 'string' ? g : g.name;
        return gName.toLowerCase().includes(genre.toLowerCase());
      });

    return matchesQuery && matchesType && matchesGenre;
  });
}
