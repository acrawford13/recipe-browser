import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import RecipeBrowser from './components/RecipeBrowser/RecipeBrowser';
import RecipeView from './components/RecipeView/RecipeView';

class App extends Component {
    state = {
        searchTerm: '',
        recipes: [
            {
                "description": "This buffet classic can also be healthy! Mayonnaise is replaced by cottage cheese. You can blend the filling for more creaminess.",
                "id": 9,
                "image": "https://nutrition-assets.freeletics.com/recipes/large/mustard_deviled_eggs.jpg",
                "ingredients": [
                    {
                        "amount": 4.0,
                        "name": "hard-boiled eggs",
                        "unit": ""
                    },
                    {
                        "amount": 2.0,
                        "name": "Dijon mustard",
                        "unit": "tsp"
                    },
                    {
                        "amount": 100.0,
                        "name": "cottage cheese",
                        "unit": "g"
                    },
                    {
                        "amount": 2.0,
                        "name": "chopped dill",
                        "unit": "tbsp"
                    }
                ],
                "name": "Mustard Deviled Eggs",
                "seasonings": [
                    "Paprika powder"
                ],
                "steps": [
                    "Halve eggs and remove yolk.",
                    "Mix yolks with mustard, cottage cheese and half of dill.",
                    "Fill egg halves with yolk mixture and garnish with remaining dill."
                ]
            },
            {
                "description": "Scrambled eggs are always a great idea. This version with spinach, tomatoes and salty feta is suitable at any point during the day.",
                "id": 2,
                "image": "https://nutrition-assets.freeletics.com/recipes/large/feta_scrambled_eggs.jpg",
                "ingredients": [
                    {
                        "amount": 3.0,
                        "name": "eggs",
                        "unit": ""
                    },
                    {
                        "amount": 100.0,
                        "name": "low-fat feta cheese",
                        "unit": "g"
                    },
                    {
                        "amount": 1.0,
                        "name": "diced tomato",
                        "unit": ""
                    },
                    {
                        "amount": 40.0,
                        "name": "fresh spinach",
                        "unit": "g"
                    },
                    {
                        "amount": 1.0,
                        "name": "coconut oil",
                        "unit": "tsp"
                    }
                ],
                "name": "Feta Scrambled Eggs",
                "seasonings": [
                    "Grated nutmeg",
                    "unrefined salt",
                    "black pepper"
                ],
                "steps": [
                    "Heat up coconut oil in a pan. Cook tomatoes and spinach on medium heat for 2 minutes or until spinach softens.",
                    "Crack eggs into pan and cook for approx. 4 minutes or desired consistency.",
                    "Add grated nutmeg, salt and pepper.",
                    "Crumble feta cheese over warm eggs."
                ]
            },
            {
                "description": "This fruity combination of grapefruit, jalapeños and avocado will invite memories of holidays. A side of quickly fried fish and red cabbage.",
                "id": 31,
                "image": "https://nutrition-assets.freeletics.com/recipes/large/fried_fish_with_grapefruit_salsa.jpg",
                "ingredients": [
                    {
                        "amount": 200.0,
                        "name": "white fish fillet (cod, plaice, sole; fresh or frozen)",
                        "unit": "g"
                    },
                    {
                        "amount": 0.5,
                        "name": "avocados",
                        "unit": ""
                    },
                    {
                        "amount": 0.5,
                        "name": "grapefruits",
                        "unit": ""
                    },
                    {
                        "amount": 1.0,
                        "name": "chopped jalapeño",
                        "unit": ""
                    },
                    {
                        "amount": 0.5,
                        "name": "coriander",
                        "unit": "bunches"
                    },
                    {
                        "amount": 0.5,
                        "name": "limes (juice)",
                        "unit": ""
                    },
                    {
                        "amount": 100.0,
                        "name": "chopped cabbage",
                        "unit": "g"
                    },
                    {
                        "amount": 1.0,
                        "name": "coconut oil",
                        "unit": "tsp"
                    }
                ],
                "name": "Fried Fish With Grapefruit Salsa",
                "seasonings": [
                    "Chili flakes",
                    "unrefined salt",
                    "black pepper"
                ],
                "steps": [
                    "Peel and cube avocado and grapefruit.",
                    "In a bowl, mix avocado, grapefruit, jalapeño, coriander and lime juice. Add a pinch of salt.",
                    "Heat up coconut oil in a pan. Fry each side of fish fillets for 3 minutes on medium heat.",
                    "Serve fried fish on a bed of chopped red cabbage and grapefruit salsa."
                ]
            },
            {
                "description": "A timeless dish, that has a lot to offer beyond its taste! Why not make this restaurant classic on your own?",
                "id": 61,
                "image": "https://nutrition-assets.freeletics.com/recipes/large/classic_tuna_salad.jpg",
                "ingredients": [
                    {
                        "amount": 150.0,
                        "name": "water-packed tuna",
                        "unit": "g"
                    },
                    {
                        "amount": 2.0,
                        "name": "hard-boiled eggs",
                        "unit": ""
                    },
                    {
                        "amount": 1.0,
                        "name": "sliced onion",
                        "unit": ""
                    },
                    {
                        "amount": 50.0,
                        "name": "pitted green olives",
                        "unit": "g"
                    },
                    {
                        "amount": 1.0,
                        "name": "diced tomato",
                        "unit": ""
                    },
                    {
                        "amount": 1.0,
                        "name": "small romaine lettuce",
                        "unit": ""
                    },
                    {
                        "amount": 0.5,
                        "name": "lemons (juice)",
                        "unit": ""
                    },
                    {
                        "amount": 1.0,
                        "name": "virgin olive oil",
                        "unit": "tsp"
                    },
                    {
                        "amount": 1.0,
                        "name": "mixed Italian herbs",
                        "unit": "tsp"
                    }
                ],
                "name": "Salade Niçoise",
                "seasonings": [
                    "Unrefined salt",
                    "black pepper"
                ],
                "steps": [
                    "Drain tuna, chop lettuce then halve eggs and olives.",
                    "Mix ingredients together then drizzle with lemon juice and olive oil. Season with italian herbs, salt and pepper as needed."
                ]
            }
        ]
    }

    onSearchTermUpdated = (e) => {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Route path="/" exact render={() => (
                        <RecipeBrowser
                            recipes={this.state.recipes}
                            searchTerm={this.state.searchTerm}
                            onSearchTermUpdated={this.onSearchTermUpdated}
                            />
                    )} />
                    <Route path="/recipes/:id" exact render={(props) => {
                        const recipe = this.state.recipes.find(recipe => recipe.id === +props.match.params.id);
                        return <RecipeView recipe={recipe} />
                    }} />
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
