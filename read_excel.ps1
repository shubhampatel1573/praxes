$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$workbook = $excel.Workbooks.Open("$pwd\public\PRAXES EVENT.xlsx")
$sheet = $workbook.Sheets.Item(1)
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

$workbook.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
