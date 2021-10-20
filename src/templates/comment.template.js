// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";

// custom imports
import UserService from "../services/user.service";

// functions
import { parseQueryStringToDictionary } from "../functions";
import CommentComponent from "../components/Comment/comment.component";

/**
 * CommentTemplate는 parent comment를 api로부터 불러온다.
 * 댓글은 처음 10개를 불러온 뒤, nextPage가 변화함에 따라 댓글을 불러온다.
 * 만약 댓글의 정렬 순서가 바뀌었을 경우, 처음부터 다시 로드(댓글 다시 채우기)
 */
function CommentTemplate(props) {
  // constants
  const location = useLocation();

  // states
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentState, setCommentState] = useState(
    new Array(comments.length).fill(false)
  );
  const [nullPage, setNullPage] = useState(false);
  const [nextPage, setNextPage] = useState(1); // set next pagenumber after fetch
  const [nextPageUrl, setNextPageUrl] = useState(null); // to check more comments
  const [counts, setCounts] = useState(null); // store total comment counts

  // functions
  function toggleCommentBtn(idx) {
    const currentCommentState = [...commentState];
    currentCommentState[idx] = !currentCommentState[idx];
    setCommentState(currentCommentState);
  }

  // useEffect
  useEffect(() => {
    const queries = parseQueryStringToDictionary(location.search);
    // set query to get comments
    const source = UserService.getCancelToken();
    queries["parent"] = props.parent || null;
    queries["page"] = nextPage;
    queries["sortby"] = queries["sortby"] || "recent";
    queries["cancelToken"] = source.token;

    let mounted = true;
    if (mounted) {
      setLoaded(false);
      setNullPage(false);

      UserService.getCommentList(location.pathname, queries)
        .then((response) => {
          setLoading(true);
          setComments((c) => {
            return [...c, ...response.data.results];
          });
          setCommentState((c) => {
            return [
              ...c,
              ...new Array(response.data.results.length).fill(false),
            ];
          });
          setCounts(response.data.count);
          setNextPageUrl(response.data.next);
          setLoaded(true);
          setLoading(false);
        })
        .catch((error) => {
          // if page not have contents -> display null page
          // pagenumber > page -> error
          // parent who doesn't have child -> not error, just null
          if (!UserService.isCancel(error)) {
            console.error(error);
          }
          // TODO: dispatch set message
          setLoaded(true);
          setNullPage(true);
        });
    }

    return () => {
      UserService.unsubscribe();
      mounted = false;
    };
  }, [location, nextPage, props.parent]);
  return (
    <CommentComponent
      comments={comments}
      commentState={commentState}
      loaded={loaded}
      loading={loading}
      nullPage={nullPage}
      parent={props.parent}
      nextPage={nextPage}
      setNextPage={setNextPage}
      nextPageUrl={nextPageUrl}
      counts={counts}
      toggleCommentBtn={toggleCommentBtn}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total, isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentTemplate);
