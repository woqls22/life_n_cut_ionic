import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFabButton,
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
import { arrowBack, cloudUpload } from "ionicons/icons";
import "../Styles/Login.css";
import LoginStore, { LoginInfoDO } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import axios from "axios";
import crypto from "crypto";
const ModifyPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [relation, setRelation] = useState("");
  const history = useHistory();
  const [present] = useIonAlert();
  const postLoginInfo = async () => {
    if (id.length < 5) {
      present("아이디는 최소 5자 이상이어야 합니다.", [{ text: "Ok" }]);
      return;
    }
    if (password1.length < 5) {
      present("비밀번호는 최소 5자 이상이어야 합니다.", [{ text: "Ok" }]);
      return;
    }
    if (password1 != password2) {
      present("비밀번호를 다시 확인해주세요!", [{ text: "Ok" }]);
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
          name: name,
          anniversary: anniversary,
          anniversaryDate: anniversaryDate,
          relation: relation,
        }),
        headerconfig
      )
      .then((res) => {
        LoginStore.setLoginInfo(new LoginInfoDO(id));
        LoginStore.setLoginDialogVariable(false);
        LoginStore.setIsLoggedIn(true);
        present("회원가입이 완료되었습니다. 가입한 정보로 로그인해주세요.", [
          { text: "Ok" },
        ]);
        history.goBack();
      })
      .catch(() => {
        present("아이디가 중복됩니다. 다른 아이디를 사용하세요", [
          { text: "Ok" },
        ]);
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
          <IonTitle>정보 수정</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="modify_title">사용자 정보</div>
        <div className="modify_avartar">
          <div className="container_avartar">
            <IonAvatar>
              <img className="back"src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />
            </IonAvatar>
          </div>
        </div>
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
        <div className="my_modify_btn">
          <IonButton
            expand="full"
            color="primary"
            onClick={() => {
              postLoginInfo();
            }}
          >
            정보수정
          </IonButton>
        </div>
        <div className="my_close_btn">
          <IonButton
            expand="full"
            color="light"
            onClick={() => {
              history.goBack();
            }}
          >
            취소
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModifyPage;
