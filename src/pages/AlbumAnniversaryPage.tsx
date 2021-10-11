import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../Styles/Home.css";
import "../Styles/Album.css";
import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import {
  arrowBack,
  checkmarkCircleOutline,
  calendarOutline,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
export class WishItemDO {
  val: string;
  isChecked: boolean;
  id: string;
  constructor(val: string, isChecked: boolean, id: string) {
    this.val = val;
    this.isChecked = isChecked;
    this.id = id;
  }
}
const checkboxList = [
  { val: "파리여행 가기", isChecked: true, id: "1" },
  { val: "에버랜드 가기", isChecked: false, id: "2" },
  { val: "맛집 놀러가기", isChecked: false, id: "3" },
  { val: "낚시하기", isChecked: false, id: "4" },
  { val: "원데이클래스 해보기", isChecked: false, id: "5" },
  { val: "전시보러가기", isChecked: false, id: "6" },
  { val: "단풍 구경하러가기", isChecked: false, id: "7" },
];

const AlbumAnniversaryPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(false);
  const [wishList, setWishList] = useState<WishItemDO[]>(checkboxList);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [wishItem, setWishItem] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");

  function onScroll(e: any) {
    console.log(e);
    // setPosition(e.target.scrollTop);
    // console.log(position);
  }
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          <IonButtons slot="secondary">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <div className="toolbar">{params.albumId} 기념일</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {showLoading ? (
        <>{SkeletonLoading()}</>
      ) : (
        <>
          <IonContent className="ion-padding">
            <div className="anniversary_enroll_btn">
              <div>
                <IonButton onClick={() => setOpen(true)}>추가하기</IonButton>
              </div>
            </div>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Anniversary</IonCardSubtitle>
                <IonCardTitle>
                  <div className="user_title">
                    <div className="user_pic">
                      <IonAvatar>
                        <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />
                      </IonAvatar>
                    </div>
                    <div>앨범이름요</div>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="card_section">
                  <div className="card_title">앨범 생성일</div>
                  <div className="card_value">2021.01.01</div>
                </div>
                <div className="card_section">
                  <div className="card_title">기념일</div>
                  <div className="card_value">20.01.01</div>
                </div>
                <div className="card_section">
                  <div className="card_title">기념일1</div>
                  <div className="card_value">
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      style={{ color: "lightgreen", marginRight: "2vw" }}
                    />
                    20.01.01
                  </div>
                </div>
                <div className="card_section">
                  <div className="card_title">기념일2</div>
                  <div className="card_value">
                    22.01.01
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
            <IonModal isOpen={open}>
              <div className="albumModal">
                <IonLabel position="stacked">기념일</IonLabel>
                <IonItem style={{ marginTop: "2vh", marginBottom: "2vh" }}>
                  <IonInput
                    value={wishItem}
                    placeholder="ex) 1주년"
                    type="text"
                    onIonChange={(e) => setWishItem(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonLabel position="stacked">날짜</IonLabel>
                <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
                  <IonDatetime
                    displayFormat="YYYY.MM.DD"
                    min="1900-01-01"
                    value={anniversaryDate}
                    placeholder="2000.01.01"
                    onIonChange={(e) => setAnniversaryDate(e.detail.value!)}
                  ></IonDatetime>
                </IonItem>
                <IonButton
                  onClick={() => {
                    //버킷리스트 추가 post요청
                  }}
                  expand="full"
                  style={{ marginBottom: "2vh" }}
                >
                  기념일 추가하기
                </IonButton>
                <IonButton
                  onClick={() => handleClose()}
                  expand="full"
                  color="light"
                >
                  닫기
                </IonButton>
              </div>
            </IonModal>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default AlbumAnniversaryPage;
