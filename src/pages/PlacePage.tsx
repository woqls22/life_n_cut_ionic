import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import "../Styles/Home.css";
 
  import { useEffect, useState } from "react";
  const PlacePage: React.FC = () => {
    useEffect(()=>{
      if(!localStorage.getItem("userInfo")){
        window.location.assign("/login");
      }
    },[])
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="toolbar">PLACE</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
        </IonContent>
      </IonPage>
    );
  };
  
  export default PlacePage;
  