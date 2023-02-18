#!/usr/local/bin/node

const fs = require('fs')
const execSync = require('child_process').execSync

log("")
log("Playdate wav2pda - converts Linear PCM .wav files to .pda")
log("")

if(process.argv.length == 2){
  log("Missing file argument")
  process.exit(1)
}

var usePDC = true
var wavfile = process.argv[2]

log("Arg size: " + process.argv.length)
process.argv.forEach(arg => log("Arg: " + arg))

if(process.argv.length == 4){
  if(process.argv[2] == "-o"){
    usePDC = false
    wavfile = process.argv[3]
  }else{
    log("Invaid arguments")
    process.exit(1)
  } 
}

if(!wavfile.endsWith(".wav")){
  log("Invaid argument, file must be a .wav")
  process.exit(1)
}

if(usePDC){
  log("Converting " + wavfile + " using Playdate compiler")
  execSync("pdc " + wavfile)

  const pdx = wavfile + ".pdx"
  const pdafile = wavfile.replace(".wav", ".pda")
  execSync("mv " + pdx + "/" + pdafile + " ./" + pdafile)
  execSync("rmdir " + pdx)

  log("Ready: " + pdafile)
}else{
  log("Converting " + wavfile + " by swapping file header")
  const filebuffer = fs.readFileSync(wavfile)
  const wavbytes = Uint8Array.from(filebuffer)
  
  const percentbyte = (element) => element == 37//dec 37 == 0x25
  const percindex = wavbytes.findIndex(percentbyte)
  
  const wavdata = wavbytes.slice(percindex)
  const pdaprefix = Uint8Array.from([80, 108, 97, 121, 100, 97, 116, 101, 32, 65, 85, 68, 68, -84, 0, 2, 44, 0, -33, -1, -79, -1, -90, -1, -66, -1, -25, -1, 13, 0])
  const pdalength = pdaprefix.length + wavdata.length
  
  const pdabytes = new Uint8Array(pdalength)
  pdabytes.set(pdaprefix, 0)
  pdabytes.set(wavdata, pdaprefix.length)
  
  const pdafile = wavfile.replace(".wav", ".pda")
  fs.writeFileSync(pdafile, pdabytes)
  
  log("Ready: " + pdafile)
}

function log(message){
  console.log(message)
}