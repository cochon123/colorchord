# Devpost — ColorChord
## Inspiration
Synesthesia — artists like Kandinsky who "heard" colour. I wanted anyone, even without musical training, to paint a melody.
## What it does
Seven colours = seven notes; height = octave; speed = volume and brush width. Switch scales to change mood, replay your painting as music, save it as an image.
## How we built it
HTML5 Canvas + Pointer Events for drawing (mouse, touch, stylus), Web Audio API oscillators with envelopes for sound, throttled note triggering for musical rhythm. Built with help from an AI coding assistant.
## Challenges
Avoiding a wall of noise (throttling notes to ~11/s), mapping screen space to pitch intuitively, and browser autoplay rules.
## What we learned
Music theory basics (scales, octaves, equal temperament) and real-time audio in the browser.
## What's next
Collaborative canvases, MIDI export, colour-blind-friendly palettes and shape-based notes, classroom lesson mode.
## Built with
html5-canvas, web-audio-api, javascript
