import Link from 'next/link';
import styled from 'styled-components';
import {FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import Notiflix from 'notiflix';
import {deleteDoc, doc} from 'firebase/firestore';
import {db, storage} from '../../firebase/config';
import {deleteObject, ref} from 'firebase/storage';
import {toast} from 'react-toastify';

// import {
//   ADD_TO_CART,
//   DECREASE_CART,
//   REMOVE_FROM_CART,
// } from '../../redux/slice/cartSlice';

const Table = styled.table`
  width: 100%;
  text-align: center;
  color: #ddd6cb;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  font-size: 1rem;
  background: lightgrey;
  color: white;
`;

const TableBody = styled.tbody`
  font-size: 1rem;
`;

export const MealsTable = ({meals}) => {
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Recipe',
      'Are you sure that you want to delete the recipe?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteMeal(id, imageURL);
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '8px',
      }
    );
  };

  const deleteMeal = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'meals', id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Recipe deleted successfully');
    } catch (error) {
      //   toast.error(error.message);
    }
  };

  return (
    <Table>
      {/* <TableHead>
        <tr>
          <th>s/n</th>
          <th>Image</th>
          <th>Title</th>
          <th>Summary</th>
          <th>Actions</th>
        </tr>
      </TableHead> */}
      <TableBody>
        {meals.map((meal, index) => {
          const {id, title, summary, imageURL} = meal;
          return (
            <tr key={id} style={{cursor: 'pointer'}}>
              {/* <td>{index + 1}</td> */}

              <td>
                <Link href={`/meals/${id}`}>
                  <img src={imageURL} alt={name} style={{width: '150px'}} />
                </Link>
              </td>
              <td>{title}</td>
              <td>{summary}</td>
              <td>
                <Link href={`/meals/share/${id}`}>
                  <FiEdit size={18} color="green" />
                </Link>
                &nbsp;
                <BsTrash
                  onClick={() => confirmDelete(id, imageURL)}
                  size={18}
                  color="red"
                  cursor="pointer"
                />
              </td>
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
};
