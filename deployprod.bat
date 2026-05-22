@echo off
echo =====================================
echo Starting build and deployment process
echo =====================================

echo.
echo [1/3] Running npm build...
call npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: npm run build failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Running OpenNext Cloudflare build...
call npx opennextjs-cloudflare build

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: opennextjs-cloudflare build failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Deploying with Wrangler...
call npx wrangler deploy

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: wrangler deploy failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo =====================================
echo Deployment completed successfully!
echo =====================================

pause