import React, {Fragment} from 'react'

const ErrorPage = () => (
    <Fragment>
            <h2>
                Ой, неправильно указан адрес страницы или то, что должно было быть тут, куда-то пропало.<br/>
                Мы обязательно это найдем!
            </h2>
            <div className="fetch_err">
            </div>
    </Fragment>
)


export default ErrorPage


