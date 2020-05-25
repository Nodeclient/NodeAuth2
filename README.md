# NodeAuth2
[![npm-image]][npm-url]
![npm](https://img.shields.io/npm/dt/mira-db)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)


 Network based one time password genarete

```mermaid
graph LR
B[Date Time]  --> A[Client Secret]
B -- Number --> F(Convert to Number)
W(Expiration) --> A
A --> G[Convert to Hash]
D{NIST Internet Time Service} -- synchronization --> B
G -- md5 --> F 
F --> E(Authentication Generate)
H(Prefix) --> E
```

   [npm-image]: https://img.shields.io/npm/v/mira-db.svg?style=flat
   [npm-url]: https://npmjs.org/package/mira-db   [flow-url]: https://npmjs.org/package/mira-db