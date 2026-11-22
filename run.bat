@echo off
title Kino uz - Web Platform
set PATH=%~dp0..\nodejs;%PATH%
echo ========================================================
echo   KINO UZ - Discover. Explore. Experience.
echo   Ishga tushirilmoqda: http://localhost:3000
echo ========================================================
cd /d "%~dp0"
npm run dev
pause
