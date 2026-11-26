<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Studio Kinetix — Independent Branding & Design Studio</title>
    <meta name="description" content="Independent branding & design studio. Looking suspiciously good. No funny business.">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    <div id="studio-root"></div>
    <script>
        window.__STUDIO_DATA__ = @json($studioData);
        window.__STUDIO_PAGE__ = @json($page ?? 'home');
        window.__STUDIO_SLUG__ = @json($slug ?? null);
    </script>
</body>
</html>
