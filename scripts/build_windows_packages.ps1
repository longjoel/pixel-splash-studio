$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$appName = "pixel-splash-studio"
$config = if ($env:CONFIG) { $env:CONFIG } else { "Release" }
$distDir = Join-Path $root "dist\windows"
$rids = @("win-x64", "win-arm64")

if (Test-Path $distDir) {
    Remove-Item $distDir -Recurse -Force
}
New-Item -ItemType Directory -Path $distDir | Out-Null

function Publish-App([string]$rid) {
    $publishDir = Join-Path $distDir $rid
    New-Item -ItemType Directory -Path $publishDir | Out-Null

    dotnet publish (Join-Path $root "pixel-splash-studio.csproj") `
        -c $config `
        -r $rid `
        --self-contained true `
        -o $publishDir

    return $publishDir
}

function Create-Zip([string]$rid, [string]$publishDir) {
    $zipPath = Join-Path $distDir "$appName-$rid.zip"
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    Compress-Archive -Path (Join-Path $publishDir "*") -DestinationPath $zipPath
}

function Create-Sfx([string]$rid, [string]$publishDir) {
    $sevenZip = Get-Command 7z -ErrorAction SilentlyContinue
    if (-not $sevenZip) {
        Write-Host "7z not found; skipping self-extracting .exe for $rid."
        return
    }

    $sfxPath = Join-Path $distDir "$appName-$rid.exe"
    if (Test-Path $sfxPath) {
        Remove-Item $sfxPath -Force
    }

    Push-Location $publishDir
    & $sevenZip.Path a -r -sfx $sfxPath * | Out-Null
    Pop-Location
}

foreach ($rid in $rids) {
    $publishDir = Publish-App $rid
    Create-Zip $rid $publishDir
    Create-Sfx $rid $publishDir
}

Write-Host "Windows packages created in $distDir"
