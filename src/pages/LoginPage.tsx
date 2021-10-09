import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import "../Styles/Home.css";
 

  const LoginPage: React.FC = () => {
    
    return (
      <IonPage >
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="toolbar">로그인</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
          로그인페이지
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginPage;
  