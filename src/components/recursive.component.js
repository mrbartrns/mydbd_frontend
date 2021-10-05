import React from "react";

function TreeComponent(props) {
  return (
    <div>
      {props.loaded &&
        props.data.map((el) => {
          return (
            <ul style={{ listStyle: "none" }}>
              <li comment-sn={el.author.id}>
                <div>작성자: {el.author.username}</div>
                <div>내용: {el.content}</div>
                <div>작성일: {el.dt_created}</div>
                <div>수정일: {el.dt_modified}</div>
              </li>
              {el.children.length > 0 && (
                <TreeComponent data={el.children} loaded={props.loaded} />
              )}
            </ul>
          );
        })}
    </div>
  );
}

function RecursiveList(props) {
  return (
    <div>
      <h1>댓글</h1>
      <TreeComponent data={props.data} loaded={props.loaded} />
    </div>
  );
}

export default RecursiveList;
