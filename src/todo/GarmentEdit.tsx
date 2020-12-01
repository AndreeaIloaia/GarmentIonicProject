import React, {useContext, useEffect, useState} from "react";
import {getLogger} from '../core';
import {RouteComponentProps} from 'react-router';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput, IonItem, IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {GarmentContext} from "./GarmentProvider";
import {GarmentProps} from "./GarmentProps";
import {useNetwork} from "../core/UseNetState";

const log = getLogger('GarmentEdit');

interface GarmentEditProps extends RouteComponentProps<{
    id?: string;
}> {}

const GarmentEdit: React.FC<GarmentEditProps> = ({ history, match }) => {
    const {garments, saving, savingError, saveGarment
        // deleteGarment, getGarmentSrv, firstGarment
    } = useContext(GarmentContext);
    const [name, setText] = useState('');
    const [material, setMaterial] = useState('');
    const [inaltime, setInaltime] = useState('');
    const [latime, setLatime] = useState('');
    const [descriere, setDescriere] = useState('');
    const [otherDevice, setDevice] = useState(false);
    // const [status, setStatus] = useState('');
    const [garment, setGarment] = useState<GarmentProps>();
    // const [garmentNew, setGarmentNew] = useState<GarmentProps>();

    const { networkStatus } = useNetwork();

    useEffect(() => {
        log('useEffect');
        const routeId = match.params.id || '';
        const garment = garments?.find(i => i._id === routeId);
        setGarment(garment);
        if (garment) {
            setText(garment.name);
            setMaterial(garment.material);
            setInaltime(garment.inaltime);
            setLatime(garment.latime);
            setDescriere(garment.descriere);
            // setStatus(garment.status);
        }
    }, [match.params.id, garments]);
    // }, [match.params.id, garments, getGarmentSrv]);

    // useEffect(() => {
    //     setGarmentNew(firstGarment);
    // }, [firstGarment]);


    const handleSave = () => {
        const editedGer = garment ? {...garment, name, material, inaltime, latime, descriere, status:"empty"} : {name, material, inaltime, latime, descriere, status: "empty"};
        saveGarment && saveGarment(editedGer, networkStatus.connected).then(() => history.push('/garments'));
    };

    log('render');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SAVE MEEE</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}> SAVE ME BABEEE </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/*<IonItem className="ion-text-wrap">*/}
                {/*    <IonLabel className="labels">id</IonLabel>*/}
                {/*    <IonInput class="inputs" placeholder="ID" value={garment?._id} onIonChange={e => setText(e.detail.value || '')}/>*/}
                {/*</IonItem>*/}
                {/*<IonItem className="ion-text-wrap">*/}
                {/*    <IonLabel className="labels">id</IonLabel>*/}
                {/*    <IonInput class="inputs" placeholder="ID" value={match.params.id} onIonChange={e => setText(e.detail.value || '')}/>*/}
                {/*</IonItem>*/}
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Nume item vestimentar</IonLabel>
                    <IonInput class="inputs" placeholder="Nume" value={name} onIonChange={e => setText(e.detail.value || '')}/>
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Material</IonLabel>
                    <IonInput class="inputs" placeholder="Material" value={material} onIonChange={e => setMaterial(e.detail.value || '')}/>
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Inaltime</IonLabel>
                    <IonInput class="inputs" placeholder="Inaltime" value={inaltime} onIonChange={e => setInaltime(e.detail.value || '')}/>
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Latime</IonLabel>
                    <IonInput class="inputs" placeholder="Latime" value={latime} onIonChange={e => setLatime(e.detail.value || '')}/>
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Descriere</IonLabel>
                    <IonInput class="inputs" placeholder="Descriere" value={descriere} onIonChange={e => setDescriere(e.detail.value || '')}/>
                </IonItem>
                <IonLoading isOpen={saving}/>
                {savingError && (
                    <div>{savingError.message || 'Failed to save this garment...'}</div>
                )}
            </IonContent>
        </IonPage>
    );
};
export default GarmentEdit;