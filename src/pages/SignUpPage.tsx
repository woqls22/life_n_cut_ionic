import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import "../Styles/Home.css";
import { arrowBack } from "ionicons/icons";
import "../Styles/Login.css";
import LoginStore, { LoginInfoDO } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import axios from "axios";
import crypto from "crypto";
const SignUpPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [relation, setRelation]=useState("");
  const history = useHistory();
  const [present] = useIonAlert();
  const postLoginInfo = async () => {
    if(id.length<5){
        present("아이디는 최소 5자 이상이어야 합니다.", [{ text: 'Ok' }]);
      return;
    }
    if(password1.length<5){
        present("비밀번호는 최소 5자 이상이어야 합니다.", [{ text: 'Ok' }]);
        return;
    }
    if(password1!=password2){
        present("비밀번호를 다시 확인해주세요!", [{ text: 'Ok' }]);
        return;
    }
    const data = {
      id: id,
      passwd: password1,
      nickname: nickname,
      birthday: birthday,
    };
    const headerconfig: any = {
      headers: { "Content-Type": "application/json" },
    };
    await axios
      .post(
        rootURL + "/signup",
        JSON.stringify({
          email: id,
          password: crypto
            .createHash("sha512")
            .update(password1)
            .digest("base64")
            .toString(),
          auth: "ROLE_USER",
          nickname: nickname,
          birthday: birthday,
          name : name,
          anniversary : anniversary,
          anniversaryDate : anniversaryDate,
          relation : relation
        }),
        headerconfig
      )
      .then((res) => {
        LoginStore.setLoginInfo(new LoginInfoDO(id));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        present("회원가입이 완료되었습니다. 가입한 정보로 로그인해주세요.", [{ text: 'Ok' }]);
        history.goBack();
      })
      .catch(() => {
        present("아이디가 중복됩니다. 다른 아이디를 사용하세요", [{ text: 'Ok' }]);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>회원가입</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="login_title">아이디 / 비밀번호 설정</div>
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
            value={password1}
            placeholder=""
            type="password"
            onIonChange={(e) => setPassword1(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {password1.length > 0 && (
          <>
            {password1.length<5 ? (
              <div className="err_text">비밀번호가 너무 짧습니다!</div>
            ) : (
              <></>
            )}
          </>
        )}
        <IonItem>
          <IonLabel position="stacked">비밀번호 확인</IonLabel>
          <IonInput
            value={password2}
            placeholder=""
            type="password"
            onIonChange={(e) => setPassword2(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {password2.length >= 5 && (
          <>
            {password2 === password1 ? (
              <div className="success_text">두 비밀번호가 일치합니다.</div>
            ) : (
              <div className="err_text">비밀번호를 다시 확인해주세요.</div>
            )}
          </>
        )}
        <div className="login_title">사용자 정보</div>
        <IonItem>
          <IonLabel position="stacked">이름</IonLabel>
          <IonInput
            value={name}
            placeholder=""
            type="text"
            onIonChange={(e) => setName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">닉네임</IonLabel>
          <IonInput
            value={nickname}
            placeholder=""
            type="text"
            onIonChange={(e) => setNickName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">생년월일</IonLabel>
          <IonDatetime
            displayFormat="YYYY.MM.DD"
            min="1900-01-01"
            value={birthday}
            placeholder="2000.01.01"
            onIonChange={(e) => setBirthday(e.detail.value!)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">기념일 (수식어)</IonLabel>
          <IonInput
            value={anniversary}
            placeholder="우리 만난지"
            type="text"
            onIonChange={(e) => setAnniversary(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">기념일 (날짜)</IonLabel>
          <IonDatetime
            displayFormat="YYYY.MM.DD"
            min="1900-01-01"
            value={anniversaryDate}
            placeholder="2000.01.01"
            onIonChange={(e) => setAnniversaryDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">상대와의 관계</IonLabel>
          <IonInput
            value={relation}
            placeholder="OO의 남자친구"
            type="text"
            onIonChange={(e) => setRelation(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <div className="signup_btn">
          <IonButton expand="full" color="primary" onClick={() => {postLoginInfo()}}>
            회원가입
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
