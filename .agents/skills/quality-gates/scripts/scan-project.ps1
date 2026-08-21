param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('frontend', 'content', 'production')]
  [string]$Mode,

  [string]$Target = ''
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path

function Invoke-PatternScan {
  param([string]$Path, [string[]]$Patterns)

  if (-not (Test-Path -LiteralPath $Path)) {
    Write-Output "DEFERRED: scope does not exist: $Path"
    return
  }

  foreach ($pattern in $Patterns) {
    Write-Output "pattern: $pattern"
    & rg -n --hidden --glob '!.git/**' --glob '!docs/00-brand-brief.md' --glob '!docs/01-content-facts.md' --glob '!docs/02-copywriting-guidelines.md' --glob '!docs/03-site-structure-and-domains.md' --glob '!docs/04-tech-spec.md' --glob '!docs/05-task-breakdown-for-codex.md' -- $pattern $Path
    if ($LASTEXITCODE -gt 1) {
      throw "rg failed for pattern: $pattern"
    }
  }
}

switch ($Mode) {
  'frontend' {
    $scope = if ($Target) { Join-Path $repoRoot $Target } else { Join-Path $repoRoot 'src' }
    Invoke-PatternScan $scope @(
      'console\.log',
      'dangerouslySetInnerHTML',
      'TODO|FIXME',
      'href\s*=\s*["'']#["'']'
    )
  }
  'content' {
    $scope = if ($Target) { Join-Path $repoRoot $Target } else { Join-Path $repoRoot 'src' }
    Invoke-PatternScan $scope @(
      'innovative|passionate|cutting-edge|results-driven|highly motivated|rockstar|ninja|10x developer|coding is my passion',
      'farm|warming|purchased accounts|bought accounts|fake comments|fake likes|ban rate|detection evasion',
      'Lorem ipsum|placeholder testimonial|TODO'
    )
  }
  'production' {
    $dist = Join-Path $repoRoot 'dist'
    Invoke-PatternScan $dist @(
      'innovative|passionate|cutting-edge|results-driven|highly motivated|rockstar|ninja|10x developer|coding is my passion',
      'farm|warming|purchased accounts|bought accounts|fake comments|fake likes|ban rate|detection evasion',
      'SMTP_PASSWORD|MAIL_PASSWORD|API_KEY|TURNSTILE_SECRET|GA_MEASUREMENT_ID_SECRET'
    )
  }
}
