import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
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
import SkeletonLoading from "../components/SkeletonLoading";
import { useHistory } from "react-router";
const MainPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const history=useHistory();
  function onScroll(e: any) {
    console.log(e);
    // setPosition(e.target.scrollTop);
    // console.log(position);
  }
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    // album 정보를 가져오면 setShowLoading(false);
  }, []);

  return (
    <IonPage ref={onScroll}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="toolbar">ALBUM</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {showLoading ? (
        <>{SkeletonLoading()}</>
      ) : (
        <>
          <IonContent className="ion-padding">
            <IonButton expand="full">앨범 만들기</IonButton>
            <IonListHeader>
              <IonLabel>내가 속한 앨범</IonLabel>
            </IonListHeader>
            <IonList>
              <IonItem>
              <div className="user_title" style={{width:"100%"}} onClick={()=>{history.push("/album/1")}}>
                <div className="user_pic">
                  <IonAvatar>
                  <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" /> </IonAvatar>
                </div>
                <div>앨범1</div>
              </div>
              </IonItem>
              <IonItem>
              <div className="user_title" style={{width:"100%"}} onClick={()=>{history.push("/album/2")}}>
                <div className="user_pic">
                  <IonAvatar>
                  <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" /> </IonAvatar>
                </div>
                <div>앨범2</div>
              </div>
              </IonItem>
            </IonList>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default MainPage;
