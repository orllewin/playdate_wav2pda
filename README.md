# Playdate: wav2pda

The Playdate compiler converts .wav audio to .pda Playdate Audio files. If you tell the compiler to compile just a wav without Playdate project (eg. `pdc music.wav`) it'll still do the conversion process and package the converted .pda inside a .pdx directory, this utility just does that process and tidies up the files afterwards.

The idea is you can edit samples on your computer then add the converted .pda to the data directory of [Tape Looper](https://orllewin.github.io/playdate/tape_looper/) or other future audio projects.

Before I discovered the compiler does this easily for you anyway I'd written some code that naively swaps the wav header for a pda header I took from a converted file, this works fine but I'm not sure how reliable it is, I've left it in as an option in case the compilaer behaviour changes in the future. 
