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
  map,
  arrowBack,
} from "ionicons/icons";
import { WishItemDO } from "./AlbumDetailPage";
import { useHistory } from "react-router";
import React from "react";
const checkboxList = [
  {
    val: "카페 공백",
    isChecked: true,
    id: "1",
    latitude: 37.3594701,
    longitude: 127.105389,
  },
  {
    val: "에버랜드",
    isChecked: false,
    id: "2",
    latitude: 37.2592703,
    longitude: 127.105389,
  },
  {
    val: "평창 양떼목장",
    isChecked: false,
    id: "3",
    latitude: 37.4591702,
    longitude: 127.105389,
  },
  {
    val: "춘천 남이섬",
    isChecked: false,
    id: "4",
    latitude: 37.5590705,
    longitude: 127.105389,
  },
];
const PlacePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [wishList, setWishList] = useState<WishItemDO[]>(checkboxList);
  const [wishPlace, setWishPlace] = useState("");
  const [address, setAddress] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const handleClose = () => {
    setOpen(false);
  };

  const mapStyle = {
    width: "100%",
    height: "320px",
  };

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    const initMap = () => {
      setNaverMap(
        new naver.maps.Map("map", {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: true,
          minZoom: 6,
          zoomControlOptions: {
            //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT,
          },
        })
      );
    };
    initMap();
  }, []);
  const addMark = (
    isChecked: boolean,
    latitude: number,
    longitude: number,
    title: string
  ) => {
    console.log(title);
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: naverMap,
      zIndex: 100,
    });
    marker.setTitle(title);
    var infowindow = new naver.maps.InfoWindow({
      content: [`<div className="info-title">${title}</div>`].join(""),
      maxWidth: 150,
      borderWidth: 1,
      anchorSize: new naver.maps.Size(5, 5),
      anchorSkew: true,
    });
    infowindow.open(naverMap!, marker);
    naverMap?.setCenter(new naver.maps.LatLng(latitude, longitude));
  };
  if (showLoading) {
    return <>{SkeletonLoading()}</>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
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
            <div style={{ height: "40vh" }}>
              <div id="map" style={mapStyle}></div>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="bucket_list_container">
          <div className="bucketList">
            <h4>Hot Place</h4>
            <IonIcon
              icon={map}
              style={{ marginLeft: "2vw", marginTop: "1vh" }}
              onClick={() => setOpen(true)}
            />
          </div>
          <IonList>
            {checkboxList.map((item: any, i) => (
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
                    addMark(
                      item.isChecked,
                      item.latitude,
                      item.longitude,
                      item.val
                    );
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
