call npm run generate:products
if errorlevel 1 exit /b 1

python Documentation/generate_ranked_list.py all
if errorlevel 1 exit /b 1

git status
git add -A
git commit -m "Regenerate product and Best For data"
git push