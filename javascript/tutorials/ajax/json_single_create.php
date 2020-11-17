<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<?php
$fp = @fopen("json_single.json", "w");
if (!$fp) exit("Dateifehler");
$feld_einzel = array("farbe" => "Rot", "geschwindigkeit" => 50.2);
$ausgabe = json_encode($feld_einzel);
fputs($fp, $ausgabe);
fclose($fp);
?>
</body>
</html>