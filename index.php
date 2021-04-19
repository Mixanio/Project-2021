<html lang="ru">
<head>
    <title>YandexLyceum Project</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="icon" href="static/img/favicon.png" type="image/x-icon">
</head>
<body>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="index.php">YandexLyceum Project</a>
</nav>
</header>
<?php
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
?>
<h2>
    YandexLyceum Project
</h2>
<h4>
    <img src="static/img/lyceumlogo.jpg" class="rounded mx-auto d-block" style="width: 50%;" alt="...">
</h4>

<footer class="page-footer font-small mdb-color pt-4 bg-dark text-white">
    <div class="container text-center text-md-left">
        <div class="row text-center text-md-left mt-3 pb-3">
            <hr class="w-100 clearfix d-md-none">
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Ссылки</h6>
                <p>
                    <a href="https://yandexlyceum.ru/">Яндекс Лицей</a>
                </p>
            </div>
            <hr class="w-100 clearfix d-md-none">
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Контакты</h6>
                <p>mixanio@yandex.ru</p>
            </div>
        </div>
    </div>
</footer>
</body>
</html>
