'use client';

import {useFormState} from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import {shareMeal} from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import {useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {db, storage} from '@/firebase/config';
import {Timestamp, addDoc, collection} from 'firebase/firestore';

const initialState = {
  name: '',
  email: '',
  title: '',
  summary: '',
  instructions: '',
  imageURL: '',
};

const ProgressCard = styled.div`
  height: ${props => (props.uploadProgress !== 0 ? '15vh' : '8vh')};

  margin-top: -12px;
`;

const Progress = styled.div`
  background-color: #aaa;
  border: 1px solid transparent;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 70%;
`;

const ProgressBar = styled.div`
  background-color: #007bff;
  border: 1px solid transparent;
  border-radius: 10px;
  color: #fff;
  font-size: 0.8rem;
`;

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, {message: null});
  const [meal, setMeal] = useState({...initialState});
  const [uploadProgress, setUploadProgress] = useState(0);
  console.log('meal===>', meal);

  const router = useRouter();

  const handleInputChange = e => {
    const {name, value} = e.target;
    setMeal({...meal, [name]: value});
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setMeal({...meal, imageURL: downloadURL});
          toast.success('Image uploaded successfully');
        });
      }
    );
  };

  const addMeal = e => {
    e.preventDefault();

    try {
      const docRef = addDoc(collection(db, 'meals'), {
        name: meal.name,
        email: meal.email,
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        imageURL: meal.imageURL,
        createdAt: Timestamp.now().toDate(),
      });
      setUploadProgress(0);
      setMeal({
        ...initialState,
      });

      toast.success('Meal uploaded successfully.');
      router.push('/meals');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={addMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={meal.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={meal.email}
                onChange={handleInputChange}
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={meal.title}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              required
              value={meal.summary}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              value={meal.instructions}
              onChange={handleInputChange}
            ></textarea>
          </p>
          <p>
            <ProgressCard uploadProgress={uploadProgress}>
              <label>Your Image:</label>
              {uploadProgress === 0 ? null : (
                <Progress>
                  <ProgressBar style={{width: `${uploadProgress}%`}}>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </ProgressBar>
                </Progress>
              )}

              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
              {/* {meal.imageURL === '' ? null : (
                <input
                  type="text"
                  name="imageURL"
                  disabled
                  value={meal.imageURL}
                  style={{padding: '0', height: '25%', marginTop: '-10rem'}}
                />
              )} */}
            </ProgressCard>
          </p>
          {/* <ImagePicker label="Your image" name="image" /> */}
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            {/* <MealsFormSubmit /> */}
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
