# Drowsy's WFRP4e Compatibility Box

Bring WFRP4e and your optional Foundry modules together: Compatibility Box supplies targeted
patches, equipment integrations, settings presets, and world-organization tools. Install only the
companions you want; integrations stay inactive when their required modules are disabled.

## What it does

- **Argon and Paper Doll:** WFRP rolls, equipment slots, and weapon sets, with a bridge between the
  two when both integrations are enabled.
- **Health displays and effects:** WFRP-oriented presets and integrations for Health Estimate, Boss
  Bar, and Splatter.
- **WFRP content:** read supported journal, scene-pin, and table references from accessible official
  compendiums when their world documents are missing. Keep official world imports and compendiums
  organized, and resolve additional career trappings.
- **Calendars:** Imperial calendar setup and content for Simple Calendar Reborn and Simple
  Timekeeping & Calendar, including coordination when both are enabled.
- **Targeted fixes:** compatibility guards for supported WFRP/Warhammer Library and companion
  versions, with a startup report explaining which patches applied or were skipped.
- **In-game help:** a Compatibility Guide compendium and optional Utility Macros.

## Installation

1. In Foundry's Setup screen, open **Add-on Modules → Install Module**.
2. Paste the manifest URL below into **Manifest URL**, then install.
3. Launch a WFRP4e world. Enable the module in **Manage Modules** and save.

```text
https://github.com/jeremyglebe/Foundry.Warhammer.Compatibility-Box/releases/latest/download/module.json
```

## Compatibility

- Package ID: `wfrp4e-compatibility-box`
- Package version: `1.5.1`
- Foundry VTT: minimum 14, verified 14
- Required system: wfrp4e 9.6.1

Use the release manifest's compatibility requirements when choosing a version. A verified Foundry
version is not a promise that every combination of companion modules has been tested.

WFRP4e 9.6.1 is the minimum declared system version. Companion modules are recommendations, not
mandatory dependencies. Their individual features have their own version and activation checks.

## First steps

1. Open **Compendium Packs → Compatibility Guide → 00. Start Here**. You can read the guide in
   place; importing it creates a separate world copy that will not receive package updates.
2. As a GM, open **Game Settings → Drowsy's WFRP4e Compatibility Box**. Use **Integrations**,
   **Calendars**, **Presets**, and **World Tools** for the relevant options.
3. Review proposed preset changes before applying them. Save changes in each window and reload when
   requested. A disabled or missing companion will not expose its optional integration.
4. For troubleshooting, open **Configure World Tools → Startup Fix Report**. “Applied” means the
   patch was installed, not that a damaged document was found or repaired.

The two WFRP folder-organization options are enabled by default. Review them before using the module
in an established world. Disabling organization retains the current placement. Back up your world
before changing its organization or migrating calendar setup.

For paired calendar use, follow the in-game guide and use ST&C to advance dates and time. Pause
running clocks before migration, and review how existing timestamps and event dates will be handled.

## Moving from the legacy integrations

`enhancedcombathud-wfrp4e` and `paper-doll-wfrp4e` are superseded by Compatibility Box. Their final
updates are compatibility shims that depend on this module. Verify that Compatibility Box is
installed and enabled before removing the shims. Existing Argon preferences are read from the legacy
scope when a current preference is missing.

## Releases and support

- [Latest release](https://github.com/jeremyglebe/Foundry.Warhammer.Compatibility-Box/releases/latest)
- [All releases](https://github.com/jeremyglebe/Foundry.Warhammer.Compatibility-Box/releases)
- [Report a problem](https://github.com/jeremyglebe/Foundry.Warhammer.Compatibility-Box/issues)

For a useful bug report, include your Foundry, WFRP4e, and module versions, relevant companion
versions, reproduction steps, and any console error. Avoid including private campaign data.

## About this repository

This repository contains installable release artifacts. Its README is generated from the project's
public documentation template during release preparation. Generated scripts, styles, compendiums,
and `module.json` should not be edited here.
