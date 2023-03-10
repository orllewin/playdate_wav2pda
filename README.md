# Playdate: wav2pda

When you build a Playdate project the Playdate compiler converts .wav audio to .pda Playdate Audio files. If you tell the compiler to compile just a wav without a Playdate project (eg. `pdc music.wav`) it'll still do the conversion process and package the converted .pda inside a .pdx directory, this utility does that process and tidies up the files afterwards: `wav2pda music.wav`

The idea is you can edit samples on your computer then add the converted .pda to the data directory of [Tape Looper](https://orllewin.github.io/playdate/tape_looper/) or other future audio projects.

Before I discovered the compiler does this easily for you I'd written some code that naively swaps the wav header for a pda header I took from a converted file, this works fine but I'm not sure how reliable it is, I've left it in as an option in case the compiler behaviour changes in the future: `wav2pda -o music.wav` 

## Install

* Clone this repo
* `cd` to the directory and run `npm install -g .`
* Convert a wav from anywhere: `wav2pda music.wav`
