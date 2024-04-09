'use client';

import Image from 'next/image';
import classes from './page.module.css';
import styled from 'styled-components';
// import {getMeal} from '@/lib/meals';
import {notFound} from 'next/navigation';
import {useDispatch} from 'react-redux';
import useFetchDocument from '@/customHooks/useFetchDocument';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import useFetchCollection from '@/customHooks/useFetchCollection';
import Card from '@/components/card.js/card';
import StarsRating from 'react-star-rate';

// export async function generateMetadata({params}) {
//   const meal = getMeal(params.mealSlug);

//   if (!meal) {
//     notFound();
//   }

//   return {
//     title: meal.title,
//     description: meal.summary,
//   };
// }

const ReviewTitle = styled.h3`
  padding-left: 1rem;
  margin: 0;
  padding-top: 1rem;
  font-size: 1rem;
`;

const ReviewMessage = styled.p`
  margin: 0;
`;

export default function MealDetailsPage({params}) {
  console.log('params', params);
  // const {id} = useParams();
  const [meal, setMeal] = useState({});
  const dispatch = useDispatch();
  const {document} = useFetchDocument('meals', params.mealSlug);
  const {data} = useFetchCollection('reviews');
  const filteredReviews = data.filter(
    review => review.mealId === params.mealSlug
  );
  // const {data} = useFetchCollection('reviews');
  // const filteredReviews = data.filter(review => review.productId === id);

  useEffect(() => {
    setMeal(document);
  }, [document]);

  // const meal = getMeal(params.mealSlug);
  if (meal) {
    meal.instructions = meal?.instructions?.replace(/\n/g, '<br/>');
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal?.imageURL} alt={meal?.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal?.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal?.email}`}>{meal?.name}</a>
          </p>
          <p className={classes.summary}>{meal?.summary}</p>
          <div className={classes.ctaL}>
            <Link href={`/review/${params.mealSlug}`}>Review Meal</Link>
          </div>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal?.instructions,
          }}
        ></p>
      </main>
      <div style={{width: '40%', marginLeft: '400px'}}>
        <Card>
          <ReviewTitle>Meal Reviews</ReviewTitle>
          <div style={{padding: '1rem'}}>
            {filteredReviews.length === 0 ? (
              <ReviewMessage>
                There are no reviews for this meals yet.
              </ReviewMessage>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const {rate, review, reviewDate, username} = item;
                  return (
                    <div style={{fontSize: '1rem'}}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <p>{reviewDate}</p>
                      <p>{username}</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
