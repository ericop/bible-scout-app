// This is the 'Offline copy of pages' service worker from https://preview.pwabuilder.com/serviceworker
// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
// Check compatibility for the browser we're running this in
if ('serviceWorker' in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log('[PWA] active service worker found, no need to register')
    } else {
        // Register the service worker
        navigator.serviceWorker
            .register('pwa-service-worker.js', {
                scope: './'
            })
            .then(function (reg) {
                console.log(`[PWA] Service worker has been registered for scope:  ${reg.scope}`)
            })
    }
}