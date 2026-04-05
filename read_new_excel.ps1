$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$excelFile = "$pwd\public\Students Event coordinator List final-1.xlsx"
Write-Output "Extracting $excelFile"
$workbook = $excel.Workbooks.Open($excelFile)

for ($s = 1; $s -le $workbook.Sheets.Count; $s++) {
    $sheet = $workbook.Sheets.Item($s)
    Write-Output "--- Sheet: $($sheet.Name) ---"
    $usedRange = $sheet.UsedRange
    $rowCount = $usedRange.Rows.Count
    $colCount = $usedRange.Columns.Count

    for ($r = 1; $r -le $rowCount; $r++) {
        $line = ""
        for ($c = 1; $c -le $colCount; $c++) {
            $val = $sheet.Cells.Item($r, $c).Text
            if ($c -gt 1) { $line += " | " }
            $line += $val
        }
        Write-Output $line
    }
}

$workbook.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
