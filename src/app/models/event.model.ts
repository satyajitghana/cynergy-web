import { EventDetails } from './event-details.model';
import * as firebase from 'firebase';

export interface Event {
    date: Date;
    eventName: string;
    eventTopic: string;
    details: any; // This will be EventDetails Class
    duration: number;
    type: string;
    timeStamp: firebase.firestore.Timestamp;
}
