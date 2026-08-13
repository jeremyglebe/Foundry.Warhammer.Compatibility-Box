# Drowsy's WFRP4e Compatibility Box

Optional compatibility features and patches for WFRP4e and supported Foundry VTT modules.

## Installation

In Foundry VTT, open **Add-on Modules**, choose **Install Module**, and paste this manifest URL:

```text
https://github.com/jeremyglebe/wfrp4e-compatibility-box/releases/latest/download/module.json
```

The manifest URL becomes available after the first GitHub release is published. Before then, it may
return a not-found response even though this repository already exists.

## Compatibility

- Module ID: `wfrp4e-compatibility-box`
- Current version: `1.1.3`
- Foundry VTT: minimum 14, verified 14
- Required systems: wfrp4e 9.6.1

## Links

- [Latest release](https://github.com/jeremyglebe/wfrp4e-compatibility-box/releases/latest)
- [Foundry manifest](https://github.com/jeremyglebe/wfrp4e-compatibility-box/releases/latest/download/module.json)
- [Public artifact repository](https://github.com/jeremyglebe/wfrp4e-compatibility-box)

## Repository Contents

This public repository contains built, installable module artifacts. Development source, private
notes, and local tooling belong in the separate source repository.

```text
.
├── .github/workflows/release.yml  Packages tagged releases
├── lang/                          Compiled localization files, when present
├── packs/                         Compiled Foundry compendiums, when declared
├── scripts/                       Browser-ready module JavaScript
├── styles/                        Compiled module styles
├── module.json                    Foundry module manifest
└── README.md                      Installation and compatibility information
```

Do not edit generated scripts, styles, packs, or `module.json` directly in this repository. They are
replaced from the private source build during release preparation.
