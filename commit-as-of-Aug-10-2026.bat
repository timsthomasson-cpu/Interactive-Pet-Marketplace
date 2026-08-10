call npm run generate:products
if errorlevel 1 (
    echo ERROR: Product data generation failed. Commit cancelled.
    exit /b 1
)

git pull
git add -A
git commit -m "Warm golden redesign, product images, layout cleanup"
git push origin main