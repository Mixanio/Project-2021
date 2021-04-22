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
<br>
<div class="container" style="min-height: 800px;">
<div class="row">
    <div class="col-11">
        <div class="row">
            <div class="col-9">
                Этот сайт не несет в себе какой либо практической цели. Он был разработан как заключительный проект по Яндекс Лицею.
                <br><br> Интерфейс сайта предельно прост. Также сайт включает в себя 4 страницы:<br><br>
                <ul>
                    <li>
                        Главная страница основной информацией(на который вы сейчас находитесь)
                    </li>
                    <li>
                        Страница-поисковик по Яндекс Картам, работающая на python скрипте, выдающая результат поиска в виде картинки
                    </li>
                    <li>
                        А также две страницы со скриптами с сайта <a link href="https://codepen.io">codepen.io</a>, которые мне показались интересными и представляют из себя:
                        <ol>
                            <li>
                                Шарики, которые притягиваются к курсору и при нажатии наоборот, отталкиваются
                            </li>
                            <li>
                                Полотно с жидкостью; при нажатии образуется всплеск, также всплески образуются случайно
                            </li>
                        </ol>
                    </li>
                </ul>
                <br>
                А вот еще третий скрипт с того же сайта. Управление тоже простое: провести курсором с зажатой кнопкой и все.
                <br><br>
                <style>
                body {
                    margin: 0;
                }
                canvas{
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                background: black;
                border: 2px solid white;
                }</style>
                <canvas id="c"></canvas>
                <script  src="./js/fluid.js"></script><br><br>
                P.S. Javascript интересная вещь, но у меня нет времени на его изучение, поэтому я вставил не свои скрипты.
            </div>
            <div class="col-3">
                <a href="https://yandexlyceum.ru">
                    <div class="row"><div class="col"><img src="static/img/lyceumlogo.jpg" class="rounded mx-auto d-block" style="width: 100%;" alt="..."></div> </div></a>
                <br>
                <a href="https://codepen.io">
                    <div class="row"><div class="col"><img src="static/img/codepenlogo.png" class="rounded mx-auto d-block" style="width: 100%;" alt="..."></div> </div></a>
                <br><br>
            </div>
        </div>
    </div>
</div>
</div>
</body>
</html>
