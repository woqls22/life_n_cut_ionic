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
  const MainPage: React.FC = () => {
    const [position, setPosition] = useState(0);
    function onScroll(e:any) {
      console.log(e);
      // setPosition(e.target.scrollTop);
      // console.log(position);
    }
    const makeAlbum=()=>{
      if (localStorage.getItem("userInfo")) {
        //    서비스렌더링
        window.location.assign("/album");
      } else{
        window.location.assign("/login");
      }
    }
    return (
      <IonPage ref={onScroll}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="toolbar">ALBUM</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
        </IonContent>
      </IonPage>
    );
  };
  
  export default MainPage;
  