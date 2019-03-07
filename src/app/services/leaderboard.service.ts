import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private db: AngularFirestore) { }

  async getLeaderboard() {
    const leaderboard = await this.db.collection('Leaderboard').ref.orderBy('points', 'desc').limit(15).get();
    return await leaderboard.docs.map(data => data.data());
  }
}
