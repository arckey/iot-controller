# IOT controller
A utility that helps send commands to IOT devices and integrates with [samsung smart-things api](https://smartthings.developer.samsung.com/docs/index.html).

## Authorization:
To use this tool you will need to provide a Personal-Access-Token which can be generated [here](https://account.smartthings.com/login?redirect=https%3A%2F%2Faccount.smartthings.com%2Ftokens). The required scopes are:
- [X] Devices:
   - [X]  List all devices
   - [X]  See all devices
   - [X]  Control all devices


## Usage:
```
### list all devices

iot devices list -t <TOKEN>


### turn off a light bulb with the label: "smart-bulb"

iot exec switch off -t <TOKEN> -l smart-bulb

### with argo workflows

argo template create ./workflows/workflow-template.yaml # create the template

argo submit ./workflows/workflow.yaml -p capability=switch -p command=on -p token=<TOKEN> -p label=smart-bulb --watch

argo submit ./workflows/workflow.yaml -p capability=switchLevel -p command=setLevel -p arguments=80 -p token=<TOKEN> -p label=smart-bulb --watch
```