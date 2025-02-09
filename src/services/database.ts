import { v4 as uuidv4 } from 'uuid';
import { realUsers } from '../data/users';
import { sampleListings, sampleRequests } from '../pages/DashboardPage/data/sampleData';

// Simulation d'une base de données avec localStorage
class Database {
  constructor() {
    // Initialiser les données d'exemple si nécessaire
    if (!localStorage.getItem('initialized')) {
      this.initializeData();
    }
  }

  private initializeData() {
    // Initialiser les utilisateurs
    const users = { ...realUsers };
    localStorage.setItem('users', JSON.stringify(users));

    // Initialiser les annonces
    const listings = {};
    sampleListings.forEach(listing => {
      listings[listing.id] = listing;
    });
    localStorage.setItem('listings', JSON.stringify(listings));

    // Initialiser les demandes
    const requests = {};
    sampleRequests.forEach(request => {
      requests[request.id] = request;
    });
    localStorage.setItem('requests', JSON.stringify(requests));

    localStorage.setItem('initialized', 'true');
  }

  // ... reste du code inchangé ...
}

export const db = new Database();