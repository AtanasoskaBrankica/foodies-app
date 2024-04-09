import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';

export default function MealItem({
  title,
  email,
  id,
  name,
  slug,
  imageURL,
  summary,
}) {
  console.log('slug', slug);
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={imageURL} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {name}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
