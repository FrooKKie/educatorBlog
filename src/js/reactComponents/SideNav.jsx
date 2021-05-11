import React, {Fragment, useEffect} from 'react'
import '@/css/SideNav.scss'
import {NavLink} from "react-router-dom";
import {ARTICLES} from "@/js/reactComponents/articles/articlesList.js"

//создает меню для статей
const SideNav = () => {
    //кнопка прокрутки вверх
    useEffect(()=> {
        scrollButton = document.getElementById('scroll_up_button')
        main =document.getElementById('main')

        document.addEventListener("scroll", scrollButtonVisibility)
    })

    let scrollButton, main;

    //прокрутка к началу статьи при нажатии на нее в меню
    function scrollUpButtonHandler() {
        document.getElementById('main_header').scrollIntoView({behavior: "smooth"})
    }

    //прокрутка к началу статьи при нажатии на нее в меню
    function menuClickHandler() {
        if (document.documentElement.offsetWidth > 768) {

           document.getElementById('main_header').scrollIntoView({behavior: "smooth"})
        } else {

            document.getElementById('articles').scrollIntoView({behavior: "smooth"})
        }
    }

    //кнопка прокрутки отображается если <main> выходит за пределы окна
    function scrollButtonVisibility() {
        if (main.getBoundingClientRect().top < 0 && getComputedStyle(scrollButton).visibility === 'hidden') {
            scrollButton.style.visibility = 'visible';
        } else if (main.getBoundingClientRect().top >= 0 && getComputedStyle(scrollButton).visibility === 'visible') {
            scrollButton.style.visibility = 'hidden';
        }
    }

    return (
        <aside className="main_aside" onScroll={scrollButtonVisibility}>
            <nav>
                <h4>Статьи:</h4>
                <ul onClick={menuClickHandler}>

                    {ARTICLES.map(({componentName, title}) => {

                        return (
                            <Fragment key={'fragment' + componentName}>
                                {componentName === 'Fotoalbomy' ? <hr key={'hr' + componentName}/> : null}

                                <li key={componentName}>
                                    <NavLink key={componentName} to={`/${componentName}`} activeClassName="selectedNavLink">
                                        {title}
                                    </NavLink>
                                </li>
                            </Fragment>
                        )
                    })}

                </ul>
            </nav>
            <div
                id={'scroll_up_button'}
                className={'scroll_up_button'}
                onClick={scrollUpButtonHandler}
            >
                <img src={'/img/arrow_up.png'}/>
            </div>
        </aside>
    )
}

export {SideNav}