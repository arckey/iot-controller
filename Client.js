const fetch = require('node-fetch');

/****************** Device *****************/
function Device(data) {
    this._client = data.client;
    this._component = 'main';
    this._name = data.name;
    this._label = data.label;
    this._id = data.deviceId;
    this._capabilities = data.components[0].capabilities.map(c => c.id);
    
    return this;
}

Device.prototype.execute = function({ capability, command, arguments }) {
    return this._client(`/devices/${this._id}/commands`, 'POST', {
        commands: [{
            component: this._component,
            capability,
            command,
            arguments,
        }]
    });
}

/****************** Client *****************/
function Client(token) {
    this._client = (path, method = 'GET', body) => {
        return fetch(`https://api.smartthings.com/v1${path}`, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`request failed: ${res.status} ${res.statusText}`);
            }
            return res;
        })
        .then((res) => res.json())
    }

    return this;
}

Client.prototype.listDevices = function() {
    return this._client('/devices')
        .then(res => res.items.map(item => new Device({ client: this._client, ...item })));
}

Client.prototype.getDeviceById = function(id) {
    return this._client(`/devices/${id}`)
        .then(res => new Device({ client: this._client, ...res }));
}

Client.prototype.getDeviceByLabel = function(label) {
    return this.listDevices()
        .then(dvcs => dvcs.find(d => d._label === label));
}

module.exports = Client;
