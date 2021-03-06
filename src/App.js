import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import withErrorHandler from './hoc/withErrorHandler';
import Layout from './components/Layout/Layout';
import RecipeBrowser from './components/Pages/RecipeBrowser/RecipeBrowser';
import RecipeView from './components/Pages/RecipeView/RecipeView';
import AddRecipe from './components/Pages/AddRecipe/AddRecipe';

class App extends Component {
    state = {
        loading: true,
        error: false,
        recipes: [],
    }

    componentDidMount () {
        axios.get('https://private-anon-bd952d998b-reactnativemockapi.apiary-mock.com/recipes')
            .then(res => {
                this.setState({
                    recipes: res.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                    <Route path="/recipes/add" exact render={() => (<AddRecipe />)} />
                    <Route path="/recipes/:id" exact render={(props) => {
                        const recipe = this.state.recipes.find(recipe => recipe.id === +props.match.params.id);
                        return <RecipeView loading={this.state.loading} recipe={recipe} />
                    }} />
                    <Route path="/" exact render={() => (
                        <RecipeBrowser
                            loading={this.state.loading}
                            recipes={this.state.recipes}
                            />
                    )} />
                    <Redirect to="/" />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default withErrorHandler(App, axios);
