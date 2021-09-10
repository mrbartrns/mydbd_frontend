import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

// TODO: 기능추가: 데이터가 비어있거나 불러오지 못했을 경우, 에러메시지 출력
function SurvivorList(props) {
  const [apiData, setApiData] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const history = useHistory();
  const leftBtnClick = (data) => {
    setImgIdx(imgIdx > 0 ? imgIdx - 1 : 0);
  };
  const rightBtnClick = (data) => {
    setImgIdx(imgIdx + 1 <= data.length ? imgIdx + 1 : imgIdx);
  };
  useEffect(() => {
    UserService.getSurvivorList().then((response) => {
      setApiData(response.data);
      return response.data;
    });
  }, []);
  return (
    <div>
      {apiData &&
        apiData.map((data, idx) => {
          return (
            <div key={idx}>
              <img
                className="api-profile-img"
                src={data.images[imgIdx] ? data.images[imgIdx].image : ""}
                alt=""
              />
              <Link to={"/detail/survivor/" + String(data.id)}>
                <h2>{data.name_kor}</h2>
              </Link>
              <h3>{data.name}</h3>
              {data.images.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    leftBtnClick(data.images);
                  }}
                >
                  prev
                </button>
              )}
              {data.images.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    rightBtnClick(data.images);
                  }}
                >
                  next
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default SurvivorList;
