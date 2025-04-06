# Define the root folder
$rootFolder = "D:\temp\MedSupplies"

# Function to process Level 2 folders and create JSON data
function Process-Level2Folders {
    param (
        [string]$level1Path,
        [string]$level1Name
    )

    $jsonData = @()

    # Get all Level 2 subfolders
    $level2Folders = Get-ChildItem -Path $level1Path -Directory -ErrorAction SilentlyContinue

    foreach ($level2 in $level2Folders) {
        try {
            $level2Path = $level2.FullName

            Write-Host "`n`n`tProcessing level 2 folder: $( $level2Path)" # DEBUG
            
            # Find the text file and read its content
            $textFile = Get-ChildItem -Path $level2Path -Filter "*.txt" -File -ErrorAction SilentlyContinue | Select-Object -First 1
            $title = $null
            $descriptionLines = @()

            Write-Host "`n`t`tProcessing text file: $($textFile)" # DEBUG

            if ($textFile) {
                $lines = [System.IO.File]::ReadAllLines($textFile.FullName, [System.Text.Encoding]::UTF8)

                if ($lines.Count -gt 0) {
                    # Skip blank lines and process valid lines
                    $lines = $lines | Where-Object { $_.Trim() -ne "" }

                    # Handle the title (first line) and remaining description lines
                    $title = [string]$lines[0]
                    $descriptionLines = $lines | Select-Object -Skip 1 | Where-Object { $_.Trim() -ne "" }

                }
            }

            # Find all image files
            $imageFiles = Get-ChildItem -Path $level2Path -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp|gif)$" }
            $thumbnail = $null
            $imagePaths = @()

            foreach ($image in $imageFiles) {
                $relativePath = ($image.FullName).Replace($rootFolder, "").Replace("\", "/")
                $imagePaths += $relativePath
                if ($image.BaseName -eq "1") {
                    $thumbnail = $relativePath
                }
            }

            Write-Host "`n`t`tProcessed image" # DEBUG
            
            # Skip if no images or text file found
            if (-not $thumbnail -or -not $title) { continue }

            # Create JSON object
            $jsonObject = [PSCustomObject]@{
                id            = [guid]::NewGuid().ToString()
                title         = $title
                brand         = $null
                price         = $null
                size          = $null
                colors        = @()
                discount      = 0
                thumbnail     = $thumbnail
                images        = $imagePaths
                categories    = @($level1Name)
                description   = $descriptionLines
				dimension     = $descriptionLines
				specification = $descriptionLines
                status        = $null
                reviews       = @()
                rating        = 3
                unit          = $null
            }

            $jsonData += $jsonObject
        }
        catch {
            Write-Warning "`nFailed to process folder: $($level2.FullName) - $_"
        }
    }

    Write-Host "`nReturning json: $($jsonData)" # DEBUG
    return $jsonData
}

# Main function to process Level 1 subfolders
function Process-RootFolder {
    param (
        [string]$rootFolder
    )

    # Get all Level 1 subfolders
    $level1Folders = Get-ChildItem -Path $rootFolder -Directory -ErrorAction SilentlyContinue

    foreach ($level1 in $level1Folders) {
        Write-Host "`nProcessing Level 1 folder: $($level1.Name)"
        $jsonData = Process-Level2Folders -level1Path $level1.FullName -level1Name $level1.Name

        Write-Host "`njsonData: $($jsonData)"
        
        # Save the JSON data in the root folder with the name of the Level 1 subfolder
        if ($jsonData.Count -gt 0) {
            $outputFile = Join-Path $rootFolder "$($level1.Name).json"
            
            Write-Host "`nCreating file: $($outputFile)"
            
            $jsonText = $jsonData | ConvertTo-Json -Depth 5 -Compress:$false
			[System.IO.File]::WriteAllText($outputFile, $jsonText, [System.Text.Encoding]::UTF8)

            Write-Host "JSON file created: $outputFile"
        }
        else {
            Write-Warning "`nNo valid data found in: $($level1.Name)"
        }
    }
}

# Start processing
try {
    Write-Host "Starting script..."
    Process-RootFolder -rootFolder $rootFolder
    Write-Host "`nScript completed successfully."
}
catch {
    Write-Error "`nAn error occurred: $_"
}
