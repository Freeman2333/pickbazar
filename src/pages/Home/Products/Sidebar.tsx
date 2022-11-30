import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Products.module.sass';
import { getCategories } from '../../../store/actions/actions';
import Category from './Category';
import { ReactComponent as cat1 } from '../../../assets/cats/1.svg';
import { ReactComponent as cat4 } from '../../../assets/cats/4.svg';
import { ReactComponent as cat7 } from '../../../assets/cats/7.svg';
import { ReactComponent as cat16 } from '../../../assets/cats/16.svg';
import { ReactComponent as cat21 } from '../../../assets/cats/21.svg';
import { ReactComponent as cat28 } from '../../../assets/cats/28.svg';
import { ReactComponent as cat35 } from '../../../assets/cats/35.svg';
import { ReactComponent as cat40 } from '../../../assets/cats/40.svg';
import { ReactComponent as cat47 } from '../../../assets/cats/47.svg';
import { ReactComponent as cat55 } from '../../../assets/cats/55.svg';
import { RootState } from '../../../store/reducers';

/* eslint consistent-return: off */

const getImg = (id: number) => {
  switch (id) {
    case 1:
      return cat1;
    case 4:
      return cat4;
    case 7:
      return cat7;
    case 16:
      return cat16;
    case 21:
      return cat21;
    case 28:
      return cat28;
    case 35:
      return cat35;
    case 40:
      return cat40;
    case 47:
      return cat47;
    case 55:
      return cat55;
    default:
      break;
  }
};
const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.products.categories,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <aside className={classes.sidebar}>
      <ul className={classes.list}>
        {categories.map((cat) => (
          <Category key={cat.id} cat={cat} img={getImg(cat.id)} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
