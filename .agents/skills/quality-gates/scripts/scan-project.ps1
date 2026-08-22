param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('frontend', 'content', 'production')]
  [string]$Mode,

  [string]$Target = ''
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path
$script:matchCount = 0
$script:missingScopeCount = 0
$script:scopeCount = 0
$script:fileCount = 0

function Get-ScanFiles {
  param([string]$Path)

  $item = Get-Item -LiteralPath $Path -ErrorAction Stop
  if ($item.PSIsContainer) {
    return @(& rg --files --hidden --glob '!.git/**' -- $Path)
  }

  return @($item.FullName)
}

function Invoke-PatternScan {
  param([string[]]$Paths, [string[]]$Patterns)

  foreach ($Path in $Paths) {
    if (-not (Test-Path -LiteralPath $Path)) {
      Write-Output "FAIL: scope does not exist: $Path"
      $script:missingScopeCount++
      continue
    }

    $files = @(Get-ScanFiles $Path)
    if ($files.Count -eq 0) {
      Write-Output "FAIL: scope contains no files: $Path"
      $script:missingScopeCount++
      continue
    }

    $script:scopeCount++
    $script:fileCount += $files.Count
    Write-Output "scope: $Path ($($files.Count) files)"

    foreach ($pattern in $Patterns) {
      Write-Output "pattern: $pattern"
      $matches = @(
        & rg -n --hidden --glob '!.git/**' `
          --glob '!docs/00-brand-brief.md' `
          --glob '!docs/01-content-facts.md' `
          --glob '!docs/02-copywriting-guidelines.md' `
          --glob '!docs/03-site-structure-and-domains.md' `
          --glob '!docs/04-tech-spec.md' `
          --glob '!docs/05-task-breakdown-for-codex.md' `
          -- $pattern $Path
      )
      $rgExitCode = $LASTEXITCODE
      if ($rgExitCode -gt 1) {
        throw "rg failed for pattern: $pattern"
      }
      if ($rgExitCode -eq 0) {
        $script:matchCount += $matches.Count
        $matches | Write-Output
      }
    }
  }
}

switch ($Mode) {
  'frontend' {
    $scopes = if ($Target) {
      @((Join-Path $repoRoot $Target))
    } else {
      @(
        (Join-Path $repoRoot 'apps/frontend/src'),
        (Join-Path $repoRoot 'apps/frontend/public'),
        (Join-Path $repoRoot 'apps/frontend/index.html'),
        (Join-Path $repoRoot 'apps/contact-api/src'),
        (Join-Path $repoRoot 'apps/contact-api/package.json'),
        (Join-Path $repoRoot 'apps/contact-api/tsconfig.json')
      )
    }
    Invoke-PatternScan $scopes @(
      'console\.log',
      'dangerouslySetInnerHTML',
      'TODO|FIXME',
      'href\s*=\s*["'']#["'']'
    )
  }
  'content' {
    $scopes = if ($Target) {
      @((Join-Path $repoRoot $Target))
    } else {
      @(
        (Join-Path $repoRoot 'apps/frontend/src'),
        (Join-Path $repoRoot 'apps/frontend/public'),
        (Join-Path $repoRoot 'apps/frontend/index.html')
      )
    }
    Invoke-PatternScan $scopes @(
      'innovative|passionate|cutting-edge|results-driven|highly motivated|rockstar|ninja|10x developer|coding is my passion',
      'farm|warming|purchased accounts|bought accounts|fake comments|fake likes|ban rate|detection evasion',
      'Lorem ipsum|placeholder testimonial|TODO'
    )
  }
  'production' {
    $scopes = if ($Target) {
      @((Join-Path $repoRoot $Target))
    } else {
      @((Join-Path $repoRoot 'apps/frontend/dist'))
    }
    Invoke-PatternScan $scopes @(
      'innovative|passionate|cutting-edge|results-driven|highly motivated|rockstar|ninja|10x developer|coding is my passion',
      'farm|warming|purchased accounts|bought accounts|fake comments|fake likes|ban rate|detection evasion',
      'SMTP_PASSWORD|MAIL_PASSWORD|API_KEY|TURNSTILE_SECRET|GA_MEASUREMENT_ID_SECRET'
    )
  }
}

if ($script:missingScopeCount -gt 0) {
  Write-Output "FAIL: $Mode scan could not inspect $script:missingScopeCount scope(s)."
  exit 1
}
if ($script:matchCount -gt 0) {
  Write-Output "FAIL: $Mode scan found $script:matchCount prohibited match(es)."
  exit 1
}

Write-Output "PASS: $Mode scan verified $script:fileCount files across $script:scopeCount scope(s)."
