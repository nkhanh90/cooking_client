import React, { useEffect, useState } from 'react';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { Link, useRouteMatch } from 'react-router-dom';
import { ErrorBoundary } from 'components/common';
import { Row, Col, Input } from 'reactstrap';
import moment from 'moment';
import { ingredientsVar } from 'index';

const RECIPE = gql`
  query RecipeDetail($recipeId: Int!) {
    recipe(id: $recipeId) {
      id
      title
      direction
      createdAt
      user {
        id
        name
      }
      ingredients {
        id
        name
        ammount
      }
    }
  }
`;
const USER_ME = gql`
  query CheckUserMe {
    userMe {
      id
      isLogin @client
    }
  }
`;

const RecipeDetailContainer = () => {
  const match = useRouteMatch<any>();
  const { loading, error, data } = useQuery(RECIPE, {
    variables: {
      recipeId: parseInt(match?.params?.id, 10),
    },
  });

  const { loading: loadingUserMe, error: errorUserMe, data: userMeData } = useQuery(USER_ME);
  const [recipe, setRecipe] = useState<any>({});
  const [user, setUser] = useState<any>({});

  const cartItems = useReactiveVar(ingredientsVar);

  console.log(cartItems);

  useEffect(() => {
    if (data?.recipe) {
      setRecipe(data?.recipe);
    }
  }, [data]);

  useEffect(() => {
    if (userMeData) {
      setUser(userMeData.userMe);
    }
  }, [userMeData]);

  return (
    <ErrorBoundary loading={loading} error={error} data={data}>
      <Link to="/recipes">
        <p>Back</p>
      </Link>
      <div className="d-flex justify-content-between">
        <div>
          <h1>{recipe?.title}</h1>
          {recipe?.user?.name} - {moment(recipe.createdAt, 'x').format('MM/DD/YYYY HH:mm')}
        </div>
        <ErrorBoundary loading={loadingUserMe} error={errorUserMe} data={userMeData}>
          {user?.id === recipe?.user?.id && (
            <div className="align-self-center">
              <Link to={`/recipe/${recipe.id}/edit`} className="btn btn-primary">
                Edit this recipe
              </Link>
            </div>
          )}
        </ErrorBoundary>
      </div>
      <Row className="mt-4">
        <Col md={4} sm={12}>
          {recipe?.ingredients &&
            recipe?.ingredients.map((it: any) => {
              const v: any = ingredientsVar;
              return (
                <p key={it.id} className="ml-3">
                  <Input type="checkbox" onClick={() => v([...v(), it.id])} />
                  {`${it.ammount} ${it.name}`}
                </p>
              );
            })}
        </Col>
        <Col md={8} sm={12}>
          {recipe.direction}
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default RecipeDetailContainer;
