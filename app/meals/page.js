'use client';

import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
// import {getMeals} from '@/lib/meals';
import {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useFetchCollection from '@/customHooks/useFetchCollection';
import {STORE_MEALS, selectMeals} from '@/redux/slice/mealSlice';

// export const metadata = {
//   title: 'All Meals',
//   description: 'Browse the delicious meals shared by our vibrant community.',
// };

async function Meals() {
  // const meals = await getMeals();
  const {data, isLoading} = useFetchCollection('meals');
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);

  useEffect(() => {
    dispatch(
      STORE_MEALS({
        meals: data,
      })
    );
  }, [data]);

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
