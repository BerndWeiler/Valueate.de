<?php
/**
 * Valueate.de – Kontaktformular Mail-Versand
 * Empfängt POST-Daten, validiert und sendet per mail() an kontakt@valueate.de
 */

// Nur POST-Requests erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: kontakt.html');
    exit;
}

// Honeypot-Check: Wenn das unsichtbare Feld ausgefüllt ist, ist es ein Bot
if (!empty($_POST['website'])) {
    // Stille Weiterleitung (Bot merkt nichts)
    header('Location: kontakt.html?success=1');
    exit;
}

// Eingaben bereinigen
function sanitize($input) {
    $input = trim($input);
    $input = stripslashes($input);
    // Zeilenumbrüche entfernen (Header-Injection-Schutz)
    $input = str_replace(array("\r", "\n"), '', $input);
    return $input;
}

$name    = sanitize($_POST['name'] ?? '');
$email   = sanitize($_POST['email'] ?? '');
$company = sanitize($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

// Pflichtfeld-Validierung
if (empty($name) || empty($email) || empty($message)) {
    header('Location: kontakt.html?error=1');
    exit;
}

// E-Mail-Format prüfen
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: kontakt.html?error=1');
    exit;
}

// E-Mail zusammenbauen
$to      = 'kontakt@valueate.de';
$subject = 'Kontaktanfrage von ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8');

$body  = "Neue Kontaktanfrage über valueate.de\n";
$body .= "====================================\n\n";
$body .= "Name:        " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n";
$body .= "E-Mail:      " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "\n";
if (!empty($company)) {
    $body .= "Unternehmen: " . htmlspecialchars($company, ENT_QUOTES, 'UTF-8') . "\n";
}
$body .= "\nNachricht:\n";
$body .= "----------\n";
$body .= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "\n";

$headers  = "From: kontakt@valueate.de\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: Valueate-Kontaktformular\r\n";

// Mail senden
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    header('Location: kontakt.html?success=1');
} else {
    header('Location: kontakt.html?error=1');
}
exit;
