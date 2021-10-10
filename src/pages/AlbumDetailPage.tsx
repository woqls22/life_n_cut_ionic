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

const AlbumDetailPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(false);
  const [wishList, setWishList] = useState<WishItemDO[]>(checkboxList);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [wishItem, setWishItem] = useState("");
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
            <div className="toolbar">{params.albumId} 정보</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {showLoading ? (
        <>{SkeletonLoading()}</>
      ) : (
        <>
          <IonContent className="ion-padding">
            {/* <IonListHeader>
              <IonLabel>앨범이름</IonLabel>
            </IonListHeader> */}
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>앨범</IonCardSubtitle>
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
                  <div className="card_value">
                    600일
                    <div style={{ fontSize: "smaller" }}>20.01.01</div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
            <div>
              <div className="frined_title">
                <h4>앨범을 공유하는 사람</h4>
              </div>
              <div className="freind_list">
                <IonChip>
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>여자친구</IonLabel>
                </IonChip>
                <IonChip>
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>친구1</IonLabel>
                </IonChip>
                <IonChip>
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>친구2</IonLabel>
                </IonChip>
                <IonChip>
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>엄마</IonLabel>
                </IonChip>
                <IonChip>
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>아빠</IonLabel>
                </IonChip>
              </div>
            </div>

            <div className="bucket_list_container">
              <div className="bucketList">
                <h4>버킷리스트</h4>

                <IonIcon
                  icon={calendarOutline}
                  style={{ marginLeft: "2vw" }}
                  onClick={() => setOpen(true)}
                />
              </div>
              <IonList>
                {wishList.map((item: WishItemDO, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                      {item.isChecked ? (
                        <>
                          <IonIcon
                            icon={checkmarkCircleOutline}
                            style={{ color: "lightgreen", marginRight: "2vw" }}
                          />
                          {item.val}
                        </>
                      ) : (
                        <>{item.val}</>
                      )}
                    </IonLabel>
                    <IonCheckbox
                      slot="end"
                      value={item.val}
                      checked={item.isChecked}
                      onClick={() => {
                        item.isChecked = !item.isChecked;
                        let tmp = [...wishList];
                        console.log(item.id + "비트반전!");
                        setWishList(tmp);
                      }}
                    />
                  </IonItem>
                ))}
              </IonList>
            </div>
            <IonModal isOpen={open}>
              <div className="albumModal">
                <IonLabel position="stacked">
                  함께 하고싶은 일을 추가해주세요!
                </IonLabel>
                <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
                  <IonInput
                    value={wishItem}
                    placeholder="ex) 해외여행 가기"
                    type="text"
                    onIonChange={(e) => setWishItem(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonButton
                  onClick={() => {
                      //버킷리스트 추가 post요청
                  }}
                  expand="full"
                  style={{ marginBottom: "2vh" }}
                >
                  버킷리스트에 추가하기
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

            {/* <Dialog open={open} onClose={handleClose} >
              <DialogTitle>버킷리스트 담기</DialogTitle>
              <DialogContent>
                <IonItem>
                  <IonLabel position="stacked">함께 하고싶은 일을 추가해주세요!</IonLabel>
                  <IonInput
                    value={wishItem}
                    placeholder="해외여행 가기"
                    type="text"
                    onIonChange={(e) => setWishItem(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>확인</Button>
                <Button onClick={handleClose}>닫기</Button>
              </DialogActions>
            </Dialog> */}
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default AlbumDetailPage;
