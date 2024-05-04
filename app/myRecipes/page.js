'use client';

import {MealsTable} from '@/components/table/table';
import useFetchCollection from '@/customHooks/useFetchCollection';
import {selectUserEmail} from '@/redux/slice/authSlice';
import {FILTER_BY_USER, selectFilteredMeals} from '@/redux/slice/filterSlice';
import {STORE_MEALS, selectMeals} from '@/redux/slice/mealSlice';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const TopContainer = styled.div`
  height: 10%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.5rem;
  color: #ddd6cb;
  padding-left: 1.8rem;
  padding-bottom: 3rem;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  padding-top: 2px;
  padding-bottom: 0.5rem;
  margin-right: 6rem;
`;

const MyRecipes = () => {
  const {data, isLoading} = useFetchCollection('meals');
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const userEmail = useSelector(selectUserEmail);
  const filteredMeals = useSelector(selectFilteredMeals);
  console.log('meals', meals);
  console.log('userEmail', userEmail);
  console.log('filteredMeals', filteredMeals);
  useEffect(() => {
    dispatch(
      STORE_MEALS({
        meals: data,
      })
    );
  }, [data]);

  useEffect(() => {
    dispatch(FILTER_BY_USER({meals, userEmail}));
  }, [userEmail, meals]);

  return (
    <>
      <div>
        <Title>All My Recipes</Title>
        {filteredMeals.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <>
            <MealsTable meals={filteredMeals} />
          </>
        )}
      </div>
    </>
  );
};
export default MyRecipes;
