import React, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { ErrorBoundary } from 'components/common';
import { Card, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Button } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const ALL_RECIPES = gql`
  query {
    allRecipes {
      id
      title
      direction
      ingredients {
        name
      }
      user {
        name
      }
    }
  }
`;

const RecipeListContainer = () => {
  const [getRecipes, { loading, error, data }] = useLazyQuery(ALL_RECIPES, {
    fetchPolicy: 'network-only',
  });

  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    if (data?.allRecipes) {
      setRecipes(data.allRecipes);
    }
  }, [data]);

  return (
    <ErrorBoundary loading={loading} error={error} data={data}>
      <Button onClick={() => getRecipes()}>Get Recipes</Button>
      <CardDeck>
        {recipes.map((item: any) => (
          <Card key={item.id}>
            <CardBody className="d-flex flex-column justify-content-between">
              <CardTitle tag="h5">{item.title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {item.user.name}
              </CardSubtitle>
              <CardText>
                {_.truncate(item.direction, {
                  length: 100, // maximum 30 characters
                  separator: /,?\.* +/,
                })}
              </CardText>
              <Link to={`/recipe/${item.id}`} className="btn btn-primary">
                Get recipe
              </Link>
            </CardBody>
          </Card>
        ))}
      </CardDeck>
    </ErrorBoundary>
  );
};

export default RecipeListContainer;
