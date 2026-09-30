One of the advantages of presets is that you can modify any of them, and the change will be applied everywhere if you want to add a text effect - such as a `shake` or a `glitch`, for example.

# Ready-made presets (kubejs/assets/milf/presets/)


| Preset | Colors | Built-in effect | When to use |
| --- | --- | --- | --- |
| `keyword` | gradient FFD200 -> F7971E | - | key terms, mechanic names |
| `named` | gradient ffee88 -> fadf3e, bold | - | item/entity names |
| `property` | gradient 1e6c8e -> 2e7775 | - | numeric values, stats |
| `positive` | cyclic gradient 5da92f -> 9bd46a | - | positive effect/outcome |
| `warning` | gradient df1b1b -> ba3030 | pulse (base 0.7, amplitude 1.0, frequency 1.2) | danger, warning |
| `curse` | gradient b70df2 -> bc88ce | - | curses, dark magic |
| `blood` | gradient 3c0406 -> a82d2f | shake (amplitude 0.5, frequency 1.8) | blood, violence, pain |
| `bone` | gradient D4C9A8 -> F0E8D5 | shake (amplitude 0.6, frequency 3) | bones, undead, fragility |
| `soul` | color A8D8EA | fade (minAlpha 0.4, frequency 0.6) | souls, ghostliness |
| `magic` | cyclic gradient 874F9E -> FFEFC1 | - | magic in general |
| `fire` | color FF6A00 | - | fire (static) |
| `flame` | cyclic gradient FF2200 -> FF6A00 -> FFD700 | - | fire (shimmering) |
| `nature` | cyclic gradient 2d5016 -> 6b8e23 -> a9c44c | wave (amplitude 0.3, frequency 0.3) | nature, plants |
| `poison` | cyclic gradient 4b0082 -> 76b900 -> 2e8b57 | pulse (base 0.75, amplitude 0.7, frequency 0.9) | poison, toxicity |
| `wind` | cyclic gradient 87CEEB -> C8EEFF | wave (amplitude 0.4, frequency 0.5) | wind, air |

# Tips for base effects

| Tag | Parameters (example) | Description |
| --- | --- | --- |
| `gradient` | `colors="hex1,hex2,..."`, `cyclic` | smooth color transition along the text |
| `color` | `color=hex` | one solid color |
| `rainbow` | - | each character cycles through the color spectrum (i dont like that)|
| `pulse` | `base=0.7 amplitude=1.0 frequency=1.2` | text brightness pulses |
| `fade` | `minAlpha=0.3 frequency=0.8` | alpha smoothly fades in and out |
| `shake` | `amplitude=0.4 frequency=1.5` | rapid random jitter of characters |
| `wave` | `amplitude=0.4 frequency=1.0 wavelength=3.0` | vertical wave motion along the text |
| `wiggle` | `amplitude=0.5 frequency=1.0 phase=1.0` | light horizontal sway |
| `bounce` | `amplitude=1.5 frequency=1.2 phase=1.0` | characters hop up and settle back down |
| `swing` | - | text tilts sideways like a pendulum on its tilt axis |
| `pendulum` | `frequency=0.8 angle=15.0` | the whole line swings like a pendulum |
| `circle` | `radius=0.8 frequency=1.2 phase=0.0` | characters orbit a small circle |
| `turbulence` | `amplitude=0.4 frequency=1.5` | noise-driven jitter, more "ragged" than shake |
| `glitch` | `frequency=0.7 shiftChance=0.06` | digital glitch - flicker and character shift |
| `glow` | - | soft neon glow around the text |
| `shadow` | `dx=0.5 dy=0.5 color=hex alpha=0.5` | offset drop shadow behind the text |
| `outline` | - | colored outline around each character |
| `scroll` | - | horizontal scrolling text |
| `typewriter` | - | characters appear one at a time |
| `obfuscate` | `mode=random/constant interval=30 alphabet=numeric` | characters replaced with random glyphs (cipher effect) |
| `font` | - | pick a font and toggle bold/italic/underline/strikethrough |
