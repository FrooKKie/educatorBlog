import React, {Fragment, useEffect, useState} from 'react'
import '@/css/Fotoalbomy.scss'
import {ALBUMS} from '@/js/reactComponents/articles/photoalbumsList.js'

const Fotoalbomy = () => {
    const [albumsState, setAlbumsState] = useState({
        currentAlbum: null,
        isSliderOpen: false,
        clickedPhotoNumb: null,
    });

    function getNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function openAlbum(albumIndex) {
        setAlbumsState( {...albumsState, ...{currentAlbum: albumIndex}} );
    }

    //Альбомы при входе на вкладку
    const AllAlbums = () => {
        //Создает несколько малених фото с рандомным расположение на обложках
        function TitlePhotocards({ path, photoAmount}) {
            let li = [];

            for (let i = 0; i < photoAmount && i < 3; i++) {
                li[i] =
                    <li key={`${path}${i * photoAmount}`} style={{zIndex: getNumber(0,4)}}>
                        <img
                            style={{transform: `translate(${getNumber(-3,3)}rem,0) rotate(${getNumber(-25,25)}deg)`}}
                            src={`./img/photo_albums${path}${i + 1}_small.jpg`}
                        />
                    </li>
            }

            return (
                <ul>
                    {li}
                </ul>
            )
        }

        return (
            <Fragment>
                <img className={'waiting_animation_preload'}/>
                <h1>Фотоальбомы</h1>

                {ALBUMS.map(({title, path, photoAmount}, index, currentValue) => {

                        return (
                            <section key={`section${path}`} className={'album_page'}>
                                <div
                                    onClick={ () => setAlbumsState(
                                        {...albumsState, ...{currentAlbum: currentValue[index]}}
                                    )}
                                    tabIndex={0}
                                    className={'album_wrapper'}
                                >
                                    <img className={'cover'} src={`./img/photo_albums${path}0_small.jpg`}/>
                                    <div className={'title'}>
                                        <h2>{title}</h2>
                                        {<TitlePhotocards path={path} photoAmount={photoAmount}/>}
                                    </div>
                                </div>
                            </section>
                        )
                    }
                )}
            </Fragment>
        )
    }

    //Текущий открытый альбом (превью альбома)
    const OpenedAlbum = ({title, path, photoAmount}) => {

        let albumPreview = [];

        for (let i = 0; i <= photoAmount; i++) {
            albumPreview[i] =
                <div key={path + i} className={'photo_preview_container'}>
                    <img
                        src = {`./img/photo_albums${path + i}_small.jpg`}
                        onClick={() => setAlbumsState( {...albumsState, ...{isSliderOpen: true, clickedPhotoNumb: i}} )}
                    />
                </div>

        }

        return (
            <Fragment>
                <section className={'opened_album'}>
                    <header>
                        <h2>{title}</h2>
                        <button
                            className={'close_album_button'}
                            onClick={ ()=> setAlbumsState( {...albumsState, ...{currentAlbum: null}} ) }
                        >
                            Назад к альбомам
                        </button>
                    </header>

                    <hr/>

                    <div className={'album_preview'}>
                        {albumPreview}
                    </div>

                    {albumsState.isSliderOpen && <PhotoSlider/>}
                </section>
            </Fragment>
        )
    }

    //слайдер
    const PhotoSlider = () => {
        const [sliderState, setSliderState] = useState({
            currentPhoto: albumsState.clickedPhotoNumb,
            sliderWidth: `${document.documentElement.clientWidth /100 * 90}px`,
            sliderHeight: `${document.documentElement.clientHeight /100 * 85}px`,
        });

        useEffect( () => {
            //изменить размер слайдера при ресайзе окна
            function handler() {
                setSliderState( (prevState) => ({...prevState, ...{
                        sliderWidth: `${document.documentElement.clientWidth /100 * 90}px`,
                        sliderHeight: `${document.documentElement.clientHeight /100 * 85}px`,
                    }})
                )
            }

            window.addEventListener('resize', handler)

            return () => window.removeEventListener('resize', handler)

            }, []
        );

        //Управление слайдером (стрелки)
        function sliderEvent(slideTo) {
            if (slideTo === 'next' && sliderState.currentPhoto < albumsState.currentAlbum.photoAmount) {
                document.getElementById('photo').style.opacity = '0'
                setSliderState( {...sliderState, ...{currentPhoto: sliderState.currentPhoto + 1}} )

            } else if (slideTo === 'previous' && sliderState.currentPhoto > 0) {
                document.getElementById('photo').style.opacity = '0'
                setSliderState( {...sliderState, ...{currentPhoto: sliderState.currentPhoto - 1}} )

            }
        }

        let pointerDownAt = null // координаты нажатия для обработчиков свайпа на img

            return (
                <div
                    className={'photo_slider'}

                >
                    <div className={'photo_container'}>
                        <button
                            className={`previous_button ${sliderState.currentPhoto === 0 && 'hidden'}`}
                            src={'/img/arrow.png'}
                            onClick={()=> sliderEvent('previous')}
                        />

                        <img
                            id ={'photo'}
                            onLoad = { (e) => e.currentTarget.style.opacity = '1' }
                            style={{
                                maxWidth: sliderState.sliderWidth,
                                maxHeight: sliderState.sliderHeight
                            }}
                            className={'photo'}
                            src={`/img/photo_albums${albumsState.currentAlbum.path + sliderState.currentPhoto}.jpg`}
                            onPointerDown={ (e) => {
                                e.preventDefault()
                                pointerDownAt = e.clientX
                            }}
                            onPointerUp={ (e) => {
                                if ( (pointerDownAt - e.clientX) > 75 ) {
                                    sliderEvent('next')

                                } else if ( (pointerDownAt - e.clientX) < -75) {
                                    sliderEvent('previous')
                                }
                            }}
                            onPointerCancel={() => console.log('cans')}
                        />

                        <button
                            className={`
                                next_button 
                                ${sliderState.currentPhoto === albumsState.currentAlbum.photoAmount && 'hidden'}
                            `}
                            src={'/img/arrow.png'}
                            onClick={() => sliderEvent('next')}
                        />

                        <button
                            className={'close_button'}
                            onClick={() => {
                                setAlbumsState({...albumsState, ...{isSliderOpen: false}})
                            }}
                        />
                    </div>
                </div>
            )
    }

    return (
        <Fragment>
            {albumsState.currentAlbum !== null
                ? <OpenedAlbum
                    title={albumsState.currentAlbum.title}
                    path={albumsState.currentAlbum.path}
                    photoAmount={albumsState.currentAlbum.photoAmount}
                />
                : <AllAlbums/>
            }
        </Fragment>
    )
}


export default Fotoalbomy


