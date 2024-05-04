'use client';

import {useFormState} from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import {shareMeal} from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import {useState} from 'react';
import styled from 'styled-components';
import {usePathname, useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {db, storage} from '@/firebase/config';
import {Timestamp, addDoc, collection, doc, setDoc} from 'firebase/firestore';
import {selectMeals} from '@/redux/slice/mealSlice';
import {useSelector} from 'react-redux';

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

export default function EditMealPage({params}) {
  const [state, formAction] = useFormState(shareMeal, {message: null});
  const meals = useSelector(selectMeals);
  const {id} = params;
  const mealEdit = meals.find(meal => meal.id === id);
  const [meal, setMeal] = useState(mealEdit);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  console.log('params', id);
  // const pathname = usePathname();
  // const id = pathname.split('/meals/')[1];

  // console.log('id===>');

  // const detectForm = (id, f1, f2) => {
  //   if (id === 'share') {
  //     return f1;
  //   }
  //   return f2;
  // };

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

  const editMeal = e => {
    e.preventDefault();

    // setIsLoading(true);

    if (meal.imageURL !== mealEdit.imageURL) {
      const storageRef = ref(storage, mealEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, 'meals', id), {
        name: meal.name,
        email: meal.email,
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        imageURL: meal.imageURL,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success('Meal edited successfully');
      router.push('/myRecipes');
    } catch (error) {
      toast.error(error.message);
    }
    // setIsLoading(false);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Edit your
          <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={editMeal}>
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
            <button type="submit">Edit Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
