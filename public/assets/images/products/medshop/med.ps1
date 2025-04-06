# Define the root folder
$rootFolder = "D:\temp\MedSupplies"

# Function to process folders: Remove spaces, convert to lowercase, and rename files and folders
function Process-FolderContents {
    param (
        [string]$folderPath
    )

    # Get all folders in the current directory
    $subfolders = Get-ChildItem -Path $folderPath -Directory

    foreach ($subfolder in $subfolders) {
        # Remove spaces and convert folder name to lowercase
        $newFolderName = ($subfolder.Name -replace " ", "").ToLower()
        $tempName = "$($newFolderName)_tmp"
        $tempFolderPath = Join-Path $subfolder.Parent.FullName $tempName
        $newFolderPath = Join-Path $subfolder.Parent.FullName $newFolderName

        # Two-step rename to avoid case sensitivity issues
        # if ($subfolder.FullName -ne $newFolderPath) {  causes some folders not to be renamed
            # Step 1: Rename to temporary name
            Rename-Item -Path $subfolder.FullName -NewName $tempName -Force
			Write-Host "`n`n`tRenaming folder: $subfolder to $tempName" # DEBUG

			Start-Sleep -Seconds 2
			
            # Step 2: Rename to the final lowercase name
            Rename-Item -Path $tempFolderPath -NewName $newFolderName -Force
			Write-Host "`n`n`tRenaming folder: $tempFolderPath to $newFolderName" # DEBUG
        # }

        # Update current folder path to the renamed folder
        $currentFolderPath = $newFolderPath

        # Process files in the current folder
        Process-FilesInFolder -folderPath $currentFolderPath

        # Recursive call to process subfolders
        Process-FolderContents -folderPath $currentFolderPath
    }
}


# Function to rename files: Remove spaces, convert to lowercase, and rename image files incrementally
function Process-FilesInFolder {
    param (
        [string]$folderPath
    )

    # Get all files in the folder
    $files = Get-ChildItem -Path $folderPath -File

    # Separate image files and text files
    $imageFiles = $files | Where-Object { $_.Extension -match "\.(webp|jpg|jpeg|png|gif|bmp)$" }
    $textFiles = $files | Where-Object { $_.Extension -eq ".txt" }

    # Sort image files alphabetically by name
    $sortedImageFiles = $imageFiles | Sort-Object { $_.Name }

    # Rename image files incrementally, convert to lowercase
    $counter = 1
    foreach ($image in $sortedImageFiles) {
        $newFileName = "$counter$($image.Extension.ToLower())"
        $newFilePath = Join-Path $folderPath $newFileName

        # Check for conflicts before renaming
        if (-not (Test-Path -Path $newFilePath)) {
            Rename-Item -Path $image.FullName -NewName $newFileName
            $counter++
        }
    }

    # Remove spaces, convert text file names and other file names to lowercase
    foreach ($file in $textFiles) {
        $newFileName = ($file.Name -replace " ", "").ToLower()
        $newFilePath = Join-Path $folderPath $newFileName

		Write-Host "`n`n`tIf: $file not equal to $newFilePath" # DEBUG
        # Two-step rename to avoid case sensitivity issues
        # if ($file.FullName -ne $newFilePath) { causes some files not to be renamed
            $tempName = "$($newFileName)_tmp"
            $tempFilePath = Join-Path $folderPath $tempName

            # Step 1: Rename to temporary name
            Rename-Item -Path $file.FullName -NewName $tempName -Force
			Write-Host "`n`n`tRenaming file: $($file.FullName) to $tempName" # DEBUG
			
			Start-Sleep -Seconds 2
			
            # Step 2: Rename to the final lowercase name
            Rename-Item -Path $tempFilePath -NewName $newFileName -Force
			Write-Host "`n`n`tRenaming file: $tempFilePath to $newFileName" # DEBUG
        # }
    }
}


# Start processing the root folder
Write-Host "Applying filenaming standards...`n`n"  
Process-FolderContents -folderPath $rootFolder
Write-Host "`n`nCompleted filenaming standards."  
