import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "../Styles/Home.css";
import firstImg from "../res/1.jpeg";
import secondImg from "../res/2.jpeg";
import thirdimg from "../res/3.jpeg";
import fourthImg from "../res/4.jpeg";
import wishList from "../res/5.jpeg";
import dDay from "../res/6.jpeg";
import { useEffect, useState } from "react";
function PhotoItem(Background: any) {
  return (
    <>
      <div
        className="photoItem"
        style={{ backgroundImage: `url(${Background})` }}
      ></div>
    </>
  );
}
function PhotoItemWithBorder(Background: any) {
  return (
    <>
      <div
        className="photoItems"
        style={{ backgroundImage: `url(${Background})`, marginBottom: "1%" }}
      ></div>
    </>
  );
}
const WelcomePage: React.FC = () => {
  const [position, setPosition] = useState(0);
  function onScroll(e:any) {
    console.log(e);
    // setPosition(e.target.scrollTop);
    // console.log(position);
  }
  const makeAlbum=()=>{
    if (localStorage.getItem("userInfo")) {
      //    서비스렌더링
      window.location.assign("/photo/main");
    } else{
      window.location.assign("/login");
    }
  }
  return (
    <IonPage ref={onScroll}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="toolbar">인생N컷</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        <div className="main_content">
          <div className="main_section1">
            <div className="grayText">
              소중한 추억을 친구, 연인과 함께 쌓아보세요!
            </div>
            <div className="grayText">#PHOTO, #ALBUM, #PRIVATE</div>
            <div className="btn_section">
              <div>
                <IonButton color="light" onClick={makeAlbum} >지금 앨범만들기</IonButton>
              </div>
            </div>
            <div className={"ncutImg"}>
              <div className={"whitesection"}>
                <div className="whiterect">{PhotoItem(firstImg)}</div>
                <div className="whiterect">{PhotoItem(secondImg)}</div>
                <div className="whiterect">{PhotoItem(thirdimg)}</div>
                <div className="whiterect">{PhotoItem(fourthImg)}</div>
              </div>
            </div>
          </div>
          <div className="introduce_text">
            인생 N컷은 친구, 연인과 함께 추억을 공유할 수 있는
            <br /> Private Album입니다.
          </div>
          <div className="introduce_text">
            '우리만의' 앨범에 사진을 업로드하고
          </div>
          <div className="introduce_text">
            소중한 사람들과 추억을 <br />
            공유할 수 있어요.
          </div>
          <div className="wishcontainer">{PhotoItemWithBorder(wishList)}</div>
          <div className="introduce_text">
            '우리가 가야할 곳'을 저장하고<br />
            버킷리스트를 작성할 수도 있죠.
          </div>

          <div className="wishcontainer">{PhotoItemWithBorder(dDay)}</div>
          <div className="introduce_text">
            디데이를 설정하고, 우리가 함께한 <br/>시간도 기억할 수 있어요.
          </div>
          <div className="introduce_text">
            소중한 '지금' <br/>같이 기억하는건 어때요?
          </div>
          <div className="btn_section">
              <div style={{marginBottom:"10vh"}}>
                <IonButton color="light" onClick={makeAlbum}>지금 앨범만들기</IonButton>
              </div>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
