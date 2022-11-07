import { differenceInMilliseconds } from 'date-fns';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabStatus
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';
import { IStatusBar } from '@jupyterlab/statusbar';
import { Widget } from '@lumino/widgets';


/**
 * Initialization data for the status_test extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'status_test:plugin',
  autoStart: true,
  requires: [ILabStatus, IStatusBar, INotebookTracker],
  activate: (app: JupyterFrontEnd, labStatus: ILabStatus, statusBar: IStatusBar, tracker: INotebookTracker) => {
    console.log('JupyterLab extension status_test is activated!');
    console.log('ILabStatus:', labStatus);
    console.log('IStatusBar:', statusBar);
    const statusWidget = new Widget();
    labStatus.busySignal.connect(() => {
      statusWidget.node.textContent = labStatus.isBusy ? 'Busy' : 'Idle';
    });
    statusBar.registerStatusItem('lab-status', {
      align: 'middle',
      item: statusWidget
    });
    
    const timeWidget = new Widget();  
    
    var startTime = Date.now()
    var timeTaken = Date.now()
    var flag = Boolean(false);

    labStatus.busySignal.connect(() => {
      flag = Boolean(false);
      while (labStatus.isBusy == true) {
        if (flag == false) {
          startTime = Date.now();
          flag = Boolean(true);
        }
        timeTaken = differenceInMilliseconds(Date.now(),startTime);
        timeWidget.node.textContent = String(timeTaken);
      }
    });
    statusBar.registerStatusItem('time-execution', {
      align: 'right',
      item: timeWidget
    });     
  }
};

export default plugin;