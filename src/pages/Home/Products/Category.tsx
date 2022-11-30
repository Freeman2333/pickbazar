import React, { FC, useState, MouseEvent } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import classes from './Products.module.sass';
import { getProducts } from '../../../store/actions/actions';
import { ProductCategory } from '../../../store/types/main.types';
import { SVGComponent } from '../../../utils/general-types';

interface CategoryProps {
  img?: SVGComponent;
  cat: ProductCategory;
}

const Category: FC<CategoryProps> = ({ img: Img, cat }) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const { childCategories } = cat;
  const dispatch = useDispatch();
  const handleCategoryClick = (
    e: MouseEvent,
    id: number,
    isChildCategory?: boolean,
  ) => {
    e.preventDefault();
    if (isChildCategory) setIsUnfolded(!isUnfolded);
    dispatch(getProducts({ isChildCategory, id }));
  };
  return (
    <li className={classNames(classes.listItem, { active: isUnfolded })}>
      <a
        href="/"
        onClick={(e) => handleCategoryClick(e, cat.id)}
        className={classes.listLink}
      >
        {Img && <Img className={classes.catImg} />}
        <span className="small-title">{cat.title}</span>
      </a>
      {isUnfolded && (
        <ul className={classes.subList}>
          {childCategories?.map((chldCtg) => (
            <li key={chldCtg.id} className={classes.listItem}>
              <a
                href="/"
                className={classes.listLink}
                onClick={(e) => handleCategoryClick(e, chldCtg.id, true)}
              >
                {' '}
                <span className="smaller-title smaller-title--grey">
                  {chldCtg.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Category;
