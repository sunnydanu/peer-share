# PeerShare
 

PeerShare: A secure client-side P2P connection offering features like file sharing and live clipboard.

## Features

- Send multiple files in parallel.
- Generate SDP connection for WebRTC data channel.
- No server side (only use public STUN servers for ICE candidates).
- PGP Encryption.
- Responsive UI.
- Open-source license.
- QR Scan for SDP trade.
- Paste from the clipboard.
- short SDP by [sdp-compact](https://github.com/sunnydanu/sdp-compact).

## Usage

1. The offer goes to <https://godev.run/peer-share/>.
2. The offer generates an offer link and then sends it to the answer.
3. The answer opens the offer link and then sends it to the offer.
4. The offer paste the answer code then click `Accept Answer`.
5. The offer/answer can now select and send files.

[example.webm](https://user-images.githubusercontent.com/8283616/234210465-7b20ad8d-9b1b-413b-ac4e-3919f9261b8e.webm)

## How does it work?

PeerShare client will get ICE Candidate from STUN/TURN server and make a connections between peers.

Thanks to the Interactive Connectivity Establishment (ICE) protocol, Two peers will have the shortest path to travel between them without caring the Network address translation (NAT).

WebRTC protocol will secure by DTLS (Datagram Transport Layer Security) But DTLS can be vulnerable to man-in-the-middle (MITM), So we provide a second layer encryption using PGP (RSA-OAEP-1024, AES-128).

```mermaid
C4Context
    Component(stun, "STUN Server")

    Boundary(b, "", "") {
        Person(bob, "Bob", "Bob PeerShare")
        Person(alice, "Alice", "Alice PeerShare")
    }

    Rel(alice, stun, "get ice candidates")
    UpdateRelStyle(alice, stun, $offsetX="-90", $offsetY="-40")

    Rel(bob, stun, "get ice candidates")
    UpdateRelStyle(bob, stun, $offsetX="-90", $offsetY="-40")

    BiRel(alice, bob, "file transfer")
    UpdateRelStyle(alice, bob, $offsetX="-30")
```

Example sequence, Alice want to send a file to Bob.

```mermaid
sequenceDiagram
    actor Alice
    actor Bob
    Alice-->>Alice: generate offer sdp
    Alice->>Bob: send offer link
    Bob-->>Bob: generate RSA keypair
    Bob-->>Bob: generate answer sdp
    Bob->>Alice: send answer sdp + RSA pub key
    Alice-->>Alice: encrypt file with AES key
    Alice-->>Alice: encrypt AES key with RSA pub key
    Alice->>Bob: send encrypted file + encrypted AES key
    Bob-->>Bob: decrypt file with decrypted AES key
```

## Development

Requirements

- Node (^16.14 || >=18)
- NPM

Installation

```sh
npm install
```

Run development (hot reload)

```sh
npm run dev
```

Test (playwright)

```sh
npm run test
```

## Deployment

 For self-host, you can run `npm run build` to build the static files. This no need the server side of svelte.

## Known Issues

1. Sometimes your internet will block the Google public STUN server and it may slow. I recommend to try to use a different STUN server, can check the list [here](https://github.com/sunnydanu/always-online-stun/blob/master/valid_hosts.txt).
2. Sometimes gets blocked by the firewall during sending files.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch and make changes.
3. Test your changes by running `npm run test`.
4. Ensure your code is properly formatted and linted by running `npm run lint` and `npm run format`.
5. Commit and the commit message should following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
6. Create a Pull Request on the original repository, describing the changes you've made and the problem they solve.

For feature requests, please open an issue on the GitHub repository to discuss your ideas with the maintainers.

## License

This project is 100% open-source.
[MIT License](https://github.com/sunnydanu/peer-share/blob/main/LICENSE) - Copyright &copy; 2024 Sunny Danu.

## Credits

Inspired from [zero-share](https://github.com/ntsd/zero-share) Special thanks to [Jirawat Boonkumnerd](https://github.com/ntsd/zero-share) 