import { Movie } from './types';
import { INITIAL_MOVIES, fetchFromTMDB, formatTmdbItem } from './tmdb';

export interface AiRecommendationResult {
  reply: string;
  recommendedMovies: Movie[];
  queryTags: string[];
}

// Popular Uzbek/Russian phonetic aliases to official film & franchise names
const TITLE_ALIASES: Record<string, { term: string; uzName: string; isFranchise?: boolean }> = {
  'garri poter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'garri potter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'garry poter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'garry potter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'harry potter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'poter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'potter': { term: 'Harry Potter', uzName: 'Garri Potter', isFranchise: true },
  'forsaj': { term: 'Fast and Furious', uzName: 'Forsaj', isFranchise: true },
  'forsajlar': { term: 'Fast and Furious', uzName: 'Forsaj', isFranchise: true },
  'fast and furious': { term: 'Fast and Furious', uzName: 'Forsaj', isFranchise: true },
  'qasoskorlar': { term: 'The Avengers', uzName: 'Qasoskorlar', isFranchise: true },
  'mstiteli': { term: 'The Avengers', uzName: 'Qasoskorlar', isFranchise: true },
  'avengers': { term: 'The Avengers', uzName: 'Qasoskorlar', isFranchise: true },
  'orgimchak odam': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'o\'rgimchak odam': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'orgimchak': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'spiderman': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'spider-man': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'chelovek pauk': { term: 'Spider-Man', uzName: "O'rgimchak Odam", isFranchise: true },
  'temir odam': { term: 'Iron Man', uzName: 'Temir Odam', isFranchise: true },
  'iron man': { term: 'Iron Man', uzName: 'Temir Odam', isFranchise: true },
  'taxtlar oyini': { term: 'Game of Thrones', uzName: "Taxtlar O'yini", isFranchise: true },
  'taxtlar o\'yini': { term: 'Game of Thrones', uzName: "Taxtlar O'yini", isFranchise: true },
  'game of thrones': { term: 'Game of Thrones', uzName: "Taxtlar O'yini", isFranchise: true },
  'uzuklar hukumdori': { term: 'The Lord of the Rings', uzName: 'Uzuklar Hukmdori', isFranchise: true },
  'uzuklar hukmdori': { term: 'The Lord of the Rings', uzName: 'Uzuklar Hukmdori', isFranchise: true },
  'lord of the rings': { term: 'The Lord of the Rings', uzName: 'Uzuklar Hukmdori', isFranchise: true },
  'yulduzlar jangi': { term: 'Star Wars', uzName: 'Yulduzlar Jangi', isFranchise: true },
  'star wars': { term: 'Star Wars', uzName: 'Yulduzlar Jangi', isFranchise: true },
  'karib dengizi qaroqchilari': { term: 'Pirates of the Caribbean', uzName: 'Karib Dengizi Qaroqchilari', isFranchise: true },
  'karib dengizi': { term: 'Pirates of the Caribbean', uzName: 'Karib Dengizi Qaroqchilari', isFranchise: true },
  'pirates of the caribbean': { term: 'Pirates of the Caribbean', uzName: 'Karib Dengizi Qaroqchilari', isFranchise: true },
  'matritsa': { term: 'The Matrix', uzName: 'Matritsa', isFranchise: true },
  'the matrix': { term: 'The Matrix', uzName: 'Matritsa', isFranchise: true },
  'sherlok xolms': { term: 'Sherlock Holmes', uzName: 'Sherlok Xolms', isFranchise: true },
  'sherlok': { term: 'Sherlock Holmes', uzName: 'Sherlok Xolms', isFranchise: true },
  'sherlock': { term: 'Sherlock Holmes', uzName: 'Sherlok Xolms', isFranchise: true },
  'avatar': { term: 'Avatar', uzName: 'Avatar', isFranchise: true },
  'oppengeymer': { term: 'Oppenheimer', uzName: 'Oppenheimer' },
  'oppenheimer': { term: 'Oppenheimer', uzName: 'Oppenheimer' },
  'dyuna': { term: 'Dune', uzName: 'Dyuna', isFranchise: true },
  'dune': { term: 'Dune', uzName: 'Dyuna', isFranchise: true },
  'titanik': { term: 'Titanic', uzName: 'Titanik' },
  'titanic': { term: 'Titanic', uzName: 'Titanik' },
  'betmen': { term: 'The Dark Knight', uzName: 'Betmen', isFranchise: true },
  'batman': { term: 'The Dark Knight', uzName: 'Betmen', isFranchise: true },
  'qora ritsar': { term: 'The Dark Knight', uzName: 'Qora Ritsar' },
  'dedpul': { term: 'Deadpool', uzName: 'Dedpul', isFranchise: true },
  'deadpool': { term: 'Deadpool', uzName: 'Dedpul', isFranchise: true },
  'interstellar': { term: 'Interstellar', uzName: 'Interstellar' },
  'interstelar': { term: 'Interstellar', uzName: 'Interstellar' },
  'gladiator': { term: 'Gladiator', uzName: 'Gladiator', isFranchise: true },
  'rembo': { term: 'Rambo', uzName: 'Rembo', isFranchise: true },
  'rambo': { term: 'Rambo', uzName: 'Rembo', isFranchise: true },
  'terminator': { term: 'Terminator', uzName: 'Terminator', isFranchise: true },
  'jon uik': { term: 'John Wick', uzName: 'Jon Uik', isFranchise: true },
  'john wick': { term: 'John Wick', uzName: 'Jon Uik', isFranchise: true },
  'uyda yolgiz': { term: 'Home Alone', uzName: "Uyda Yolg'iz", isFranchise: true },
  'uyda yolg\'iz': { term: 'Home Alone', uzName: "Uyda Yolg'iz", isFranchise: true },
  'home alone': { term: 'Home Alone', uzName: "Uyda Yolg'iz", isFranchise: true },
  'qirol sher': { term: 'The Lion King', uzName: 'Qirol Sher' },
  'the lion king': { term: 'The Lion King', uzName: 'Qirol Sher' },
  'ajdaho orgatuvchisi': { term: 'How to Train Your Dragon', uzName: "Ajdaho O'rgatuvchisi", isFranchise: true },
  'ajdaho o\'rgatuvchisi': { term: 'How to Train Your Dragon', uzName: "Ajdaho O'rgatuvchisi", isFranchise: true },
  'transformerlar': { term: 'Transformers', uzName: 'Transformerlar', isFranchise: true },
  'transformers': { term: 'Transformers', uzName: 'Transformerlar', isFranchise: true },
  'yura davri': { term: 'Jurassic Park', uzName: 'Yura Davri Parki', isFranchise: true },
  'jurassic park': { term: 'Jurassic Park', uzName: 'Yura Davri Parki', isFranchise: true },
  'vensdey': { term: 'Wednesday', uzName: 'Uensdey' },
  'wednesday': { term: 'Wednesday', uzName: 'Uensdey' },
  'stranger things': { term: 'Stranger Things', uzName: "G'alati Narsalar" },
  'kalmar oyini': { term: 'Squid Game', uzName: "Kalmar O'yini" },
  'kalmar o\'yini': { term: 'Squid Game', uzName: "Kalmar O'yini" },
  'squid game': { term: 'Squid Game', uzName: "Kalmar O'yini" },
  'shum bola': { term: 'Shum bola', uzName: 'Shum Bola' },
  'suyunchi': { term: 'Suyunchi', uzName: 'Suyunchi' },
  'mahallada duv-duv gap': { term: 'Mahallada duv-duv gap', uzName: 'Mahallada duv-duv gap' },
  'kelinlar qozgoloni': { term: "Kelinlar qo'zg'oloni", uzName: "Kelinlar Qo'zg'oloni" },
  'kelinlar qo\'zg\'oloni': { term: "Kelinlar qo'zg'oloni", uzName: "Kelinlar Qo'zg'oloni" },
};

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/['’‘`ʻʼ]/g, '')
    .replace(/[«»"?,.!;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanUzbekSearchQuery(raw: string): string {
  const norm = normalizeString(raw);
  const stopWords = new Set([
    'menga', 'bizga', 'uchun', 'haqida', 'film', 'filmi', 'filmini', 'filmlar',
    'filmlari', 'filmlarini', 'kino', 'kinosi', 'kinosini', 'kinolar', 'kinolari',
    'kinolarini', 'serial', 'seriali', 'serialini', 'seriallar', 'seriallari',
    'multfilm', 'multfilmi', 'top', 'topib', 'ber', 'tavsiya', 'qil', 'qiling',
    'korsat', 'ko\'rsat', 'bormi', 'qanaqa', 'yaxshi', 'eng', 'zor', 'zo\'r',
    'kabi', 'oxshash', 'o\'xshash', 'kormoqchiman', 'ko\'rmoqchiman', 'izlayapman',
    'aytib', 'barcha', 'qismlari', 'qismini', 'qismlarini', 'seriyalari',
    'chiqar', 'chiqarib', 'iltimos', 'ayt', 'bor', 'qaysi', 'haqidagi', 'chiqayapti',
    'korish', 'ko\'rish', 'desam', 'yozsam', 'biron', 'birorta'
  ]);

  const words = norm.split(' ').filter((w) => !stopWords.has(w) && w.length > 1);
  return words.join(' ').trim();
}

// Built-in intelligent Uzbek Semantic Matcher & Live TMDB Search Engine
export async function processUzbekMovieQuery(
  userQuery: string,
  history: { role: string; content: string }[] = []
): Promise<AiRecommendationResult> {
  const normQuery = normalizeString(userQuery);
  const matchedMovies: Movie[] = [];
  const tags: string[] = [];
  let explanation = '';

  // 1. Direct Title & Alias Match (e.g. "Garri Potter", "Forsaj", "Spider-Man", "Game of Thrones")
  let matchedAliasKey = Object.keys(TITLE_ALIASES).find((alias) =>
    normQuery.includes(normalizeString(alias))
  );

  let candidateSearchTerm = '';
  let resolvedDisplayName = '';
  let isFranchise = false;

  if (matchedAliasKey) {
    const aliasObj = TITLE_ALIASES[matchedAliasKey];
    candidateSearchTerm = aliasObj.term;
    resolvedDisplayName = aliasObj.uzName;
    isFranchise = Boolean(aliasObj.isFranchise);
  } else {
    // Check if query is a specific title after removing stopwords
    const cleaned = cleanUzbekSearchQuery(userQuery);
    if (cleaned.length >= 2) {
      candidateSearchTerm = cleaned;
      resolvedDisplayName = cleaned;
    }
  }

  // If we have a strong candidate title, query TMDB live or check local catalog
  if (candidateSearchTerm) {
    // Check if it's Harry Potter specifically for customized royal treatment
    const isHarryPotter =
      candidateSearchTerm.toLowerCase().includes('harry potter') ||
      normQuery.includes('potter') ||
      normQuery.includes('poter');

    try {
      const tmdbData = await fetchFromTMDB('/search/multi', {
        query: candidateSearchTerm,
      });

      if (tmdbData && Array.isArray(tmdbData.results) && tmdbData.results.length > 0) {
        let items = (tmdbData.results as any[]).filter(
          (x) => (x.media_type === 'movie' || x.media_type === 'tv') && x.poster_path
        );

        if (isHarryPotter) {
          // Filter out small documentaries, sort chronologically
          items = items.filter((x) => (x.vote_count || 0) > 100);
          items.sort((a, b) =>
            (a.release_date || a.first_air_date || '').localeCompare(
              b.release_date || b.first_air_date || ''
            )
          );
        } else {
          // Sort by popularity and vote_count to surface the famous titles first
          items.sort(
            (a, b) =>
              (b.vote_count || 0) * 2 +
              (b.popularity || 0) -
              ((a.vote_count || 0) * 2 + (a.popularity || 0))
          );
        }

        const formatted = items.slice(0, 6).map((item) =>
          formatTmdbItem(item, item.media_type === 'tv' ? 'tv' : 'movie')
        );

        if (formatted.length > 0) {
          matchedMovies.push(...formatted);

          if (isHarryPotter) {
            tags.push('Garri Potter', 'Sehrgarlik', 'Xogvarts', 'Fantastika', 'Oila');
            explanation = `🪄 **Garri Potter** olamiga xush kelibsiz!

J.K. Rouling qalamiga mansub sehrgarlik, do'stlik va jasorat timsoli bo'lgan afsonaviy kinosaganing barcha asosiy qismlarini to'plab chiqdim:

• **Harry Potter and the Philosopher's Stone (2001)** — Garri va sehrgarlar maktabi bilan ilk uchrashuv.
• **Harry Potter and the Chamber of Secrets (2002)** — Xogvartsning sirli maxfiy xonasi va dahshatli afsunlar.
• **Harry Potter and the Prisoner of Azkaban (2004)** — Sirius Blek va Azkaban mahbusi siri.
• **Harry Potter and the Goblet of Fire (2005)** — Uch sehrgar turniri va Voldemortning qaytishi.
• **Harry Potter and the Order of the Phoenix (2007)** — Feniks jamiyati va Dambldor qo'shini.
• **Harry Potter and the Deathly Hallows (2010–2011)** — Yovuzlikka qarshi epik yakuniy jang!

Quyidagi kartochkalardan birini tanlab, to'liq filmni Full HD formatda tomosha qilishingiz mumkin!`;
          } else {
            tags.push(resolvedDisplayName, 'Kino uz Top Qidiruv', 'Jahon Kinosi');
            explanation = `🎬 Siz izlagan **"${resolvedDisplayName}"** (${candidateSearchTerm}) bo'yicha eng sara qismlar va filmlarni topdim!

Ushbu asarlar butun dunyo kino ixlosmandlari orasida eng ko'p ko'rilgan va yuqori baholangan filmlar hisoblanadi.

Quyidagi kartochkalardan birini bosib, to'liq ma'lumotlar, rasmiy treyler va qulay HD ko'rish imkoniyatidan foydalanishingiz mumkin:`;
          }
        }
      }
    } catch (err) {
      console.warn('TMDB live search in AI engine failed:', err);
    }
  }

  // If title search already succeeded, return early with unique results
  if (matchedMovies.length > 0) {
    const uniqueMovies: Movie[] = [];
    const seenIds = new Set<string>();
    for (const m of matchedMovies) {
      const sId = String(m.id);
      if (!seenIds.has(sId)) {
        seenIds.add(sId);
        uniqueMovies.push(m);
      }
    }

    return {
      reply: explanation,
      recommendedMovies: uniqueMovies.slice(0, 6),
      queryTags: tags,
    };
  }

  // 2. Thematic / Genre Semantic Matchers

  // Interstellar / Nolan
  if (normQuery.includes('interstellar') || normQuery.includes('nolan')) {
    tags.push('Koinot', 'Ilmiy-fantastika', 'Vaqt', 'Christopher Nolan');
    const matches = INITIAL_MOVIES.filter((m) =>
      ['157336', '27205', '693134', '872585'].includes(String(m.id))
    );
    matchedMovies.push(...matches);
    explanation = `**Interstellar** va Kris Nolan uslubidagi chuqur ilmiy-fantastika, koinot sirlari va aqlbovar qilmas syujetlarga qiziqsangiz, sizga quyidagi durdonalarni tavsiya qilaman:

1. **Inception (Muqaddima)** — Kristian Nolanning inson ongi va tushlar olamidagi aql bovar qilmas sayohati.
2. **Dune: Part Two (Dyuna 2)** — Koinot miqyosidagi epik taqdir va ilmiy-fantastik vizual shoh asar.
3. **Blade Runner 2049** — Falsafiy savollar va kiberpank olamining koinot kabi hayratlantiruvchi atmosferasi.`;
  }
  // Leonardo DiCaprio
  else if (normQuery.includes('leonardo') || normQuery.includes('dicaprio')) {
    tags.push('Leonardo DiCaprio', 'Dramatik', 'Triller');
    const matches = INITIAL_MOVIES.filter(
      (m) =>
        m.cast?.some((c) => c.name.toLowerCase().includes('dicaprio')) ||
        m.title.toLowerCase().includes('inception')
    );
    matchedMovies.push(...matches);
    matchedMovies.push(...INITIAL_MOVIES.filter((m) => ['157336', '872585'].includes(String(m.id))));
    explanation = `Oskar sovrindori **Leonardo DiCaprio** ishtirokidagi eng mashhur va hayajonli filmlar:

• **Inception (2010)** — DiKaprio bosh qahramon Dom Kobb rolida tushlar ichida xavfli missiyani boshqaradi.
• Shuningdek, Kris Nolan va DiKaprio filmlari ruhiyatidagi **Interstellar** va **Oppenheimer** filmlarini ham ko'rishni maslahat beraman.`;
  }
  // Detective / Mystery / Thriller
  else if (normQuery.includes('detektiv') || normQuery.includes('triller') || normQuery.includes('thriller') || normQuery.includes('qiziqarli')) {
    tags.push('Detektiv', 'Triller', 'Kriminal');
    const matches = INITIAL_MOVIES.filter((m) =>
      m.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return ['Triller', 'Detektiv', 'Kriminal'].includes(name);
      })
    );
    matchedMovies.push(...matches);
    explanation = `Bugun asablarni qitiqlaydigan va oxirigacha intizorlikda ushlab turadigan eng yaxshi **detektiv va triller** kinolar:

• **The Dark Knight (Qora Ritsar)** — Jinoyat va psixologik triller janrining eng cho'qqisi.
• **Blade Runner 2049** — Kiberpank detektivligi: sirli xotiralar va yo'qolgan haqiqat izidan tergov.
• **Five Nights at Freddy's** — Sirli tashlandiq joydagi dahshatli va detektiv voqealar.`;
  }
  // Family / Animation
  else if (normQuery.includes('oila') || normQuery.includes('oilam') || normQuery.includes('multfilm') || normQuery.includes('animatsiya')) {
    tags.push('Oilaviy', 'Animatsiya', 'Sehrli');
    const matches = INITIAL_MOVIES.filter((m) =>
      m.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return ['Oilaviy', 'Animatsiya'].includes(name);
      })
    );
    matchedMovies.push(...matches);
    explanation = `Oilangiz va yaqinlaringiz bilan birga ko'rish uchun eng mehrli va sehrli filmlar:

• **Spirited Away (Ruhlar olami)** — Hayao Miyazakining butun oila a'zolari birdek zavq oladigan Oskar mukofotli durdonasi.
• **Your Name (Sening isming)** — Muhabbat, do'stlik va taqdir rishtalari haqidagi hayratomuz animatsiya.
• **Arcane** — Tasviriy san'at darajasidagi ajoyib sarguzasht.`;
  }
  // Recent / 2024
  else if (normQuery.includes('2024') || normQuery.includes('yangi') || normQuery.includes('premyera')) {
    tags.push('2024 Premyeralari', 'Yangi kinolar', 'Trend');
    const matches = INITIAL_MOVIES.filter(
      (m) => m.release_date.startsWith('2024') || m.isRecent
    );
    matchedMovies.push(...matches);
    explanation = `2024-yilning eng shov-shuvli va yuqori darajadagi premyeralari:

• **Dune: Part Two (2024)** — Yilning eng buyuk kinoteatr hodisasi, ajoyib saundtrek va vizual effektlar.
• **Deadpool & Wolverine (2024)** — Cheksiz hazillar, Marvel olamidagi aqlbovar janglar va dinamika.
• **Solo Leveling (2024)** — Dunyo bo'ylab millionlab tomoshabinlar e'tiborini qozongan yangi anime.`;
  }
  // Top Rated / IMDb 8.5+
  else if (normQuery.includes('reyting') || normQuery.includes('top') || normQuery.includes('eng yaxshi') || normQuery.includes('yuqori')) {
    tags.push('Top Reyting', 'IMDb 8.5+', 'Kino durdonalari');
    const matches = [...INITIAL_MOVIES].sort((a, b) => b.vote_average - a.vote_average).slice(0, 6);
    matchedMovies.push(...matches);
    explanation = `IMDb va TMDB reytinglari bo'yicha dunyodagi eng yuqori baholangan filmlar to'plami:

• **The Dark Knight** (8.9 / 10)
• **Your Name** (8.9 / 10)
• **Inception** (8.8 / 10)
• **Spirited Away** (8.8 / 10)
• **Interstellar** (8.7 / 10)
• **Dune: Part Two** (8.6 / 10)`;
  }
  // Sci-Fi / Space
  else if (normQuery.includes('fantastik') || normQuery.includes('koinot') || normQuery.includes('sci-fi')) {
    tags.push('Ilmiy-fantastika', 'Koinot', 'Kelajak');
    const matches = INITIAL_MOVIES.filter((m) =>
      m.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return name.includes('fantastika') || name.includes('Sci-Fi');
      })
    );
    matchedMovies.push(...matches);
    explanation = `Kelajak, koinot sirlari va g'ayritabiiy texnologiyalarga bag'ishlangan eng ajoyib fantastik filmlar:

• **Interstellar** — Koinotdagi qora tuynuk va vaqt nisbiyligi.
• **Dune: Part Two** — Boshqa sayyoradagi ulkan sivilizatsiya va siyosiy janglar.
• **Blade Runner 2049** — Sun'iy intellekt va insoniyat chegaralari haqidagi daho asar.`;
  }
  // Anime
  else if (normQuery.includes('anime') || normQuery.includes('titan') || normQuery.includes('demon')) {
    tags.push('Anime', 'Yapon kinemotografiyasi', 'Shonen');
    const matches = INITIAL_MOVIES.filter((m) => m.media_type === 'anime');
    matchedMovies.push(...matches);
    explanation = `Siz uchun eng sara yapon animelari:

• **Attack on Titan (Titanlar Hujumi)** — Har bir qismi hayajon va kutilmagan burilishlarga boy dunyo miqyosidagi afsona.
• **Demon Slayer** — Aqlbovar qilmas animatsiya sifati va qahramonlik daryosi.
• **Your Name & Spirited Away** — Har bir inson ko'rishi shart bo'lgan klassika.`;
  }
  // Default fallback
  else {
    tags.push('Kino uz Tavsiyasi', 'Mashhur', 'Tanlangan');
    matchedMovies.push(...INITIAL_MOVIES.slice(0, 5));
    explanation = `Sizning "${userQuery}" so'rovingiz bo'yicha platformamizdagi eng sara va yuqori baholangan filmlarni saralab chiqdim.

Quyidagi kartochkalardan birini tanlab, to'liq ma'lumot, treyler va qulay ko'rish havolalarini ochishingiz mumkin. Agar boshqa aniq film nomi, aktyor yoki janr bo'yicha qidirmoqchi bo'lsangiz, bemalol yozing!`;
  }

  // Remove duplicate movies if any
  const uniqueMovies: Movie[] = [];
  const seenIds = new Set<string>();
  for (const m of matchedMovies) {
    const sId = String(m.id);
    if (!seenIds.has(sId)) {
      seenIds.add(sId);
      uniqueMovies.push(m);
    }
  }

  return {
    reply: explanation,
    recommendedMovies: uniqueMovies.slice(0, 6),
    queryTags: tags,
  };
}

// Server-side OpenAI API integration (optional if key provided)
export async function getOpenAiRecommendation(
  prompt: string,
  history: { role: string; content: string }[] = []
): Promise<AiRecommendationResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null; // Fall back to built-in Uzbek semantic engine
  }

  const catalogSummary = INITIAL_MOVIES.map(
    (m) =>
      `ID: ${m.id}, Title: ${m.title}, Genres: ${m.genres.join(', ')}, Rating: ${m.vote_average}, Year: ${m.release_date.substring(0, 4)}`
  ).join('\n');

  const systemPrompt = `Siz "Kino uz" milliy va xalqaro film platformasining professional AI kino maslahatchisisiz.
Siz foydalanuvchilar bilan faqat va faqat samimiy, adabiy o'zbek tilida muloqot qilasiz.
Sizning vazifangiz:
1. Foydalanuvchining xohishini aniqlash.
2. Mavjud katalogdan mos filmlarni tanlash.
3. Nima uchun aynan shu filmlarni tavsiya qilayotganingizni aniq va qiziqarli tushuntirib berish.
4. Hech qachon soxta yoki mavjud bo'lmagan kino nomlarini to'qimang.
5. Har doim javobingiz oxirida tavsiya etilgan film ID larini quyidagi JSON formatida qoldiring:
[RECOMMENDED_IDS: 157336, 693134]

Mavjud katalog:
${catalogSummary}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_API_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-4),
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.warn('OpenAI error status:', res.status);
      return null;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Extract recommended IDs
    const idMatch = content.match(/\[RECOMMENDED_IDS:\s*([\d,\s]+)\]/);
    const recommendedMovies: Movie[] = [];
    let cleanReply = content;

    if (idMatch && idMatch[1]) {
      cleanReply = content.replace(idMatch[0], '').trim();
      const ids = idMatch[1].split(',').map((s: string) => s.trim());
      for (const id of ids) {
        const found = INITIAL_MOVIES.find((m) => String(m.id) === id);
        if (found) recommendedMovies.push(found);
      }
    }

    if (recommendedMovies.length === 0) {
      const fallback = await processUzbekMovieQuery(prompt);
      return {
        reply: cleanReply || fallback.reply,
        recommendedMovies: fallback.recommendedMovies,
        queryTags: ['AI Tavsiyasi'],
      };
    }

    return {
      reply: cleanReply,
      recommendedMovies,
      queryTags: ['AI Tavsiyasi', 'Kino uz GPT'],
    };
  } catch (err) {
    console.warn('OpenAI call failed, falling back:', err);
    return null;
  }
}
