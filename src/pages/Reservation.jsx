import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDB } from "../redux/modules/Booking";
import { getCookie } from "../shared/Cookie";

import { useParams } from "react-router-dom";

import CalendarTemplate from "../components/booking/Calendar";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { getLeafDB } from "../redux/modules/Leaf";

const Reservation = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const LeafCount = useSelector((state) => state?.leafReducer?.data);
  useEffect(() => {
    dispatch(getBookingDB());
    dispatch(getLeafDB());
  }, []);
  console.log(LeafCount)

  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    blogId,
    availability,
    setAvailability,
  });
  return (
    <div>
      <Header />
      
      <CalendarBox>
        <Calendar userId={blogId} />
      </CalendarBox>
      <Footer />
    </div>
  );
};

const CalendarBox = styled.div`
width: 100%;
height: 950px;
display: flex;
justify-content: center;
align-items: center;
`


export default Reservation;
