import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import "../Styles/Home.css";
import arrowIcon from "../res/backicon.svg";
import { arrowBack, call, heart, pin } from "ionicons/icons";
import "../Styles/Login.css";
import LoginStore, { LoginInfoDO } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import axios from "axios";
import crypto from "crypto";
const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const [present] = useIonAlert();
  const postLoginInfo = async () => {
    if(id.length==0||id.includes(" ")){
      present("로그인실패! 아이디를 확인해주세요!", [{ text: 'Ok' }]);
      return;
    }
    if(password.length==0){
      present("로그인실패! 비밀번호를 확인해주세요!", [{ text: 'Ok' }]);
      return;
    }
    const headerconfig: any = {
      headers: { "Content-Type": "application/json" },
    };
    await axios
      .post(
        rootURL + "/authenticate",
        JSON.stringify({
          username: id,
          password: crypto
            .createHash("sha512")
            .update(password)
            .digest("base64")
            .toString(),
        }),
        headerconfig
      )
      .then((res:any) => {
          console.log(res.data);
          LoginStore.setLoginInfo(new LoginInfoDO(id));
          LoginStore.setLoginDialogVariable(false);
          LoginStore.setIsLoggedIn(true);
          const accessToken = res.data.token as string;
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              id: id,
              username: LoginStore.loginInfo.id,
              tokenHashed: accessToken,
            })
          );
          localStorage.setItem("userid", id);
          localStorage.setItem("accessToken", accessToken);
          window.location.assign("/");
      })
      .catch(() => {
        present("로그인실패! \n아이디와 비밀번호를 다시 확인해주세요", [{ text: 'Ok' }]);
      });
    LoginStore.setLoginDialogVariable(false);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => window.location.assign("/welcome")}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>로그인</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="login_title"></div>
        <IonItem>
          <IonLabel position="stacked">아이디</IonLabel>
          <IonInput
            value={id}
            placeholder=""
            type="text"
            
            onIonChange={(e) => setId(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">비밀번호</IonLabel>
          <IonInput
            value={password}
            placeholder=""
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
            onKeyPress={(e)=>{
              if(e.key=="Enter"){
                postLoginInfo();
              }
            }}
          ></IonInput>
        </IonItem>
        <div className="login_btn">
          <IonButton expand="full" color="primary" onClick={postLoginInfo} disabled={id.length==0 || password.length==0}>
            로그인
          </IonButton>
        </div>
        <div className="signIn_btn">
          <IonButton expand="full" color="light" onClick={()=>{history.push("/signup")}}>
            회원가입
          </IonButton>
        </div>
        <div className="find_pw_btn">
        <IonButton color="dark" fill="clear" size="small">
          <p> 비밀번호/아이디가 기억나지 않나요?</p>
        </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
