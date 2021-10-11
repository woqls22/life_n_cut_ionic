import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
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

import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import { height } from "@mui/system";
import {
  calendarOutline,
  checkmarkCircleOutline,
  trashBinOutline,
  map
} from "ionicons/icons";
import { WishItemDO } from "./AlbumDetailPage";
const checkboxList = [
  { val: "카페 공백", isChecked: true, id: "1" },
  { val: "에버랜드", isChecked: false, id: "2" },
  { val: "평창 양떼목장", isChecked: false, id: "3" },
  { val: "춘천 남이섬", isChecked: false, id: "4" },
];
const PlacePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [wishList, setWishList] = useState<WishItemDO[]>(checkboxList);
  const [wishPlace, setWishPlace] = useState("");
  const [address, setAddress] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
  }, []);
  if (showLoading) {
    return <>{SkeletonLoading()}</>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="toolbar">PLACE</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
          <IonCardTitle>PLACE🚀</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ backgroundColor: "black", height: "30vh" }}>
              지도가 들어가는 자리, <br />
              등록해놓은 곳에 핀이 꽂힙니다.
            </div>
          </IonCardContent>
        </IonCard>
        <div className="bucket_list_container">
          <div className="bucketList">
            <h4>Hot Place</h4>
            <IonIcon
              icon={map}
              style={{ marginLeft: "2vw", marginTop:"1vh"}}
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
            <IonLabel position="stacked">지역명 / 상호명</IonLabel>
            <IonItem style={{ marginBottom: "2vh", marginTop: "2vh" }}>
              <IonInput
                value={wishPlace}
                placeholder="ex) 에버랜드"
                type="text"
                onIonChange={(e) => setWishPlace(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonLabel position="stacked">주소</IonLabel>
            <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
              <IonInput
                value={address}
                placeholder="ex) 서울특별시 성동구 아차산로 "
                type="text"
                onIonChange={(e) => setAddress(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonButton
              onClick={() => {
                //버킷리스트 추가 post요청
              }}
              expand="full"
              style={{ marginBottom: "2vh" }}
            >
              핫플 추가하기
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
    </IonPage>
  );
};
export default PlacePage;
