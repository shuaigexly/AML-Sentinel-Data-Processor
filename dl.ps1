$token = "vca_1cncvNWyt46VrbrpAisYiR4TTBNGgi7TtLHa82t0t5L9UUoAIj2rpbHP"
$headers = @{ Authorization = "Bearer $token" }
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$teamId = "team_LpIGAZDgC2CR4wDQzmrgC3sF"
$depId = "dpl_ATypx6M9Nwffp8e8m3Q2kSq3XHoF"
$baseUrl = "https://api.vercel.com"
$outDir = "D:\TradingBots\claude\aduit_program"

# Recursively collect all files with their SHA
function Collect-Files($items, $path) {
    $result = @()
    foreach ($item in $items) {
        $fullPath = if ($path) { "$path/$($item.name)" } else { $item.name }
        if ($item.type -eq "directory") {
            $result += Collect-Files $item.children $fullPath
        } else {
            $result += [PSCustomObject]@{ Path = $fullPath; Uid = $item.uid }
        }
    }
    return $result
}

Write-Host "Fetching file list..."
$files = Invoke-RestMethod -Uri "$baseUrl/v6/deployments/$depId/files?teamId=$teamId" -Headers $headers

$allFiles = Collect-Files $files ""
$srcFiles = $allFiles | Where-Object { $_.Path -like "src/*" -and $_.Path -notlike "*/nul" }
Write-Host "Source files to download: $($srcFiles.Count)"

$downloaded = 0
$errors = 0

foreach ($f in $srcFiles) {
    $relPath = $f.Path.Substring(4)  # strip "src/"
    $localPath = Join-Path $outDir $relPath

    $dir = Split-Path $localPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    try {
        $fileUrl = "$baseUrl/v6/deployments/$depId/files/$($f.Uid)?teamId=$teamId"

        if ($localPath -match "\.(pdf|db|png|jpg|jpeg|gif|ico|webp)$") {
            $resp = Invoke-WebRequest -Uri $fileUrl -Headers $headers -OutFile $localPath
        } else {
            $resp = Invoke-WebRequest -Uri $fileUrl -Headers $headers
            $text = [System.Text.Encoding]::UTF8.GetString($resp.Content)
            [System.IO.File]::WriteAllText($localPath, $text, [System.Text.Encoding]::UTF8)
        }
        $downloaded++
        Write-Host "  OK: $relPath"
    } catch {
        $errors++
        $msg = $_.Exception.Message
        if ($msg.Length -gt 100) { $msg = $msg.Substring(0, 100) }
        Write-Host "  ERR: $relPath - $msg"
    }
}

Write-Host ""
Write-Host "Done! Downloaded: $downloaded  Errors: $errors"
