# JupyterLab Building Extensions: Status Bar Time Widget Mod

**Description**: The task is to create a simple JupyterLab environment frontend extension (refer to [JupyterLab Lab Task.pdf](https://github.com/sboettch/jupyterlab-statusextension/blob/main/JupyterLab%20Task.pdf)). We want to be able to:
1. Show status of the kernel
2. Show kernel execution time in milliseconds

---

## 0. SETTING UP (***estimated time***: 45 minutes)

**Before we begin, there are a few tutorial resources:**
* [Developing Extensions for JupyterLab 20201008 1408 1](https://www.youtube.com/watch?v=_ZexgrCGttU&t=3154s)
* [jupytercon2020-developingextensions](https://github.com/jupytercon/jupytercon2020-developingextensions)
* [Extension Tutorial](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html)
* https://github.com/jupyterlab/extension-cookiecutter-ts
* https://github.com/jupyterlab/extension-examples/tree/master/widgets

We want to ensure that JupyterLab is up-to-date and that we can successfully install an extension ("jupyter labextension install @..."). For further documentation, please see [Extensions](https://jupyterlab.readthedocs.io/en/stable/user/extensions.html).

The exercise we are going to do isn't very different from the tutorial exercise that's outlined in [jupytercon2020-developingextensions](https://github.com/jupytercon/jupytercon2020-developingextensions). It would be easy to download/unzip that, and work out of the tutorial (and even follow along the slides). So, that's basically what we highly recommend/do here -- at the end, we'll clean the code up to publish/share!

---

### 1. STATUS OF THE KERNEL (***estimated time***: 1 hour)

For this portion, there are a few tidbits we need to ensure to import:

`import {`<br>
  `JupyterFrontEnd,`<br>
  `JupyterFrontEndPlugin,`<br>
  `ILabStatus`<br>
`} from '@jupyterlab/application';`<br>

`import { INotebookTracker } from '@jupyterlab/notebook';`<br>

`import { IStatusBar } from '@jupyterlab/statusbar';`<br>

`import { Widget } from '@lumino/widgets';`<br>

The goal of this part is that we want to know the status of the kernel. It should flash to busy (from idle) when the kernel is executing.

Additional helpful reading resources can be found here:
* https://www.npmjs.com/package/@jupyterlab/statusbar-extension
* https://jupyterlab.readthedocs.io/en/stable/extension/extension_points.html
* https://jupyterlab.readthedocs.io/en/stable/api/modules/statusbar.html

---

### 2. KERNEL EXECUTION TIME (***estimated time***: 1.5 hours)

Now for the interesting bit. Say we have a cell `time.sleep(10)` in our Notebook. Let's run that. Part #1 will show the status flash to busy from idle. How long do we expect that to be? 10s (10,000 milliseconds). We want to be able to show that kernel execution time (that's our goal anyway). ***But how to do that?***

Basically, the instinct here is to start counting time when the kernel status first "flashes" from idle to busy (start counting, get time). At the point when the kernel resumes the idle state (from busy to idle), we stop time. Now, we could run up the clock in milliseconds up till the final time. But our task says, "You should put the number of milliseconds it took the kernel to execute." Basically, all we need to do is take the difference between the final time and the start time. Remember that we want to ensure clarity (eliminate error from vagueness), so we should check to be able to calculate difftime between datetime objects/formats that are unambiguous.

There is existing discussion on (measuring, accessing) kernel execution time for JupyterLab. Some works are going to be useful for reference/information only, and you can come across older code that isn't maintained or can't just be copied in snippets into our codebase (language, multiple incompatibilities). Refer to:
* https://github.com/deshaw/jupyterlab-execute-time/tree/master/src
* https://jupyterlab.readthedocs.io/en/stable/api/interfaces/services.kernel.ikernelconnection-1.html
* https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/execute_time/readme.html

---

### 3. TESTING (***estimated time***: 50 min)

After building `index.ts`, open up a new `Untitled.ipynb` within the JupyterLab environment to test the extension.

Hatchling backend issues might be encountered, and if that's the case--starting here may be helpful:
* https://github.com/pypa/hatch/issues/409

# Total Estimated Time: 245 minutes (4.083 hours)
