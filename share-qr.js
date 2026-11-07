'use strict';

// L’adresse à partager provient uniquement de la page ouverte.
(() => {
    const link = document.getElementById('site-qr');
    const code = document.getElementById('qr-code');
    const message = document.getElementById('qr-message');
    const caption = document.getElementById('qr-caption');
    const url = new URL(window.location.href);
    if (!['http:', 'https:'].includes(url.protocol)) return;
    url.search = '';
    url.hash = '';
    link.href = url.href;
    link.title = url.href;
    message.textContent = 'Préparation du QR-code…';

    // Seule la bibliothèque est téléchargée ; l’URL est encodée dans le navigateur.
    // Chargement indépendant : le pendule fonctionne même sans ce téléchargement.
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    function unavailable() {
        message.hidden = true;
        link.hidden = false;
        caption.textContent = 'Lien vers cette page';
        link.setAttribute('aria-label', 'Ouvrir cette page ; QR-code indisponible');
    }
    script.addEventListener('load', () => {
        try {
            const qr = window.qrcode(0, 'M');
            qr.addData(url.href, 'Byte');
            qr.make();
            code.innerHTML = qr.createSvgTag({cellSize: 3, margin: 12, scalable: true});
            message.hidden = true;
            link.hidden = false;
        } catch {
            unavailable();
        }
    });
    script.addEventListener('error', unavailable);
    document.head.appendChild(script);
})();
