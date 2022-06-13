import { NextPage } from "next";
import { getPostDetailAPI } from "../lib/api/post";
import { postActions } from "../store/rightPost";
import { MyPageContext } from "./_app";

const postDetail: NextPage = () => {
  return <div />;
};

postDetail.getInitialProps = async (props: MyPageContext) => {
  const { query, store } = props;
  const { id } = query;

  try {
    if (id) {
      const { data } = await getPostDetailAPI(Number(id as string));
      store.dispatch(postActions.setPostDetail(data));
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};
