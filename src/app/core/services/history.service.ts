import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class HistoryService {

  private readonly MAX_HISTORY = 5;
  private readonly HISTORY_KEY = 'history';

  constructor() {}

  private getAllHistory(): any {
    const data = localStorage.getItem(this.HISTORY_KEY);
    try {
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private saveAllHistory(historyObj: any): void {
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(historyObj));
  }

  getHistory(storageKey: string, defaultSuggestions: any[]): any[] {
    const allHistory = this.getAllHistory();
    return Array.isArray(allHistory[storageKey]) ? allHistory[storageKey] : defaultSuggestions;
  }

  addToHistory(storageKey: string, defaultSuggestions: any[], destination: any): void {
    const allHistory = this.getAllHistory();
    let history = Array.isArray(allHistory[storageKey]) ? allHistory[storageKey] : defaultSuggestions;

    history = history.filter(item => item.id !== destination.id || item.code !== destination.code);
    history.unshift(destination);

    if (history.length > this.MAX_HISTORY) {
      history = history.slice(0, this.MAX_HISTORY);
    }

    allHistory[storageKey] = history;
    this.saveAllHistory(allHistory);
  }

  hasHistory(storageKey: string): boolean {
    const allHistory = this.getAllHistory();
    const list = allHistory[storageKey];
    return Array.isArray(list) && list.length > 0;
  }
}


