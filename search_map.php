<?php if(isset($_POST['addr'])){$data = '/usr/bin/python3 scripts/search.py '.$_POST['addr']; exec($data);} ?>
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
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="balls.php">Шарики</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="waves.php">Волны</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="search_map.php">Поиск по Яндекс.Картам</a>
                </li>
            </ul>
        </div>
    </nav>
</header>
<div class="row justify-content-center">
    <div class="col-auto">
        <h3 align="center">Поиск по Яндекс.Картам</h3>
        <div class="col">
            <div class="row justify-content-center">
                <form action='/search_map.php' method='post'> <input type="text" class="form-control" placeholder="Адрес" name="addr"> </form>
            </div>
            <img src="map.png" alt="Перезагрузите страницу">
        </div>
    </div>
</div>
</body>
</html>
