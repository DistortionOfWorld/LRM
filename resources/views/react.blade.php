<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>{{ config('app.name', 'Laravel') }}</title>
	<script>
	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('/sw.js')
			.then((reg)=>{
				reg.onupdatefound = () => {
					reg.update()
				}
			})
			.catch((e)=>{
				console.log(e)
			})
	}
	</script>
	<!-- Fonts -->
	<link rel="dns-prefetch" href="//fonts.gstatic.com">
	<!-- Styles -->
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
	<!-- laravel sessions -->
	<meta name="laravel-root" content="{{ asset('/') }}">
	<link rel="manifest" href="/manifest.json" />
	<link rel="shortcut icon" href="/favicon.ico">
</head>
<body>
	<div id="react-root"></div>
	<!-- Scripts -->
	<script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
