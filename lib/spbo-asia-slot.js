'use babel';

import SpboAsiaSlotView from './spbo-asia-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  spboAsiaSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.spboAsiaSlotView = new SpboAsiaSlotView(state.spboAsiaSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.spboAsiaSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spbo-asia-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.spboAsiaSlotView.destroy();
  },

  serialize() {
    return {
      spboAsiaSlotViewState: this.spboAsiaSlotView.serialize()
    };
  },

  toggle() {
    console.log('SpboAsiaSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
