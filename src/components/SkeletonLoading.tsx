import { IonContent, IonList, IonListHeader, IonItem, IonLabel, IonSkeletonText, IonThumbnail } from "@ionic/react";

export default function SkeletonLoading(){
    return (
        <IonContent>
          <IonList>
              <IonListHeader>
                
              </IonListHeader>
              <IonItem>
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated style={{ width: '100%', height:"30vh" }} />
                  </h3>
                  <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                  </p>
                  <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonThumbnail slot="start">
                  <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                  </h3>
                  <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                  </p>
                  <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                  </p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonSkeletonText animated style={{ width: '27px', height: '27px' }} slot="start" />
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                  </h3>
                  <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                  </p>
                  <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
        </IonContent>
      );
}