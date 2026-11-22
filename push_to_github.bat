@echo off
title Push Kino uz to GitHub
cd /d "%~dp0"
echo ========================================================
echo   KINO UZ - GitHubga yuklash (Pushing to GitHub)
echo ========================================================
git -c safe.directory=* branch -M main
git -c safe.directory=* push -u origin main
echo.
echo ========================================================
echo   Yuklandi! Endi Vercel.com ga ulasangiz bo'ladi!
echo ========================================================
pause
