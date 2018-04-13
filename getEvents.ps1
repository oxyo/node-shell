<#
.SYNOPSIS
Getting your app events.
.DESCRIPTION
Getting your app events.
.EXAMPLE
.\getEvents.ps1 -eventId 101 -save
#>

[CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True,Position=0)] [int]$eventId,
        [Parameter(Mandatory=$false,Position=1)] $save   
    )


if ($save) {

    Get-EventLog Application | where EventID -eq $eventId | select MachineName,Source,EventId,Message | 
    ConvertTo-Json | Out-File -FilePath app-events.json

    Write-Host ""
    Write-Host "P.S. Saved to .\app-events.json"

} else {
    
    Get-EventLog Application | where EventID -eq $eventId | select MachineName,Source,EventId,Message |
    ConvertTo-Json

}

