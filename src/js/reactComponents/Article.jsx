import React, {useEffect, useLayoutEffect} from 'react'

let Article = ({children}) => {
    //прокрутка к началу статьи при нажатии на нее в меню
    useEffect( () => {
        console.log('proc')
            if (document.documentElement.offsetWidth > 768) {
                (document.getElementById('main').getBoundingClientRect().top < 0) && document.getElementById('articles').lastChild.scrollIntoView({behavior: "smooth"})
            } else {
                document.getElementById('articles').scrollIntoView({behavior: "smooth"})
            }
    },[<article/>])
    return (
        <article id={'articles'}>
            {children}
        </article>
    )
}

export {Article}