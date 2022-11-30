import React, { useEffect, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Coupons.module.sass';
import { getCoupons } from '../../store/actions/actions';
import { RootState } from '../../store/reducers';

const Coupons: FC = () => {
  const coupons = useSelector((state: RootState) => state.main.coupons);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);
  return (
    <div className={classes.couponsSection}>
      <div className="container-lg">
        <Swiper spaceBetween={40} slidesPerView={3} navigation>
          {coupons.map((cpn) => (
            <SwiperSlide
              key={cpn.id}
              className={classes.coupon}
              style={{
                background: `linear-gradient(90deg, ${cpn.gradientColors.start} 0%, ${cpn.gradientColors.start} 100%)`,
              }}
            >
              <h3 className={classes.title}>{cpn.title}</h3>
              <h4 className={classes.subTitle}>{cpn.description}</h4>
              <a href="/" className="btn btn--coupon">
                {cpn.buttonText}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Coupons;
