import React, {Fragment} from 'react'

const MainPage = () => (
    <Fragment>
        <h1>Я работаю с малышами</h1>
        <p>
            <strong>Уважаемые гости</strong>, я рада приветствовать Вас на моем персональном сайте . Мой сайт создан для
            всех, кому нужна помощь в воспитании малышей.<br/>
            Я сделала подборку полезных советов, рекомендаций, подобрала картотеку игр, которые помогут Вам,
            уважаемые родители, в воспитании малышей.
        </p>
        <p>
            Воспитатель группы раннего возраста - Касаткина Ирина Федоровна<br/>
            Образование среднее специальное<br/>
            Высшая кв. категория<br/>
            Педагогический стаж работы - 30 лет
        </p>
        <figure className="start_page_verse">
            <img src="/img/rainbow.jpg"/>
                <figcaption>
                    <strong>
                        Чтоб деток верно воспитать,<br/>
                        Необходимо много знать.<br/>
                        Знать нужно психологию<br/>
                        И знать физиологию,<br/>
                        Быть докой в педагогике,<br/>
                        Риторике и логике.<br/>
                        Но главное, чтоб методистом быть,<br/>
                        <span className="green_text">Детишек надобно любить.</span>
                    </strong>
                </figcaption>
        </figure>
    </Fragment>
)


export default MainPage


