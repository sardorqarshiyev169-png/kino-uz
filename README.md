# Kino uz — Professional Uzbek Movie Discovery & Streaming Platform

> **Discover. Explore. Experience.**

**Kino uz** — bu Netflix, IMDb va zamonaviy sun'iy intellekt (AI) texnologiyalarini o'zida mujassam etgan, o'zbek tilidagi eng mukammal kino, serial va anime kashfiyot platformasi.

---

## 🎨 Dizayn Tizimi (Design System)

Loyiha uchun belgilangan ranglar palitrasi:
* **Asosiy binafsha (Primary purple):** `#8B5CF6`
* **Ikkilamchi binafsha (Secondary purple):** `#A78BFA`
* **Qorong'i fon (Dark background):** `#0B0912`
* **Kartochka foni (Card background):** `#171326`
* **Ikkilamchi sirt (Secondary surface):** `#20192F`
* **Asosiy matn (Main text):** `#F5F3FF`
* **Xira matn (Muted text):** `#9991A8`
* **Chegaralar (Borders):** `#302542`

---

## 🚀 Texnologiyalar Steki (Tech Stack)

* **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons
* **Backend:** Next.js Server API Routes, Server Actions
* **Sun'iy Intellekt (AI):** O'zbek tilidagi tabiiy muloqot AI dvigateli + OpenAI/Gemini integratsiyasi
* **Ma'lumotlar bazasi & Auth:** Supabase / PostgreSQL (RLS himoyasi bilan) + LocalStorage kesh
* **Filmlar provayderi:** TMDB API (The Movie Database) + boyitilgan oflayn katalog
* **Tomosha qilish tizimi:** YouTube rasmiy treylerlar pleyeri + Qonuniy distribyutorlar (Allplay, ITV, Kinopoisk, Netflix)

---

## 📱 Sayt Sahifalari & Imkoniyatlar

1. **Bosh Sahifa (`/`)**:
   - Katta kinematik Hero banner va slayder
   - "Trenddagi filmlar", "Mashhur filmlar", "Top reytingli durdonalar" karusellari
   - 2024-yilgi yangi premyeralar
   - Ommabop seriallar va anime tavsiyalari
   - Foydalanuvchi uchun shaxsiy tavsiyalar
   - Interaktiv AI kino yordamchisi bo'limi
   - Qonuniy litsenziya va TMDB attibutsiyasi ko'rsatilgan zamonaviy footer

2. **Filmlar Katalogi (`/movies`)**:
   - Qidiruv, janrlar filtri (Jangari, Fantastika, Triller, Drama, Komediya va h.k.)
   - Yillar filtri (2024, 2023, 2020-yillar, klassika)
   - Reyting filtri (7.0+, 8.0+, 8.5+ ball)
   - Saralash (ommaboplik, reyting, premyera sanasi) va sahifalash

3. **Seriallar (`/tv`)**:
   - Seriallar katalogi, mavsumlar va epizodlar haqida batafsil ma'lumotlar oynasi

4. **Anime Portali (`/anime`)**:
   - Titanlar Hujumi, Demon Slayer, Solo Leveling, Hayao Miyazaki durdonalari
   - Shonen, Studio Ghibli, Fantastika bo'yicha toifalar

5. **Film / Serial Tafsilotlari (`/movie/[id]`)**:
   - Katta atmosferik fon tasviri va poster
   - O'zbek va ingliz tilidagi sinopsis
   - Chiqarilgan yili, davomiyligi, janrlar, TMDB/IMDb reytingi
   - Bosh qahramonlar va aktyorlar suratlari
   - YouTube rasmiy treylerni modal orqali tomosha qilish
   - **"Qayerda rasmiy tomosha qilish mumkin?"** bo'limi (Allplay UZ, ITV, Kinopoisk, Netflix)
   - Baholash (1-10 yulduz) va sharh qoldirish
   - O'xshash filmlar tavsiyasi

6. **Universal Qidiruv (`/search`)**:
   - Jonli avtoto'ldirish (autocomplete)
   - Filmlar, seriallar, animelar va aktyorlar bo'yicha qidiruv

7. **Kutubxona — Sevimlilar & Watchlist (`/favorites`, `/watchlist`)**:
   - Saqlangan kartinalar, ko'rish rejasi, tezkor o'chirish va tomosha qilish

8. **Foydalanuvchi Profili (`/profile`)**:
   - Shaxsiy kabinet, avatar almashtirish, ko'rishlar tarixi (History), chiqish

9. **AI Kino Maslahatchisi (`/ai-assistant`)**:
   - O'zbek tilidagi tabiiy savollarni to'liq tushunadi
   - So'rovlar misoli:
     - *"Menga Interstellar kabi filmlar top"*
     - *"Eng yaxshi detektiv kinolarni tavsiya qil"*
     - *"Bugun ko'rishga qiziqarli thriller kerak"*
     - *"Leonardo DiCaprio ishtirokidagi filmlarni top"*
   - Sabablari bilan izohlaydi va film kartochkalarini chiqarib beradi!

10. **Admin Boshqaruv Paneli (`/admin`)**:
    - Jami va faol foydalanuvchilar, umumiy ko'rishlar, AI so'rovlari statistikasi
    - Hero banneri uchun film tanlash
    - Foydalanuvchilar ro'yxati va rollar nazorati
    - Sharhlarni moderatsiya qilish
    - AI va TMDB API sozlamalari

---

## 🛠 O'rnatish va Ishga Tushirish

Loyihani ishga tushirish uchun quyidagi buyruqlarni bajaring:

```bash
# Loyiha papkasiga o'ting
cd kino-uz

# Bog'liqliklarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish
npm run dev
```

Brauzerda oching: **[http://localhost:3000](http://localhost:3000)**

---

## 🗄 Ma'lumotlar Bazasi (Supabase SQL)

`database/schema.sql` faylida PostgreSQL / Supabase jadvallari, indekslar va RLS xavfsizlik qoidalari joylashgan:
- `profiles`
- `favorites`
- `watchlists`
- `viewing_history`
- `ai_conversations`
- `ai_messages`
- `reviews`
