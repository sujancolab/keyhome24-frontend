import { v4 as uuidv4 } from 'uuid';

// Simulation d'une base de données avec localStorage
class Database {
  private getStore(name: string) {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : {};
  }

  private setStore(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  // Gestion des annonces
  async createListing(data: any) {
    const listings = this.getStore('listings');
    const id = uuidv4();
    listings[id] = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      views: 0
    };
    this.setStore('listings', listings);
    return listings[id];
  }

  async updateListing(id: string, data: any) {
    const listings = this.getStore('listings');
    if (listings[id]) {
      listings[id] = { ...listings[id], ...data };
      this.setStore('listings', listings);
    }
    return listings[id];
  }

  async deleteListing(id: string) {
    const listings = this.getStore('listings');
    delete listings[id];
    this.setStore('listings', listings);
  }

  async getListings(filters?: any) {
    const listings = this.getStore('listings');
    let results = Object.values(listings);
    
    if (filters) {
      results = results.filter((listing: any) => {
        let match = true;
        for (const [key, value] of Object.entries(filters)) {
          if (value && listing[key] !== value) {
            match = false;
          }
        }
        return match;
      });
    }
    
    return results;
  }

  // Gestion des utilisateurs
  async getUsers(filters?: any) {
    const users = this.getStore('users');
    let results = Object.values(users);
    
    if (filters) {
      results = results.filter((user: any) => {
        let match = true;
        for (const [key, value] of Object.entries(filters)) {
          if (value && user[key] !== value) {
            match = false;
          }
        }
        return match;
      });
    }
    
    return results;
  }

  async updateUser(id: string, data: any) {
    const users = this.getStore('users');
    if (users[id]) {
      users[id] = { ...users[id], ...data };
      this.setStore('users', users);
    }
    return users[id];
  }

  async deleteUser(id: string) {
    const users = this.getStore('users');
    delete users[id];
    this.setStore('users', users);
  }

  // Gestion des notifications
  async createNotification(userId: string, data: any) {
    const notifications = this.getStore('notifications');
    const id = uuidv4();
    notifications[id] = {
      ...data,
      id,
      userId,
      read: false,
      createdAt: new Date().toISOString()
    };
    this.setStore('notifications', notifications);
    return notifications[id];
  }

  async getNotifications(userId: string) {
    const notifications = this.getStore('notifications');
    return Object.values(notifications)
      .filter((n: any) => n.userId === userId)
      .sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export const db = new Database();