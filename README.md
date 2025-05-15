
# NodeJS JSON Logger

A lightweight, 0 build dependancy NodeJS JSON logger. Built using Typescript. 







## Run Locally

Clone the project


```bash
  git https://gitlab.humebank.com.au/Digital/hume-library/nodejs-json-logger
```


npm -i (only needed for dev types if wanting to adjust source) 

Compile from typescript
npm run build  


## Usage

View the test.js file to get a example of usage.

```
import JSONLogger from './node-logger-json';

const logger = new JSONLogger({
    outputDir: "C:\\User\\Documents\\Logs\\", // output directory where log file will be written.
    fileName: "my.json",   // default file name 
    job:"Some script"  // attribute on the log file
})



logger.log("stuff", 0, {1: "more stuff?"}) // Writes a log to memory with an additional data object.

logger.log("more stuff", 1); // Writes a log to memory

logger.sortBySeverity() // Sorts the log by descending severity level.

logger.write("log.json"); // Writes the output file with the provided filename.

````

### Example log

```
{"datetime":"2025-05-15T06:24:48.472Z","job":"Some script","totalItems":2,"logs":[{"id":0,"severity":0,"severityDesc":"CRITICAL","datetime":"2025-05-15T06:24:48.472Z","message":"stuff","data":{"1":"more stuff?"}},{"id":1,"severity":1,"severityDesc":"ERROR","datetime":"2025-05-15T06:24:48.472Z","message":"more stuff"}]}
```