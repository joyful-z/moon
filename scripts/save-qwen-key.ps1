param([string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$secretDir = Join-Path $ProjectRoot '.secrets'
New-Item -ItemType Directory -Force -Path $secretDir | Out-Null
$secret = Read-Host '输入 Qwen API Key（输入时不会显示）' -AsSecureString
$cipher = ConvertFrom-SecureString -SecureString $secret
Set-Content -LiteralPath (Join-Path $secretDir 'qwen-api-key.dpapi') -Value $cipher -Encoding UTF8
Write-Output 'Qwen API Key 已使用当前 Windows 用户的 DPAPI 加密保存。'
