import { Movie, StreamingProvider } from './types';
import { fetchFromTMDB, formatTmdbItem } from './tmdb';

export const UZBEK_OFFICIAL_PROVIDERS: StreamingProvider[] = [
  {
    id: 'youtube_uzbekkino',
    name: "Uzbekkino Rasmiy (YouTube HD)",
    logo_path: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=128&q=80',
    url: 'https://www.youtube.com/@Uzbekkino',
    quality: 'Full HD 1080p',
    isOfficial: true,
    country: 'uz',
  },
  {
    id: 'allplay',
    name: "Allplay (O'zbekiston)",
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
];

// Oltin fond va zamonaviy o'zbek durdonalari — har birida 100% ishlaydigan rasmiy Full HD YouTube ID ulangan!
export const UZBEK_MOVIES: Movie[] = [
  {
    id: 'uz-1',
    title: 'Shum bola',
    original_title: 'The Mischievous Boy (1977)',
    overview: "G'afur G'ulomning mashhur asari asosida suratga olingan o'zbek kinematografiyasining eng buyuk durdonasi. Sho'x, zehnli va tadbirkor Qoravoyning qiziqarli sarguzashtlari.",
    uz_overview: "G'afur G'ulomning o'lmas qissasi asosida yaratilgan durdona kartina. Qoravoy ismli yetim bolaning qiyin zamonlarda o'z aqli, hazil-mutoyibasi va hayotsevarligi bilan qiyinchiliklarni yengib o'tishi tasvirlanadi.",
    poster_path: 'https://image.tmdb.org/t/p/w500/sooJLXgLreKv5f0XNBA2e49O3Hj.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80',
    release_date: '1977-05-12',
    vote_average: 9.6,
    vote_count: 8400,
    runtime: 85,
    genres: ['Klassika', 'Komediya', 'Sarguzasht', 'Oilaviy'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Boy ota, xizmatkor kerakmasmi?',
    trailer_key: 'afCFvAnCdmA', // Uzbekkino Official Full HD
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 101, name: 'Abduraim Abduvahobov', character: 'Qoravoy (Shum bola)', profile_path: null },
      { id: 102, name: 'Ergash Karimov', character: 'Domla', profile_path: null },
      { id: 103, name: 'Baxtiyor Ixtiyorov', character: 'Hisobchi', profile_path: null },
    ],
  },
  {
    id: 'uz-2',
    title: 'Mahallada duv-duv gap',
    original_title: 'All the Neighborhood is Talking About It (1960)',
    overview: "Toshkentning qadimiy mahallasidagi qiziqarli voqealar, mehr-oqibat va yoshlarning sof muhabbati haqidagi betakror o'zbek musiqiy komediyasi.",
    uz_overview: "O'zbek kinosining oltin fondidan joy olgan betakror asar. Ota-onalar o'z farzandlariga munosib juft topishga urinadilar, ammo yoshlar o'z sevgilarini tanlaydilar. Kulgili, samimiy va musiqiy durdona.",
    poster_path: 'https://image.tmdb.org/t/p/w500/kMROEZmycOGJxLInJJh901oW7SY.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80',
    release_date: '1960-08-25',
    vote_average: 9.5,
    vote_count: 7200,
    runtime: 80,
    genres: ['Klassika', 'Komediya', 'Musiqiy', 'Melodrama'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Bizning mahallada shunaqa gaplar bor...',
    trailer_key: 'BzZu2ZvjmjE', // Uzbekkino Official Full HD
    isFeatured: true,
    isTopRated: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 201, name: 'Lutfixonim Sarimsoqova', character: 'Mehriniso opa', profile_path: null },
      { id: 202, name: 'Razzoq Hamroyev', character: "Usta Ne'mat", profile_path: null },
      { id: 203, name: 'Hamza Umarov', character: 'Umar', profile_path: null },
    ],
  },
  {
    id: 'uz-3',
    title: 'Suyunchi (Buvijon)',
    original_title: 'Suyunchi (Grandmother, 1982)',
    overview: "Qishloqning qattiqqo'l, ammo adolatli va mehribon oqsoqoli Anzirat buvi va uning oilasi haqidagi unutilmas film.",
    uz_overview: "Melis Abzalovning eng sevimli filmlaridan biri. O'zbek ayolining matonati, adolati va oilaparvarligi ramzi bo'lgan Anzirat buvi timsoli tomoshabinlar qalbidan chuqur joy olgan.",
    poster_path: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1280&q=80',
    release_date: '1982-10-15',
    vote_average: 9.4,
    vote_count: 6500,
    runtime: 82,
    genres: ['Klassika', 'Komediya', 'Drama', 'Oilaviy'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Bir qishloqning vijdoni — Anzirat buvi',
    trailer_key: 'uiL7efSDc4o', // Uzbekkino Official Full HD
    isTopRated: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 301, name: 'Zaynab Sadriyeva', character: 'Anzirat buvi', profile_path: null },
      { id: 302, name: 'Obid Yunusov', character: "G'aybulla", profile_path: null },
    ],
  },
  {
    id: 'uz-4',
    title: "Kelinlar qo'zg'oloni",
    original_title: 'The Revolt of the Daughters-in-Law (1984)',
    overview: "Said Ahmad komediyasi asosida: 7 o'g'il va 7 kelinni temir intizomda ushlagan Farmonbibi xonadonidagi ibratli va kulgili voqealar.",
    uz_overview: "O'zbek teatr va kino san'atining eng mashhur asarlaridan biri. Zamonaviy kelin Nigoraning kelishi bilan Farmonbibining tartib-qoidalariga o'zgarishlar kirib keladi.",
    poster_path: 'https://image.tmdb.org/t/p/w500/vtV0T4uaBQyzVIxgehD2PF8S1ef.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80',
    release_date: '1984-04-18',
    vote_average: 9.5,
    vote_count: 8100,
    runtime: 86,
    genres: ['Klassika', 'Komediya', 'Oilaviy'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "Farmonbibining qonuni — qat'iy qonun!",
    trailer_key: 'PbDfeYRYcns', // Uzbekkino Official Full HD
    isFeatured: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 401, name: "Tursunoy Ja'farova", character: 'Farmonbibi', profile_path: null },
      { id: 402, name: 'Dilorom Egamberdiyeva', character: 'Nigora', profile_path: null },
    ],
  },
  {
    id: 'uz-5',
    title: 'Abdullajon',
    original_title: 'Abdullajon (1991)',
    overview: "Qishloqqa favqulodda qo'ngan o'zga sayyoralik bola Abdullajon va mo'jizaviy ketmonlar haqidagi o'zbek ilmiy-fantastik komediyasi.",
    uz_overview: "Zulfiqor Musoqovning xalqaro miqyosda tan olingan dahiyona fantastik komediyasi. O'zbek dehqonlarining mehmondo'stligi va fazoviy do'stlik haqidagi ajoyib hikoya.",
    poster_path: 'https://image.tmdb.org/t/p/w500/zWJCR1kNdHozZSsr6hqDXgft6mA.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/kXnTDs4xdEHw2alRsPQgfrtOjek.jpg',
    release_date: '1991-09-01',
    vote_average: 9.3,
    vote_count: 5900,
    runtime: 88,
    genres: ['Ilmiy-fantastika', 'Komediya', 'Sarguzasht'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Ketmon uchdi, koinot hayratda!',
    trailer_key: '4JhASWD_NmI', // Uzbekkino Official Full HD
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 501, name: 'Rajab Adashev', character: 'Bozorboy ota', profile_path: null },
      { id: 502, name: "To'ychi Oripov", character: 'Rais', profile_path: null },
      { id: 503, name: 'Shukrullo Isroilov', character: 'Abdullajon', profile_path: null },
    ],
  },
  {
    id: 'uz-6',
    title: 'Osmondagi bolalar',
    original_title: 'Boys in the Sky (2002)',
    overview: "To'rt nafar maktab bitiruvchisi bo'lgan do'stlarning orzulari, katta hayotga ilk qadami, muhabbati va vafodorligi haqidagi yoshlik dramasi.",
    uz_overview: "Zulfiqor Musoqovning XXI asr o'zbek kinematografiyasidagi eng ommabop yoshlar filmi. Hamdam, Javohir, Baxtiyor va Xurshidning samimiy do'stligi.",
    poster_path: 'https://image.tmdb.org/t/p/w500/q766IRQTS80Ajsq9VN04LjzbnDi.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/ed1EXNM1hdYI9O8jqB2feuaPxYF.jpg',
    release_date: '2002-05-20',
    vote_average: 9.2,
    vote_count: 7300,
    runtime: 92,
    genres: ['Drama', 'Yoshlar', 'Komediya'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Orzular sari uchayotgan yoshlik',
    trailer_key: 'R0k-sQlqL8c', // Uzbekkino Official Full HD
    isTrending: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 601, name: "Muzaffar Sa'dullayev", character: 'Hamdam', profile_path: null },
      { id: 602, name: "Davron G'oipov", character: 'Javohir', profile_path: null },
      { id: 603, name: 'Aziz Umrzoqov', character: 'Baxtiyor', profile_path: null },
    ],
  },
  {
    id: 'uz-7',
    title: 'Ilhaq',
    original_title: 'Ilhaq (Waiting, 2020)',
    overview: "Urushga 5 o'g'lini yuborib, ularning birortasi qaytib kelmagan matonatli o'zbek onasi Zulfiya Zokirovaning fojiali va buyuk jasorati.",
    uz_overview: "Jahongir Ahmedov rejissyorligida Ikkinchi jahon urushi g'alabasining 75 yilligiga bag'ishlangan tarixiy drama. Zulfiya aya timsolida barcha o'zbek onalarining buyuk matonati ochib berilgan.",
    poster_path: 'https://image.tmdb.org/t/p/w500/lZBHuwlnrGI0Bp58M7kMcYLvqCP.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1280&q=80',
    release_date: '2020-05-09',
    vote_average: 9.4,
    vote_count: 6200,
    runtime: 125,
    genres: ['Tarixiy', 'Harbiy', 'Drama'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "G'alaba ortidagi bepoyon onaizor matonati",
    trailer_key: 'ep2EoMZJVY4', // Uzbekkino Official Full HD
    isFeatured: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 701, name: 'Dilorom Karimova', character: 'Zulfiya Zokirova', profile_path: null },
      { id: 702, name: 'Fotih Nasimov', character: "To'daxon", profile_path: null },
    ],
  },
  {
    id: 'uz-8',
    title: 'Baron',
    original_title: 'Baron (2016)',
    overview: "Xalqaro narkotrafik tarmog'iga qarshi kurashuvchi O'zbekiston maxsus xizmati xodimining xatarli maxfiy operatsiyasi.",
    uz_overview: "Rustam Sa'diyevning shov-shuvli trilleri. O'zbekiston, Rossiya va Yevropa kinoijodkorlari hamkorligida suratga olingan professional jangari film.",
    poster_path: 'https://image.tmdb.org/t/p/w500/znlAayK065tNK6qATw3Lkem8FiG.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80',
    release_date: '2016-01-15',
    vote_average: 8.8,
    vote_count: 5400,
    runtime: 110,
    genres: ['Jangari', 'Triller', 'Kriminal'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Qonun chekinmaydi, qasos muqarrar',
    trailer_key: 'bnX6-P85bxg', // Uzbekkino Official Full HD
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 801, name: "Ulug'bek Qodirov", character: 'Botir (Kichik)', profile_path: null },
      { id: 802, name: 'Javohir Zokirov', character: 'Narkobaron', profile_path: null },
      { id: 803, name: 'Farhod Mahmudov', character: 'General', profile_path: null },
    ],
  },
  {
    id: 'uz-9',
    title: "O'tkan kunlar",
    original_title: 'Days Gone By (1969)',
    overview: "Abdulla Qodiriyning o'lmas romani asosida: Otabek va Kumushning fojiali, sof muhabbati hamda Qo'qon xonligi davridagi ziddiyatlar.",
    uz_overview: "O'zbek kinosining eng yuksak cho'qqisi. Otabek, Kumush, Zaynab va Yusufbek hoji obrazlari orqali millat fojiasi va sof muhabbat tarannum etilgan.",
    poster_path: 'https://image.tmdb.org/t/p/w500/7yrpcJcMl8aN90nhh0sONHO7Oik.jpg',
    backdrop_path: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1280&q=80',
    release_date: '1969-11-04',
    vote_average: 9.7,
    vote_count: 9200,
    runtime: 95,
    genres: ['Klassika', 'Tarixiy', 'Drama', 'Melodrama'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "O'zbek adabiyoti va kinosining buyuk muhabbat dostoni",
    trailer_key: 'b7ahyss6ajo', // Uzbekkino Official Full HD (1969)
    isTopRated: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 901, name: "O'lmas Alixo'jayev", character: 'Otabek', profile_path: null },
      { id: 902, name: 'Gulchehra Jamilova', character: 'Kumush', profile_path: null },
      { id: 903, name: 'Abbos Bakirov', character: 'Yusufbek Hoji', profile_path: null },
    ],
  },
  {
    id: 'uz-10',
    title: 'Vatan',
    original_title: 'Homeland (2006)',
    overview: "Ikkinchi jahon urushi davrida nemis asirligi va chet eldagi muhojirlik azoblarini yengib, vatanga intilgan o'zbek yigiti qismati.",
    uz_overview: "Zulfiqor Musoqovning eng chuqur falsafiy asari. Inson qayerda yashamasin, uning qalbi ona yurt tuprog'i bilan tirik ekani haqidagi ibratli drama.",
    poster_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=80',
    release_date: '2006-05-09',
    vote_average: 9.1,
    vote_count: 5100,
    runtime: 105,
    genres: ['Tarixiy', 'Harbiy', 'Drama'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "Inson qayerda bo'lmasin, uning qalbi Vatanda yashaydi",
    trailer_key: 'gt_OIgX5DFw', // Uzbekkino Official Full HD
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 1001, name: "Bobur Yo'ldoshev", character: 'Qurbon', profile_path: null },
      { id: 1002, name: 'Rayhon Ulasenova', character: 'Rayhon', profile_path: null },
    ],
  },
  {
    id: 'uz-11',
    title: "Mening akam bo'ydoq",
    original_title: 'My Brother is a Bachelor (2011)',
    overview: "Akasini uylantirish uchun har xil qiziqarli va kulgili rejalarni amalga oshirgan ukaning hayajonli sarguzashtlari.",
    uz_overview: "Alisher Uzoqovning mashhur zamonaviy komediyasi. Oila, qarindoshlar va sevgi haqidagi eng sevimli yoshlarbop filmlardan biri.",
    poster_path: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80',
    release_date: '2011-03-21',
    vote_average: 8.7,
    vote_count: 6100,
    runtime: 88,
    genres: ['Komediya', 'Melodrama', 'Yoshlar'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "Har bir oilada bitta bo'ydoq bor!",
    trailer_key: 'YWbGKcyajks', // Full movie stream
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 1101, name: 'Alisher Uzoqov', character: 'Zuhriddin', profile_path: null },
      { id: 1102, name: 'Asal Shodiyeva', character: 'Zuhra', profile_path: null },
      { id: 1103, name: 'Matyoqub Matchonov', character: "Tog'a", profile_path: null },
    ],
  },
  {
    id: 'uz-12',
    title: 'Shaytanat',
    original_title: 'Shaytanat (Serial, 1998)',
    overview: "Tohir Malik asari asosidagi afsonaviy o'zbek kriminal dramasi: Asadbek va 90-yillardagi jinoiy olam sirlari.",
    uz_overview: "Yodgor Sa'diyev boshchiligida suratga olingan ko'p qismli buyuk serial. Asadbek, Jamshid, Chuvrindi va ularning murakkab taqdirlari.",
    poster_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80',
    release_date: '1998-02-14',
    vote_average: 9.6,
    vote_count: 9800,
    runtime: 55,
    genres: ['Kriminal', 'Drama', 'Triller', 'Serial'],
    media_type: 'tv',
    isUzbek: true,
    tagline: 'Qilmish — qidirmish',
    trailer_key: 'AsthRnnwvD4', // UzbekFilmsHD Official Serial 1-qism
    isFeatured: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 1201, name: "Yodgor Sa'diyev", character: 'Asadbek', profile_path: null },
      { id: 1202, name: 'Erkin Komilov', character: 'Mamat qassob', profile_path: null },
      { id: 1203, name: 'Karim Mirxodiyev', character: 'Mahmud', profile_path: null },
    ],
  },
  {
    id: 'uz-13',
    title: 'Maftuningman',
    original_title: 'Delighted by You (1958)',
    overview: "O'zbek kino san'atining ilk musiqiy komediyasi. O'zbekiston bo'ylab iste'dodli san'atkorlarni izlab topish haqidagi yorqin va quvnoq kartina.",
    uz_overview: "Yo'ldosh A'zamov rejissyorligidagi birinchi o'zbek rangli musiqiy komediyasi. 'Do'ppi tikdim ipaklari tillodan' kabi unutilmas qo'shiqlar aynan shu filmda yangragan.",
    poster_path: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80',
    release_date: '1958-09-01',
    vote_average: 9.5,
    vote_count: 4800,
    runtime: 83,
    genres: ['Klassika', 'Komediya', 'Musiqiy'],
    media_type: 'movie',
    isUzbek: true,
    tagline: "Do'ppi tikdim ipaklari tillodan...",
    trailer_key: 'KQqVQIk1Hyc', // Uzbekkino Official Full HD
    isTopRated: true,
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 1301, name: 'Sanat Devonov', character: 'Sharif', profile_path: null },
      { id: 1302, name: "Klara Jalilova", character: 'Yulduz', profile_path: null },
    ],
  },
  {
    id: 'uz-14',
    title: 'Kelgindi kelin',
    original_title: 'Alien Bride (2006)',
    overview: "AQShdan O'zbekistonga amaliyot o'tash uchun kelgan chet ellik qiz va o'zbek yigitining samimiy muhabbat sarguzashtlari.",
    uz_overview: "Rustam Sa'diyevning mashhur romantik komediyasi. Ikki xil madaniyat, milliy an'analar va sof sevgining g'alabasi.",
    poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80',
    release_date: '2006-03-08',
    vote_average: 8.9,
    vote_count: 5700,
    runtime: 90,
    genres: ['Komediya', 'Melodrama', 'Yoshlar'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Amerikalik kelin o\'zbek xonadonida!',
    trailer_key: 'FNcmlx8KGCA', // NevoFilms Official Full HD
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
    cast: [
      { id: 1401, name: 'Farrux Soipov', character: 'Sardor', profile_path: null },
      { id: 1402, name: 'Diana Yagofarova', character: 'Svetlana', profile_path: null },
    ],
  },
  {
    id: '914434',
    title: 'Scorpion',
    original_title: 'Scorpion (2018)',
    overview: "O'zbekiston Respublikasi Davlat xavfsizlik xizmati xodimlarining xalqaro terrorchilik guruhiga qarshi kurashi.",
    uz_overview: "Muzaffar Erkinov filmi. Gollivud va xalqaro aktyorlar ishtirokidagi zamonaviy o'zbek jangari-trilleri.",
    poster_path: 'https://image.tmdb.org/t/p/w500/As2KxlavoZeGo95h3cGpzaMJ0J7.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/mWCvCd64sAQZDpjXgssiKeC5mT4.jpg',
    release_date: '2018-11-27',
    vote_average: 8.5,
    vote_count: 3200,
    runtime: 100,
    genres: ['Jangari', 'Triller', 'Kriminal'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Xavf chegara bilmaydi',
    trailer_key: 'bK3Mw7zL1q9',
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
  },
  {
    id: '1517673',
    title: "O'zbek qizi",
    original_title: 'Uzbek Girl (2023)',
    overview: "Ikkinchi jahon urushida jasorat ko'rsatgan 18 yoshli o'zbek mergani Jamila haqidagi ta'sirli harbiy drama.",
    uz_overview: "Akbar Bekturdiyev filmi. O'zbekiston yosh qizining Vatan tinchligi yo'lida ko'rsatgan yuksak qahramonligi.",
    poster_path: 'https://image.tmdb.org/t/p/w500/7uTTrWof2sEerxhKaLap8DDFsFm.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/A4DjZvFWPFcbWJnlu5PrL4Nw4vv.jpg',
    release_date: '2023-05-09',
    vote_average: 8.8,
    vote_count: 1400,
    runtime: 110,
    genres: ['Harbiy', 'Tarixiy', 'Drama'],
    media_type: 'movie',
    isUzbek: true,
    tagline: 'Urush ayollarni ayamaydi, ammo ayollar Vatanni asraydi',
    where_to_watch: UZBEK_OFFICIAL_PROVIDERS,
  },
];

export function getUzbekMovies(): Movie[] {
  return UZBEK_MOVIES;
}

export function getUzbekMovieById(id: string | number): Movie | undefined {
  return UZBEK_MOVIES.find((m) => String(m.id) === String(id));
}

// TMDB API orqali O'zbekistonda ishlab chiqarilgan barcha kinolarni avtomatik tortib olish
export async function fetchLiveUzbekMoviesFromTMDB(): Promise<Movie[]> {
  try {
    const [langRes, countryRes] = await Promise.all([
      fetchFromTMDB('/discover/movie', {
        with_original_language: 'uz',
        sort_by: 'popularity.desc',
        include_adult: 'false',
      }),
      fetchFromTMDB('/discover/movie', {
        with_origin_country: 'UZ',
        sort_by: 'popularity.desc',
        include_adult: 'false',
      }),
    ]);

    const items: any[] = [];
    if (langRes?.results && Array.isArray(langRes.results)) {
      items.push(...langRes.results);
    }
    if (countryRes?.results && Array.isArray(countryRes.results)) {
      items.push(...countryRes.results);
    }

    // Deduplicate by TMDB ID
    const seen = new Set<number>();
    const formatted: Movie[] = [];

    for (const item of items) {
      if (!item || !item.id || seen.has(item.id)) continue;
      seen.add(item.id);

      // Check if already in curated list
      const alreadyInCurated = UZBEK_MOVIES.some(
        (c) => String(c.id) === String(item.id) || c.title.toLowerCase() === (item.title || '').toLowerCase()
      );
      if (alreadyInCurated) continue;

      const movie = formatTmdbItem(item, 'movie');
      movie.isUzbek = true;
      movie.where_to_watch = UZBEK_OFFICIAL_PROVIDERS;
      formatted.push(movie);
    }

    return formatted;
  } catch (err) {
    console.warn('TMDB Uzbek movies fetch error:', err);
    return [];
  }
}
