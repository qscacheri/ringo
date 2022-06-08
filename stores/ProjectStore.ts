import { makeAutoObservable } from 'mobx';
import { GraphManager } from './GraphManager';
import { GraphMetaDataStore } from './GraphMetaDataStore';
import { UIStore } from './UIStore';

export class ProjectStore {
  graphManager = new GraphManager();
  metaDataStore = new GraphMetaDataStore(this.graphManager);
  uiStore = new UIStore();
  constructor() {
    makeAutoObservable(this);
  }
}
