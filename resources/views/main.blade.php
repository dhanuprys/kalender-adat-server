<!DOCTYPE html>
<html>

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L0Z06Z7FEL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-L0Z06Z7FEL');
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no">
    <title>Kalender Bali</title>
    @vite('resources/css/app.css')
</head>

<body>
    <div id="app"></div>
    @viteReactRefresh
    @vite('resources/react/app.jsx')
</body>

</html>
