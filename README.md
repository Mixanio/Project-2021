# Project-2021
Этот сайт не несет в себе какой либо практической цели. Он был разработан как заключительный проект по Яндекс Лицею.
Интерфейс сайта предельно прост. 
### Структура
Сайт включает в себя 4 страницы:
1) Главная страница основной информацией
2) Страница-поисковик по Яндекс Картам, работающая на python скрипте, выдающая результат поиска в виде картинки
3) А также две страницы со скриптами с сайта codepen.io, которые мне показались интересными
### Скрипты
1) Шарики, которые притягиваются к курсору и при нажатии наоборот, отталкиваются
2) Полотно с жидкостью; при нажатии образуется всплеск, также всплески образуются случайно
3) А описание третьего скрипта на самом сайте

# Установка
Все файлы переместить в корневой путь сайта(у меня на Debian 10 и nginx это /var/www/html)
### 
Чтобы сайт работал на базе nginx, нужно:
1) Установить необходимые пакеты командой sudo apt install nginx php php-fpm
2) Проверить работу nginx перейдя по ссылке http://<ip сервера>
3) Все файлы репозитория переместить в /var/www/html
4) При необходимости настроить nginx и php-fpm, но у меня запустилось без настройки
