import Link from "next/link";

const HorizonLine = () => {
    return (
      <div
        style={{
          width: "97%",
          borderBottom: "1px solid #ccc",
          marginTop:"3%",
          marginBottom:"3%"
        }}
      >
      </div>
    );
  };

const Pagelist = () => {
    return(
        <div>
          <section style={{textAlign:"center"}}>
            <Link href="/board/study" replace={false} style={{textDecoration:"none"}}><a style={{marginLeft:"3%"}}>학업</a></Link><a style={{marginLeft:"3%"}}> | </a>
            <Link href="/board/employ" replace={false} style={{textDecoration:"none"}}><a style={{marginLeft:"3%"}}>취업</a></Link><a style={{marginLeft:"3%"}}> | </a>
            <Link href="/board/daily" replace={false} style={{textDecoration:'none'}}><a style={{marginLeft:"3%"}}>일상</a></Link><a style={{marginLeft:"3%"}}> | </a>
            <Link href="/board/human" replace={false} style={{textDecoration:'none'}}><a style={{marginLeft:"3%"}}>인간관계</a></Link><a style={{marginLeft:"3%"}}> | </a>
            <Link href="/board/disease" replace={false} style={{textDecoration:'none'}}><a style={{marginLeft:"3%"}}>질병</a></Link><a style={{marginLeft:"3%"}}> | </a>
            <Link href="/board/etc" replace={false} style={{textDecoration:'none'}}><a style={{marginLeft:"3%"}}>기타</a></Link><a style={{marginLeft:"3%"}}/>
            <HorizonLine/>
          </section>
        </div>
    )
}
export default Pagelist;