'use client';

import {useEffect, useState} from 'react';
import classes from './page.module.css';
import {useSelector} from 'react-redux';
import {selectUserId, selectUsername} from '@/redux/slice/authSlice';
import {Timestamp, addDoc, collection} from 'firebase/firestore';
import {db} from '@/firebase/config';
import {toast} from 'react-toastify';
import useFetchDocument from '@/customHooks/useFetchDocument';
import Image from 'next/image';
import Card from '@/components/card.js/card';
import styled from 'styled-components';
import StarsRating from 'react-star-rate';
import {Router} from 'react-router-dom';
import {useRouter} from 'next/navigation';

const Form = styled.form`
  padding: 1rem;
`;

const ReviewLabel = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export default function ReviewDetailsPage({params}) {
  //   const meal = {
  //     title: 'test',
  //     email: 'test',
  //     name: 'test',
  //     summary: 'test',
  //   };

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [meal, setMeal] = useState(null);
  const {document} = useFetchDocument('meals', params.mealSlug);
  const userId = useSelector(selectUserId);
  const username = useSelector(selectUsername);
  const router = useRouter();

  useEffect(() => {
    setMeal(document);
  }, [document]);

  const submitProductReview = e => {
    e.preventDefault();
    const today = new Date();
    const currentDate = today.toDateString();

    const reviewProductConfig = {
      userId,
      username,
      mealId: params.mealSlug,
      rate,
      review,
      reviewDate: currentDate,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'reviews'), reviewProductConfig);
      toast.success('Review submitted successfully');
      setRate(0);
      setReview('');
      router.push('/meals');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <header className={classes.header}>
        <div>
          <div className={classes.headerText}>
            <h1>{meal?.title}</h1>
            <p className={classes.creator}>
              by <a href={`mailto: ${meal?.email}`}>{meal?.name}</a>
            </p>
            <p className={classes.summary}>{meal?.summary}</p>
            <div className={classes.ctaL}>
              {/* <Link href={`/review/${params.mealSlug}`}>Review Meal</Link> */}
            </div>
          </div>
          <div className={classes.image}>
            <Image src={meal?.imageURL} alt={meal?.title} fill />
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <Card>
            <Form onSubmit={e => submitProductReview(e)}>
              <ReviewLabel>Rating:</ReviewLabel>
              <StarsRating
                value={rate}
                onChange={value => {
                  setRate(value);
                }}
              />
              <ReviewLabel>Review:</ReviewLabel>
              <textarea
                cols="50"
                rows="10"
                value={review}
                style={{fontSize: '1.2rem'}}
                required
                onChange={e => setReview(e.target.value)}
              ></textarea>
              <br />
              <p className={classes.actions}>
                {/* <MealsFormSubmit /> */}
                <button type="submit">Save Review</button>
              </p>
              {/* <ReviewButton type="submit">Submit Review</ReviewButton> */}
            </Form>
          </Card>
        </div>
      </header>
    </>
  );
}
