//Список всех фотоальбомов (
// Название альбома,
// путь к папке/начало имен файлов в этой папке(дата создания),
// колличество фотографий не считая обложки(нулевой картинки))
const ALBUMS = [
    {
        title: 'Наша группа',
        path: '/nasha_gruppa/070121_',
        photoAmount: 12
    },
    {
        title: 'Мы тоже любим спорт',
        path: '/my_toje_lubim_sport/230221_',
        photoAmount: 4
    },
    {
        title: 'Мы занимаемся',
        path: '/my_zanimaemsya/111220_',
        photoAmount: 3
    },
    {
        title: 'Я и вода - лучшие друзья',
        path: '/ya_i_voda_luchshie_druzya/240321_',
        photoAmount: 4
    },
]

export {ALBUMS}