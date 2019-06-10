var CACHE_NAME = 'pwa-lrm-caches'
var urlsToCache = []

self.addEventListener('install',
	(event)=>event.waitUntil(
		caches.open(CACHE_NAME).then(
			(cache)=>cache.addAll(urlsToCache)
		)
	)
)

self.addEventListener('fetch',
	(event)=>event.respondWith(
		caches.match(event.request).then(
			(res)=>(res?res:fetch(event.request))
		)
	)
)
