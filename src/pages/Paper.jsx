import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
/* api */
import { apiToken } from "../shared/apis/Apis";
/* 컴포넌트 */
import Header from "../components/main/Header";
import ContentBox from "../components/paper/ContentBox";
/* 해야 할 것 */
//1. 블로그 글 눌러서 들어갔을 때 주소 맨 뒤 params의 postId를 얻어 내야한다.
//2. 아래 map 돌린 거 array 정확히 다 받으면 그거 돌리자
//3. 아래 p 태그 누를 시 페이지 변환할 것 (각각 형태 만들기)
const Paper = () => {
  const [basicSort, setBasicSort] = useState(true);
  const [tagSort, setTagSort] = useState(false);
  const [allSort, setAllSort] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  //## 개인 페이지 데이터  useQuery get
  const GetMyPaperData = async () => {
    const getData = await apiToken.get(`/api/paper/users/${userId}`);
    // console.log(getData);
    return getData?.data;
  };

  const { data: mypaper_data, status } = useQuery(
    "mypaper_data",
    GetMyPaperData,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  return (
    <>
      <Header />
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setBasicSort(true);
          setTagSort(false);
          setAllSort(false);
        }}
      >
        기본 정렬 (카테고리별){" "}
      </p>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTagSort(!tagSort);
          if (tagSort === false) {
            setTagSort(true);
            setBasicSort(false);
            setAllSort(false);
          } else {
            setTagSort(false);
            setBasicSort(true);
            setAllSort(false);
          }
        }}
      >
        태그 정렬
      </p>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setAllSort(!allSort);
          if (allSort === false) {
            setAllSort(true);
            setBasicSort(false);
            setTagSort(false);
          } else {
            setAllSort(false);
            setBasicSort(true);
            setTagSort(false);
          }
        }}
      >
        전체 정렬
      </p>
      {basicSort ? <div> 기본 카테고리 정렬이 보일 예정</div> : null}
      {tagSort ? (
        <>
          <div> 태그 정렬이 보일 예정</div>

          {mypaper_data?.tags.map((value, index) => {
            return <div key={index}>{value}</div>;
          })}
        </>
      ) : null}
      {allSort ? (
        <>
          <div> 전체 정렬이 보일 예정</div>
          <div>
            {mypaper_data?.user.Papers.map((value, idx) => {
              console.log(mypaper_data);

              return (
                <ContentBox
                  key={idx}
                  title={value.title}
                  thumbnail={value.thumbnail}
                  tags={value.tags}
                  createdAt={value.createdAt}
                  userId={value.userId}
                  postId={value.postId}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Paper;
