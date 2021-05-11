import React, {Fragment} from 'react'
import {Header} from './Header.jsx'
import {SideNav} from './SideNav.jsx'
import {Footer} from './Footer.jsx'

const App = ({children}) => {
    return (
        <Fragment>
            <Header/>
            <main id={'main'}>
                <SideNav/>
                <article id={'articles'}>
                    {children}
                </article>
            </main>
            <Footer/>
        </Fragment>
    )
}

export {App}