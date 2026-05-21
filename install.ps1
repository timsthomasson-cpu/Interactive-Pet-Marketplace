# GA4 Install Script
# ------------------
# Run this from the folder where you extracted the zip.
# It copies the three files into the project and verifies each one.

$projectRoot = "C:\Users\Tim Thomasson\Interactive-Pet-Marketplace"
$scriptDir = $PSScriptRoot

Write-Host ""
Write-Host "GA4 Installer for Interactive Pet Marketplace" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Source folder: $scriptDir"
Write-Host "Target folder: $projectRoot"
Write-Host ""

# Verify project root exists
if (-not (Test-Path $projectRoot)) {
    Write-Host "ERROR: Project folder not found at $projectRoot" -ForegroundColor Red
    Write-Host "Edit this script and update the projectRoot path at the top."
    exit 1
}

# Verify source files exist
$requiredFiles = @("GoogleAnalytics.tsx", "layout.tsx", "gitignore.txt")
foreach ($f in $requiredFiles) {
    if (-not (Test-Path (Join-Path $scriptDir $f))) {
        Write-Host "ERROR: Source file missing: $f" -ForegroundColor Red
        Write-Host "Did the zip extract correctly? This script must be in the same folder as the other files."
        exit 1
    }
}

# 1. Copy GoogleAnalytics.tsx -> components\
$src = Join-Path $scriptDir "GoogleAnalytics.tsx"
$dst = Join-Path $projectRoot "components\GoogleAnalytics.tsx"
Copy-Item $src $dst -Force
if (Test-Path $dst) {
    Write-Host "[OK] components\GoogleAnalytics.tsx" -ForegroundColor Green
} else {
    Write-Host "[FAIL] components\GoogleAnalytics.tsx" -ForegroundColor Red
}

# 2. Copy layout.tsx -> app\
$src = Join-Path $scriptDir "layout.tsx"
$dst = Join-Path $projectRoot "app\layout.tsx"
Copy-Item $src $dst -Force
if (Test-Path $dst) {
    $content = Get-Content $dst -Raw
    if ($content -match "GoogleAnalytics") {
        Write-Host "[OK] app\layout.tsx (contains GoogleAnalytics)" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] app\layout.tsx exists but missing GoogleAnalytics import" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] app\layout.tsx" -ForegroundColor Red
}

# 3. Copy gitignore.txt -> .gitignore
$src = Join-Path $scriptDir "gitignore.txt"
$dst = Join-Path $projectRoot ".gitignore"
Copy-Item $src $dst -Force
if (Test-Path $dst) {
    Write-Host "[OK] .gitignore" -ForegroundColor Green
} else {
    Write-Host "[FAIL] .gitignore" -ForegroundColor Red
}

# 4. Verify .env.local exists with the right key
$envFile = Join-Path $projectRoot ".env.local"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile -Raw
    if ($envContent -match "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-") {
        Write-Host "[OK] .env.local exists with Measurement ID" -ForegroundColor Green
    } else {
        Write-Host "[WARN] .env.local exists but missing NEXT_PUBLIC_GA_MEASUREMENT_ID" -ForegroundColor Yellow
    }
} else {
    Write-Host "[WARN] .env.local does not exist yet" -ForegroundColor Yellow
    Write-Host "       Create it in $projectRoot with this line:"
    Write-Host "       NEXT_PUBLIC_GA_MEASUREMENT_ID=G-R9QJCBP0RV"
}

Write-Host ""
Write-Host "Done. Next steps:" -ForegroundColor Cyan
Write-Host "  1. Stop the dev server (Ctrl+C in the npm run dev window)"
Write-Host "  2. Restart: npm run dev"
Write-Host "  3. Hard reload localhost:3000 in Edge (Ctrl+Shift+R)"
Write-Host "  4. In DevTools Elements tab, Ctrl+F search for 'googletagmanager'"
Write-Host ""
