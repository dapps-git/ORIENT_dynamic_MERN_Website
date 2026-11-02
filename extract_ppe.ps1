Add-Type -AssemblyName System.Drawing

$destDir = "c:\projects\ORIENT\frontend\public\products\ppe"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Image 2 (media_1793333220925.png): 16 items
# 4 cols x 4 rows
$img2Path = "C:\Users\aifas\.gemini\antigravity-ide\brain\c4def931-81cd-46c5-a081-1796704102d0\.user_uploaded\media_1793333220925.png"
$img2 = [System.Drawing.Bitmap]::new($img2Path)

$colX = @(28, 168, 308, 447)
$colW = @(114, 114, 114, 114)
$rowY = @(26, 167, 309, 451)
$rowH = @(84, 84, 84, 84)

$page1Names = @(
    "3m-6700-full-face-respirator",
    "3m-6800-full-face-respirator",
    "3m-6900-full-face-respirator-large",
    "3m-7093-particulate-filter",
    "3m-ff-402-full-facepiece-respirator",
    "3m-6100-half-facepiece-respirator",
    "3m-6200-half-facepiece-respirator",
    "3m-6300-half-facepiece-respirator",
    "3m-7502-silicone-half-mask",
    "3m-7503-silicone-half-mask",
    "3m-2097-particulate-filter",
    "3m-501-filter-retainer",
    "3m-5n11-n95-particulate-filter",
    "3m-6001-organic-vapor-cartridge",
    "3m-6002-acid-gas-cartridge",
    "3m-6003-organic-vapor-acid-gas-cartridge"
)

$idx = 0
for ($r = 0; $r -lt 4; $r++) {
    for ($c = 0; $c -lt 4; $c++) {
        $name = $page1Names[$idx]
        $rect = [System.Drawing.Rectangle]::new($colX[$c], $rowY[$r], $colW[$c], $rowH[$r])
        $crop = $img2.Clone($rect, $img2.PixelFormat)
        $outPath = Join-Path $destDir "$name.png"
        $crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $crop.Dispose()
        Write-Host "Saved: $name.png"
        $idx++
    }
}
$img2.Dispose()

# Image 3 (media_1793333245297.png): 8 items
# 4 cols x 2 rows
$img3Path = "C:\Users\aifas\.gemini\antigravity-ide\brain\c4def931-81cd-46c5-a081-1796704102d0\.user_uploaded\media_1793333245297.png"
$img3 = [System.Drawing.Bitmap]::new($img3Path)

$colX3 = @(13, 153, 293, 432)
$colW3 = @(114, 114, 114, 114)
$rowY3 = @(23, 165)
$rowH3 = @(84, 84)

$page2Names = @(
    "3m-6004-ammonia-methylamine-cartridge",
    "3m-6005-formaldehyde-organic-vapor-cartridge",
    "3m-6006-multi-gas-vapor-cartridge",
    "3m-6051-organic-vapor-filter",
    "3m-6057-inorganic-gas-acid-filter",
    "3m-6059-multi-gas-vapor-filter",
    "3m-disposable-particulate-respirator-masks-box",
    "3m-disposable-particulate-respirator-masks"
)

$idx = 0
for ($r = 0; $r -lt 2; $r++) {
    for ($c = 0; $c -lt 4; $c++) {
        $name = $page2Names[$idx]
        $rect = [System.Drawing.Rectangle]::new($colX3[$c], $rowY3[$r], $colW3[$c], $rowH3[$r])
        $crop = $img3.Clone($rect, $img3.PixelFormat)
        $outPath = Join-Path $destDir "$name.png"
        $crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $crop.Dispose()
        Write-Host "Saved: $name.png"
        $idx++
    }
}
$img3.Dispose()

Write-Host "All 24 PPE product images cropped successfully!"
