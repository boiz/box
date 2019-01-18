const BoxSDK = require("box-node-sdk");
const fs= require("fs");


var sdkConfig = {
  "boxAppSettings": {
    "clientID": "1zvuq3tzi8qfr1w1cuq5fnh6utbff9n9",
    "clientSecret": "FuDbox4NbSJnj3H4NCbRwUku3yawnjsR",
    "appAuth": {
      "publicKeyID": "db4l2c4o",
      "privateKey": "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIcm2QX/SXPKECAggA\nMBQGCCqGSIb3DQMHBAj2Hd8NRka0MgSCBMj5rGfWSNbetYCC2UikNohmiAl64Is2\nmMJ2yok6K8Btm82Xp/X/2GAh2Epkfp8fu6QhjMHhL2yJP/CdCCK6Pnn0i2zN9TbQ\n5dy2chmuCTpo+jg8mVwQodE1YENv3I/4eZ4p1+lueoFfDXXky4/2i5f3svWnomkV\nTEk2VQn/5CCKSe8G+eIiwwzlfyuuILOIdho0hAyHSJK8lUH7P05+SZyOZtY4JmiI\nS1GkGg23U/rAXjy7zjM7RTGGVOZppZjSDZyhHivGB7zZ8XwpaWeXbrlQ/CR/O700\npvxX6PkKsIPFdXbVFmSMFwAmL5mVJXfptyRfY9uhXT8zNgV/GcOUN/i0x4sEpZC+\ns1rmQ7pkxWfcF8da4aFfMnz/bPWCGzr/PFPpleh5nWdUoE9SAWfN3SPsA5xd2YNo\nkuDcMAv6863h0ev30vTe+vKvnFm9CV/aT+cH7L3VKCF6m/LsDce+lyX2mP6KhP2E\nNypVRLoDcobtoZbxvjek6weaDUMglbWn5N0qx9fqdkKGU/rQs4NPO1fRT1PnzSbL\nrO7blm+5Vw9oYKQ4W2DcahbH8F6kciveRsBUS0+bu2us60uo4+PIERXjAx4jRckm\nlb80tpu2Ou3cvi1b9mYl7vDCkjrIIFI7Jq6X1tPkVsJb+yhwuybUs/YhcIcAyC0B\nf9k3GJVvlb6MnhJUsZWbYGTsHT3F9k+zEsib3yDJc75hYQ7oH7NCZiQZyJmFscjM\nUQJHVOYC+Vb9gvyR6W2IiTBa1UeHBksPFWQThQyl1HSfs1jAOWO9kAw3Sly1cNKr\n8y9v5ec4c9F8w+zJjjgAeNGWlSzHdbFIpaEvvkG2C/GfI/DPAF9bHzMzk59lP+5a\nZshDvdF9iaF5xulac3vMQOFlhk9NNHtbw8yvPsizs8mzeWuWvxf6TGpIEFu5tfLR\nITbBlNJotGh79JdCw04m2HXYRzVm4ktClLOV7k7azxPCVWuCfaIVY+Y9HvbavCnH\nFCOVrKJgrc6xgjXPSjurdcRxxLgA71BRWcc8RKbpgGAPGWtuX+w4CzaEuTOEw0Ql\n9j+Ck4LuSatMWowT+i7FQ/74sBY/PTOHW10njxow7Gq4rubeTS1pQH7/VDaTP5GH\nOh/qNJ72XLrFQiA20E7LhUavdD6d5eb9+kjvta9TJK5UXXj0YdKzwEb6oYIO+dEq\nwgllN+Dj1AH79qMJYKYt6Y6i8BbyyfgdYbtfJg/rjGQmGGTeIHSvU2/BosYS+sML\nCJxGAhk43WbIwXovuxvDtLrnxy5WZLNrwExU1VpQzVlQYxaAVE3YlrRHT5WLUKqZ\nmrwSfSLCNh0wGDqx+hCQ3LlmeNDwakV/U778pg51GlCD85mCmFiyuRpbyHGbfzGs\nQTsy8aDN55ne3zyNeNvqFAbjuMBi2U6nyhHjvbMTtGsQrAOjtc3566E5Hk3vWTIu\nM4e3vfCyYRuwi0dep0KdUIsEKKRg1H8walpv6C22zCiblvB5ofV0C+Ha7qxnMLVO\n/KmDLR0favfVtwwdQNMOHw9FejoEuy0jrVMQjr/WYOnS6GNVd2TZvD9d77d6z5cC\nB/GuaRnF9KOCAX+FlNKkoIM8B5p5vBSzT+/PkOOtL3KckywzoEkm6gYBkerqmKHK\nP4I=\n-----END ENCRYPTED PRIVATE KEY-----\n",
      "passphrase": "48f96834f94ee532ef7c789dd3290f7b"
    }
  },
  "enterpriseID": "155607430"
};


var sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);

// Get the service account client, used to create and manage app user accounts
// The enterprise ID is pre-populated by the JSON configuration,
// so you don't need to specify it here
var serviceAccountClient = sdk.getAppAuthClient('enterprise');

// Get an app user client
var appUserClient = sdk.getAppAuthClient('user', '155607430');

console.log(appUserClient);