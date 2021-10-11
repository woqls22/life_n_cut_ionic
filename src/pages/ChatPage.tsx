import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import "../Styles/Home.css";
  import { useEffect, useState } from "react";
  import SkeletonLoading from "../components/SkeletonLoading";
  const ChatPage: React.FC = () => {
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
      if (!localStorage.getItem("userInfo")) {
        window.location.assign("/login");
      }
    }, []);
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="toolbar">CHAT</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        아직안만듦...
         {SkeletonLoading()}
        </IonContent>
      </IonPage>
    );
  };
  export default ChatPage;
  