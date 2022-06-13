import { NextPage } from "next";
import { MyPageContext } from "../_app";
import { getPostDetailAPI } from "../../lib/api/post";
import { postActions } from "../../store/rightPost";
import RightPost from "../../components/post/RightPost";

const postDetail: NextPage = () => {
  return <RightPost />;
};

postDetail.getInitialProps = async (props: MyPageContext) => {
  const { query, store } = props;
  const { id } = query;

  try {
    if (id) {
      const { data } = await getPostDetailAPI(Number(id as string)); //id로 room을 가져옴
      console.log(data);
      store.dispatch(postActions.setPostDetail);
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default postDetail;
