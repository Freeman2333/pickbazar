import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserToStore } from '../../store/actions/actions';
import classes from './UserInfo.module.sass';
import userImg from '../../assets/user.svg';

const UserInfo: FC = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <div
      className={classes.wrapper}
      onMouseEnter={() => setShowList(true)}
      onMouseLeave={() => setShowList(false)}
    >
      <img src={userImg} alt="user" className={classes.img} />
      {showList && (
        <ul
          className={classes.list}
          onMouseEnter={() => setShowList(true)}
          onMouseLeave={() => setShowList(false)}
        >
          <li className={classes.listItem}>
            <Link to="/" className={classes.listLink}>
              Profile
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/" className={classes.listLink}>
              Checkout
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/" className={classes.listLink}>
              Order
            </Link>
          </li>
          <li className={classes.listItem}>
            <button
              type="button"
              className={classes.listLink}
              onClick={() => dispatch(addUserToStore(null))}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
