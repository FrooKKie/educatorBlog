import React from 'react'
import '@/css/Header.scss'

const Header = () => (
        <header className={'main_header'} id={'main_header'}>
            <h1>
                Касаткина Ирина Федоровна.<br/>
                <a href="/">Блог воспитателя</a><br/>
                МБДОУ №29 "Звездочка"<br/>
                г. Калуга
            </h1>
        </header>
    )

export {Header}