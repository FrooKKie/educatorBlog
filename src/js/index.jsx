import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import '@/css/CSSreset.scss'
import '@/css/index.scss'
import '@/css/Article.scss'
import {App} from './reactComponents/App.jsx'
import {ARTICLES} from "@/js/reactComponents/articles/articlesList.js"

const MainPage = lazy(() => import(`./reactComponents/articles/MainPage.jsx`))
const ErrorPage = lazy(() => import(`./reactComponents/articles/ErrorPage.jsx`))

// объект с lazy ссылками на статьи
const lazyArticles = {}

ARTICLES.map(function({componentName}) {
        lazyArticles[componentName] = lazy(() => import(`./reactComponents/articles/${componentName}.jsx`))
    }
)

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Suspense fallback={ <h1 className={'loading_article'}>Загрузка...</h1> }>
                <Switch>
                    {ARTICLES.map(({componentName}) =>  (
                                <Route key={componentName} path={'/' + componentName} component={lazyArticles[componentName]}/>
                            )
                    )}

                    <Route exact path='/' component={MainPage}/>
                    <Route path='/*' component={ErrorPage}/>
                </Switch>
            </Suspense>
        </App>
    </BrowserRouter>

    , document.getElementById('react_container')
)
