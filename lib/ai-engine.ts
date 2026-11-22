import { Movie } from './types';
import { INITIAL_MOVIES } from './tmdb';

export interface AiRecommendationResult {
  reply: string;
  recommendedMovies: Movie[];
  queryTags: string[];
}

// Built-in intelligent Uzbek Semantic Matcher & Natural Language Processor
export function processUzbekMovieQuery(
  userQuery: string,
  history: { role: string; content: string }[] = []
): AiRecommendationResult {
  const q = userQuery.toLowerCase().trim();
  const matchedMovies: Movie[] = [];
  const tags: string[] = [];
  let explanation = '';

  // 1. Check for specific movie comparisons (e.g., "Interstellar kabi", "Inception kabi")
  if (q.includes('interstellar')) {
    tags.push('Koinot', 'Ilmiy-fantastika', 'Vaqt', 'Christopher Nolan');
    const matches = INITIAL_MOVIES.filter((m) =>
      ['27205', '335984', '693134', '872585'].includes(String(m.id))
    );
    matchedMovies.push(...matches);
    explanation = `**Interstellar** muxlisi ekanligingiz ajoyib! Agar sizga chuqur ilmiy-fantastika, koinot sirlari va Kris Nolan uslubidagi aqlbovar qilmas syujetlar yoqsa, sizga quyidagi durdonalarni tavsiya qilaman:
    
1. **Inception (Muqaddima)** — Kristian Nolanning inson ongi va tushlar olamidagi aql bovar qilmas sayohati.
2. **Dune: Part Two (Dyuna 2)** — Koinot miqyosidagi epik taqdir va ilmiy-fantastik vizual shoh asar.
3. **Blade Runner 2049** — Falsafiy savollar va kiberpank olamining koinot kabi hayratlantiruvchi atmosferasi.`;
  }
  // 2. Check for Leonardo DiCaprio
  else if (q.includes('leonardo') || q.includes('dicaprio')) {
    tags.push('Leonardo DiCaprio', 'Dramatik', 'Triller');
    const matches = INITIAL_MOVIES.filter(
      (m) =>
        m.cast?.some((c) => c.name.toLowerCase().includes('dicaprio')) ||
        m.title.toLowerCase().includes('inception')
    );
    matchedMovies.push(...matches);
    // Add additional thrilling high-rated companion movies
    matchedMovies.push(...INITIAL_MOVIES.filter((m) => ['157336', '872585'].includes(String(m.id))));
    explanation = `Oskar sovrindori **Leonardo DiCaprio** ishtirokidagi eng mashhur va hayajonli filmlar:
    
• **Inception (2010)** — DiKaprio bosh qahramon Dom Kobb rolida tushlar ichida xavfli missiyani boshqaradi.
• Shuningdek, Kris Nolan va DiKaprio filmlari ruhiyatidagi **Interstellar** va **Oppenheimer** filmlarini ham ko'rishni maslahat beraman.`;
  }
  // 3. Detective / Mystery / Thriller ("detektiv", "triller", "sirli", "qotillik")
  else if (q.includes('detektiv') || q.includes('triller') || q.includes('thriller') || q.includes('qiziqarli')) {
    tags.push('Detektiv', 'Triller', 'Kriminal');
    const matches = INITIAL_MOVIES.filter((m) =>
      m.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return ['Triller', 'Detektiv', 'Kriminal'].includes(name);
      })
    );
    matchedMovies.push(...matches);
    explanation = `Bugun asablarni qitiqlaydigan va oxirigacha intizorlikda ushlab turadigan eng yaxshi **detektiv va triller** kinolar:
    
• **The Dark Knight (Qora Ritsar)** — Jinoyat va psixologik triller janrining eng cho'qqisi. Jokerning xaos rejasi politsiya va Betmenni chalg'itadi.
• **Blade Runner 2049** — Kiberpank detektivligi: sirli xotiralar va yo'qolgan haqiqat izidan tergov.
• **Five Nights at Freddy's** — Sirli tashlandiq joydagi dahshatli va detektiv voqealar.`;
  }
  // 4. Family / Animated ("oila", "oilam bilan", "bolalar", "animatsiya", "multfilm")
  else if (q.includes('oila') || q.includes('oilam') || q.includes('multfilm') || q.includes('animatsiya')) {
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
  // 5. Recent / 2024 / New ("2024", "yangi", "premyera", "oxirgi")
  else if (q.includes('2024') || q.includes('yangi') || q.includes('premyera')) {
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
  // 6. Top rated / High rating ("reytingi yuqori", "eng zo'r", "top", "10 ta", "eng yaxshi")
  else if (q.includes('reyting') || q.includes('top') || q.includes('eng yaxshi') || q.includes('yuqori')) {
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
  // 7. Sci-fi ("fantastik", "ilmiy", "koinot", "kelajak")
  else if (q.includes('fantastik') || q.includes('koinot') || q.includes('sci-fi')) {
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
  // 8. Anime ("anime", "manga", "yapon")
  else if (q.includes('anime') || q.includes('titan') || q.includes('demon')) {
    tags.push('Anime', 'Yapon kinemotografiyasi', 'Shonen');
    const matches = INITIAL_MOVIES.filter((m) => m.media_type === 'anime');
    matchedMovies.push(...matches);
    explanation = `Siz uchun eng sara yapon animelari:
    
• **Attack on Titan (Titanlar Hujumi)** — Har bir qismi hayajon va kutilmagan burilishlarga boy dunyo miqyosidagi afsona.
• **Demon Slayer** — Aqlbovar qilmas animatsiya sifati va qahramonlik daryosi.
• **Your Name & Spirited Away** — Har bir inson ko'rishi shart bo'lgan klassika.`;
  }
  // 9. Default / General query
  else {
    tags.push('Kino uz Tavsiyasi', 'Mashhur', 'Tanlangan');
    matchedMovies.push(...INITIAL_MOVIES.slice(0, 4));
    explanation = `Sizning "${userQuery}" so'rovingiz bo'yicha platformamizdagi eng mos va yuqori baholangan filmlarni saralab chiqdim. 
    
Quyidagi kartochkalardan birini tanlab, to'liq ma'lumot, treyler va qonuniy ko'rish havolalarini ochishingiz mumkin. Agar boshqa janr yoki aniq aktyor bo'yicha qidirmoqchi bo'lsangiz, bemalol yozing!`;
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
    recommendedMovies: uniqueMovies.slice(0, 5),
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
      const fallback = processUzbekMovieQuery(prompt);
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
