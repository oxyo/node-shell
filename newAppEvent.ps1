<#
.SYNOPSIS
Create new eventlog for your app.
.DESCRIPTION
Create new eventlog for your app.
.EXAMPLE
.\newAppEvent.ps1 -appId MyApp -eventId 101 -message "Hello world" 
#>

[CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True,Position=0)] [string]$appId, 
        [Parameter(Mandatory=$True,Position=1)] [int]$eventId, 
        [Parameter(Mandatory=$True,Position=2)] [string]$message
    )


function newEvent ($appId, $eventId, $message) {  

    $exist = [System.Diagnostics.EventLog]::SourceExists($appId) 
    
    if ($exist) {
    
        Write-EventLog Application -EntryType Warning -Source $appId -Message $message -EventId $eventId    

    } else {
    
        New-EventLog -Source $appId -LogName Application

        Write-EventLog Application -EntryType Warning -Source $appId -Message $message -EventId $eventId  
        
        Write-Host "$appId Events Source created successfully"          
    }

    Write-Host "$appId Event with ID $eventId created successfully"
 
}


newEvent $appId $eventId $message


