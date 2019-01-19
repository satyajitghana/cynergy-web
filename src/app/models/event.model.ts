import { EventDetails } from './event-details.model';
import * as firebase from 'firebase';

export interface Event {
    EstDuration: number;
    EventName: string;
    EventTopic: string;
    ID: EventDetails;
    Type: string;
    isUpcoming: boolean;
    timeStamp: firebase.firestore.Timestamp;
}
