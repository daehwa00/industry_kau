import { NextPage } from "next";
import { MyPageContext } from "../_app";
import { getPostAPI } from "../../lib/api/post";
import { rightPostActions } from "../../store/rightPost";
import RightPost from "../../components/post/RightPost";
import { NextPageContext } from "next";

const postDetail: NextPage = () => {
  return <RightPost />;
};

postDetail.getInitialProps = async (props: NextPageContext) => {
  const { query, store } = props;
  const { id } = query;

  try {
    if (id) {
      const { data } = await getPostAPI(Number(id as string)); //id로 room을 가져옴
      console.log(data);
      store.dispatch(rightPostActions.setPostDetail);
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default postDetail;
