@echo off

call npm run generate:products
if errorlevel 1 (
    echo ERROR: Product generation failed. Commit cancelled.
    exit /b 1
)

python Documentation/generate_ranked_list.py all
if errorlevel 1 (
    echo ERROR: Best For generation failed. Commit cancelled.
    exit /b 1
)

git add -A
if errorlevel 1 (
    echo ERROR: Git staging failed.
    exit /b 1
)

git status

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes need to be committed.
    exit /b 0
)

git commit -m "Regenerate product and Best For data"
if errorlevel 1 (
    echo ERROR: Commit failed.
    exit /b 1
)

git push
if errorlevel 1 (
    echo ERROR: Push failed.
    exit /b 1
)

echo Commit and push completed successfully.