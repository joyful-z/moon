$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $project 'dist/assets/rws-pam-a'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
$api = 'https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category%3ARider-Waite-Smith_tarot_deck_%28TaionWC%29&gcmtype=file&gcmlimit=max&prop=imageinfo&iiprop=url%7Csize&format=json'
$headers = @{ 'User-Agent' = 'MoziTarotLocal/1.0 (personal offline tarot site)' }
$response = Invoke-RestMethod -Uri $api -Headers $headers
$pages = @($response.query.pages.PSObject.Properties.Value) | Sort-Object title
if ($pages.Count -ne 78) { throw "Expected 78 images, received $($pages.Count)." }
$manifest = @()
$number = 0
foreach ($page in $pages) {
    $number++
    $name = $page.title.Substring(5)
    if ($name -notmatch '^[A-Za-z0-9 .-]+\.jpg$') { throw "Unexpected image name: $name" }
    $source = $page.imageinfo[0].url.Split('?')[0]
    $expectedSize = [int64]$page.imageinfo[0].size
    $target = Join-Path $destination $name
    if (-not (Test-Path -LiteralPath $target) -or (Get-Item -LiteralPath $target).Length -ne $expectedSize) {
        $temporary = "$target.part"
        $success = $false
        for ($attempt = 1; $attempt -le 3 -and -not $success; $attempt++) {
            try {
                Invoke-WebRequest -Uri $source -OutFile $temporary -Headers $headers
                if ((Get-Item -LiteralPath $temporary).Length -ne $expectedSize) { throw "Size mismatch: $name" }
                Move-Item -LiteralPath $temporary -Destination $target -Force
                $success = $true
            } catch {
                if ($attempt -eq 3) { throw }
                Start-Sleep -Seconds (2 * $attempt)
            }
        }
    }
    $hash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
    $manifest += [ordered]@{ file = $name; source = $source; bytes = $expectedSize; sha256 = $hash }
    if ($number % 10 -eq 0 -or $number -eq 78) { Write-Output "Downloaded/verified $number / 78" }
}
$manifestPath = Join-Path $destination 'manifest.json'
[ordered]@{
    collection = 'Rider-Waite-Smith tarot deck (TaionWC), Pam-A scans'
    source = 'https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)'
    files = $manifest
} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifestPath -Encoding utf8
Write-Output "Verified 78 original scans in $destination"
